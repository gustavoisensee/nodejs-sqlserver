const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const morgan  = require('morgan');
const http    = require('http');
const path    = require('path');
const app     = express();
const port    = (process.env.PORT || 3000);
const route   = require('./app/routes/main');

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({
  secret: 'gustavoisensee',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cookieParser('gustavoisensee'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(route);

http.createServer(app).listen(port);