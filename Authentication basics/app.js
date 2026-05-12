const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const pgSession = require("connect-pg-simple")(session);

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const pool = new Pool({
    user,
    host,
    database: dbName,
    password: password,
    port: port,
}); 

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
    }),
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index", { user: req.user, posts, authors });
});

app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", 
      [ req.body.username, hashedPassword, ]);
      console.log(req.body.username, req.body.password);
      console.log(req.body.username, hashedPassword);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Setting up the local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
      // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

// sessions and serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    done(null, user);
  } catch(err) {
    done(err);
  }
});


app.post(
  "/log-in",
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" }),
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}); 