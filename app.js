const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');

const cookieParser = require('./middlewares').cookieParser;
const queryParser = require('./middlewares').queryParser;
const routes = require('./routes');

const app = express();

app.engine('html', ejs.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(cookieParser());
app.use(queryParser());
app.use(bodyParser());
// session is used only for twitter-auth
app.use(
  session({ secret: 'session-secret', resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes.meta);
app.use('/api', routes.products);
app.use('/api', routes.users);
app.use('/api', routes.auth);
app.use('/api/login', routes.login);
app.use('/', routes.static);

module.exports = app;
