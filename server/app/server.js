// ==========================
// get the packages we need =
// ==========================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
// get our models
const Message = require('./models/message');
const User = require('./models/user');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================

// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function (req, res) {

    // create a sample user
    var meUser = new User({
        name: 'Sadri FERTANI',
        email: 'sadri.fertani@live.fr',
        password: 'sfMotDePasse',
        admin: true
    });

    // save the sample user
    meUser.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// Route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', async function (req, res) {
    // find the user
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(
                    payload,
                    app.get('superSecret'),
                    {
                        algorithm: 'HS256',
                        expiresIn: 606024 * 30 * 1 // expires in 1 day
                    }
                );
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: user
                });
            }
        }
    });
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//user/sendmsg
apiRoutes.post('/user/sendmsg', async function (req, res) {

    const msg = new Message({
        _idSender: mongoose.Types.ObjectId(req.body._idSender),
        sender: req.body.sender,
        _idTarget: mongoose.Types.ObjectId(req.body._idTarget),
        target: req.body.target,
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
        readed: req.body.readed
    });

    // Erreur : TypeError: res.json is not a function
    // User.findByIdAndUpdate(
    //     req.body._idSender,
    //     { $push: { 'messages.out': msg } },
    //     {
    //         "new": true,
    //         "upsert": false
    //     },
    //     function (err, res) {
    //         if (err) {
    //             res.json({ success: false });
    //         } else {
    //             res.json({ success: true });
    //         }
    //     }
    // );


    User.findById(req.body._idSender, (err, sender) => {
        if (err) throw err;

        sender.messages.out.push(msg);
        sender.save();

        User.findById(req.body._idTarget, (err, target) => {
            if (err) throw err;

            target.messages.in.push(msg);
            target.save();

            res.json({ success: true });
        });
    });
})

// Add user in database
apiRoutes.post('/user/add', function (req, res) {
    // create a sample user
    var meUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin == 'true',
        messages: {
            in: [],
            out: []
        }
    });

    // save the sample user
    meUser.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// Route middleware to verify a token
apiRoutes.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

// Route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// Route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            return res.json({ success: false });
        } else {
            res.json(users);
        }
    });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);