require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(3);
  
  var _path = __webpack_require__(4);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(5);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(6);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(7);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(8);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(9);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(10);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(11);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _prettyError = __webpack_require__(12);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(13);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _schema = __webpack_require__(20);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(50);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(159);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(19);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var server = global.server = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  server.use((0, _cookieParser2.default)());
  server.use(_bodyParser2.default.urlencoded({ extended: true }));
  server.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  server.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  server.use(_passport2.default.initialize());
  
  server.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  server.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("production") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var statusCode, template, data, css, context;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        statusCode = 200;
                        template = __webpack_require__(160);
                        data = { title: '', description: '', css: '', body: '', entry: _assets2.default.main.js };
  
  
                        if (true) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        css = [];
                        context = {
                          insertCss: function insertCss(styles) {
                            return css.push(styles._getCss());
                          },
                          onSetTitle: function onSetTitle(value) {
                            return data.title = value;
                          },
                          onSetMeta: function onSetMeta(key, value) {
                            return data[key] = value;
                          },
                          onPageNotFound: function onPageNotFound() {
                            return statusCode = 404;
                          }
                        };
                        _context.next = 8;
                        return _routes2.default.dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                          data.body = _server2.default.renderToString(component);
                          data.css = css.join('');
                        });
  
                      case 8:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
    return function (_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  server.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(162);
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  true ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(14);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(15);
  
  var _db = __webpack_require__(16);
  
  var _db2 = _interopRequireDefault(_db);
  
  var _config = __webpack_require__(19);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var loginName = 'facebook';
    _db2.default.connect(function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
        var query = _ref.query;
  
        var result, _result, userId;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 24;
                  break;
                }
  
                _context.next = 3;
                return query('SELECT 1 FROM user_login WHERE name = $1 AND key = $2', loginName, profile.id);
  
              case 3:
                result = _context.sent;
  
                if (!result.rowCount) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 22;
                break;
  
              case 8:
                _context.next = 10;
                return query('\n          INSERT INTO user_account (id, email) SELECT $1, $2::character\n            WHERE NOT EXISTS (SELECT 1 FROM user_account WHERE id = $1);', req.user.id, profile._json.email);
  
              case 10:
                _context.next = 12;
                return query('\n          INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2);', req.user.id, profile.id);
  
              case 12:
                _context.next = 14;
                return query('\n          INSERT INTO user_claim (user_id, type, value) VALUES\n            ($1, \'urn:facebook:access_token\', $3);', req.user.id, profile.id);
  
              case 14:
                _context.next = 16;
                return query('\n          INSERT INTO user_profile (user_id) SELECT $1\n            WHERE NOT EXISTS (SELECT 1 FROM user_profile WHERE user_id = $1);', req.user.id);
  
              case 16:
                _context.next = 18;
                return query('\n          UPDATE user_profile SET\n            display_name = COALESCE(NULLIF(display_name, \'\'), $2),\n            gender       = COALESCE(NULLIF(gender, \'\'), $3),\n            picture      = COALESCE(NULLIF(picture, \'\'), $4),\n          WHERE user_id = $1;', req.user.id, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 18:
                _context.next = 20;
                return query('\n          SELECT id, email FROM user_account WHERE id = $1;', req.user.id);
  
              case 20:
                result = _context.sent;
  
                done(null, result.rows[0]);
  
              case 22:
                _context.next = 52;
                break;
  
              case 24:
                _context.next = 26;
                return query('\n        SELECT u.id, u.email FROM user_account AS u\n          LEFT JOIN user_login AS l ON l.user_id = u.id\n        WHERE l.name = $1 AND l.key = $2', loginName, profile.id);
  
              case 26:
                _result = _context.sent;
  
                if (!_result.rowCount) {
                  _context.next = 31;
                  break;
                }
  
                done(null, _result.rows[0]);
                _context.next = 52;
                break;
  
              case 31:
                _context.next = 33;
                return query('SELECT 1 FROM user_account WHERE email = $1', profile._json.email);
  
              case 33:
                _result = _context.sent;
  
                if (!_result.rowCount) {
                  _context.next = 38;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 52;
                break;
  
              case 38:
                _context.next = 40;
                return query('\n            INSERT INTO user_account (email) VALUES ($1) RETURNING (id)', profile._json.email);
  
              case 40:
                _result = _context.sent;
                userId = _result.rows[0].id;
                _context.next = 44;
                return query('\n            INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2)', userId, profile.id);
  
              case 44:
                _context.next = 46;
                return query('\n            INSERT INTO user_claim (user_id, type, value) VALUES\n              ($1, \'urn:facebook:access_token\', $2);', userId, accessToken);
  
              case 46:
                _context.next = 48;
                return query('\n            INSERT INTO user_profile (user_id, display_name, gender, picture)\n            VALUES ($1, $2, $3, $4);', userId, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 48:
                _context.next = 50;
                return query('SELECT id, email FROM user_account WHERE id = $1;', userId);
  
              case 50:
                _result = _context.sent;
  
                done(null, _result.rows[0]);
  
              case 52:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
      return function (_x) {
        return ref.apply(this, arguments);
      };
    }()).catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _pg = __webpack_require__(17);
  
  var _pg2 = _interopRequireDefault(_pg);
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _config = __webpack_require__(19);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // TODO: Customize database connection settings
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  _pg2.default.defaults.ssl = true; /**
                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                     *
                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                     *
                                     * This source code is licensed under the MIT license found in the
                                     * LICENSE.txt file in the root directory of this source tree.
                                     */
  
  _pg2.default.defaults.poolSize = 2;
  _pg2.default.defaults.application_name = 'RSK';
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  
  /**
   * Promise-based wrapper for pg.Client
   * https://github.com/brianc/node-postgres/wiki/Client
   */
  function AsyncClient(client) {
    this.client = client;
    this.query = this.query.bind(this);
    this.end = this.end.bind(this);
  }
  
  AsyncClient.prototype.query = function query(sql) {
    var _this = this;
  
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
  
    return new _bluebird2.default(function (resolve, reject) {
      if (args.length) {
        _this.client.query(sql, args, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } else {
        _this.client.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  };
  
  AsyncClient.prototype.end = function end() {
    this.client.end();
  };
  
  /**
   * Promise-based wrapper for pg.connect()
   * https://github.com/brianc/node-postgres/wiki/pg
   */
  _pg2.default.connect = function (connect) {
    return function (callback) {
      return new _bluebird2.default(function (resolve, reject) {
        connect.call(_pg2.default, _config.databaseUrl, function (err, client, done) {
          if (err) {
            if (client) {
              done(client);
            }
  
            reject(err);
          } else {
            callback(new AsyncClient(client)).then(function () {
              done();
              resolve();
            }).catch(function (error) {
              done(client);
              reject(error);
            });
          }
        });
      });
    };
  }(_pg2.default.connect);
  
  exports.default = _pg2.default;

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("pg");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 19 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  /* jscs:disable maximumLineLength */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'postgresql://demo:Lqk62xg6TBm5UhfR@demo.ctbl5itzitm4.us-east-1.rds.amazonaws.com:5432/membership01';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _me = __webpack_require__(22);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(24);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(32);
  
  var _news2 = _interopRequireDefault(_news);
  
  var _strategy = __webpack_require__(36);
  
  var _strategy2 = _interopRequireDefault(_strategy);
  
  var _topic = __webpack_require__(44);
  
  var _topic2 = _interopRequireDefault(_topic);
  
  var _event = __webpack_require__(46);
  
  var _event2 = _interopRequireDefault(_event);
  
  var _photo = __webpack_require__(49);
  
  var _photo2 = _interopRequireDefault(_photo);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default,
        strategy: _strategy2.default,
        topic: _topic2.default,
        photo: _photo2.default,
        event: _event2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      userId: { type: _graphql.GraphQLString },
      email: { type: _graphql.GraphQLString },
      avatar: { type: _graphql.GraphQLString },
      nickname: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(25);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(26);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return function resolveExtension(_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.jade', '.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
    return function resolveFileName(_x3) {
      return ref.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(27);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(4);
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(28);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(29);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(30);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(21);
  
  var _ContentType = __webpack_require__(31);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var md = new _markdownIt2.default();
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.jade':
        htmlContent = _jade2.default.render(fmContent.body);
        break;
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    var smth = (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
    return smth;
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var _this = this;
  
      var request = _ref.request;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref3, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref3 = _context3.sent;
                success = _ref3.success;
                fileName = _ref3.fileName;
                extension = _ref3.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(35);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(34);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(19);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _StrategyType = __webpack_require__(37);
  
  var _StrategyType2 = _interopRequireDefault(_StrategyType);
  
  var _graphql = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(43).config();
  // React.js News Feed (RSS)
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var baseUrl = 'http://www.iyuanzi.net' || 'http://test.iyuanzi.com';
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  var strategy = {
    type: _StrategyType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/strategies/' + path + '?version=v2').then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = strategy;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _PhotoType = __webpack_require__(38);
  
  var _PhotoType2 = _interopRequireDefault(_PhotoType);
  
  var _CommentType = __webpack_require__(39);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _MaterialType = __webpack_require__(40);
  
  var _MaterialType2 = _interopRequireDefault(_MaterialType);
  
  var _ToolsType = __webpack_require__(41);
  
  var _ToolsType2 = _interopRequireDefault(_ToolsType);
  
  var _StepsType = __webpack_require__(42);
  
  var _StepsType2 = _interopRequireDefault(_StepsType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var StrategyType = new _graphql.GraphQLObjectType({
    name: 'Strategy',
    fields: {
      owner: { type: _UserType2.default },
      title: { type: _graphql.GraphQLString },
      subTitle: { type: _graphql.GraphQLString },
      collectCount: { type: _graphql.GraphQLString },
      soundStory: { type: _graphql.GraphQLString },
      tryCount: { type: _graphql.GraphQLString },
      score: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString },
      cover: { type: _graphql.GraphQLString },
      photoCount: { type: _graphql.GraphQLInt },
      photos: { type: new _graphql.GraphQLList(_PhotoType2.default) },
      comments: { type: new _graphql.GraphQLList(_CommentType2.default) },
      materials: { type: new _graphql.GraphQLList(_MaterialType2.default) },
      tools: { type: new _graphql.GraphQLList(_ToolsType2.default) },
      steps: { type: new _graphql.GraphQLList(_StepsType2.default) },
      scope: { type: _graphql.GraphQLInt },
      consumingTime: { type: _graphql.GraphQLInt },
      degree: { type: _graphql.GraphQLInt },
      strategyId: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = StrategyType;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _CommentType = __webpack_require__(39);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var PhotoContentType = new _graphql.GraphQLObjectType({
    name: 'PhotoContent',
    fields: {
      img: { type: _graphql.GraphQLString },
      desc: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  var PhotoType = new _graphql.GraphQLObjectType({
    name: 'Photo',
    fields: {
      owner: { type: _UserType2.default },
      strategy: { type: _graphql.GraphQLString },
      photoId: { type: _graphql.GraphQLString },
      content: { type: new _graphql.GraphQLList(PhotoContentType) },
      praiseCount: { type: _graphql.GraphQLString },
      comments: { type: new _graphql.GraphQLList(_CommentType2.default) },
      createdAt: { type: _graphql.GraphQLString }
    }
  });
  
  exports.default = PhotoType;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var CommentType = new _graphql.GraphQLObjectType({
    name: 'Comment',
    fields: {
      commentUser: { type: _UserType2.default },
      content: { type: _graphql.GraphQLString },
      createdAt: { type: _graphql.GraphQLString },
      commentId: { type: _graphql.GraphQLString },
      images: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
    }
  });
  
  exports.default = CommentType;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var MaterialType = new _graphql.GraphQLObjectType({
    name: 'Material',
    fields: {
      amount: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString }
    }
  });
  exports.default = MaterialType;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var ToolsType = new _graphql.GraphQLObjectType({
    name: 'Tool',
    fields: {
      amount: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString }
    }
  });
  exports.default = ToolsType;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var StepsType = new _graphql.GraphQLObjectType({
    name: 'Step',
    fields: {
      _id: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString },
      imgUrl: { type: _graphql.GraphQLString },
      stepId: { type: _graphql.GraphQLString },
      timePoint: { type: _graphql.GraphQLString }
    }
  });
  
  exports.default = StepsType;

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("dotenv");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _TopicType = __webpack_require__(45);
  
  var _TopicType2 = _interopRequireDefault(_TopicType);
  
  var _graphql = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(43).config();
  // React.js News Feed (RSS)
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var baseUrl = process.env.URL_PRODUCTION || 'http://test.iyuanzi.com';
  
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  var topic = {
    type: _TopicType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/topics/' + path + '?version=v2').then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = topic;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _StrategyType = __webpack_require__(37);
  
  var _StrategyType2 = _interopRequireDefault(_StrategyType);
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var TopicType = new _graphql.GraphQLObjectType({
    name: 'Topic',
    fields: {
      owner: { type: _UserType2.default },
      title: { type: _graphql.GraphQLString },
      subTitle: { type: _graphql.GraphQLString },
      cover: { type: _graphql.GraphQLString },
      strategies: { type: new _graphql.GraphQLList(_StrategyType2.default) },
      viewCount: { type: _graphql.GraphQLInt },
      collectCount: { type: _graphql.GraphQLInt },
      content: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = TopicType;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _EventType = __webpack_require__(47);
  
  var _EventType2 = _interopRequireDefault(_EventType);
  
  var _graphql = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(43).config();
  // React.js News Feed (RSS)
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var baseUrl = process.env.URL_PRODUCTION || 'http://test.iyuanzi.com';
  
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  var topic = {
    type: _EventType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/events/' + path + '?version=v2').then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = topic;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _CommentType = __webpack_require__(39);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _ParticipantType = __webpack_require__(48);
  
  var _ParticipantType2 = _interopRequireDefault(_ParticipantType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var EventType = new _graphql.GraphQLObjectType({
    name: 'Event',
    fields: {
      owner: { type: _UserType2.default },
      title: { type: _graphql.GraphQLString },
      content: { type: _graphql.GraphQLString },
      number: { type: _graphql.GraphQLString },
      price: { type: _graphql.GraphQLString },
      participantCount: { type: new _graphql.GraphQLList(_UserType2.default) },
      cover: { type: _graphql.GraphQLString },
      comments: { type: new _graphql.GraphQLList(_CommentType2.default) },
      startDate: { type: _graphql.GraphQLString },
      endDate: { type: _graphql.GraphQLString },
      location: { type: _graphql.GraphQLString },
      enrollCount: { type: _graphql.GraphQLInt },
      participants: { type: new _graphql.GraphQLList(_ParticipantType2.default) }
    }
  });
  
  exports.default = EventType;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(21);
  
  var _UserType = __webpack_require__(23);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ParticipantType = new _graphql.GraphQLObjectType({
    name: 'Participant',
    fields: {
      participant: { type: _UserType2.default }
    }
  });
  
  exports.default = ParticipantType;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _PhotoType = __webpack_require__(38);
  
  var _PhotoType2 = _interopRequireDefault(_PhotoType);
  
  var _graphql = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(43).config();
  // React.js News Feed (RSS)
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var baseUrl = process.env.URL_PRODUCTION || 'http://test.iyuanzi.com';
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  var topic = {
    type: _PhotoType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/photos/' + path + '?version=v2').then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = topic;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Router = __webpack_require__(52);
  
  var _Router2 = _interopRequireDefault(_Router);
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _App = __webpack_require__(76);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ContentPage = __webpack_require__(111);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  var _NotFoundPage = __webpack_require__(114);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _ErrorPage = __webpack_require__(117);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var routes = [__webpack_require__(120), __webpack_require__(124), __webpack_require__(128), __webpack_require__(132), __webpack_require__(145), __webpack_require__(149), __webpack_require__(155)]; /**
                                                                                                                                                                                                                       * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                                                                                                       *
                                                                                                                                                                                                                       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                                                                                                       *
                                                                                                                                                                                                                       * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                       * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                                                                                       */
  
  var router = new _Router2.default(function (on) {
    on('*', function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state, next) {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
                return _context.abrupt('return', component && _react2.default.createElement(
                  _App2.default,
                  { context: state.context },
                  component
                ));
  
              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
      return function (_x, _x2) {
        return ref.apply(this, arguments);
      };
    }());
  
    routes.forEach(function (route) {
      on(route.path, route.action);
    });
  
    on('*', function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(state) {
        var query, response, _ref, data;
  
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = '/graphql?query={content(path:"' + state.path + '"){path,title,content,component}}';
                _context2.next = 3;
                return (0, _fetch2.default)(query);
  
              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();
  
              case 6:
                _ref = _context2.sent;
                data = _ref.data;
                return _context2.abrupt('return', data && data.content && _react2.default.createElement(_ContentPage2.default, data.content));
  
              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));
      return function (_x3) {
        return ref.apply(this, arguments);
      };
    }());
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_NotFoundPage2.default, null)
      ) : _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_ErrorPage2.default, null)
      );
    });
  });
  
  exports.default = router;

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray2 = __webpack_require__(53);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _regenerator = __webpack_require__(55);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _getIterator2 = __webpack_require__(64);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _asyncToGenerator2 = __webpack_require__(66);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _create = __webpack_require__(67);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(69);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(70);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _Route = __webpack_require__(72);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var emptyFunction = function emptyFunction() {}; /**
                                                    * React Routing | http://www.kriasoft.com/react-routing
                                                    * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
                                                    */
  
  var Router = function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      (0, _classCallCheck3.default)(this, Router);
  
      this.routes = [];
      this.events = (0, _create2.default)(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
  
    (0, _createClass3.default)(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2.default(path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(state, cb) {
          var next = function () {
            var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
              var _handlers$next;
  
              var _value, _value2, match, handler;
  
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        _context2.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = (0, _slicedToArray3.default)(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        _context2.next = 12;
                        break;
                      }
  
                      _context2.next = 9;
                      return handler(state, next);
  
                    case 9:
                      _context2.t0 = _context2.sent;
                      _context2.next = 15;
                      break;
  
                    case 12:
                      _context2.next = 14;
                      return handler(state);
  
                    case 14:
                      _context2.t0 = _context2.sent;
  
                    case 15:
                      return _context2.abrupt('return', _context2.t0);
  
                    case 16:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
            return function next() {
              return ref.apply(this, arguments);
            };
          }();
  
          var routes, handlers, value, result, done;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (typeof state === 'string' || state instanceof String) {
                    state = { path: state };
                  }
                  cb = cb || emptyFunction;
                  routes = this.routes;
                  handlers = _regenerator2.default.mark(function _callee() {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)(routes);
  
                          case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 38;
                              break;
                            }
  
                            route = _step.value;
                            match = route.match(state.path);
  
                            if (!match) {
                              _context.next = 35;
                              break;
                            }
  
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context.prev = 12;
                            _iterator2 = (0, _getIterator3.default)(match.route.handlers);
  
                          case 14:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                              _context.next = 21;
                              break;
                            }
  
                            handler = _step2.value;
                            _context.next = 18;
                            return [match, handler];
  
                          case 18:
                            _iteratorNormalCompletion2 = true;
                            _context.next = 14;
                            break;
  
                          case 21:
                            _context.next = 27;
                            break;
  
                          case 23:
                            _context.prev = 23;
                            _context.t0 = _context['catch'](12);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context.t0;
  
                          case 27:
                            _context.prev = 27;
                            _context.prev = 28;
  
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                              _iterator2.return();
                            }
  
                          case 30:
                            _context.prev = 30;
  
                            if (!_didIteratorError2) {
                              _context.next = 33;
                              break;
                            }
  
                            throw _iteratorError2;
  
                          case 33:
                            return _context.finish(30);
  
                          case 34:
                            return _context.finish(27);
  
                          case 35:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;
  
                          case 38:
                            _context.next = 44;
                            break;
  
                          case 40:
                            _context.prev = 40;
                            _context.t1 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t1;
  
                          case 44:
                            _context.prev = 44;
                            _context.prev = 45;
  
                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }
  
                          case 47:
                            _context.prev = 47;
  
                            if (!_didIteratorError) {
                              _context.next = 50;
                              break;
                            }
  
                            throw _iteratorError;
  
                          case 50:
                            return _context.finish(47);
  
                          case 51:
                            return _context.finish(44);
  
                          case 52:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
                  })();
                  value = void 0, result = void 0, done = false;
  
                case 5:
                  if (done) {
                    _context3.next = 15;
                    break;
                  }
  
                  _context3.next = 8;
                  return next();
  
                case 8:
                  result = _context3.sent;
  
                  if (!result) {
                    _context3.next = 13;
                    break;
                  }
  
                  state.statusCode = typeof state.statusCode === 'number' ? state.statusCode : 200;
                  cb(state, result);
                  return _context3.abrupt('return');
  
                case 13:
                  _context3.next = 5;
                  break;
  
                case 15:
                  if (!this.events.error) {
                    _context3.next = 31;
                    break;
                  }
  
                  _context3.prev = 16;
  
                  state.statusCode = 404;
                  _context3.next = 20;
                  return this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.'));
  
                case 20:
                  result = _context3.sent;
  
                  cb(state, result);
                  _context3.next = 31;
                  break;
  
                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3['catch'](16);
  
                  state.statusCode = 500;
                  _context3.next = 29;
                  return this.events.error(state, _context3.t0);
  
                case 29:
                  result = _context3.sent;
  
                  cb(state, result);
  
                case 31:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[16, 24]]);
        }));
  
        function dispatch(_x, _x2) {
          return ref.apply(this, arguments);
        }
  
        return dispatch;
      }()
    }]);
    return Router;
  }();
  
  exports.default = Router;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _isIterable2 = __webpack_require__(54);
  
  var _isIterable3 = _interopRequireDefault(_isIterable2);
  
  var _getIterator2 = __webpack_require__(25);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
  
      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
  
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
  
      return _arr;
    }
  
    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

/***/ },
/* 54 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/is-iterable");

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g =
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this;
  
  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime = g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  
  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  
  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;
  
  module.exports = __webpack_require__(56);
  
  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch(e) {
      g.regeneratorRuntime = undefined;
    }
  }
  
  module.exports = { "default": module.exports, __esModule: true };


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {"use strict";
  
  var _promise = __webpack_require__(58);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _setPrototypeOf = __webpack_require__(59);
  
  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
  
  var _create = __webpack_require__(60);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _typeof2 = __webpack_require__(61);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _iterator = __webpack_require__(62);
  
  var _iterator2 = _interopRequireDefault(_iterator);
  
  var _symbol = __webpack_require__(63);
  
  var _symbol2 = _interopRequireDefault(_symbol);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !function (global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";
  
    var inModule = ( false ? "undefined" : (0, _typeof3.default)(module)) === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = (0, _create2.default)((outerFn || Generator).prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }
  
    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
  
    runtime.mark = function (genFun) {
      if (_setPrototypeOf2.default) {
        (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
      }
      genFun.prototype = (0, _create2.default)(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function (arg) {
      return new AwaitArgument(arg);
    };
  
    function AwaitArgument(arg) {
      this.arg = arg;
    }
  
    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          return result;
        });
      }
  
      if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }
  
      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;
  
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return invoke(method, arg);
        }
  
        return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
  
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            context._sent = arg;
  
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    Gp[iteratorSymbol] = function () {
      return this;
    };
  
    Gp.toString = function () {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    runtime.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function stop() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },
  
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  }(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  (typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)(module)))

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ },
/* 58 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/set-prototype-of");

/***/ },
/* 60 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/create");

/***/ },
/* 61 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 62 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol/iterator");

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/get-iterator");

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _promise = __webpack_require__(58);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new _promise2.default(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
  
          if (info.done) {
            resolve(value);
          } else {
            return _promise2.default.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }
  
        return step("next");
      });
    };
  };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/object/create");

/***/ },
/* 69 */
/***/ function(module, exports) {

  "use strict";
  
  exports.__esModule = true;
  
  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _defineProperty = __webpack_require__(71);
  
  var _defineProperty2 = _interopRequireDefault(_defineProperty);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/define-property");

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(69);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(70);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _pathToRegexp = __webpack_require__(73);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(75);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Route = function () {
    function Route(path, handlers) {
      (0, _classCallCheck3.default)(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2.default)(path, this.keys = []);
    }
  
    (0, _createClass3.default)(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2.default(this, path, this.keys, m) : null;
      }
    }]);
    return Route;
  }();
  
  exports.default = Route;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(74)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _create = __webpack_require__(67);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(69);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Match = function Match(route, path, keys, match) {
    (0, _classCallCheck3.default)(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = (0, _create2.default)(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports.default = Match;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(82);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(83);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(89);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(105);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(108);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          onSetTitle: context.onSetTitle || _emptyFunction2.default,
          onSetMeta: context.onSetMeta || _emptyFunction2.default,
          onPageNotFound: context.onPageNotFound || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
  
      //render() {
      //  return !this.props.error ? (
      //    <div>
      //      <Header />
      //      {this.props.children}
      //      <Feedback />
      //      <Footer />
      //    </div>
      //  ) : this.props.children;
      //}
  
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2.default.createElement(
          'div',
          { className: _App2.default.root },
          this.props.children,
          _react2.default.createElement(_Footer2.default, null)
        ) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      onSetTitle: _react.PropTypes.func,
      onSetMeta: _react.PropTypes.func,
      onPageNotFound: _react.PropTypes.func
    }),
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    onSetTitle: _react.PropTypes.func.isRequired,
    onSetMeta: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 79 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(84);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}body{margin:0}*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}p,ul{margin:0}a{color:#0074c2}._3yYg{margin:0 auto;width:100%;max-width:768px}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:' (' attr(href) ')'}abbr[title]:after{content:' (' attr(title) ')'}a[href^='#']:after,a[href^='javascript:']:after{content:''}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3yYg"
  };

/***/ },
/* 85 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(26);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(87);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(88);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(25);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(91);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(93);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(100);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header() {
    return _react2.default.createElement(
      'div',
      { className: _Header2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Header2.default.container },
        _react2.default.createElement(_Navigation2.default, { className: _Header2.default.nav }),
        _react2.default.createElement(
          _Link2.default,
          { className: _Header2.default.brand, to: '/' },
          _react2.default.createElement('img', { src: __webpack_require__(104), width: '38', height: '38', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Header2.default.brandTxt },
            'Your Company'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Header2.default.banner },
          _react2.default.createElement(
            'h1',
            { className: _Header2.default.bannerTitle },
            'React'
          ),
          _react2.default.createElement(
            'p',
            { className: _Header2.default.bannerDesc },
            'Complex web apps made easy'
          )
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(Header, _Header2.default);

/***/ },
/* 90 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(92);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, ".I-DI{background:#373277;color:#fff}._3vUf{margin:0 auto;padding:20px 0;max-width:768px}._2Fq7{color:#92e5fc;text-decoration:none;font-size:1.75em}._16t7{margin-left:10px}._99gq{float:right;margin-top:6px}._37r6{text-align:center}._3w2c{margin:0;padding:10px;font-weight:400;font-size:4em;line-height:1em}._1pLk{padding:0;color:hsla(0,0%,100%,.5);font-size:1.25em;margin:0}", ""]);
  
  // exports
  exports.locals = {
  	"root": "I-DI",
  	"container": "_3vUf",
  	"brand": "_2Fq7",
  	"brandTxt": "_16t7",
  	"nav": "_99gq",
  	"banner": "_37r6",
  	"bannerTitle": "_3w2c",
  	"bannerDesc": "_1pLk"
  };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(94);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(95);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Location = __webpack_require__(96);
  
  var _Location2 = _interopRequireDefault(_Location);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _Object$getPrototypeO;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Link)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _Location2.default.push(_this.props.to);
          } else {
            _Location2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _Location2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func
  };
  exports.default = Link;

/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 95 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(97);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(98);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(99);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var location = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                     *
                                                                                                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                     *
                                                                                                                                     * This source code is licensed under the MIT license found in the
                                                                                                                                     * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                     */
  
  exports.default = location;

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 98 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 99 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(101);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(102);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(93);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Navigation2.default.root, className), role: 'navigation' },
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/about' },
        'About'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/contact' },
        'Contact'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/login' },
        'Log in'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        'or'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/register' },
        'Sign up'
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Navigation.propTypes = {
    className: _react.PropTypes.string
  };
  
  exports.default = (0, _withStyles2.default)(Navigation, _Navigation2.default);

/***/ },
/* 101 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(103);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._2ayR{margin:0}._1WIn{display:inline-block;padding:3px 8px;text-decoration:none;font-size:1.125em}._1WIn,._1WIn:active,._1WIn:visited{color:hsla(0,0%,100%,.6)}._1uEN,._1WIn:hover{color:#fff}._1uEN{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15)}._1uEN:hover{background:rgba(0,0,0,.3)}.kvof{color:hsla(0,0%,100%,.3)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2ayR",
  	"link": "_1WIn",
  	"highlight": "_1uEN",
  	"spacer": "kvof"
  };

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACrRJREFUeNqcWAlQlFcSnosBhmFmBAaVG0RAEBQVUUh2jRKjiKJGEfFE8YisGkw066rrmd2o5bWaaIyaQuMRo/EAiRG8SojxwAMFEQWEkUMYkBlmmHtmu//9f+rtXzhFQlXXPN7r192vX/fX/X4+x/4fF4gHxAcSADnQvwJ6jksThxhz6TU+zU/u4RH8dv/43TCKMUhIkyP9y2cZx+Z3ZPGTh/nThpFKGOFOBAlp5Xyaj+1Vht+Z4O/KMNu7DBPYMZoxDJU4i739xe/96+BIB1epXFtf+7p4x9p7quoKLayZgUxAFuKw1PVJA0NcBn+2JcbFy8/H1K5qLvzHwmuauhoNbRwaZaWpS8+8y5NC+rSiPhPSfOM2f3NY4OwSzjBYLea3bRWlh36dl3hc39JkJBTwnNw9hR8dyZshC4nI4PEFPZg9Zp227Pb6pRkvzx+rhX87gPRARuJQdq+SuUZHmkSjD+duAk9Flh/fn1mweNJ2LpdbiB6UBvSdEzZ94QhQ+Kz58V30mnP47L/1HbX/7D5xb9/xHU0N1yt+PPTV1cwp2/lCx0J59LCpntGx3qVHdl+ljbHSHrd1x2Nc2lsYHyJZnzC3iZce33n7/En2heQhh0nXx67dNThk6ryNPAcHSVn23i04Fz5n6VqryaSu+OnI+jtbsorJ0JiY82C+rG/EnPPjBsS2VZa30l7T0V6zsePILkyEpMwP4PJ4opbShw/p0xlpMoHikivzxy0ztLUqIuYu34iEY5zDNTr2GH4zePUhygpJyQgkEof7rgB/l2GUcc4ePakY0b6pa6dPxQQtrgve3C/Uvzjz/UUun++I9PzHQxdwjk4cLs1L7etobkQZHGcPTxlhFPePZGUnSJp1HdSEk8xdyuKnsi8wMcU/Iv3TJR3NDdU4GZnxWWbbizJFdd5pDWEcpctR5ib53yHr9SwctOsxNspT+NV4v7ANFx1lPXrDjwtJrj4BkrhNX6+2mk3G/PlJ+5BwjHO4xuIXOcncUAZHWXJPQwC2oKtr5XWB2gw4Ur/VOafUoKxd7BOIUOEKJIPrlQeNnx764eFLWUKJzKfl6YPf+89fEYWEY5zDNeRBXtwDJBF7B/RDWbX5Fzro5HJkVYZOe9i1jTmFC22EBLBLOqWgfJfAWSTVKZsUzp69Ah1EYo/ulhaMLVOHRqlraqyG2PKF0FCdSQjLAohRwZoaCONOSyQJwoiFSxRYIVFyRKGpC/qGz14629UvKAEwCE/M6XhT97JdUV1lUL1V+Y1Mmqypr31y64t5Bw1tLUZNvQKFc8Revi6OMnfh+1uPLBR7+UXWXsv92VHaQ+rqGxgk6ukdjDwWo6GtvbaqoOzo3qPPT333ggBbBnDNfFZtE/mOTPIceyx/U9C4aeuEUpl/e01lUX1RQUGP0MiYF2ezT9/4NC0/In35MGd5T+9bK9O3wVqzvqXZaDUarEgwNkHZ0amrKyoCk1ISTJr2lkupfzkFRurlA2OHVOWc3A8HbZcEBI/0Gzl+Zmhqhr/61csHwG8is55PFFrR8PV7Bw/+/MtsBxfXUOWT4oNXP5m85eGeDYU1V87VAKK/J5L3loC3GsJnZabX3bpy9uHeTQ/wSoOSUv1j1+xIDJ40K8pqNmveVjxVq2tedsijYmy9Y0ckqaqe3wtJmTcSMMycOyV+D1SQm4pruWfcw6PbwMBJAWM+ngSyH72++UszAUdUYHoHjJ0ydM4znXLmo7fPgifOGgtz0UCDEOCBRo0+fCl7brnBlHKzqhR4Wpzc5HNhPjV62fptc5/pTekVJhsSjqOXb9iOa3Clc4C3GffgXpSBsmiZKDsadaFO1I02oC1oUyc8DMxcm8Ll8lxv/zNzJRTZRhq19XTJ0BXvWJPDsdksLr19wxVXc87oW5sxLmxhMxanArB24huOw9IWTcM1iD0d8P6Me2CvtXjXulxGHi3bhLpQJ+pGGxj46ExPoavE12LQ11VePNFM9EpWJktayh6pda1NL9C4h3s3/8bUNiG0Qew0JOZsFC/swb0AJSpGHlEROKgTdYMNPky28xgDdMo3pQAJ/tA/hbDQn8pav4RkL5FHr36AMPyhq7ePZjBH19xYzTZM19TAzPEoXtgDe8NQRhetOQd1om6woYyJLx7T6EHanwVsqQSQ3Dl8w76BdLZSHQb+Ri74PBnA0QCB/ZtXfEKyrG84lihO8c51P9CYxPRcquLd64+hUuQB3gm4B/o3Q9SiVcmkTNSBulAn6kYb6BBCmygmdyC/kKnp8TOKlXcgiC0pNypz+s1ckobBCnGTjEE84dzdm5DyWRCohqSfin7FAEeC8jMfWqDdSDhm5pEHeXEP7gUZSpSFMlE26kBdoPMu6kYbaFtEXKIkUJABqC5KPHkjHU67gCdwkEJ3Wgqg+gqEJwF07Hz09ZdlCQfOjfX9YNzE2xuXris/8W0l09SS9RcayCDwxhYA2HMAO5cHZq4Jh2xd0fzoTi6AbQB0uRFwAyoo+N/lTR/xPVSHDrKr5RL3TT46RNKgUI+Yv2+b4B4RPQbioz/GCQjSQxzUAIi+cQ8fGG9QtdaVnzx4wmY2WyFLNVQX4iYXcwUCHhiW5ih184GkKXRyl/eEmukPB3XCROhQNj6F/u7yva9WXQCMayEMMjBlqat3oJC+XglNrqlFit0AjkLoOp9AS+0PWecpcBF7QD/vZK9IQlzpzVqN0tiuaoJqUAPdcKTNajWcivfNIuqkmjbMSDxqLAI6Ky2sVwuPKejQKTiBF/q8KS46/cvMUSfIKxtzND+t97ARsxQ38k7XFlwsx0m/hAlhviMSUxp+v3Hs8uwP/49/7PFr03sOipsGMk1GdZueqI962ihGv43HwiymdTYwG+CFJMPOFAp4BX06FU3qgkUTj2sbX5d4xyeMh67BZtJqbDjGufyMpB/Y/PDse46yoB6LCB3M9ZlJbOOxHp82AgApIz0iB1NdJ7Q8DTRiM0GqgxTXQWBvA3BUx23clxm/+ZtMHFNzRoOOza9vVaIMjnzAUAn76gj9dnv+TgO5PD715oOs0RKIbaGFmiCIW0sObj/gIJZ4IOEY51gPYWoPyNBRlUEs4bPRv7s9P7PBqm1QoBKOxC/Ig04Q8jFigRbIa8Anq5dY9DqKD8fQ/rx+emRXC6s75tEyOLRMK9lJdPeV1FknS77dVg3Z1SYfEBtHwgqkvhCCeVLMqq3/sVnM2qK1i1cUrlmUBWPNkJX/3oNryEO2zh5RQ4ejLJBZxbrCbnmMTASzSdtu0NYrzgMozgBlNVCIK9z6DQj2iBryMYBxCAR63lV4nQNeUc8pVeWz9FEHzq3sFfP+F2n3myYrS+6faX32+KV7/0Eh4LGp7a9fHQeZTLC/8zrtfbtwYL7YyIL7uY3JvrLVWd4rkfkgYlS9vVt/+9qh68tSi4iM6vwY88Gek3FecaMyhNIescweKPh5+YuSV8PhlGTr09W3C66ddyX5SYnqcqEI+8mCwz0V1/Nq4d3YQgS4mfW1h+kg8N3p7vPXj/wA4ZvgCmuJHs9A7LX9EcPYb0zyicUhIMXUlceIL4l8IqHITwx2r5LfnecXK+7I7xFGAo/MREBbWIaTfORB3gkX3THMShhFKjN1cWobq7SZCTLZA9Q/YxjbaxbWr81OZlu74LV2R+F/BRgA2E9xgXp3xzgAAAAASUVORK5CYII="

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(106);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return _react2.default.createElement(
      'div',
      { className: _Feedback2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Feedback2.default.container },
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit'
          },
          'Ask a question'
        ),
        _react2.default.createElement(
          'span',
          { className: _Feedback2.default.spacer },
          '|'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
          },
          'Report an issue'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(Feedback, _Feedback2.default);

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(107);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._3IS_{background:#f5f5f5;color:#333}.GVi6{margin:0 auto;padding:20px 8px;max-width:768px;text-align:center;font-size:1.5em}._3b_c,._3b_c:active,._3b_c:hover,._3b_c:visited{color:#333;text-decoration:none}._3b_c:hover{text-decoration:underline}._2OGr{padding-right:15px;padding-left:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3IS_",
  	"container": "GVi6",
  	"link": "_3b_c",
  	"spacer": "_2OGr"
  };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(109);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(93);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Footer() {
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.container },
      _react2.default.createElement('img', { className: _Footer2.default.logo, src: '../../iconyuanzi.png', alt: '' }),
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.desc },
        _react2.default.createElement(
          'p',
          { className: _Footer2.default.title },
          '元子育儿'
        ),
        _react2.default.createElement(
          'p',
          { className: _Footer2.default.subtitle },
          '陪伴是一种态度'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.iyuanzi.app' },
        _react2.default.createElement('img', { src: '../../btndownload.png', alt: '' })
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(Footer, _Footer2.default);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(110);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._29jY{background:#333;color:#fff}._3-6F{position:fixed;left:auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;bottom:0;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;max-width:768px;height:45px;width:100%;background:#ff989e;padding:6px 35px}._3-6F ._3jzW{height:33px;width:33px}._3-6F ._25bw{margin-left:8px}._3-6F ._25bw ._1972{color:#fff;font-size:15px;text-align:left}._3-6F ._25bw ._3n8J{color:#fff;font-size:11px;text-align:left}._3-6F a{margin-top:4px;right:34px;position:absolute}._3-6F a img{width:75px;height:25px}._2wXL{color:hsla(0,0%,100%,.5)}._1Sxe,.YD4V{color:hsla(0,0%,100%,.3)}._2wXL,.wQJK{padding:2px 5px;font-size:1em}.wQJK,.wQJK:active,.wQJK:visited{color:hsla(0,0%,100%,.6);text-decoration:none}.wQJK:hover{color:#fff}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_29jY",
  	"container": "_3-6F",
  	"logo": "_3jzW",
  	"desc": "_25bw",
  	"title": "_1972",
  	"subtitle": "_3n8J",
  	"text": "_2wXL",
  	"textMuted": "_1Sxe _2wXL",
  	"spacer": "YD4V",
  	"link": "wQJK"
  };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContentPage = __webpack_require__(112);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ContentPage = function (_Component) {
    (0, _inherits3.default)(ContentPage, _Component);
  
    function ContentPage() {
      (0, _classCallCheck3.default)(this, ContentPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ContentPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ContentPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _ContentPage2.default.root },
          _react2.default.createElement(
            'div',
            { className: _ContentPage2.default.container },
            this.props.path === '/' ? null : _react2.default.createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }]);
    return ContentPage;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  ContentPage.propTypes = {
    path: _react.PropTypes.string.isRequired,
    content: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
  };
  ContentPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ContentPage, _ContentPage2.default);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(113);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._269R{padding-left:20px;padding-right:20px}._3c2M{margin:0 auto;padding:0 0 40px;max-width:768px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_269R",
  	"container": "_3c2M"
  };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NotFoundPage = __webpack_require__(115);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Page Not Found'; /**
                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                 *
                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                 *
                                 * This source code is licensed under the MIT license found in the
                                 * LICENSE.txt file in the root directory of this source tree.
                                 */
  
  var NotFoundPage = function (_Component) {
    (0, _inherits3.default)(NotFoundPage, _Component);
  
    function NotFoundPage() {
      (0, _classCallCheck3.default)(this, NotFoundPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotFoundPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _NotFoundPage2.default.container },
          _react2.default.createElement('img', { src: './404_page_image.png', alt: '' }),
          _react2.default.createElement(
            'p',
            null,
            'oh~当前页面已失效'
          )
        );
      }
    }]);
    return NotFoundPage;
  }(_react.Component);
  
  NotFoundPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(NotFoundPage, _NotFoundPage2.default);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(116);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._3euT{max-width:768px;width:100%;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}img{height:253px;width:253px;margin-top:15%}p{margin-top:42px;font-size:15px;color:#666}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3euT"
  };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(118);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Error'; /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  var ErrorPage = function (_Component) {
    (0, _inherits3.default)(ErrorPage, _Component);
  
    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ErrorPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react.Component);
  
  ErrorPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ErrorPage, _ErrorPage2.default);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(119);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(121);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/contact';
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Contact Us';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Contact2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(122);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Contact(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Contact2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Contact2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Contact.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Contact, _Contact2.default);

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(123);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._2Pu2{padding-left:20px;padding-right:20px}._3KyL{margin:0 auto;padding:0 0 40px;max-width:768px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2Pu2",
  	"container": "_3KyL"
  };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(125);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/login';
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Log In';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Login2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(126);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Login(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Login2.default.lead },
          'Log in with your username or company email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.facebook, href: '/login/facebook' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Facebook'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.google, href: '/login/google' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', { d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 13zm-1 ' + '15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 2.88.88 4 2 1 ' + '1 1 2.674 1 3 0 3-1.986 4-7 4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Google'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.twitter, href: '/login/twitter' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', { d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Twitter'
            )
          )
        ),
        _react2.default.createElement(
          'strong',
          { className: _Login2.default.lineThrough },
          'OR'
        ),
        _react2.default.createElement(
          'form',
          { method: 'post' },
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'usernameOrEmail' },
              'Username or email address:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'usernameOrEmail',
              type: 'text',
              name: 'usernameOrEmail',
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'password' },
              'Password:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'password',
              type: 'password',
              name: 'password'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Login2.default.button, type: 'submit' },
              'Log in'
            )
          )
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Login.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Login, _Login2.default);

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(127);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Jn3{padding-left:20px;padding-right:20px}._3sgU{margin:0 auto;padding:0 0 40px;max-width:380px}._1dsj{font-size:1.25em}._3TBv{margin-bottom:15px}._1evm{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}.a5-F{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.a5-F:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.NnDU{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.NnDU:hover{background:rgba(54,50,119,.8)}.NnDU:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}.lTnE{border-color:#3b5998;background:#3b5998}.lTnE:hover{background:#2d4373}._29Wu{border-color:#dd4b39;background:#dd4b39}._29Wu:hover{background:#c23321}._2u--{border-color:#55acee;background:#55acee}._2u--:hover{background:#2795e9}._2vTE{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._28Vc{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._28Vc:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._28Vc:after,._28Vc:before{position:absolute;content:''}._28Vc:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Jn3",
  	"container": "_3sgU",
  	"lead": "_1dsj",
  	"formGroup": "_3TBv",
  	"label": "_1evm",
  	"input": "a5-F",
  	"button": "NnDU",
  	"facebook": "lTnE NnDU",
  	"google": "_29Wu NnDU",
  	"twitter": "_2u-- NnDU",
  	"icon": "_2vTE",
  	"lineThrough": "_28Vc"
  };

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(129);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/register';
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'New User Registration';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Register2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(130);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Register(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Register2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Register2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Register.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Register, _Register2.default);

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(131);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._3zKC{padding-left:20px;padding-right:20px}._1zuA{margin:0 auto;padding:0 0 40px;max-width:768px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3zKC",
  	"container": "_1zuA"
  };

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Strategy = __webpack_require__(133);
  
  var _Strategy2 = _interopRequireDefault(_Strategy);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/strategies/*/view'; /**
                                                   * Created by diwu on 3/12/16.
                                                   */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var strategyId, query, response, _ref, data, title;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              strategyId = state.path.replace('/strategies/', '').replace('/view', '');
              query = '{\n  strategy(path: "' + strategyId + '") {\n    owner {\n      nickname\n      avatar\n    }\n    soundStory\n    title\n    subTitle\n    description\n    cover\n    tryCount\n    score\n    collectCount\n    photoCount\n    consumingTime\n    degree\n    scope\n    photos {\n      strategy\n      photoId\n      content {\n        img\n      }\n    owner {\n      nickname\n      avatar\n    }\n      praiseCount\n    }\n    materials {\n      amount\n      title\n    }\n    steps {\n      _id\n      description\n      imgUrl\n      stepId\n      timePoint\n    }\n    tools {\n      amount\n      title\n    }\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n  }\n}\n';
              _context.next = 4;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 4:
              response = _context.sent;
              _context.next = 7;
              return response.json();
  
            case 7:
              _ref = _context.sent;
              data = _ref.data;
              title = data.strategy.title;
  
              state.context.onSetMeta('og:type', 'article');
              state.context.onSetMeta('og:image', data.strategy.cover);
              state.context.onSetMeta('og:title', data.strategy.title);
              state.context.onSetMeta('og:description', data.strategy.subTitle);
              state.context.onSetMeta('description', data.strategy.subTitle);
              state.context.onSetMeta('format-detection', 'telephone-no');
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Strategy2.default, { strategy: data.strategy }));
  
            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Strategy = __webpack_require__(134);
  
  var _Strategy2 = _interopRequireDefault(_Strategy);
  
  var _Comments = __webpack_require__(138);
  
  var _Comments2 = _interopRequireDefault(_Comments);
  
  var _Image = __webpack_require__(143);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function renderTools(tools) {
    if (!tools) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.tools },
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.stepHeader },
        '工具'
      ),
      _react2.default.createElement(
        'ul',
        null,
        tools.map(function (value, key) {
          return _react2.default.createElement(
            'li',
            { key: key },
            _react2.default.createElement(
              'div',
              null,
              value.title
            ),
            _react2.default.createElement(
              'span',
              null,
              value.amount
            )
          );
        })
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  function renderMaterials(materials) {
    if (!materials) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.materials },
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.stepHeader },
        '用料'
      ),
      _react2.default.createElement(
        'ul',
        null,
        materials.map(function (item, key) {
          return _react2.default.createElement(
            'li',
            { key: key },
            _react2.default.createElement(
              'div',
              null,
              ' ',
              item.title,
              ' '
            ),
            _react2.default.createElement(
              'span',
              null,
              ' ',
              item.amount,
              ' '
            )
          );
        })
      )
    );
  }
  
  function renderSteps(steps) {
    if (!steps) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.steps },
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.stepHeader },
        '步骤'
      ),
      _react2.default.createElement(
        'ul',
        null,
        steps.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.stepLeft },
              _react2.default.createElement(
                'span',
                null,
                index + 1
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.stepRight },
              _react2.default.createElement(_Image2.default, { src: item.imgUrl }),
              _react2.default.createElement(
                'p',
                null,
                item.description
              )
            )
          );
        })
      )
    );
  }
  function renderPhoto(photos) {
    if (!photos.length) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.photos },
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.title },
        _react2.default.createElement(
          'span',
          null,
          '作品  '
        ),
        _react2.default.createElement(
          'span',
          null,
          '(' + photos.length + ')'
        )
      ),
      _react2.default.createElement(
        'ul',
        null,
        photos.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            { key: index },
            _react2.default.createElement(
              'a',
              { className: _Strategy2.default.header, href: '/photos/' + item.photoId + '/view' },
              _react2.default.createElement(_Image2.default, { height: '280', width: '280', src: item.content[0].img })
            ),
            _react2.default.createElement(_Image2.default, { className: _Strategy2.default.avatar, height: '56', width: '56', src: item.owner.avatar, type: 'avatar' }),
            _react2.default.createElement(
              'p',
              { className: _Strategy2.default.nickname },
              item.owner.nickname
            ),
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.praiseCount },
              _react2.default.createElement('img', { src: '../../good.png', alt: '' }),
              _react2.default.createElement(
                'span',
                null,
                item.praiseCount
              )
            )
          );
        })
      )
    );
  }
  function renderTimeCircle(consumingTime) {
    if (!consumingTime) {
      return _react2.default.createElement('noscript', null);
    }
    var time = '';
    if (consumingTime === 1) {
      time = '< 30 分钟';
    } else if (consumingTime === 2) {
      time = '< 60 分钟';
    } else if (consumingTime === 3) {
      time = '< 90 分钟';
    }
    return _react2.default.createElement(
      'li',
      { className: 'time' },
      _react2.default.createElement(
        'span',
        null,
        '用时'
      ),
      time
    );
  }
  function renderScopeCircle(degree) {
    if (!degree || degree === 0) {
      return _react2.default.createElement('noscript', null);
    }
    var imgUrl = '../../toolbar_mark' + degree + '.png';
    return _react2.default.createElement(
      'li',
      { className: 'level' },
      _react2.default.createElement(
        'span',
        null,
        '难易度'
      ),
      _react2.default.createElement('img', { src: imgUrl, alt: '' })
    );
  }
  function renderFitCircle(scope) {
    if (!scope) {
      return _react2.default.createElement('noscript', null);
    }
    var text = '';
    if (scope === 1) {
      text = '1~2岁';
    } else if (scope === 2) {
      text = '3~4岁';
    } else if (scope === 3) {
      text = '5岁以上';
    }
    return _react2.default.createElement(
      'li',
      { className: 'fit' },
      _react2.default.createElement(
        'span',
        null,
        '适用儿童'
      ),
      text
    );
  }
  function renderChildFitWrap(description, consumingTime, degree, scope) {
    if (!description || description.length === 0) {
      return _react2.default.createElement('noscript', null);
    }
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.childFitWrap },
      _react2.default.createElement(
        'ul',
        null,
        renderTimeCircle(consumingTime),
        renderScopeCircle(degree),
        renderFitCircle(scope)
      )
    );
  }
  function renderAudio(url) {
    if (!url || url.length <= 0) {
      return _react2.default.createElement('noscript', null);
    }
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.audio },
      _react2.default.createElement(
        'audio',
        { src: url, controls: true },
        '你的浏览器不支持音频播放'
      )
    );
  }
  function Strategy(_ref) {
    var strategy = _ref.strategy;
  
    return _react2.default.createElement(
      'div',
      { className: _Strategy2.default.container },
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.cover },
        _react2.default.createElement(_Image2.default, { height: '440', src: strategy.cover }),
        _react2.default.createElement(
          'div',
          { className: _Strategy2.default.avatar },
          _react2.default.createElement(_Image2.default, { height: '108', width: '108', src: strategy.owner.avatar, type: 'avatar' }),
          _react2.default.createElement(
            'h3',
            null,
            strategy.owner.nickname
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.usedCount },
        _react2.default.createElement(
          'p',
          null,
          strategy.tryCount + '人参与 综合各评分' + strategy.score + '分 ' + strategy.collectCount + '人收藏'
        )
      ),
      renderChildFitWrap(strategy.description, strategy.consumingTime, strategy.degree, strategy.scope),
      renderAudio(strategy.soundStory),
      _react2.default.createElement('div', { className: _Strategy2.default.content, dangerouslySetInnerHTML: { __html: strategy.description ? strategy.description : '' } }),
      _react2.default.createElement(
        'div',
        { className: _Strategy2.default.cook },
        renderTools(strategy.tools),
        renderMaterials(strategy.materials),
        renderSteps(strategy.description ? null : strategy.steps)
      ),
      renderPhoto(strategy.photos),
      _react2.default.createElement(_Comments2.default, { comments: strategy.comments })
    );
  }
  Strategy.propTypes = {
    strategy: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Strategy, _Strategy2.default);

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(135);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "ul{list-style:none}._2DwC{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background:#fff;width:100%}._2DwC img{-o-object-fit:cover;object-fit:cover;height:220px;width:100%}._2DwC .uJCT{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}._2DwC .uJCT img{margin-top:-27px;height:54px;width:54px;border-radius:30px;border:3px solid #fff}._2DwC .uJCT h3{margin-top:10px;text-align:center;font-size:15px;color:#ff989e}._3PxW{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background:#fff;width:100%}._3PxW p{margin:0 auto;font-size:12px;color:#999}._2c4C{background:#fff;width:100%;padding:35px 0 23px}._2c4C,._2c4C ul{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._2c4C ul{margin:0 auto;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;-webkit-padding-start:0}._2c4C ul li{margin:0 22px;background:url(" + __webpack_require__(136) + ") no-repeat;background-size:80px;width:80px;height:80px;font-size:12px;color:#666;padding-top:15px}._2c4C ul li span{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:10px;margin-right:8px;margin-left:8px}._2c4C ul li img{margin-left:14px;margin-top:8px;width:50px;height:8px}._3mUM{background:#fff;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-ms-grid-column-align:center;justify-items:center}._3mUM audio{margin:0 auto;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center}._2puw{width:100%;background:#fff;padding:0 12px}._2puw ._1--2{background:url(" + __webpack_require__(137) + ") no-repeat;height:19px;background-size:99px 20px;color:#fff;font-size:15px;border-bottom:1px solid #fed172;padding-left:15px;text-align:left}._2puw ._5u0l ul{margin-top:25px;margin-bottom:30px;padding-right:27px}._2puw ._5u0l ul li{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._2puw ._5u0l ul li,._2puw ._5u0l ul li div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._2puw ._5u0l ul li div{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}._2puw ._5u0l ul li span{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}._2puw ._3ij- ul{margin-top:25px;padding-right:27px}._2puw ._3ij- ul li{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._2puw ._3ij- ul li,._2puw ._3ij- ul li div{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}._2puw ._3ij- ul li div{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}._2puw ._3ij- ul li span{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}._2puw ._3Fx7 ul{margin-top:25px;margin-bottom:30px;padding-left:25px}._2puw ._3Fx7 ul li{padding:0 10px 30px 25px;border-left:2px solid #fed271;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._2puw ._3Fx7 ul li ._3rAk span{display:block;height:22px;width:22px;background:#fed271;color:#fff;font-size:15px;margin-left:-37px;text-align:center;border-radius:11px}._2puw ._3Fx7 ul li ._1g8R img{width:100%;border:1px solid #e5e5e5;padding:4px;-o-object-fit:cover;object-fit:cover}._2puw ._3Fx7 ul li ._1g8R p{font-size:15px;color:#666}._29Ha{line-height:1.8;background:#fff;padding:12px}._2nWu,._29Ha,._29Ha img{width:100%}._2nWu{background:#fff;margin:10px 0;padding:10px 0 35px}._2nWu .Y3wt{margin-left:12px;font-size:15px;color:#666}._2nWu .Y3wt span:nth-child(1){color:#666}._2nWu .Y3wt span:nth-child(2){color:#999}._2nWu ul{padding:0 12px;margin-top:17px;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;overflow-x:auto}._2nWu ul,._2nWu ul li{display:-webkit-flex;display:-ms-flexbox;display:flex;display:-webkit-box;-webkit-box-direction:normal}._2nWu ul li{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border:1px solid #e5e5e5;padding:4px 4px 25px;margin:0 5px 0 0}._2nWu ul li .TevT{display:inline-block;height:140px;width:140px}._2nWu ul li .TevT img{-o-object-fit:cover;object-fit:cover;width:100%;height:100%}._2nWu ul li .uJCT{margin-top:-14px;height:28px;width:28px;border-radius:14px}._2nWu ul li ._14jh{font-size:12px;color:#666;padding:10px 0}._2nWu ul li ._1ZPp span{margin-left:5px;font-size:11px;color:#999}._2nWu ul li ._1ZPp img{height:18px;width:18px}._1Lno{margin:0 0 45px;padding:0;max-width:768px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;background-color:#fcf8f5}", ""]);
  
  // exports
  exports.locals = {
  	"cover": "_2DwC",
  	"avatar": "uJCT",
  	"usedCount": "_3PxW",
  	"childFitWrap": "_2c4C",
  	"audio": "_3mUM",
  	"cook": "_2puw",
  	"stepHeader": "_1--2",
  	"materials": "_5u0l",
  	"tools": "_3ij-",
  	"steps": "_3Fx7",
  	"stepLeft": "_3rAk",
  	"stepRight": "_1g8R",
  	"content": "_29Ha",
  	"photos": "_2nWu",
  	"title": "Y3wt",
  	"header": "TevT",
  	"nickname": "_14jh",
  	"praiseCount": "_1ZPp",
  	"container": "_1Lno"
  };

/***/ },
/* 136 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAAH8yFe7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZGRDZEMDEyQkJBRTExRTU4MTlBRERDRDRFQzVFN0U2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZGRDZEMDEzQkJBRTExRTU4MTlBRERDRDRFQzVFN0U2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkZENkQwMTBCQkFFMTFFNTgxOUFERENENEVDNUU3RTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkZENkQwMTFCQkFFMTFFNTgxOUFERENENEVDNUU3RTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6jBviVAAATeklEQVR42mL8d6mQgQiwBIi3AfE/IF6BTyELHrl5QJwEZccwEAmYsIh1QukkIs2YjsxhRPMyFxB/YyAd/AeZhc2F5BjGADUsGpeXyQVLkQ1cTCVDbWEGxlLJwMPU9DI82SymtoEx1DaQkdoGMgwJA19RybzfMAPFqGQgK7KXZ1M7DFOhpQY5IB1XpICSUBQZBs7EF8vLiDTkDzZBgABiJKJOEQTidiB2BWJlaqTD90CcgcUwA2on7AtAzEftnPKJblkvi9oGTqOmgf+p6ONaahewfNSOlNKhU2IzDNZYVqV2LN+mppctqB2GJ4ZWRY8N8OCRS8AlARBAjET2U9CBOhDfBOJKaH1DTBscVBjz0ioItYF4PxL/JpRuJ1L/fyyO+08NB8IMuQrEjlRODoyUOPA/KYZQETATcqDOADkMBv4CsRsuB24F4isMAw924XKgN8PgAkzIDqxmGHzgH8yBekDcyjBIAciBlxgGMQA58N5gd6D2IHYfB8iB34GYbZA68DssF/8apA5kRC4HjQeTw7AV1GeRuuwDCZ4gt3SYcAwBbB4gx4HGbWWIac34QmlROjhKAIjDoeylpLYHX5PawCQSSALxMyj7AxCvpEanBL0JpsUAmSToIqDvCBbPPQdiKWIsBQggcvsk6CAbiOOB2AyI3wHxGfR23UB0634CMSuUPRXqOBAQQnOcFZSup4cDkRsW7ED8mwg9x6B0IxAb0sqBsDSkR2GMnYfSugxEDIuCAAuhyhqIf9Cgj3IZyeOM5IZgFZFRSGmVVkuOA+cCcRu0l0Vr0AzELrhCEpsDzYE4mc5V3B5oUUWUA08OUD08hQHL/CsTtp7UAAIuaPmK04FMDAMP2HE5qHMQNVj/o5eD3UBcOphb1IPJcSihyMQweMEcmANnDVIHpsIcmDaIQxE8IXZ3EDuwCeTAlkHsQHDHff4gduB/pkGek8GO0xjsUXxtsEfxn0HswH8gBzIPYgcyU33lFS0yCTG9u4EA75AdOHEQOlAI2YE5g8xxkuhR/J+B/AWjtABPsTX5uQaJ4yKQ3cWEqy8wgEAFXy8OVOQsHWAHthDqZkZDMb3BH2JHFkAAtALdg84OZCHFgaBBox1AvJOefWBSHAgD7nTIOIyUOBBmAGjp9TQqOuovsQ1lYlvToB0SsMWVJ6kQnaAW1D9qOhAZmCOxvzDgHxh3hTrKjZjoxAYAArB3NS9RRVH8zKC1CE3xC9yI0Z8QQZuSFq0kkkBEUBDcRQkG4a6PXYuCkNaCULgJ2wXRJt25cucHxeBapaRcWUzv5zvXub7uzHvveuc6b975wQHnITPj7537ztfvXl3NSdICIzZ0cNEo/cmJQTeF3VZMBbbYDvj3O9lQnmBCtc7Pa6WuhpxmNLAN7zWJBwJfBTYb2C8yyJvrAMyW0GKf4BvQ4SOfdgkMxVa11495abR7cgoMTib5MxV53ZxMHrkm1GUhsk/hbOtBA9YOe1WS3cHASuflgTf5Aay2MnTx8yxLAHnf6LSqwAuBCKMrvEzWKdu4ShXdyHzaJksaAueoMqD6S82JhxTqnMuuCZyicAx1kZofX7R8sPWsQWQtsE2OannEEXtja7VyuCWmbOjMYGCoR7HZTxWJWeIlXBDyTgDyMHP9kITAsvBlxDSF09aFWkv4MzX4KOKc8aSWB6Llclc4SoT/lNPohtynUB0oiEebyoUVgT/IYptgjvFbVSxFLd/5I7ykAoTt30HgDGlHOAgSA9KOK4jCb4QL+yRb7eKX1MUyGoNAtL17hAsr7GIJdwgP1jg+wuteYJ+ECytsgsCP5F+I0CxpzLzKAyWIpAckOo+KpvpOEAv0DG5HmwkvuKEgiAe2hN/AD3o766nwkiz3I21WYmqoQvXTKzwZcRjYNb1vYJqJgFSc/YDDn0rC2SlcMpFlwgUm77lwdrJsE+/P1fEu59G5j0JVWaEaD3Fz4e0c54jK62o2mosWbzqUg0DxMqnjpJW3FZrYIzGRvGMKFC49MFqxrPEdyyrG+e8ZIMujW86qUL0euWNZ8M4xJg1Doff8nXds38y1xFd55zI1Tqf7spbDQZG6xN/LiUSvXruGRyKhf5IrHLx+7SmCfmXSDrTg4Lww8LXtepEq/ztgVruOUcIzCjUng3ytxASUtRswGrn2lq9jn8dwlWB3y8fz+Z8A7F1LaBRBEC1iNImCEVQU8ROEXERyUBDB+AmiiHoQ/CQoHhSjByUq5OLFoygI4g9UVLxIDh6FiCioeHDxoKAmGoISP6AkRtFDRENY92Wr2cnsZNI9MzufnXowJBmysztvu6eqq6teRVUn4gTItDVSPud6ce6o5/PD7Mx+YL90N8UIURX+g4Rum0U/xNMNU3yz5TzUn1Fgg1Kp+7ZpmuVnWWT72mHWWyPC088GBjUjSBu21o1tHed1f/l1/ew22S0+1u2q6hnqX4jVYZ+ntxxGIKbiDx4phy0GZj0FJzn1z2KYkBzVTnlJPut7JnIEYoSgdg2R2xchjvR7FtdF3R/kzk8kYQTOooJGHUZAVcjk2aECn5P585yPM4GoshyggnhknNDOM6KBAs6BDIpAZLF38Yd8GeNlXBMbGmBHHAi8yT+Rxd6asEDCTp7W1VEROMDeflLRzFMaAuWrwyYQ69oO0pRujTFes6V+FzaBGHltVB4YoUK567VSEggD8ZB/f0rlCeS7GPXjqzScthuovDGNl46IDp0OcgQiLHTUMgLLGVVkkJmhS+CD3HGB0gMVs6zxS6CKeGyj9AEC8UN+CKyk6HWwo3Zx0HriuVcjgufeRko3WngQoRPaGxMC0an1Jz/70g5UMfw2ncJYZcwV7kahyJttQuAv4a0I/boESrK5M87yzBzrpti2NWF1EJo6Lnw5oijbwm5EdpHUjLjhiNsUrqNCSySBMy67EdiXO1YJRxMCscN6JwLbhBvtdfJdO4FoTLtMuNFCJ+VLQMYYEZQzTBdutIGYIQQnBxWBkyhegvVxR7V9Ci8VTrxBEdglVHhyqkcJ7LU+FAXmIxAirD1ChTHAWUOF8OAZ2GBrqhQe/K2LY9/7KSlWWGCOhbnju9LOEpgDUfuZMgL9EShT2AdQiP1RCPQOVE/VVYoV9gyUUmTFD/TnB84QK+wdKCB6BAKR+zFF+DDGJkUg4vstwocx0JjgDwhEqegB4cMYzcoPRHHeGuHDCIjgN4oj7R2XcscCK4EZytfxCvSAOpkOK4HocXlFeNHCmEZV1k0lEV3UwzD7gGR/BsKYiKK5HjJOBEIpY0C4ccXK3PHNaQornFHWReAItMNc4UYgFCtli9MZc9iAfHIj8BXl8z7mC19FQPrzcvtJp3AWkgf7KFxRniRgndNJp5XIeyGvCONKt7gt5bYIb6NAFfuQFwIx3z+nnDz022tVgQNTAtGcAN1dD6aYQBhV18y1iZ51kJ7LkgcxhjLBhN6ITjgrjbt2UIM7qfOPuta2ghfRk1JAHiShjmkOLu2AKjaeLlKyNaN1gC41dwx4MfL38K3UskmfWqYEPjH1gU1D+vsoINWzmAHVqdjaHSFDfWkveyKd/LOX/aSkA/dzivJSosbws6kELb5Bym8HJBV4piOIXOP1An7WvF/YxUGeHDbmkygLBTHcjJ8LBLGtWWshLwkkfqWCRHLG78WC3heG0D+EX+fFkLgbvKpCZWp9UBcNOmyFCsYlPL2hiR8ngcaSNJMpRWZCNxUqoIDbEQQksIZ/xiNO5f3sL8UblTK1Q+Ud4gb28N+DJXw/laKH6AnEcq7yiLteym8qjNwYiLyu5ZtptBH8OHfsJe/5ied4ZZTl9wF6+L5uhTHUw04uemt7JkHMZrvl5hWx9n4iTucA6Hst4mtFEuj4L0B7Zx5iVRmG8dcrJtbYgraQEhYlGVQTTJbWH/7RuLRDWBlB5thiC0FYtkgFIthiBWWRYTNqlm1QoZAhM0ZlLoUplGkbJdbINJaN4MKEnafvOcyZ29w7d+4958w59zw/+LjObcx7v+853/J+75KkeiJxg+0XXDTg0rIs8D7eK5b+ZbV1rzxxE+f5Qsyz7qaxR7x2i9e2sn3N+XpvFgchCwLE091iLtd2Lm9q3sK99Ny8WSRKBnGnd765POBwdKgLnCZrKUyfkdwVSoAJBtbJaTRrjKOg5ucN4l5LX16Sc/nwDAsspcjg3WjO7Jt683ZaHaSxfL7NQ/cRDkQDd85H54nPOIOkMSkOsuAOD5xBkRlpubk6R/vNpdrTDBgD53AAgrlt4DUBs9RvJgCM283mLv/e4b5zp2bA8j8X3FHaOMNhJkDGuWDhma8kvm608CFFGod9fFjRd8ibOyOpY520D4UKR6i3hUtFuDXdFTARNFjItbiqlN3mCmwOYt/dx21JIhP6J2EJDhYgNm6426WjyBjD1QNOTjO5XGduBhxlzt8YwkPWi2C+fokvWrZzRkSVxyaOwRaOSdULECXWkbcVN52tnO1qLC9qSsQCipYdwzFo45h8FPeHiCsKxL9UnO61B6yrjLLof2AfnVhgzMwiToYT5Qw4MHBqPcJDxECJLxWMNmdnxMGl0SK8J45KgCi/3cn9XJ3GM3Xs5PIMn8nrOZbPpkGA1/CpgaV+Kr/ElxrP1NLMMbzZXGAGxnZCqHuzkMwww3i6gov2y+bsd0LEdgjBUqtMPdlhhLm7eNy2VORuXMkSjI0q3IbGajwyB25blpq7Lu2gFmIVIC664XqM0LjvNR6ZBEkLUCn4L2rhsTgEiN+H9y6KpiG7ILJq/amxyCz7qAHEfOEwcW2Uh5Acl1xkW4Ub+pvqf1EpfZkBcQSHh+4AiU8UATZghDeMCUuAY7nen6a+FSXwDF9xQj6vUgHC63ijOUPkIfWtKIFd3BciTGJLbyfkYgJEXP4mc4lTEGa+R30rSuQPCq+TM2HBdHeFDNEIEdxMgSKqXK7voq8gXmdwuUswNpGw8cGbZYP6UlQIvGkuLWcPqH2fCAO4dCGe+YneBIijs58FRynLRVg0cF/4uDlTXkEBNgb+Qqf6TYQEAqBu459fLXQIgePhRebiS99Xn4mQgaZwX4z4E2R4+DtfgLP5Old9JSJiXrE9IG48cM22Xv0kIgRB8yh/NjEoQBiah6hvRAzAfQup8mbhB3jDQHgd/I/w/5fpRUQJtn3IVAbbYE2OUyF+WCPxiRjopNagvUlQo199Xns/ERczed5ohQCRcQrXbS3qFxETe4Lr8aPqDxEzo8zlfGyDABFMDt+tdabbDxEPiCWp8WdA/9ZjgPpFxIQfyFYTNEQfp34RMeFXJjoCAbZLgCJmDnPFzWEJXsL1+LD6RcQNBDhH3SBiBqXKmry2EgJEeUTUPvvV+jlhtcgMF/P1MwgQgSOI5fxZAhQxcRlfm3EI2ea1n7x2urm0G0JECYLV4X31g9e2+2YYv1xpg/pHRMw2noDP8g8h4AVzrtKfqn9EnPgzIFL1v2Tufk6IqECxbkRdLs4XIEBtsbXmgkVq1FciZFCdCUFJyLI2tycBInTuE68N9dqL6i8RMovMWVweNlfB8z96SlD5nTnb4BTrh9JNoipBuC8cnr+1XgLTwdV8fVdLsQgJpPgbmC++QgLcyWMyxLdffScqBNduw3s7BRdjkPpQlMlb5u58HypXgCvNeck8r74UfWShuXQvKGgzu9Av9ZYB60ZzOQJR9v1gMSULEQC+Bfd7bbXXbij2i6Uswaj9ACcFuG0tUd+KEkBN6EvMeVkVpdQcgJhKHzRnohGi2IQGQzNuO9aX+hdK5Smvfag+Fj1wgtdavfaP9bF4YTm14pCC/xCVPkl9n3lQ1LqdIoQ73+KoBYg6EH4hatyUvKExyCywksB/YDM18U05a3Y5IIAd+QRhZJxmLttRrcYjc9zrtXpzV21lJTXIVfgB4MgKL4f55iqmi+oG12mTAz+3cQas6NRSKQcowEOBDzlBY1V1zOIs94HXxoV5bA4b2IBaKMgrNG6p53KOJRyW4UoFl6ovkizABfz/vu61VeYSH9VrHFPJa+ZuM5ZyTBeE/Q/kIvrgMEQ2cDle7rWPzVXUFsknqIkZ5jyjbueYWloE6ANb4Z38Es8F3h9JcYrkHC4WUWTY513ZH2qPizpzNkR80R+thKLGIjJgON7BsZjqtfHUxKpqFiDEd4q5shCIQdnKJw9uO8dLE7FxnbkoyHXmPJ5OCvNwkWQB+hwM7DFQHHuEuVgUET54sF8xFoch77Hv77B+rI6QS0gHITUI3Hc2Bt6bzpkRJp0LpKE+gz5bwz5ERlLEY/ye5BNP0mjy2onmIqk2sSNx5beQ74uemcO++tzcHe1QznTjLYGJB3IJ70zUmL3bXFwKOhE1TUbb/3PYDM6g0C702gpzN1FnBt5/kn2FK1IEgCc6sCyXsk7HAeYq624QxWFmF596tA7OnpOtegKq8NAt43fzvydsq7u9dra5TFOpJFcFg3OAJ7gBbLXcUz5tLqBqRd7vn2HOkydJFeHxWeBRgtwpzebSowRzdiNUdgO/m/894X8HL/Vf0jx4PWVGyMIe6dYCJ27Yw+ppmvCZwlckcGq3rqTuByl+n6MoCggHBZmHee1kcw68IzhjBQuBIyPZPYGfd1B8a/nv783CYGRRgMUYYl3e3j64Dz2VYjqWbTA392Zd9VVg4ljJE2cHT5xtbLt4kFI9vjz+BW18ixisnmRoAAAAAElFTkSuQmCC"

/***/ },
/* 137 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAoCAYAAAHS0rU5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM1OUY0Qjg3Q0JBRDExRTU4OEUzQTA3Q0E3NTg4MDkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1OUY0Qjg4Q0JBRDExRTU4OEUzQTA3Q0E3NTg4MDkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzU5RjRCODVDQkFEMTFFNTg4RTNBMDdDQTc1ODgwOTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzU5RjRCODZDQkFEMTFFNTg4RTNBMDdDQTc1ODgwOTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz44UN1FAAAD00lEQVR42mL8d6mQAQjuA7ECA3nAEIgv4FPAAsQPgFiegXxwHkoz4lLARKEFyOA/FGO1hNoAwzJaWIJhGUAAMUIj/j8FhjESUsBEoQV444IWwQWy6AQ9It4capkwPSL+DXIQAgQQNSKeWoCi9ME0SDwBAv+QEupfcjwyGAETkqdAOG2oegQdzETz2JD1CK6yEoTfgwQAAgiW2cOAeOUAOYqRUgNYBkFGB9l/B4hVKclMgwGoQD1TPZQ9AQMtUM/IDYfi9iEpyXywl1D/ifHMUClmQR75OdQ9AQJsUM9sHw4VngfUM4FDvdYGgXVQz3ACBBCsxmYG4j8MIxd8B2IpIP4w0C3g6BEeESDACW1Pwkr1dQMVGUsYRgE6CERr+HvQKzJGAWGwHSliXkNr4NHIGARABNqmg0XOjNHIGDwgHa1IMx2NjMEDTiFFzENSwng0MmgLQKMgf5Eip2U0MgYPqEaKGNBsgQqyJMto+AwYAA1P30binwcIwI4ZoyAMBUF0CyvxAjmACHqJdGKdNMFjBAR7CQg5hIXYxAPY5RIGxAN4AdHGxjWZaGEtGXAeTP/h8efv3/YHbhjXNp7oV6MbIQfPjOUwbU2tMa4lfyTC7LPkWrHIiD0LdXktJepaRqH6frOHlGFXMsQ3Z8/VmgWiZBAw8Nw9R8ngYYLq2koGD3NISSWDhxxSQsngofQ8PIFkcPBaJ12QnmRwEOCWlJLBQ4j3JJcMHlJISSSDhx2kjCWDh8pzw69eMgjoW7PvOkkGDyNUVyEZPMSQspQMHjJImT4FaO/sUSIIgjBaI4KGJisIRnoJEYPFfPEKYih6BjXU0MVQMDEXczEQMfMGJgoLegEDA+2PrqZ2/MFFs+n3oC7QM2/on69rxs/AC8qZHtmn5AJ0FqVUzlIdpHpkOL5+pQ4t0vBIUdc7sGVxYU+57h2rK5fy7aBoAJ6MfAhklLEfWuTs71Kt1ijGeapF3gf4gZVUty6JzghOUvVqEGPAs4cJ0UnmdqoXF2Xk07CpLooxw/OGP6KT5lOLu0BXlnv0dWrxDfBf1lPduyQKxSoFMIcYAIGi+0pklP4f6oKmZEaDGADBsuWUTOkFemETpmUQA2piw3JySZIoLLNnvySYEANqQ0LsuyDvLswAMQDaaIp1adFYRVOwJcQACBpftD9YNIfXon4WMQACbf9qG/jVRdH2cB8xANroQPHa4o83OnBcQAyA9vusiMrIRXm2HGGZRgyAYN5y6PHNRbmxHIpEDIAx1izH6MsviY4tx+wRA8DRPaRdyxezSpf6zeKE5l4NYwTQ5gNomdy8yjP0PAAAAABJRU5ErkJggg=="

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Comment = __webpack_require__(139);
  
  var _Comment2 = _interopRequireDefault(_Comment);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _dateFormat = __webpack_require__(141);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _Image = __webpack_require__(143);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Comments = function (_React$Component) {
    (0, _inherits3.default)(Comments, _React$Component);
  
    function Comments(props) {
      (0, _classCallCheck3.default)(this, Comments);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Comments).call(this, props));
  
      _this.comments = props.comments;
      return _this;
    }
  
    (0, _createClass3.default)(Comments, [{
      key: 'render',
      value: function render() {
        if (!this.comments || this.comments.length === 0) {
          return _react2.default.createElement('noscript', null);
        }
        return _react2.default.createElement(
          'div',
          { className: _Comment2.default.comments },
          _react2.default.createElement(
            'div',
            { className: _Comment2.default.numbers },
            _react2.default.createElement(
              'span',
              null,
              '评论  '
            ),
            _react2.default.createElement(
              'span',
              { className: _Comment2.default.count },
              '(',
              this.comments.length,
              ')'
            )
          ),
          _react2.default.createElement(
            'ul',
            null,
            this.comments.map(function (item) {
              return _react2.default.createElement(CommentItem, { key: item.commentId, data: item });
            })
          )
        );
      }
    }]);
    return Comments;
  }(_react2.default.Component);
  
  function CommentItem(_ref) {
    var data = _ref.data;
  
    return _react2.default.createElement(
      'li',
      null,
      _react2.default.createElement(
        'div',
        { className: _Comment2.default.header },
        _react2.default.createElement(_Image2.default, { className: _Comment2.default.avatar, height: '48', width: '48', src: data.commentUser.avatar, type: 'avatar' })
      ),
      _react2.default.createElement(
        'div',
        { className: _Comment2.default.main },
        _react2.default.createElement(
          'p',
          { className: _Comment2.default.nickname },
          data.commentUser.nickname
        ),
        _react2.default.createElement(
          'div',
          { className: _Comment2.default.time },
          _react2.default.createElement('img', { src: '../../time.png', alt: '' }),
          _react2.default.createElement(
            'p',
            null,
            _dateFormat2.default.commentDate(data.createdAt)
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _Comment2.default.content },
          data.content
        ),
        _react2.default.createElement(
          'ul',
          { className: _Comment2.default.images },
          data.images.map(function (value) {
            return _react2.default.createElement(
              'li',
              { key: value },
              _react2.default.createElement(_Image2.default, { height: '102', width: '102', src: value })
            );
          })
        )
      )
    );
  }
  exports.default = (0, _withStyles2.default)(Comments, _Comment2.default);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(140);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._1wUF{width:100%;background:#fff}._1wUF ._21ij{border-bottom:1px solid #e5e5e5;padding:12px;font-size:15px;color:#666}._1wUF ._21ij ._2R7v{font-size:15px;color:#999}._1wUF ul{padding:0;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;list-style:none;background:#fcf8f5}._1wUF ul,._1wUF ul li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-display:flex;-webkit-box-direction:normal}._1wUF ul li{box-sizing:border-box;margin-bottom:10px;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background:#fff;border-bottom:1px solid #e5e5e5;padding-bottom:18px;width:100%}._1wUF ul li p{margin:12px 0}._1wUF ul li .rHdW{min-width:48px}._1wUF ul li .rHdW ._4IxY{height:24px;width:24px;border-radius:12px;margin:12px 12px 0}._1wUF ul li ._2-MO{padding-right:12px}._1wUF ul li ._2-MO ._2JS3{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._1wUF ul li ._2-MO ._2JS3 img{height:10px;width:10px}._1wUF ul li ._2-MO ._2JS3 p{margin:-2px 5px;font-size:10px;color:#cbcbcb}._1wUF ul li ._2-MO ._2GFZ{font-size:12px;color:#666}._1wUF ul li ._2-MO ._3wc5{font-size:13px;color:#666}._1wUF ul li ._2-MO ._24VN{background:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}._1wUF ul li ._2-MO ._24VN li{height:51px;width:51px;margin-left:8px}._1wUF ul li ._2-MO ._24VN li img{-o-object-fit:cover;object-fit:cover;width:100%;height:100%}._1wUF ul li ._2-MO ._24VN li:nth-child(1){margin-left:0}._1wUF ul li:nth-last-child(1){margin-bottom:0}", ""]);
  
  // exports
  exports.locals = {
  	"comments": "_1wUF",
  	"numbers": "_21ij",
  	"count": "_2R7v",
  	"header": "rHdW",
  	"avatar": "_4IxY",
  	"main": "_2-MO",
  	"time": "_2JS3",
  	"content": "_2GFZ",
  	"nickname": "_3wc5",
  	"images": "_24VN"
  };

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _moment = __webpack_require__(142);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _moment2.default.locale('zh-cn'); /**
                                     * Created by MAC on 16/3/21.
                                     */
  
  var DateFormat = {
    postDate: function postDate(date) {
      return (0, _moment2.default)(date).format('LL');
    },
    commentDate: function commentDate(date) {
      return (0, _moment2.default)(date).fromNow();
    }
  };
  exports.default = DateFormat;

/***/ },
/* 142 */
/***/ function(module, exports) {

  module.exports = require("moment");

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(77);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(80);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(81);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _UrlFormat = __webpack_require__(144);
  
  var _UrlFormat2 = _interopRequireDefault(_UrlFormat);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Image = function (_React$Component) {
    (0, _inherits3.default)(Image, _React$Component);
  
    function Image(props) {
      (0, _classCallCheck3.default)(this, Image);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Image).call(this, props));
  
      var style = {
        width: props.width || '',
        height: props.height || '',
        pr: props.pr || 1
      };
      var urlFormat = new _UrlFormat2.default(props.src);
      _this.state = {
        imgUrl: urlFormat.cdn().progressive(style.pr).height(style.height).width(style.width).url()
      };
      _this.type = props.type || 'cover';
      return _this;
    }
  
    (0, _createClass3.default)(Image, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement('img', { className: this.props.className, src: this.state.imgUrl, onError: this.handleImageErrored.bind(this) });
      }
    }, {
      key: 'handleImageErrored',
      value: function handleImageErrored() {
        var defaultImg = {
          avatar: '../../default-avatar.png',
          cover: '../../default-cover.png'
        };
        this.setState({ imgUrl: defaultImg[this.type] });
      }
    }]);
    return Image;
  }(_react2.default.Component);
  
  exports.default = Image;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(78);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(79);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UrlFormat = function () {
    function UrlFormat(url) {
      (0, _classCallCheck3.default)(this, UrlFormat);
  
      this._url = url;
      this.parameter = [];
    }
  
    (0, _createClass3.default)(UrlFormat, [{
      key: 'cdn',
      value: function cdn() {
        if (this._url.includes('http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com')) {
          this._url = this._url.replace('http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com', 'http://assets-dev.iyuanzi.net');
        } else if (this._url.includes('http://yuanzi-beijing.oss-cn-beijing.aliyuncs.com')) {
          this._url = this._url.replace('http://yuanzi-beijing.oss-cn-beijing.aliyuncs.com', 'http://assets.iyuanzi.net');
        } else if (this._url.includes('http://img.iyuanzi.net')) {
          this._url = this._url.replace('http://img.iyuanzi.net', 'http://assets.iyuanzi.net');
        }
        return this;
      }
    }, {
      key: 'progressive',
      value: function progressive(pr) {
        if (pr) this.parameter.push(pr + 'pr');
        return this;
      }
    }, {
      key: 'width',
      value: function width(w) {
        if (w) this.parameter.push(w + 'w');
        return this;
      }
    }, {
      key: 'height',
      value: function height(h) {
        if (h) this.parameter.push(h + 'h');
        return this;
      }
    }, {
      key: 'url',
      value: function url() {
        if (this.parameter.length === 0) {
          return this._url;
        }
        return this._url + '@' + this.parameter.join('_') + '.jpg';
      }
    }]);
    return UrlFormat;
  }();

  exports.default = UrlFormat;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Topic = __webpack_require__(146);
  
  var _Topic2 = _interopRequireDefault(_Topic);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/topics/*/view'; /**
                                               * Created by diwu on 3/12/16.
                                               */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var topicId, query, response, _ref, data, title;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              topicId = state.path.replace('/topics/', '').replace('/view', '');
              query = '{\n  topic(path: "' + topicId + '") {\n    owner {\n      nickname\n      avatar\n    }\n    title\n    cover\n    subTitle\n    viewCount\n    collectCount\n    content\n    strategies {\n      strategyId\n      tryCount\n      score\n      cover\n      title\n      owner{\n        nickname\n        avatar\n      }\n    }\n  }\n}\n';
              _context.next = 4;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 4:
              response = _context.sent;
              _context.next = 7;
              return response.json();
  
            case 7:
              _ref = _context.sent;
              data = _ref.data;
              title = data.topic.title;
  
              state.context.onSetMeta('og:type', 'article');
              state.context.onSetMeta('og:image', data.topic.cover);
              state.context.onSetMeta('og:title', data.topic.title);
              state.context.onSetMeta('og:description', data.topic.subTitle);
              state.context.onSetMeta('description', data.topic.subTitle);
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Topic2.default, { topic: data.topic }));
  
            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Topic = __webpack_require__(147);
  
  var _Topic2 = _interopRequireDefault(_Topic);
  
  var _Image = __webpack_require__(143);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Topic(_ref) {
    var topic = _ref.topic;
  
    return _react2.default.createElement(
      'div',
      { className: _Topic2.default.container },
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.cover },
        _react2.default.createElement(_Image2.default, { height: '694', src: topic.cover, alt: '' })
      ),
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.content },
        _react2.default.createElement(
          'p',
          { className: _Topic2.default.title },
          ' ',
          topic.title
        ),
        _react2.default.createElement(
          'p',
          { className: _Topic2.default.nickname },
          '来自: ',
          _react2.default.createElement(
            'span',
            null,
            topic.owner.nickname
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _Topic2.default.count },
          _react2.default.createElement(
            'span',
            null,
            topic.viewCount
          ),
          '人看过    ',
          _react2.default.createElement(
            'span',
            null,
            topic.collectCount,
            '人收藏'
          )
        ),
        _react2.default.createElement(
          'p',
          { className: _Topic2.default.content },
          ' ',
          topic.subTitle
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.strategies },
        _react2.default.createElement(
          'div',
          { className: _Topic2.default.strategiesCount },
          _react2.default.createElement(
            'span',
            null,
            '妙招'
          ),
          _react2.default.createElement(
            'span',
            null,
            ' (',
            topic.strategies.length,
            ')'
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          topic.strategies.map(function (item) {
            return _react2.default.createElement(
              'li',
              { key: item.strategyId },
              _react2.default.createElement(
                'a',
                { href: '/strategies/' + item.strategyId + '/view' },
                _react2.default.createElement(_Image2.default, { src: item.cover, h: '357', w: '357' })
              ),
              _react2.default.createElement(
                'div',
                { className: _Topic2.default.main },
                _react2.default.createElement(
                  'p',
                  { className: _Topic2.default.title },
                  item.title
                ),
                _react2.default.createElement(
                  'p',
                  { className: _Topic2.default.by },
                  'by ',
                  _react2.default.createElement(
                    'span',
                    { className: _Topic2.default.nickname },
                    item.owner.nickname
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _Topic2.default.count },
                  _react2.default.createElement(
                    'p',
                    null,
                    item.tryCount,
                    '人参与 / ',
                    item.score,
                    '分 '
                  )
                )
              )
            );
          })
        )
      )
    );
  }
  
  Topic.propTypes = {
    topic: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Topic, _Topic2.default);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(148);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._36pJ img{height:347px;width:100%;-o-object-fit:cover;object-fit:cover}.P0Ts{margin:0 auto 45px 0;padding:0;max-width:768px}._2Zor,.P0Ts{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%}._2Zor{background:#fff;padding:30px 12px 40px}._2Zor ._30vZ{font-size:18px}._2Zor ._2S8u{margin:19px 0 15px;font-size:12px}._2Zor ._2S8u span{font-size:12px;color:#999}._2Zor ._2S8u span:nth-child(2){color:#ff989e}._2Zor .hN1L{font-size:10px;color:#999}._1NDr{width:100%;padding-top:6px;background:#fcf8f5}._1NDr ._3iUr{border-left:6px solid #ff989e;height:31px;padding-left:15px}._1NDr ._3iUr span{font-size:14px}._1NDr ._3iUr span:nth-child(2){color:#999}._1NDr ul{padding:0 1.6% 20px;width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;list-style:none}._1NDr ul li{margin-top:6px;box-shadow:0 15px 10px -15px #ccc;width:49.175%;background:#fff}._1NDr ul li a{-webkit-tap-highlight-color:rgba(0,0,0,0)}._1NDr ul li a img{width:100%}._1NDr ul li ._1Fyz{padding:0 12px 12px}._1NDr ul li ._1Fyz p{margin:6px 0}._1NDr ul li ._1Fyz ._30vZ{font-size:13px}._1NDr ul li ._1Fyz .ZJCp{color:#666;font-size:11px}._1NDr ul li ._1Fyz .ZJCp ._2S8u{color:#ff989e}._1NDr ul li ._1Fyz .hN1L{border-top:1px solid #e5e5e5}._1NDr ul li ._1Fyz .hN1L p{margin-top:9px;font-size:10px;color:#666}._1NDr ul li:nth-child(even){margin-left:1.65%}", ""]);
  
  // exports
  exports.locals = {
  	"cover": "_36pJ",
  	"container": "P0Ts",
  	"content": "_2Zor",
  	"title": "_30vZ",
  	"nickname": "_2S8u",
  	"count": "hN1L",
  	"strategies": "_1NDr",
  	"strategiesCount": "_3iUr",
  	"main": "_1Fyz",
  	"by": "ZJCp"
  };

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Event = __webpack_require__(150);
  
  var _Event2 = _interopRequireDefault(_Event);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/events/*/view'; /**
                                               * Created by diwu on 3/12/16.
                                               */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var eventId, query, response, _ref, data, title;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              eventId = state.path.replace('/events/', '').replace('/view', '');
              query = '{\n  event(path: "' + eventId + '") {\n    title\n    cover\n    startDate\n    endDate\n    content\n    enrollCount\n    location\n    enrollCount\n    number\n    price\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n    participants {\n      participant {\n        avatar\n        nickname\n        userId\n      }\n    }\n    owner {\n      avatar\n      nickname\n    }\n  }\n}\n';
              /*
              * number 需要报名人数
              * enrollCount 已报名人数
              * */
  
              _context.next = 4;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 4:
              response = _context.sent;
              _context.next = 7;
              return response.json();
  
            case 7:
              _ref = _context.sent;
              data = _ref.data;
              title = data.event.title;
  
              state.context.onSetMeta('og:type', 'article');
              state.context.onSetMeta('og:image', data.event.cover);
              state.context.onSetMeta('og:title', data.event.title);
              state.context.onSetMeta('og:description', data.event.subTitle);
              state.context.onSetMeta('description', data.event.subTitle);
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Event2.default, { event: data.event }));
  
            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Event = __webpack_require__(151);
  
  var _Event2 = _interopRequireDefault(_Event);
  
  var _Comments = __webpack_require__(138);
  
  var _Comments2 = _interopRequireDefault(_Comments);
  
  var _dateFormat = __webpack_require__(141);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _NumberFotmat = __webpack_require__(153);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _Footer = __webpack_require__(108);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Image = __webpack_require__(143);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Event(_ref) {
    var event = _ref.event;
  
    return _react2.default.createElement(
      'div',
      { className: _Event2.default.container },
      _react2.default.createElement(
        'div',
        { className: _Event2.default.header },
        _react2.default.createElement(_Image2.default, { className: _Event2.default.cover, height: '440', src: event.cover }),
        _react2.default.createElement(_Image2.default, { className: _Event2.default.avatar, height: '108', width: '108', src: event.owner.avatar, type: 'avatar' }),
        _react2.default.createElement(
          'p',
          { className: _Event2.default.nickname },
          event.owner.nickname
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Event2.default.info },
        _react2.default.createElement(
          'div',
          { className: _Event2.default.startDate },
          _react2.default.createElement('img', { src: '../../icon_triangle.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '开始时间:'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            _dateFormat2.default.postDate(event.startDate)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Event2.default.endDate },
          _react2.default.createElement('img', { src: '../../icon_triangle.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '结束时间:'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            _dateFormat2.default.postDate(event.endDate)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Event2.default.location },
          _react2.default.createElement('img', { src: '../../icon_triangle.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '地  点:'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            event.location
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Event2.default.number },
          _react2.default.createElement('img', { src: '../../icon_triangle.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '人  数:'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            event.number,
            ' 人'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Event2.default.price },
          _react2.default.createElement('img', { src: '../../icon_triangle.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '价  格:'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            _NumberFotmat2.default.money(event.price / 100),
            ' 元/人'
          )
        )
      ),
      _react2.default.createElement('div', { className: _Event2.default.content, dangerouslySetInnerHTML: { __html: event.content } }),
      _react2.default.createElement(
        'div',
        { className: _Event2.default.participants },
        _react2.default.createElement(
          'div',
          { className: _Event2.default.participantsCount },
          _react2.default.createElement(
            'span',
            null,
            '参加活动  '
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.count },
            '(',
            event.participants.length,
            ')'
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          event.participants.map(function (value, index) {
            return _react2.default.createElement(
              'li',
              { key: index },
              _react2.default.createElement(_Image2.default, { key: index, className: _Event2.default.avatar, height: '112', width: '112', src: value.participant.avatar, type: 'avatar' })
            );
          })
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Comments2.default, { comments: event.comments })
      ),
      _react2.default.createElement(_Footer2.default, null)
    );
  }
  
  Event.propTypes = {
    event: _react.PropTypes.object.isRequired
  };
  exports.default = (0, _withStyles2.default)(Event, _Event2.default);

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(152);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._3g6o{margin:0 0 45px;padding:0;width:100%;background:#fcf8f5;max-width:768px}._1V_N{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;background:#fff}._1V_N ._3_4u{-o-object-fit:cover;object-fit:cover;height:220px;width:100%}._1V_N ._37HN{margin-top:-27px;height:54px;width:54px;border-radius:30px;border:3px solid #fff}._1V_N ._1MaT{margin-top:10px;text-align:center;font-size:15px;color:#ff989e}._36-d{background:#fff;padding:12px}._36-d ._1i5M,._36-d ._3j99,._36-d ._25TK,._36-d .teJM,._36-d .YMWt{margin:12px 0}._36-d ._1i5M img,._36-d ._3j99 img,._36-d ._25TK img,._36-d .teJM img,._36-d .YMWt img{width:13px;height:18px;margin-right:15px}._36-d ._1i5M ._3StE,._36-d ._3j99 ._3StE,._36-d ._25TK ._3StE,._36-d .teJM ._3StE,._36-d .YMWt ._3StE{width:51px;font-size:12px;color:#666}._36-d ._1i5M ._1KIr,._36-d ._3j99 ._1KIr,._36-d ._25TK ._1KIr,._36-d .teJM ._1KIr,._36-d .YMWt ._1KIr{font-size:12px;color:#999;margin-left:8px}._36-d ._3j99 ._1KIr{font-size:12px;margin-left:8px;color:#ff989e}._2a12{background:#fff;line-height:1.8;width:100%;padding:15px 12px}._2a12 img{height:100%;width:100%}._2Gde{background:#fff;padding-bottom:37px;margin-top:10px;margin-bottom:10px}._2Gde ._310g{font-size:15px;padding-top:18px;padding-left:12px;padding-bottom:28px;color:#666}._2Gde ._310g ._3TTE{color:#999}._2Gde ul{overflow-x:auto;padding:0;list-style:none;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;display:-webkit-box}._2Gde ul li{margin-left:15px}._2Gde ul li ._37HN{width:56px;height:56px;border-radius:28px}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3g6o",
  	"header": "_1V_N",
  	"cover": "_3_4u",
  	"avatar": "_37HN",
  	"nickname": "_1MaT",
  	"info": "_36-d",
  	"startDate": "teJM",
  	"endDate": "_25TK",
  	"location": "_1i5M",
  	"number": "YMWt",
  	"price": "_3j99",
  	"title": "_3StE",
  	"value": "_1KIr",
  	"content": "_2a12",
  	"participants": "_2Gde",
  	"participantsCount": "_310g",
  	"count": "_3TTE"
  };

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _numeral = __webpack_require__(154);
  
  var _numeral2 = _interopRequireDefault(_numeral);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _numeral2.default.defaultFormat('￥0.00');
  var NumeralFormat = {
    money: function money(value) {
      return (0, _numeral2.default)(value).format();
    }
  };
  exports.default = NumeralFormat;

/***/ },
/* 154 */
/***/ function(module, exports) {

  module.exports = require("numeral");

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(33);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Photo = __webpack_require__(156);
  
  var _Photo2 = _interopRequireDefault(_Photo);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/photos/*/view'; /**
                                               * Created by diwu on 3/12/16.
                                               */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var photoId, query, response, _ref, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              photoId = state.path.replace('/photos/', '').replace('/view', '');
              query = '{\n  photo(path: "' + photoId + '") {\n    owner {\n      nickname\n      avatar\n    }\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      content\n      createdAt\n      commentId\n      images\n    }\n    createdAt\n    content {\n         desc\n         img\n    }\n  }\n}';
              _context.next = 4;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 4:
              response = _context.sent;
              _context.next = 7;
              return response.json();
  
            case 7:
              _ref = _context.sent;
              data = _ref.data;
  
              state.context.onSetMeta('og:type', 'article');
              state.context.onSetMeta('og:image', data.photo.cover);
              state.context.onSetMeta('og:title', data.photo.title);
              state.context.onSetMeta('og:description', data.photo.subTitle);
              state.context.onSetMeta('description', data.photo.subTitle);
              state.context.onSetTitle('个人作品');
              return _context.abrupt('return', _react2.default.createElement(_Photo2.default, { photo: data.photo }));
  
            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function action(_x) {
      return ref.apply(this, arguments);
    };
  }();

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(51);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(90);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Photo = __webpack_require__(157);
  
  var _Photo2 = _interopRequireDefault(_Photo);
  
  var _Comments = __webpack_require__(138);
  
  var _Comments2 = _interopRequireDefault(_Comments);
  
  var _dateFormat = __webpack_require__(141);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _Image = __webpack_require__(143);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Photo(_ref) {
    var photo = _ref.photo;
  
    return _react2.default.createElement(
      'div',
      { className: _Photo2.default.container },
      _react2.default.createElement(
        'div',
        { className: _Photo2.default.cover },
        _react2.default.createElement(_Image2.default, { height: '768', width: '768', src: photo.content[0].img })
      ),
      _react2.default.createElement(
        'div',
        { className: _Photo2.default.author },
        _react2.default.createElement(
          'div',
          { className: _Photo2.default.header },
          _react2.default.createElement(_Image2.default, { height: '82', width: '82', src: photo.owner.avatar, type: 'avatar' })
        ),
        _react2.default.createElement(
          'div',
          { className: _Photo2.default.body },
          _react2.default.createElement(
            'p',
            { className: _Photo2.default.nickname },
            photo.owner.nickname,
            ':'
          ),
          _react2.default.createElement(
            'p',
            { className: _Photo2.default.content },
            photo.content[0].desc
          ),
          _react2.default.createElement(
            'p',
            { className: _Photo2.default.time },
            _dateFormat2.default.postDate(photo.createdAt)
          )
        )
      ),
      _react2.default.createElement(_Comments2.default, { comments: photo.comments })
    );
  }
  
  Photo.propTypes = {
    photo: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Photo, _Photo2.default);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(158);
      var insertCss = __webpack_require__(86);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(85)();
  // imports
  
  
  // module
  exports.push([module.id, "._1Nld{margin:0 0 45px;padding:0;max-width:768px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:100%;background-color:#fcf8f5}._25cW img{height:347px;width:100%;-o-object-fit:cover;object-fit:cover}._2boW{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:100%;background:#fff;border-bottom:1px solid #e5e5e5}._2boW ._3nx2 img{margin:17px 17px 0;height:41px;width:41px;border-radius:20.5px}._2boW ._3JkA p{margin:14px 0}._2boW ._3JkA .aX5j{color:#ff989e;font-size:12px}._2boW ._3JkA ._3K_D{font-size:17px;color:#666}._2boW ._3JkA .H0ny{font-size:12px;color:#999}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_1Nld",
  	"cover": "_25cW",
  	"author": "_2boW",
  	"header": "_3nx2",
  	"body": "_3JkA",
  	"nickname": "aX5j",
  	"content": "_3K_D",
  	"time": "H0ny"
  };

/***/ },
/* 159 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(161);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  buf.push("<!DOCTYPE html><html lang=\"\" class=\"no-js\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("description", description, true, true)) + "><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\"><style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp) + "</style></head><body><div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp) + "</div><script" + (jade.attr("src", entry, true, true)) + "></script><script>window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\nga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')</script>");
  if ( trackingId)
  {
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer></script>");
  }
  buf.push("</body></html>");}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  }

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(27).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(161);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  buf.push("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Internal Server Error</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><style>* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  margin: 2em auto;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n</style></head><body><h1>Internal Server Error</h1><p>Sorry, something went wrong.</p><pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)) + "</pre></body></html><!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map