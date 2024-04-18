const express = require("express");
const db = require("./db-config");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/user");
const session = require('express-session');

const PORT = process.env.PORT || 8000;

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log("Database connected");
});

// Configure session with a secret key
app.use(
    session({
        secret: '1234', // Set it to your secret key
        resave: false,
        saveUninitialized: true,
    })
);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the corrected cookie-parser middleware
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use('/static', express.static('public'));

// Include your routes
app.use('', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
