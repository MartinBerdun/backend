import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/user.model.js";
import { createHash,isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2"
import config from "../config/config.js";
import cartModel from "../dao/mongo/models/carts.model.js";
import jwt from "passport-jwt"
import { userService } from "../servicies/index.js";
import cookieParser from "cookie-parser";

import { cartService } from "../servicies/index.js";
import { userRepository } from "../repositories/index.js";

const {clientID , clientSecret , callbackURL, JWT_SECRET, ADMIN_EMAIL, COOKIE_NAME} = config

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt; // jwt tiene una opcion extractjwt para extraer el jwt

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies){
        token = req.cookies[COOKIE_NAME]
    }
    return token;
}

const jwtOptions = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), //de donde esperamos que llegue nuestro jwt.. en este caso desde una cookie con la funcion cookieExtractor.. que lo que hace es verificar en el objeto req si viene con una cookie.. agarre la que se llame jwtcookie y extraiga el token
} 

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy( {passReqToCallback : true, usernameField: "email"}, async (req,username, password, done) => {
            try {
                const {first_name, last_name,email, age} = req.body;
                let {role} = req.body;

                let user = await userModel.findOne({email:username});
                
                if (user) {
                    console.log("user already exists");
                    return done(null, false);
                }

                const cart = await cartModel.create({})

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    role :
                    username === "adminCoder@coder.com"
                        ? (role = "admin")
                        : (role = "user"),

                    cart: cart._id,
                }

                const result = await userModel.create(newUser);

                if(!result) console.log("user not created");

                return done(null, result);

            } catch (error) {
                throw new Error (error);
            }
        })
        );


    passport.use(
        'jwt', 
        new JwtStrategy(jwtOptions, async (jwt_payload,done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error);
        }
    })
    );

    passport.use( "github",
        new GitHubStrategy({clientID, clientSecret, callbackURL}, 
        async (accessToken, refreshToken, profile, done)=>{
        try {

            const user = await userRepository.getUserByEmail({ email: profile._json.email })

          if (!user) {

            const cart = await cartService.createCart()

            let role

            const newUser = {
              first_name: profile._json.name,
              last_name: '',
              age: 18,
              email: profile._json.email,
              password: '',
              role:
                profile._json.email === `${ADMIN_EMAIL}`
                  ? (role = 'admin')
                  : (role = 'user'),
              cart: cart._id
            }

            const result = await userService.register(newUser)

            return done(null, result)
          }

          return done(null, user)

            } catch (error) {
                return done(error)
            }

        })
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    }); 

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    }); 

}

export default initializePassport;
