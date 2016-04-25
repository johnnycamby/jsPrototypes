
'use strict';

var fs = require('fs')
, http = require('http')
, https = require('https')
, express = require('express')
, bodyparser = require('body-parser')
, methodoverride = require('method-override')
, cookieParser = require('cookie-parser')
, session = require('express-session')
, compress = require('compression')
, morgan = require('morgan')
, passport = require('passport')
, lusca = require('lusca')
, helmet = require('helmet')
, flash = require('connect-flash')
, favicon = require('serve-favicon')
, consolidate = require('consolidate')
, mongoStore = require('connect-mongo')({
        session: session
    })
, config = require('./config')
, path = require('path');

// Setup local variables
module.exports.initLocals = function (app) {
    
    // application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    
    if (config.secure && config.secure.ssl === true) {
        app.locals.secure = config.secure.ssl;
    }
    
    app.locals.keywords = config.app.keywords;
    app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
    app.locals.livereload = config.livereload;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;
    
    // Passing the requested url to environment locals
    app.use(function (req, res, next) {
        res.locals.url = req.protocal + '://' + req.hostname;
        res.locals.url = req.protocal + '://' + req.headers.host + req.originalUrl;
        next();
    });
};

// Setup application middleware
module.exports.initMiddleware = function (app) {
    
    // Display stack errors
    app.set('showStackError', true);
    
    // Enable jsonp
    app.enable('jsonp callback');
    
    // Place this before express.static
    app.use(compress({
        filter : function (req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    
    // Initialize favicon middleware
    app.use(favicon(app.locals.favicon));
    
    // Enable logger --- morgan ---
    app.use(morgan(logger.getFormat(), logger.getOptions()));
    
    //Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        
        // disable views cache
        app.set('view cache', false);

    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }
    
    // Request body parsing middleware should be above methodOverride
    app.use(bodyparser.urlencoded({
        extended: true
    }));
    app.use(bodyparser.json());
    app.use(methodoverride());
    
    // Cookie Parser should be above session
    app.use(cookieParser());
    // Connect flash for flash messages
    app.use(flash());
};

// Setup view engine
module.exports.initViewEngine = function (app) {
    
    // Set 'swig' as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);
    
    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
};

// Setup Express session
module.exports.initSession = function (app, db) {
    
    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionCookie.maxAge,
            httpOnly: config.sessionCookie.httpOnly,
            secure: config.sessionCookie.secure && config.secure.ssl
        },
        key: config.sessionKey,
        store: new mongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        })
    }));
    
    // Add Lusca CSRF Middleware
    app.use(lusca(config.csrf));
};

// Callup server configuration modules
module.exports.initModulesConfiguration = function (app, db) {
    
    config.files.server.configs.forEach(function (configPath) {
        require(path.resolve(configPath))(app, db);
    });
};

// Setup Helmet headers configurations
module.exports.initHelmetHeaders = function (app) {
    
    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
};

// Setup static route modules
module.exports.initModulesClientRoutes = function (app) {
    
    // Setting the app router and static folder
    app.use('/', express.static(path.resolve('./public')));
    
    // Globbing static routing 
    config.folders.client.forEach(function (routePath) {
        require(routePath, express.static(path.resolve('./' + routePath)));
    });
};

// Setup ACL policies modules
module.exports.initModulesServerPolicies = function (app) { 

    // Globbing policy files 
    config.files.server.policies.forEach(function (policyPath) {
        require(path.resolve(policyPath)).invokeRolesPolicies();
    });
};

// Setup server routes modules
module.exports.initModulesServerRoutes = function (app) {
    
    // Globbing routing files
    config.files.server.routes.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
};

// Setup error handling
module.exports.initErrorRoutes = function (app) { 

    app.use(function (err, req, res, next) {
        
        // if error object doesn't exist
        if (!err)
            return next();
        
        // log it
        console.error(err.stack);
        
        // Error page
        //res.status(500).render('500', {
        //    error: err.stack
        //});
        res.redirect('/server-error');
    });
};

// Setup Socket.io
module.exports.setupSocketIO = function (app, db) { 

    // Load the Socket.io configuration
    var server = require('./socket.io')(app, db);

    // Return server object
    return server;
};

// Startup the Express application
module.exports.init = function (db) {
    
    // Initialize express app
    var app = express();

    // Initialize local variables
    this.initLocals(app);

    // Initialize Express middleware
    this.initMiddleware(app)
    // Initialize Express view engine
    this.initViewEngine(app);
    // Initialize Helmet security headers
    this.initHelmetHeaders(app);
    // Initialize static client routes modules, before session!
    this.initModulesClientRoutes(app);
    // Initialize Express session
    this.initSession(app, db);
    // Initialize configuration Modules
    this.initModulesConfiguration(app);
    // Initialize server authorization policies Modules
    this.initModulesServerPolicies(app);
    // Initialize server routes Modules
    this.initModulesServerRoutes(app);
    // Initialize error routes
    this.initErrorRoutes(app);

    // Configure Socket.io
    app = this.setupSocketIO(app, db);

    return app;

};