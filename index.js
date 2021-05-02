const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const genuuid = require('uuid').v4;
const passportLocalMongoose = require('passport-local-mongoose');
const mongoStore = require('connect-mongo')(session)
const morgan = require('morgan');
const ejs = require('ejs');
const app = express();

//--------Include models------//
const Post = require('./models/post');
const Comment = require('./models/comment');
const User = require('./models/user');

//====Include routes===//
const authRoute = require('./routes/auth'),
    blogsRoute = require('./routes/post'),
    commentRoute = require('./routes/comments'),
    activityRoute = require('./routes/activity');

    //=====Include Controllers====//
    const postController = require('./controllers/postController');
    const authController = require('./controllers/authController');

//-----Packages Configure-------//

//----connect to mongodb database----//
//mongoose.connect("mongodb://localhost/blogging", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const uri = "mongodb+srv://dbRabiu:BcRBspini4nF3EKz@cluster0.knb36.mongodb.net/recolon_db?retryWrites=true&w=majority";
    const connectionParams = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    mongoose.connect(uri, connectionParams)
    .then(()=>{
        console.log('Connected to mongo atlas cluster')
    })
    .catch((err) =>{
      console.log(err)
      throw new Error;
    })

//set up Node environment variable for development
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

app.set('port', PORT);
app.set('env', NODE_ENV);

//-----other packages configure----//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1)
app.use(express.static(__dirname + '/public'));


//===Passport authentication library config starts===//

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
    //function to call to generate ID
    //to use as session ID. Provide a function
    //to call to return a string of ID to use as session ID
    genid: (req)=>{
        return genuuid();
    },
    secret: 'recolon',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//====Use the routes===//
app.use(authRoute);
app.use(blogsRoute);
app.use(commentRoute);
app.use(activityRoute);

//handle errors - MIDDLEWARE
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} Not Found`);
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

//server port
app.listen(PORT, () => {
    console.log(
      `Express Server started on Port ${app.get(
        'port'
      )} | Environment : ${app.get('env')}`
    );
  });
