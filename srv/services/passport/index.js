const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const FileStore = require('session-file-store')(session);

const ServiceAbstract = require('@laboralphy/ws-service/abstract');
const CONFIG = require('../../config');

const UserManager = require('../../user-mgr');

const {getProjectFQN} = require('../../get-project-fqn');
const {getUserAuth} = require('../../get-user-auth');

/**
 * @extends ServiceAbstract
 */
class Service extends ServiceAbstract {

    init() {
        this.oUserManager = new UserManager();
        this.oUserManager.vaultPath = CONFIG.getVariable('vault_path');
    }

    registerRoutes(application, express) {
        super.registerRoutes(application, express);
        const app = application;
        const fileStoreOptions = {
            path: getProjectFQN(process.env.SESSION_PATH),
            ttl: 3600 * 24
        };

        // What passport.js strategy should I use ?
        passport.use(new LocalStrategy(
            async (username, password, done) => {
                // from username/password
                // détermine client identity
                const u = await this.oUserManager.findUser(username, password);
                if (!!u) {
                      return done(null, u);
                } else {
                    return done(null, false, { message: 'incorrect username/password'});
                }
            }
        ));

        // copy-paste from official doc...
        // when passport asks for a serialization we provide a user.id
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        // retrieve user instance from id
        passport.deserializeUser(async (id, done) => {
            try {
                const oUser = await this.oUserManager.getUserData(id);
                done(null, oUser);
            } catch (e) {
                done(null, false);
            }
        });

        // use sessions with file-store
        app.use(session({
            store: new FileStore(fileStoreOptions),
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false
        }));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(passport.initialize());
        app.use(passport.session());


        // ROUTES


        // login
        // this route will try to authenticate a username/password
        app.post('/login',
            passport.authenticate('local'),
            (req, res) => {
                // If this function gets called, authentication was successful.
                // `req.user` contains the authenticated user.
                res.redirect('/');
            }
        );

        // user information
        // returns a visual representation of the connected user
        app.get('/user.json', (req, res) => {
            const oUser = getUserAuth(req);
            if (!!oUser) {
                return res.json({
                    auth: true,
                    name: oUser.name,
                    date: oUser["date-creation"]
                });
            } else {
                return res.json({
                    auth: false
                });
            }
        });

        app.post('/user', async (req, res) => {
            try {
                const username = req.body.username;
                const password = req.body.password;
                await this.oUserManager.createUser(username, password);
                res.redirect('/#/createuser/success');
            } catch (e) {
                console.error(e);
                return res.json({
                    status: 'error',
                    error: 'could not create user : ' + e.message
                });
            }
        });

        // logout
        // the user is being logged out
        app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

    }
}

module.exports = Service;
