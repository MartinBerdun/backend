import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import { createHash,isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2"
import config from "../config/config.js";
import cartModel  from "../dao/models/carts.model.js";
import jwt from "passport-jwt"
import cookieParser from "cookie-parser";
import { userRepository } from "../dao/repositories/users.repository.js";

const {clientID , clientSecret , callbackURL, JWT_SECRET, ADMIN_EMAIL, COOKIE_NAME} = config

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
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
            
                console.log({user});
                
                if (user) {
                    console.log("user already exists");
                    return done(null, false);
                }

                // const cart = await cartModel.create({})
                // console.log(cart);

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

                    // cart: cart._id,
                }

                
                const result = await userModel.create(newUser);

                console.log({result});

                if(!result) console.log("user not created");

                return done(null, result);

            } catch (error) {
                throw new Error (error);                
            }
        })
        );


    passport.use("jwt", 
    new JWTStrategy(jwtOptions, async (jwt_payload,done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error);
        }
    })
    );
    //sigue en sessions.router

    passport.use( "githubLogin" ,
        new GitHubStrategy({clientID, clientSecret, callbackURL}, 
        async (accessToken, refreshToken, profile, done)=>{
            try {
                console.log(profile);

                let user = await userModel.findOne({email: profile._json.email})
                
                if (!user){
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile._json.email,
                        age: 18,
                        password: "",
                    }
                    let result = await userModel.create(newUser)
                    return done(null, result);
                }

                return done(null,user);
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
