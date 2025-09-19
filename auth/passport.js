const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const db = require("../prismaClient") //db goes here
const bcrypt = require("bcryptjs");

//fix DB and variables

const loginApp = passport => {
    passport.use(
        
        new LocalStrategy(async (email, password, done) => {
          try {
            //const { rows } = // await pool.query("SELECT * FROM signups WHERE email = $1", [email]);
            const { rows } = await db.author.findUnique({
                "where": {
                    "email": email
                }
            })
            const user = rows[0];
            console.log(user)
      
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            //if (user.password !== password) {
            if(!match) {
              return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
          } catch(err) {
            return done(err);
          }
        })
      );

       passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          //const { rows } = await pool.query("SELECT * FROM signups WHERE id = $1", [id]);
          const { rows } = await db.author.findMany({
            "where": {
                "id": id
            }
          })
          const user = rows[0];
      
          done(null, user);
        } catch(err) {
          done(err);
        }
      });
    }
    
    
    module.exports = {
      loginApp,
    };