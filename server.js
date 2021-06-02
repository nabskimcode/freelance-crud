const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// // parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(bodyparser.json());

// Sanitize data prevent nosql injection
app.use(mongoSanitize());

// // Rate limiting when making request to api
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100, //request limit
});

app.use(limiter);

// Set security headers prevent cross-site scripting attacks and other cross-site injection
// app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
// Prevent XSS attacks (cross site scripting)
app.use(xss());

// Enable CORS - Cross-origin resource sharing
app.use(cors());

// set view engine
app.set('view engine', 'ejs');
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
