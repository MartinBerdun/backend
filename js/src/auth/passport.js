import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/user.model.js";
import { createHash,isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2"
import config from "../config.js";

const {clientID , clientSecret , callbackURL} = config

const LocalStrategy = local.Strategy;

const initializePassport = () => { //definimos los middlewares, los escenaruios a cubrir
    passport.use(
        "register",
        new LocalStrategy( {passReqToCallback : true, usernameField: "email"}, async (req,username, password, done) => {
            try {
                const {first_name, last_name, email, age} = req.body;

                let user = await userModel.findOne({email:username});
                
                if (user) {
                    return done(null, false);
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }

                const result = await userModel.create(newUser);
                return done(null, result);

            } catch (error) {
                return done("Error on trying find user");
            }
        })
        //passreqToCallback es para utilizar en el callback el objeto req, usernameField el username en el callback sera utilizado como email, porqu passporrt por defecto recibe un usuario y una contraseña, en vez de ser un usuario le estamos diciendo que el username lo tome como un email.
        // done se utiliza para arrojar la respuesta en passport
        );

    passport.use("login", new LocalStrategy({usernameField:"email"}, async (username, password, done) =>{
        try {
            const user = await userModel.findOne({email:username}).lean()

            if(!user) return done(null, false);
        
            if (!isValidPassword(user, password)) return done(null, false);

            delete user.password;
            
            return done(null, user);

        } catch (error) {
            console.log(error);
        }
    }));

    passport.use( 
        "githubLogin" ,
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
    }); //

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });

}

export default initializePassport;
