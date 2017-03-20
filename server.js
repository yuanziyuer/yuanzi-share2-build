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
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(4);
  
  var _path = __webpack_require__(5);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(6);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(7);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(8);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(9);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(10);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(11);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(12);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _prettyError = __webpack_require__(13);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(14);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _schema = __webpack_require__(26);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(73);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(244);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _config = __webpack_require__(22);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var server = global.server = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
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
  _passport2.default.serializeUser(function (user, done) {
    done(null, user);
  });
  
  _passport2.default.deserializeUser(function (user, done) {
    done(null, user);
  });
  server.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  server.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  // server.get('/login/wechat', passport.authenticate('wechat'));
  // server.get('/login/wechat/return',
  //   (req, res) => {
  //     res.redirect('/');
  //   }
  // );
  
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
  
  server.post('/orders', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var token;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                token = req.body.token.replace(/ /g, '+');
  
                (0, _fetch2.default)('http://api.iyuanzi.com/orders', {
                  headers: {
                    'Accept': 'application/vnd.yuanzi.v4+json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: (0, _stringify2.default)({
                    podcastId: req.body.podcastId,
                    orderCount: 1
                  })
                }).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return res.json(data);
                });
              } catch (err) {
                next(err);
              }
  
            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function (_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
  
  server.post('/payment', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var token;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log((0, _stringify2.default)({
                orderId: req.body.orderId,
                channel: 'wx_pub',
                openId: req.body.openId
              }));
              try {
                token = req.body.token.replace(/ /g, '+');
  
                (0, _fetch2.default)('http://api.iyuanzi.com/payment', {
                  headers: {
                    'Accept': 'application/vnd.yuanzi.v4+json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: (0, _stringify2.default)({
                    orderId: req.body.orderId,
                    channel: 'wx_pub',
                    openId: req.body.openId
                  })
                }).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  console.log(data);
                  return res.json(data);
                });
              } catch (err) {
                console.log(err);
                next(err);
              }
  
            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));
    return function (_x4, _x5, _x6) {
      return ref.apply(this, arguments);
    };
  }());
  
  server.post('/coupons', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var token;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              try {
                token = req.body.token.replace(/ /g, '+');
                // var decoded = jwt.verify(req.cookies.id_token, auth.jwt.secret);
  
                (0, _fetch2.default)('http://api.iyuanzi.com/coupons', {
                  headers: {
                    'Accept': 'application/vnd.yuanzi.v4+json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: (0, _stringify2.default)({
                    couponCode: req.body.couponCode
                  })
                }).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return res.json(data);
                });
              } catch (err) {
                next(err);
              }
  
            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));
    return function (_x7, _x8, _x9) {
      return ref.apply(this, arguments);
    };
  }());
  
  server.post('/paymentByCoupon', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
      var token;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              try {
                console.log(req.body);
                token = req.body.token.replace(/ /g, '+');
                // var decoded = jwt.verify(req.cookies.id_token, auth.jwt.secret);
  
                (0, _fetch2.default)('http://api.iyuanzi.com/payment', {
                  headers: {
                    'Accept': 'application/vnd.yuanzi.v4+json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
  
                  body: (0, _stringify2.default)({
                    podcastId: req.body.podcastId,
                    orderId: req.body.orderId,
                    couponCode: req.body.couponCode
                  })
                }).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  return res.json(data);
                });
              } catch (err) {
                next(err);
              }
  
            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));
    return function (_x10, _x11, _x12) {
      return ref.apply(this, arguments);
    };
  }());
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('/podcastdetail*', function (req, res, next) {
    try {
      var decoded = _jsonwebtoken2.default.verify(req.cookies.id_token, _config.auth.jwt.secret);
      _passport2.default.authenticate('wechatNo', {
        session: true,
        callbackURL: 'http://' + req.headers.host + req.path
      })(req, res, next);
    } catch (err) {
      console.log(err);
      _passport2.default.authenticate('wechat', {
        session: true,
        callbackURL: 'http://' + req.headers.host + req.path
      })(req, res, next);
    }
  }, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, next) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              return _context6.delegateYield(_regenerator2.default.mark(function _callee5() {
                var statusCode, template, data, css, context, expiresIn;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        statusCode = 200;
                        template = __webpack_require__(245);
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
                        _context5.next = 8;
                        return _routes2.default.dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                          data.body = _server2.default.renderToString(component);
                          data.css = css.join('');
                          data.appData = (0, _stringify2.default)(req.user);
                        });
  
                      case 8:
  
                        res.status(statusCode);
                        expiresIn = 60 * 60 * 24 * 180; // 180 days
                        // const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn: expiresIn});
                        // res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  
                        res.send(template(data));
  
                      case 11:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              })(), 't0', 2);
  
            case 2:
              _context6.next = 7;
              break;
  
            case 4:
              _context6.prev = 4;
              _context6.t1 = _context6['catch'](0);
  
              next(_context6.t1);
  
            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 4]]);
    }));
    return function (_x13, _x14, _x15) {
      return ref.apply(this, arguments);
    };
  }());
  
  server.get('*', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              return _context8.delegateYield(_regenerator2.default.mark(function _callee7() {
                var statusCode, template, data, css, context;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        statusCode = 200;
                        template = __webpack_require__(245);
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
                        _context7.next = 8;
                        return _routes2.default.dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                          data.body = _server2.default.renderToString(component);
                          data.css = css.join('');
                          try {
                            var decoded = _jsonwebtoken2.default.verify(req.cookies.id_token, _config.auth.jwt.secret);
                            data.appData = (0, _stringify2.default)(decoded);
                          } catch (err) {}
                        });
  
                      case 8:
  
                        res.status(statusCode);
  
                        res.send(template(data));
  
                      case 10:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, _callee7, undefined);
              })(), 't0', 2);
  
            case 2:
              _context8.next = 7;
              break;
  
            case 4:
              _context8.prev = 4;
              _context8.t1 = _context8['catch'](0);
  
              next(_context8.t1);
  
            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[0, 4]]);
    }));
    return function (_x16, _x17, _x18) {
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
    var template = __webpack_require__(247);
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

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _assign = __webpack_require__(15);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(16);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(17);
  
  var _passportWeixin = __webpack_require__(18);
  
  var _db = __webpack_require__(19);
  
  var _db2 = _interopRequireDefault(_db);
  
  var _config = __webpack_require__(22);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
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
  
  var baseUrl = process.env.URL_PRODUCTION || 'http://test.iyuanzi.com';
  _passport2.default.use('wechat', new _passportWeixin.Strategy({
    clientID: _config.auth.wechat.id,
    name: 'wechat',
    clientSecret: _config.auth.wechat.secret,
    callbackURL: 'http://share.iyuanzi.com/login/wechat/return',
    authorizationURL: 'https://open.weixin.qq.com/connect/oauth2/authorize',
    scope: 'snsapi_userinfo',
    requireState: false
  }, function (accessToken, refreshToken, profile, done) {
    var user = {
      userId: profile._json.unionid || profile._json.openid,
      nickname: profile.displayName,
      avatar: profile.profileUrl,
      clientId: 'ios',
      account: {
        username: profile._json.unionid || profile._json.openid,
        password: profile._json.unionid || profile._json.openid,
        platform: 'weixin',
        dynamicCode: "",
        ThirdPartyId: profile._json.openid
      }
    };
    (0, _fetch2.default)(baseUrl + '/oauth/register', {
      headers: {
        'Accept': 'application/vnd.yuanzi.v4+json',
        'Authorization': 'Bearer unsign',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: (0, _stringify2.default)(user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      data = (0, _assign2.default)(data, {
        userId: profile._json.unionid || profile._json.openid,
        openId: profile._json.openid
      });
      console.log('get data');
      done(null, data);
    }).catch(done);;
  }));
  
  _passport2.default.use('wechatNo', new _passportWeixin.Strategy({
    clientID: _config.auth.wechat.id,
    name: 'wechatNo',
    clientSecret: _config.auth.wechat.secret,
    callbackURL: 'http://share.iyuanzi.com/login/wechat/return',
    authorizationURL: 'https://open.weixin.qq.com/connect/oauth2/authorize',
    scope: 'snsapi_base',
    requireState: false
  }, function (accessToken, refreshToken, profile, done) {
    var user = {
      userId: profile._json.unionid || profile._json.openid,
      clientId: 'ios',
      account: {
        username: profile._json.unionid || profile._json.openid,
        password: profile._json.unionid || profile._json.openid,
        platform: 'weixin',
        dynamicCode: "",
        ThirdPartyId: profile._json.openid
      }
    };
    (0, _fetch2.default)(baseUrl + '/oauth/register', {
      headers: {
        'Accept': 'application/vnd.yuanzi.v4+json',
        'Authorization': 'Bearer unsign',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: (0, _stringify2.default)(user)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      data = (0, _assign2.default)(data, {
        userId: profile._json.unionid || profile._json.openid,
        openId: profile._json.openid
      });
      done(null, data);
    }).catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("passport-weixin");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _pg = __webpack_require__(20);
  
  var _pg2 = _interopRequireDefault(_pg);
  
  var _bluebird = __webpack_require__(21);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _config = __webpack_require__(22);
  
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
/* 20 */
/***/ function(module, exports) {

  module.exports = require("pg");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

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
  __webpack_require__(23).config();
  var port = exports.port = process.env.PORT || 4000;
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
    },
  
    wechat: {
      id: process.env.WECHAT_APP_ID || 'wx59c71c7bb3b9af6b',
      secret: process.env.WECHAT_APP_SECRET || 'db89ca26684d669ce025d1e6152c2a07'
    }
  
  };

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("dotenv");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(21);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(25);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(22);
  
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
/* 25 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _me = __webpack_require__(28);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(30);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(37);
  
  var _news2 = _interopRequireDefault(_news);
  
  var _strategy = __webpack_require__(39);
  
  var _strategy2 = _interopRequireDefault(_strategy);
  
  var _topic = __webpack_require__(47);
  
  var _topic2 = _interopRequireDefault(_topic);
  
  var _event = __webpack_require__(49);
  
  var _event2 = _interopRequireDefault(_event);
  
  var _photo = __webpack_require__(52);
  
  var _photo2 = _interopRequireDefault(_photo);
  
  var _article = __webpack_require__(53);
  
  var _article2 = _interopRequireDefault(_article);
  
  var _podcast = __webpack_require__(55);
  
  var _podcast2 = _interopRequireDefault(_podcast);
  
  var _podcasts = __webpack_require__(57);
  
  var _podcasts2 = _interopRequireDefault(_podcasts);
  
  var _order = __webpack_require__(59);
  
  var _order2 = _interopRequireDefault(_order);
  
  var _payment = __webpack_require__(61);
  
  var _payment2 = _interopRequireDefault(_payment);
  
  var _topics = __webpack_require__(63);
  
  var _topics2 = _interopRequireDefault(_topics);
  
  var _coupons = __webpack_require__(65);
  
  var _coupons2 = _interopRequireDefault(_coupons);
  
  var _user = __webpack_require__(68);
  
  var _user2 = _interopRequireDefault(_user);
  
  var _shares = __webpack_require__(69);
  
  var _shares2 = _interopRequireDefault(_shares);
  
  var _podcastsPay = __webpack_require__(72);
  
  var _podcastsPay2 = _interopRequireDefault(_podcastsPay);
  
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
        event: _event2.default,
        article: _article2.default,
        podcast: _podcast2.default,
        podcasts: _podcasts2.default,
        order: _order2.default,
        payment: _payment2.default,
        topics: _topics2.default,
        coupons: _coupons2.default,
        user: _user2.default,
        shares: _shares2.default,
        podcastsPay: _podcastsPay2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(29);
  
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      userId: { type: _graphql.GraphQLString },
      email: { type: _graphql.GraphQLString },
      avatar: { type: _graphql.GraphQLString },
      nickname: { type: _graphql.GraphQLString },
      description: { type: _graphql.GraphQLString },
      followersCount: { type: _graphql.GraphQLString },
      fansCount: { type: _graphql.GraphQLString }
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(31);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(15);
  
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
  
  var _fs = __webpack_require__(32);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(5);
  
  var _bluebird = __webpack_require__(21);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(33);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(34);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(35);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(27);
  
  var _ContentType = __webpack_require__(36);
  
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
/* 31 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(38);
  
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _StrategyType = __webpack_require__(40);
  
  var _StrategyType2 = _interopRequireDefault(_StrategyType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/strategies/' + path, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _PhotoType = __webpack_require__(41);
  
  var _PhotoType2 = _interopRequireDefault(_PhotoType);
  
  var _CommentType = __webpack_require__(42);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _MaterialType = __webpack_require__(43);
  
  var _MaterialType2 = _interopRequireDefault(_MaterialType);
  
  var _ToolsType = __webpack_require__(44);
  
  var _ToolsType2 = _interopRequireDefault(_ToolsType);
  
  var _StepsType = __webpack_require__(45);
  
  var _StepsType2 = _interopRequireDefault(_StepsType);
  
  var _LabelType = __webpack_require__(46);
  
  var _LabelType2 = _interopRequireDefault(_LabelType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
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
      commentCount: { type: _graphql.GraphQLInt },
      materials: { type: new _graphql.GraphQLList(_MaterialType2.default) },
      tools: { type: new _graphql.GraphQLList(_ToolsType2.default) },
      steps: { type: new _graphql.GraphQLList(_StepsType2.default) },
      scope: { type: _graphql.GraphQLInt },
      consumingTime: { type: _graphql.GraphQLInt },
      degree: { type: _graphql.GraphQLInt },
      strategyId: { type: _graphql.GraphQLString },
      video: { type: _graphql.GraphQLString },
      good: { type: _graphql.GraphQLString },
      labels: { type: new _graphql.GraphQLList(_LabelType2.default) }
    }
  });
  
  exports.default = StrategyType;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _CommentType = __webpack_require__(42);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(29);
  
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
      createdAt: { type: _graphql.GraphQLString },
      commentCount: { type: _graphql.GraphQLInt }
    }
  });
  
  exports.default = PhotoType;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _UserType = __webpack_require__(29);
  
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var MaterialType = new _graphql.GraphQLObjectType({
    name: 'Material',
    fields: {
      amount: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString }
    }
  });
  exports.default = MaterialType;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var ToolsType = new _graphql.GraphQLObjectType({
    name: 'Tool',
    fields: {
      amount: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString }
    }
  });
  exports.default = ToolsType;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var LabelType = new _graphql.GraphQLObjectType({
    name: 'Label',
    fields: {
      title: { type: _graphql.GraphQLString }
    }
  });
  exports.default = LabelType;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _TopicType = __webpack_require__(48);
  
  var _TopicType2 = _interopRequireDefault(_TopicType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/topics/' + path, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _StrategyType = __webpack_require__(40);
  
  var _StrategyType2 = _interopRequireDefault(_StrategyType);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _LabelType = __webpack_require__(46);
  
  var _LabelType2 = _interopRequireDefault(_LabelType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var TopicType = new _graphql.GraphQLObjectType({
    name: 'Topic',
    fields: {
      topicId: { type: _graphql.GraphQLString },
      owner: { type: _UserType2.default },
      title: { type: _graphql.GraphQLString },
      subTitle: { type: _graphql.GraphQLString },
      cover: { type: _graphql.GraphQLString },
      strategies: { type: new _graphql.GraphQLList(_StrategyType2.default) },
      viewCount: { type: _graphql.GraphQLInt },
      collectCount: { type: _graphql.GraphQLInt },
      content: { type: _graphql.GraphQLString },
      labels: { type: new _graphql.GraphQLList(_LabelType2.default) }
    }
  });
  
  exports.default = TopicType;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _EventType = __webpack_require__(50);
  
  var _EventType2 = _interopRequireDefault(_EventType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/events/' + path, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
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
  
  var _graphql = __webpack_require__(27);
  
  var _CommentType = __webpack_require__(42);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _ParticipantType = __webpack_require__(51);
  
  var _ParticipantType2 = _interopRequireDefault(_ParticipantType);
  
  var _StrategyType = __webpack_require__(40);
  
  var _StrategyType2 = _interopRequireDefault(_StrategyType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var EventType = new _graphql.GraphQLObjectType({
    name: 'Event',
    fields: {
      owner: { type: _UserType2.default },
      title: { type: _graphql.GraphQLString },
      content: { type: _graphql.GraphQLString },
      number: { type: _graphql.GraphQLString },
      price: { type: _graphql.GraphQLString },
      participantCount: { type: _graphql.GraphQLInt },
      cover: { type: _graphql.GraphQLString },
      comments: { type: new _graphql.GraphQLList(_CommentType2.default) },
      startDate: { type: _graphql.GraphQLString },
      endDate: { type: _graphql.GraphQLString },
      location: { type: _graphql.GraphQLString },
      enrollCount: { type: _graphql.GraphQLInt },
      participants: { type: new _graphql.GraphQLList(_ParticipantType2.default) },
      commentCount: { type: _graphql.GraphQLInt },
      minAge: { type: _graphql.GraphQLInt },
      maxAge: { type: _graphql.GraphQLInt },
      minNumber: { type: _graphql.GraphQLInt },
      strategy: { type: new _graphql.GraphQLObjectType({
          name: 'StrategySimple',
          fields: {
            owner: { type: _UserType2.default },
            title: { type: _graphql.GraphQLString },
            strategyId: { type: _graphql.GraphQLString }
          }
        }) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = EventType;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _UserType = __webpack_require__(29);
  
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _PhotoType = __webpack_require__(41);
  
  var _PhotoType2 = _interopRequireDefault(_PhotoType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/photos/' + path + '?version=v2', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _ArticleType = __webpack_require__(54);
  
  var _ArticleType2 = _interopRequireDefault(_ArticleType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
    type: _ArticleType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/articles/' + path, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _CommentType = __webpack_require__(42);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ArticleType = new _graphql.GraphQLObjectType({
    name: 'Article',
    fields: {
      owner: { type: _UserType2.default },
      photos: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
      title: { type: _graphql.GraphQLString },
      comments: { type: new _graphql.GraphQLList(_CommentType2.default) },
      commentsCount: { type: _graphql.GraphQLInt },
      createdAt: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ArticleType;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _PodcastType = __webpack_require__(56);
  
  var _PodcastType2 = _interopRequireDefault(_PodcastType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
  var topic = {
    type: _PodcastType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      token: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
      var token = _ref2.token;
  
      token = token.replace(/ /g, '+');
      return (0, _fetch2.default)(baseUrl + '/podcasts/' + path, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      });
    }
  };
  
  exports.default = topic;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _CommentType = __webpack_require__(42);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var PodcastType = new _graphql.GraphQLObjectType({
    name: 'Podcast',
    fields: {
      podcastId: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString },
      cover: { type: _graphql.GraphQLString },
      price: { type: _graphql.GraphQLString },
      user: { type: _UserType2.default },
      content: { type: _graphql.GraphQLString },
      syllabus: { type: _graphql.GraphQLString },
      startDate: { type: _graphql.GraphQLString },
      endDate: { type: _graphql.GraphQLString },
      enrollCount: { type: _graphql.GraphQLInt },
      userScore: { type: _graphql.GraphQLString },
      roomNumber: { type: _graphql.GraphQLString },
      lecturer: { type: _graphql.GraphQLString },
      lecturerIntroduction: { type: _graphql.GraphQLString },
      lecturerAvatar: { type: _graphql.GraphQLString },
      joined: { type: _graphql.GraphQLBoolean },
      comments: { type: new _graphql.GraphQLList(_CommentType2.default) },
      commentCount: { type: _graphql.GraphQLInt },
      scope: { type: _graphql.GraphQLInt },
      relevantPodcasts: { type: new _graphql.GraphQLList(new _graphql.GraphQLObjectType({
          name: 'relevantPodcast',
          fields: {
            podcastId: { type: _graphql.GraphQLString },
            title: { type: _graphql.GraphQLString },
            cover: { type: _graphql.GraphQLString },
            price: { type: _graphql.GraphQLString },
            user: { type: _UserType2.default },
            content: { type: _graphql.GraphQLString },
            startDate: { type: _graphql.GraphQLString },
            enrollCount: { type: _graphql.GraphQLInt },
            userScore: { type: _graphql.GraphQLString },
            roomNumber: { type: _graphql.GraphQLString },
            joined: { type: _graphql.GraphQLBoolean }
          }
        })) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = PodcastType;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _PodcastsType = __webpack_require__(58);
  
  var _PodcastsType2 = _interopRequireDefault(_PodcastsType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
    type: _PodcastsType2.default,
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/podcasts?isBanner=true', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign',
          'Content-Type': 'application/json',
          'Range': 'page:1,max:1000'
        }
      }).then(function (response) {
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _PodcastType = __webpack_require__(56);
  
  var _PodcastType2 = _interopRequireDefault(_PodcastType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var PodcastsType = new _graphql.GraphQLObjectType({
    name: 'Podcasts',
    fields: {
      podcasts: { type: new _graphql.GraphQLList(_PodcastType2.default) },
      hotPodcasts: { type: new _graphql.GraphQLList(_PodcastType2.default) },
      recommendPodcasts: { type: new _graphql.GraphQLList(_PodcastType2.default) }
    }
  });
  
  exports.default = PodcastsType;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _OrderType = __webpack_require__(60);
  
  var _OrderType2 = _interopRequireDefault(_OrderType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
  var topic = {
    type: _OrderType2.default,
    args: {
      podcastId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      token: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var podcastId = _ref2.podcastId;
      var token = _ref2.token;
  
      token = token.replace(/ /g, '+');
      return (0, _fetch2.default)(baseUrl + '/orders', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: (0, _stringify2.default)({
          podcastId: podcastId,
          orderCount: 1
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      });
    }
  };
  
  exports.default = topic;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _CommentType = __webpack_require__(42);
  
  var _CommentType2 = _interopRequireDefault(_CommentType);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var PodcastType = new _graphql.GraphQLObjectType({
    name: 'Order',
    fields: {
      orderId: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = PodcastType;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _PaymentType = __webpack_require__(62);
  
  var _PaymentType2 = _interopRequireDefault(_PaymentType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
  var topic = {
    type: _PaymentType2.default,
    args: {
      orderId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      token: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      openId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var orderId = _ref2.orderId;
      var token = _ref2.token;
      var openId = _ref2.openId;
  
      token = token.replace(/ /g, '+');
      return (0, _fetch2.default)(baseUrl + '/payment', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: (0, _stringify2.default)({
          orderId: orderId,
          channel: 'wx_pub',
          openId: openId
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      });
    }
  };
  
  exports.default = topic;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var p = new _graphql.GraphQLObjectType({
    name: 'Payment',
    fields: {
      charge: { type: new _graphql.GraphQLObjectType({
          name: 'Charge',
          fields: {
            id: { type: _graphql.GraphQLString }
          }
        }) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = p;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _TopicsType = __webpack_require__(64);
  
  var _TopicsType2 = _interopRequireDefault(_TopicsType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
  // React.js News Feed (RSS)
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var baseUrl = 'http://staging.iyuanzi.com' || 'http://test.iyuanzi.com';
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  var topics = {
    type: _TopicsType2.default,
    args: {
      type: { type: _graphql.GraphQLString }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var type = _ref2.type;
  
      var items = void 0;
      var a = encodeURI(type);
      console.log(baseUrl + '/topics?' + a);
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/topics?' + a, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = topics;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _TopicType = __webpack_require__(48);
  
  var _TopicType2 = _interopRequireDefault(_TopicType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var TopicsType = new _graphql.GraphQLObjectType({
    name: 'Topics',
    fields: {
      topics: { type: new _graphql.GraphQLList(_TopicType2.default) }
    }
  });
  
  exports.default = TopicsType;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _CouponsType = __webpack_require__(66);
  
  var _CouponsType2 = _interopRequireDefault(_CouponsType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  __webpack_require__(23).config();
  
  // React.js News Feed (RSS)
  var baseUrl = process.env.URL_PRODUCTION || 'http://test.iyuanzi.com';
  var coupons = {
    type: _CouponsType2.default,
    args: {
      token: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var token = _ref2.token;
  
      token = token.replace(/ /g, '+');
      return (0, _fetch2.default)(baseUrl + '/coupons', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      });
    }
  };
  
  exports.default = coupons;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _CouponType = __webpack_require__(67);
  
  var _CouponType2 = _interopRequireDefault(_CouponType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var CouponsType = new _graphql.GraphQLObjectType({
    name: 'Coupons',
    fields: {
      coupons: { type: new _graphql.GraphQLList(_CouponType2.default) }
    }
  });
  
  exports.default = CouponsType;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var CouponType = new _graphql.GraphQLObjectType({
    name: 'Coupon',
    fields: {
      coupon: { type: _graphql.GraphQLString },
      expired: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = CouponType;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
  var user = {
    type: _UserType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/users/' + path, {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = user;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _SharesType = __webpack_require__(70);
  
  var _SharesType2 = _interopRequireDefault(_SharesType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
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
  var shares = {
    type: _SharesType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)(baseUrl + '/users/' + path + '/communions', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        items = data;
        return items;
      });
      if (!items) return lastFetchTask;
      return items;
    }
  };
  
  exports.default = shares;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _ShareType = __webpack_require__(71);
  
  var _ShareType2 = _interopRequireDefault(_ShareType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var SharesType = new _graphql.GraphQLObjectType({
    name: 'Shares',
    fields: {
      data: { type: new _graphql.GraphQLList(_ShareType2.default) }
    }
  });
  
  exports.default = SharesType;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var ShareType = new _graphql.GraphQLObjectType({
    name: 'Share',
    fields: {
      title: { type: _graphql.GraphQLString },
      cover: { type: _graphql.GraphQLString },
      type: { type: _graphql.GraphQLString },
      createdAt: { type: _graphql.GraphQLString },
      additionalId: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ShareType;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _PodcastsType = __webpack_require__(58);
  
  var _PodcastsType2 = _interopRequireDefault(_PodcastsType);
  
  var _graphql = __webpack_require__(27);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  __webpack_require__(23).config();
  // React.js News Feed (RSS)
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var baseUrl = 'http://staging.iyuanzi.com' || 'http://test.iyuanzi.com';
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  var topic = {
    type: _PodcastsType2.default,
    resolve: function resolve(_ref, _ref2) {
      var request = _ref.request;
      var path = _ref2.path;
  
      var items = void 0;
      lastFetchTime = new Date();
      lastFetchTask = (0, _fetch2.default)('http://staging.iyuanzi.com/podcasts?price=0', {
        headers: {
          'Accept': 'application/vnd.yuanzi.v4+json',
          'Authorization': 'Bearer unsign',
          'Content-Type': 'application/json',
          'Range': 'page:1,max:1000'
        }
      }).then(function (response) {
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Router = __webpack_require__(75);
  
  var _Router2 = _interopRequireDefault(_Router);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _App = __webpack_require__(99);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ContentPage = __webpack_require__(134);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  var _NotFoundPage = __webpack_require__(137);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _ErrorPage = __webpack_require__(140);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var routes = [__webpack_require__(143), __webpack_require__(147), __webpack_require__(151), __webpack_require__(155), __webpack_require__(178), __webpack_require__(182), __webpack_require__(188), __webpack_require__(192), __webpack_require__(196), __webpack_require__(200), __webpack_require__(205), __webpack_require__(217), __webpack_require__(221), __webpack_require__(226), __webpack_require__(232), __webpack_require__(236), __webpack_require__(240)]; /**
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
                  { context: state.context, path: state.path, os: state.os, window: state.window },
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
/* 74 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray2 = __webpack_require__(76);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _regenerator = __webpack_require__(78);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _getIterator2 = __webpack_require__(87);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _asyncToGenerator2 = __webpack_require__(89);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _create = __webpack_require__(90);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(92);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(93);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _Route = __webpack_require__(95);
  
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _isIterable2 = __webpack_require__(77);
  
  var _isIterable3 = _interopRequireDefault(_isIterable2);
  
  var _getIterator2 = __webpack_require__(31);
  
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
/* 77 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/is-iterable");

/***/ },
/* 78 */
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
  
  module.exports = __webpack_require__(79);
  
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {"use strict";
  
  var _promise = __webpack_require__(81);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _setPrototypeOf = __webpack_require__(82);
  
  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
  
  var _create = __webpack_require__(83);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _typeof2 = __webpack_require__(84);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _iterator = __webpack_require__(85);
  
  var _iterator2 = _interopRequireDefault(_iterator);
  
  var _symbol = __webpack_require__(86);
  
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
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(80)(module)))

/***/ },
/* 80 */
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
/* 81 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/set-prototype-of");

/***/ },
/* 83 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/create");

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 85 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol/iterator");

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol");

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/get-iterator");

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _promise = __webpack_require__(81);
  
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/object/create");

/***/ },
/* 92 */
/***/ function(module, exports) {

  "use strict";
  
  exports.__esModule = true;
  
  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _defineProperty = __webpack_require__(94);
  
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
/* 94 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/define-property");

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(92);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(93);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _pathToRegexp = __webpack_require__(96);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(98);
  
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(97)
  
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
   * @param  {string} str
   * @return {!Array}
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
  
      var next = str[index]
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var modifier = res[6]
      var asterisk = res[7]
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var partial = prefix != null && next != null && next !== prefix
      var repeat = modifier === '+' || modifier === '*'
      var optional = modifier === '?' || modifier === '*'
      var delimiter = res[2] || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        asterisk: !!asterisk,
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
   * @param  {string}             str
   * @return {!function(Object=, Object=)}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Prettier encoding of URI path segments.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeURIComponentPretty (str) {
    return encodeURI(str).replace(/[\/?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  
  /**
   * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeAsterisk (str) {
    return encodeURI(str).replace(/[?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
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
        matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
      }
    }
  
    return function (obj, opts) {
      var path = ''
      var data = obj || {}
      var options = opts || {}
      var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent
  
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
            // Prepend partial segment prefixes.
            if (token.partial) {
              path += token.prefix
            }
  
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = token.asterisk ? encodeAsterisk(value) : encode(value)
  
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
   * @param  {string} str
   * @return {string}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {!RegExp} re
   * @param  {Array}   keys
   * @return {!RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {!Array}  keys
   * @return {!RegExp}
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
          partial: false,
          asterisk: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array}   keys
   * @param  {!Object} options
   * @return {!RegExp}
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
   * @param  {string}  path
   * @param  {!Array}  keys
   * @param  {!Object} options
   * @return {!RegExp}
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
   * @param  {!Array}  tokens
   * @param  {Object=} options
   * @return {!RegExp}
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
        var capture = '(?:' + token.pattern + ')'
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (!token.partial) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = prefix + '(' + capture + ')?'
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
   * @param  {(string|RegExp|Array)} path
   * @param  {(Array|Object)=}       keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys)
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, /** @type {!Array} */ (keys))
    }
  
    if (isarray(path)) {
      return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
    }
  
    return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
  }


/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _create = __webpack_require__(90);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(92);
  
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(105);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(106);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(111);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(127);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(130);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _mobileDetect = __webpack_require__(133);
  
  var _mobileDetect2 = _interopRequireDefault(_mobileDetect);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
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
      key: 'directLink',
      value: function directLink() {
        var _this2 = this;
  
        if (this.props.window) {
          (function () {
            var launchApp = "http://app.mi.com/detail/76839?ref=search";
            // if(this.props.path) {
            //   let type = this.props.path.split('/')[1];
            //   let id = this.props.path.split('/')[2];
            //   if(this.props.os) {
            //     if(this.props.os == 'AndroidOS') {
            //       launchApp = 'iyuanzi://'+type+'?id='+id
            //     }
            //     if(this.props.os == 'iOS') {
            //       launchApp = 'iyuanzi://'+type+'/'+id
            //     }
            //   }
            // }
            var self = _this2;
            console.log(self.props.os);
            setTimeout(function () {
              if (self.props.os) {
                if (self.props.os == 'AndroidOS') {
                  self.props.window.location = "http://app.mi.com/detail/76839?ref=search"; //play store URL.
                }
                if (self.props.os == 'iOS') {
                  self.props.window.location = "https://itunes.apple.com/us/app/yuan-zi-yu-er-qin-zi-zao-jiao/id896513476?ls=1&mt=8"; //play store URL.
                }
              }
            }, 25);
            // this.props.window.location = launchApp
          })();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2.default.createElement(
          'div',
          { className: _App2.default.root },
          this.props.children,
          _react2.default.createElement(_Footer2.default, { launchApp: this.directLink.bind(this) })
        ) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
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
/* 100 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 101 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 102 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 103 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(107);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}body{margin:0}*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}p,ul{margin:0}a{color:#0074c2}._3yYg{margin:0 auto;width:100%;max-width:768px}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:' (' attr(href) ')'}abbr[title]:after{content:' (' attr(title) ')'}a[href^='#']:after,a[href^='javascript:']:after{content:''}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3yYg"
  };

/***/ },
/* 108 */
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
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(15);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(110);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(31);
  
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
/* 110 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(113);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(115);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(122);
  
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
          _react2.default.createElement('img', { src: __webpack_require__(126), width: '38', height: '38', alt: 'React' }),
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
/* 112 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(114);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(116);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(117);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Location = __webpack_require__(118);
  
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
/* 116 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 117 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(119);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(120);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(121);
  
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
/* 119 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 120 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 121 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(123);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(124);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(115);
  
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
/* 123 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(125);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
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
/* 126 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACrRJREFUeNqcWAlQlFcSnosBhmFmBAaVG0RAEBQVUUh2jRKjiKJGEfFE8YisGkw066rrmd2o5bWaaIyaQuMRo/EAiRG8SojxwAMFEQWEkUMYkBlmmHtmu//9f+rtXzhFQlXXPN7r192vX/fX/X4+x/4fF4gHxAcSADnQvwJ6jksThxhz6TU+zU/u4RH8dv/43TCKMUhIkyP9y2cZx+Z3ZPGTh/nThpFKGOFOBAlp5Xyaj+1Vht+Z4O/KMNu7DBPYMZoxDJU4i739xe/96+BIB1epXFtf+7p4x9p7quoKLayZgUxAFuKw1PVJA0NcBn+2JcbFy8/H1K5qLvzHwmuauhoNbRwaZaWpS8+8y5NC+rSiPhPSfOM2f3NY4OwSzjBYLea3bRWlh36dl3hc39JkJBTwnNw9hR8dyZshC4nI4PEFPZg9Zp227Pb6pRkvzx+rhX87gPRARuJQdq+SuUZHmkSjD+duAk9Flh/fn1mweNJ2LpdbiB6UBvSdEzZ94QhQ+Kz58V30mnP47L/1HbX/7D5xb9/xHU0N1yt+PPTV1cwp2/lCx0J59LCpntGx3qVHdl+ljbHSHrd1x2Nc2lsYHyJZnzC3iZce33n7/En2heQhh0nXx67dNThk6ryNPAcHSVn23i04Fz5n6VqryaSu+OnI+jtbsorJ0JiY82C+rG/EnPPjBsS2VZa30l7T0V6zsePILkyEpMwP4PJ4opbShw/p0xlpMoHikivzxy0ztLUqIuYu34iEY5zDNTr2GH4zePUhygpJyQgkEof7rgB/l2GUcc4ePakY0b6pa6dPxQQtrgve3C/Uvzjz/UUun++I9PzHQxdwjk4cLs1L7etobkQZHGcPTxlhFPePZGUnSJp1HdSEk8xdyuKnsi8wMcU/Iv3TJR3NDdU4GZnxWWbbizJFdd5pDWEcpctR5ib53yHr9SwctOsxNspT+NV4v7ANFx1lPXrDjwtJrj4BkrhNX6+2mk3G/PlJ+5BwjHO4xuIXOcncUAZHWXJPQwC2oKtr5XWB2gw4Ur/VOafUoKxd7BOIUOEKJIPrlQeNnx764eFLWUKJzKfl6YPf+89fEYWEY5zDNeRBXtwDJBF7B/RDWbX5Fzro5HJkVYZOe9i1jTmFC22EBLBLOqWgfJfAWSTVKZsUzp69Ah1EYo/ulhaMLVOHRqlraqyG2PKF0FCdSQjLAohRwZoaCONOSyQJwoiFSxRYIVFyRKGpC/qGz14629UvKAEwCE/M6XhT97JdUV1lUL1V+Y1Mmqypr31y64t5Bw1tLUZNvQKFc8Revi6OMnfh+1uPLBR7+UXWXsv92VHaQ+rqGxgk6ukdjDwWo6GtvbaqoOzo3qPPT333ggBbBnDNfFZtE/mOTPIceyx/U9C4aeuEUpl/e01lUX1RQUGP0MiYF2ezT9/4NC0/In35MGd5T+9bK9O3wVqzvqXZaDUarEgwNkHZ0amrKyoCk1ISTJr2lkupfzkFRurlA2OHVOWc3A8HbZcEBI/0Gzl+Zmhqhr/61csHwG8is55PFFrR8PV7Bw/+/MtsBxfXUOWT4oNXP5m85eGeDYU1V87VAKK/J5L3loC3GsJnZabX3bpy9uHeTQ/wSoOSUv1j1+xIDJ40K8pqNmveVjxVq2tedsijYmy9Y0ckqaqe3wtJmTcSMMycOyV+D1SQm4pruWfcw6PbwMBJAWM+ngSyH72++UszAUdUYHoHjJ0ydM4znXLmo7fPgifOGgtz0UCDEOCBRo0+fCl7brnBlHKzqhR4Wpzc5HNhPjV62fptc5/pTekVJhsSjqOXb9iOa3Clc4C3GffgXpSBsmiZKDsadaFO1I02oC1oUyc8DMxcm8Ll8lxv/zNzJRTZRhq19XTJ0BXvWJPDsdksLr19wxVXc87oW5sxLmxhMxanArB24huOw9IWTcM1iD0d8P6Me2CvtXjXulxGHi3bhLpQJ+pGGxj46ExPoavE12LQ11VePNFM9EpWJktayh6pda1NL9C4h3s3/8bUNiG0Qew0JOZsFC/swb0AJSpGHlEROKgTdYMNPky28xgDdMo3pQAJ/tA/hbDQn8pav4RkL5FHr36AMPyhq7ePZjBH19xYzTZM19TAzPEoXtgDe8NQRhetOQd1om6woYyJLx7T6EHanwVsqQSQ3Dl8w76BdLZSHQb+Ri74PBnA0QCB/ZtXfEKyrG84lihO8c51P9CYxPRcquLd64+hUuQB3gm4B/o3Q9SiVcmkTNSBulAn6kYb6BBCmygmdyC/kKnp8TOKlXcgiC0pNypz+s1ckobBCnGTjEE84dzdm5DyWRCohqSfin7FAEeC8jMfWqDdSDhm5pEHeXEP7gUZSpSFMlE26kBdoPMu6kYbaFtEXKIkUJABqC5KPHkjHU67gCdwkEJ3Wgqg+gqEJwF07Hz09ZdlCQfOjfX9YNzE2xuXris/8W0l09SS9RcayCDwxhYA2HMAO5cHZq4Jh2xd0fzoTi6AbQB0uRFwAyoo+N/lTR/xPVSHDrKr5RL3TT46RNKgUI+Yv2+b4B4RPQbioz/GCQjSQxzUAIi+cQ8fGG9QtdaVnzx4wmY2WyFLNVQX4iYXcwUCHhiW5ih184GkKXRyl/eEmukPB3XCROhQNj6F/u7yva9WXQCMayEMMjBlqat3oJC+XglNrqlFit0AjkLoOp9AS+0PWecpcBF7QD/vZK9IQlzpzVqN0tiuaoJqUAPdcKTNajWcivfNIuqkmjbMSDxqLAI6Ky2sVwuPKejQKTiBF/q8KS46/cvMUSfIKxtzND+t97ARsxQ38k7XFlwsx0m/hAlhviMSUxp+v3Hs8uwP/49/7PFr03sOipsGMk1GdZueqI962ihGv43HwiymdTYwG+CFJMPOFAp4BX06FU3qgkUTj2sbX5d4xyeMh67BZtJqbDjGufyMpB/Y/PDse46yoB6LCB3M9ZlJbOOxHp82AgApIz0iB1NdJ7Q8DTRiM0GqgxTXQWBvA3BUx23clxm/+ZtMHFNzRoOOza9vVaIMjnzAUAn76gj9dnv+TgO5PD715oOs0RKIbaGFmiCIW0sObj/gIJZ4IOEY51gPYWoPyNBRlUEs4bPRv7s9P7PBqm1QoBKOxC/Ig04Q8jFigRbIa8Anq5dY9DqKD8fQ/rx+emRXC6s75tEyOLRMK9lJdPeV1FknS77dVg3Z1SYfEBtHwgqkvhCCeVLMqq3/sVnM2qK1i1cUrlmUBWPNkJX/3oNryEO2zh5RQ4ejLJBZxbrCbnmMTASzSdtu0NYrzgMozgBlNVCIK9z6DQj2iBryMYBxCAR63lV4nQNeUc8pVeWz9FEHzq3sFfP+F2n3myYrS+6faX32+KV7/0Eh4LGp7a9fHQeZTLC/8zrtfbtwYL7YyIL7uY3JvrLVWd4rkfkgYlS9vVt/+9qh68tSi4iM6vwY88Gek3FecaMyhNIescweKPh5+YuSV8PhlGTr09W3C66ddyX5SYnqcqEI+8mCwz0V1/Nq4d3YQgS4mfW1h+kg8N3p7vPXj/wA4ZvgCmuJHs9A7LX9EcPYb0zyicUhIMXUlceIL4l8IqHITwx2r5LfnecXK+7I7xFGAo/MREBbWIaTfORB3gkX3THMShhFKjN1cWobq7SZCTLZA9Q/YxjbaxbWr81OZlu74LV2R+F/BRgA2E9xgXp3xzgAAAAASUVORK5CYII="

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(128);
  
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(129);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(131);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Footer(_ref) {
    var launchApp = _ref.launchApp;
  
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.container },
      _react2.default.createElement('img', { className: _Footer2.default.logo, src: '../../Icon-60@2x.png', alt: '' }),
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.desc },
        _react2.default.createElement(
          'p',
          { className: _Footer2.default.title },
          _react2.default.createElement('img', { src: '../../iconLogo@2x.png', alt: '' })
        ),
        _react2.default.createElement(
          'p',
          { className: _Footer2.default.subtitle },
          '育见更好的达人'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.iyuanzi.app', id: 'deeplink' },
        _react2.default.createElement('img', { src: '../../btnDownload@2x.png', alt: '' })
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
  
  exports.default = (0, _withStyles2.default)(Footer, _Footer2.default);

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(132);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._29jY{background:#333;color:#fff}._3-6F{position:fixed;left:auto;display:-webkit-box;display:-ms-flexbox;display:flex;bottom:0;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;max-width:768px;height:49px;width:100%;background:rgba(0,0,0,.75);padding:6px 35px}._3-6F ._3jzW{height:40px;width:40px;border-radius:10px}._3-6F ._25bw{margin-left:8px}._3-6F ._25bw ._1972{color:#fff;font-size:15px;text-align:left}._3-6F ._25bw ._1972 img{width:64px}._3-6F ._25bw ._3n8J{color:#fff;font-size:11px;text-align:left}._3-6F a{margin-top:4px;right:34px;position:absolute}._3-6F a img{width:75px;height:30px}._2wXL{color:hsla(0,0%,100%,.5)}._1Sxe,.YD4V{color:hsla(0,0%,100%,.3)}._2wXL,.wQJK{padding:2px 5px;font-size:1em}.wQJK,.wQJK:active,.wQJK:visited{color:hsla(0,0%,100%,.6);text-decoration:none}.wQJK:hover{color:#fff}", ""]);
  
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
/* 133 */
/***/ function(module, exports) {

  module.exports = require("mobile-detect");

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContentPage = __webpack_require__(135);
  
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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(136);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._269R{padding-left:20px;padding-right:20px}._3c2M{margin:0 auto;padding:0 0 40px;max-width:768px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_269R",
  	"container": "_3c2M"
  };

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NotFoundPage = __webpack_require__(138);
  
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
          _react2.default.createElement('img', { src: '/404_page@2x.png', alt: '', style: { height: 'auto' } }),
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
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(139);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._3euT{max-width:768px;width:100%;margin:0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center}img{height:253px;width:253px;margin-top:15%}p{margin-top:42px;font-size:15px;color:#666}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3euT"
  };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(141);
  
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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(142);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(144);
  
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(145);
  
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(146);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._2Pu2{padding-left:20px;padding-right:20px}._3KyL{margin:0 auto;padding:0 0 40px;max-width:768px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2Pu2",
  	"container": "_3KyL"
  };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(148);
  
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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(149);
  
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(150);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Jn3{padding-left:20px;padding-right:20px}._3sgU{margin:0 auto;padding:0 0 40px;max-width:380px}._1dsj{font-size:1.25em}._3TBv{margin-bottom:15px}._1evm{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}.a5-F{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.a5-F:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.NnDU{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.NnDU:hover{background:rgba(54,50,119,.8)}.NnDU:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}.lTnE{border-color:#3b5998;background:#3b5998}.lTnE:hover{background:#2d4373}._29Wu{border-color:#dd4b39;background:#dd4b39}._29Wu:hover{background:#c23321}._2u--{border-color:#55acee;background:#55acee}._2u--:hover{background:#2795e9}._2vTE{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._28Vc{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._28Vc:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._28Vc:after,._28Vc:before{position:absolute;content:''}._28Vc:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
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
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(152);
  
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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(153);
  
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(154);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._3zKC{padding-left:20px;padding-right:20px}._1zuA{margin:0 auto;padding:0 0 40px;max-width:768px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3zKC",
  	"container": "_1zuA"
  };

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
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Strategy = __webpack_require__(156);
  
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
              query = '{\n  strategy(path: "' + strategyId + '") {\n    owner {\n      nickname\n      avatar\n    }\n    soundStory\n    title\n    subTitle\n    description\n    cover\n    tryCount\n    score\n    collectCount\n    photoCount\n    consumingTime\n    commentCount\n    degree\n    scope\n    photos {\n      strategy\n      photoId\n      content {\n        img\n      }\n    }\n    materials {\n      amount\n      title\n    }\n    steps {\n      _id\n      description\n      imgUrl\n      stepId\n      timePoint\n    }\n    tools {\n      amount\n      title\n    }\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n    video\n    labels {\n      title\n    }\n    good\n  }\n}\n';
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
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(116);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Strategy = __webpack_require__(157);
  
  var _Strategy2 = _interopRequireDefault(_Strategy);
  
  var _lodash = __webpack_require__(159);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _numeral = __webpack_require__(160);
  
  var _numeral2 = _interopRequireDefault(_numeral);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _nukaCarousel = __webpack_require__(162);
  
  var _nukaCarousel2 = _interopRequireDefault(_nukaCarousel);
  
  var _ReadMore = __webpack_require__(163);
  
  var _ReadMore2 = _interopRequireDefault(_ReadMore);
  
  var _Audio = __webpack_require__(166);
  
  var _Audio2 = _interopRequireDefault(_Audio);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _CDN = __webpack_require__(170);
  
  var _CDN2 = _interopRequireDefault(_CDN);
  
  var _bind = __webpack_require__(171);
  
  var _bind2 = _interopRequireDefault(_bind);
  
  var _Comment = __webpack_require__(172);
  
  var _Comment2 = _interopRequireDefault(_Comment);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _moment2.default.locale('zh-cn');
  
  var cx = _bind2.default.bind(_Strategy2.default);
  
  var Strategy = function (_Component) {
    (0, _inherits3.default)(Strategy, _Component);
  
    function Strategy(props) {
      (0, _classCallCheck3.default)(this, Strategy);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Strategy).call(this, props));
  
      _this.state = { strategy: props.strategy, slideIndex: 0 };
      console.log(_this.state);
      _this.updateStrategy = _this.updateStrategy.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(Strategy, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.updateStrategy = this.updateStrategy;
      }
    }, {
      key: 'updateStrategy',
      value: function updateStrategy(strategy) {
        this.setState({
          strategy: strategy
        });
      }
    }, {
      key: 'renderTime',
      value: function renderTime(strategy) {
        if (strategy.consumingTime) {
          var time = '用时 ';
          switch (strategy.consumingTime) {
            case 1:
              time += '< 30 分钟';break;
            case 2:
              time += '< 60 分钟';break;
            case 3:
              time += '< 90 分钟';break;
            default:
              {
                return '';
              }
          }
          return _react2.default.createElement(
            'li',
            null,
            time
          );
        } else {
          return '';
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.refs.video.pause();
      }
    }, {
      key: 'renderLevel',
      value: function renderLevel(strategy) {
        if (strategy.degree) {
          var url = '';
          switch (strategy.degree) {
            case 1:
              url = '../../toolbar_mark1@3x.png';break;
            case 2:
              url = '../../toolbar_mark2@3x.png';break;
            case 3:
              url = '../../toolbar_mark3@3x.png';break;
            case 4:
              url = '../../toolbar_mark4@3x.png';break;
            case 5:
              url = '../../toolbar_mark5@3x.png';break;
            default:
              return '';
          }
          return _react2.default.createElement(
            'li',
            null,
            '难度 ',
            _react2.default.createElement('img', { src: url, alt: '' })
          );
        } else {
          return null;
        }
      }
    }, {
      key: 'renderFit',
      value: function renderFit(strategy) {
        if (strategy.scope) {
          var time = '适合儿童 ';
          switch (strategy.scope) {
            case 1:
              time += '1~2岁';break;
            case 2:
              time += '3~4岁';break;
            case 3:
              time += '五岁以上';break;
            default:
              {
                return '';
              }
          }
          return _react2.default.createElement(
            'li',
            null,
            time
          );
        } else {
          return '';
        }
      }
    }, {
      key: 'renderPhotos',
      value: function renderPhotos(photos) {
        photos = _lodash2.default.slice(photos, 0, 3);
        if (photos.length > 0) {
          return _react2.default.createElement(
            'section',
            { className: _Strategy2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Strategy2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '相关作品'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: _Strategy2.default.AppPhotos },
              photos.map(function (p) {
                var photo = _CDN2.default.photoURL(p.content[0].img);
                return _react2.default.createElement(
                  'li',
                  { key: p.photoId },
                  _react2.default.createElement('img', { src: photo, alt: '', className: _Strategy2.default.photos })
                );
              }),
              _react2.default.createElement(
                'li',
                { className: _Strategy2.default.morePhoto },
                _react2.default.createElement('img', { src: '../../iconStategyArrow@2x.png', alt: '', className: _Strategy2.default.arrow })
              )
            )
          );
        } else {
          return null;
        }
      }
    }, {
      key: 'renderAudio',
      value: function renderAudio(url) {
        if (!url || url.length <= 0) {
          return _react2.default.createElement('noscript', null);
        }
        var player = cx({
          player: true,
          playerLongText: this.state.strategy.description
        });
        return _react2.default.createElement(
          'div',
          { className: player },
          _react2.default.createElement(_Audio2.default, { src: url, style: {
              marginLeft: this.state.strategy.description ? 0 : 'auto'
            } })
        );
      }
    }, {
      key: 'createMarkup',
      value: function createMarkup(item) {
        return { __html: item };
      }
    }, {
      key: 'renderDesc',
      value: function renderDesc(description) {
        if (description) {
          var className = cx('AppSection', 'longText');
          return _react2.default.createElement(
            'section',
            { className: className, style: {
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '10px 10px 0 10px',
                frameOverflow: 'auto'
              } },
            _react2.default.createElement(
              _ReadMore2.default,
              null,
              _react2.default.createElement('p', { dangerouslySetInnerHTML: this.createMarkup(description) })
            )
          );
        } else {
  
          return null;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        var strategy = this.props.strategy;
        // if (!strategy.strategyId) return <div></div>;
  
        var padding = strategy.soundStory ? '30px 0 10px 0' : '10px 0 10px 0';
        var setting = {
          cellAlign: 'center',
          dragging: true,
          width: '100%',
          slideWidth: '287px',
          initialSlideHeight: 420,
          cellSpacing: 0,
          decorators: [],
          framePadding: padding,
          edgeEasing: 'linear'
        };
  
        var steps = [];
  
        // if(strategy.description && strategy.description.length>0) {
        // }else {
        if (strategy.labels && strategy.labels.length > 0) {
          if (strategy.video) {
            steps = _lodash2.default.concat(steps, { video: strategy.video });
          }
  
          if (strategy.materials && strategy.tools && strategy.materials.length <= 7 && strategy.tools.length <= 7) {
            steps = _lodash2.default.concat(steps, { total: {
                materials: strategy.materials,
                tools: strategy.tools
              } });
          } else {
            if (strategy.materials) {
              steps = _lodash2.default.concat(steps, { materials: strategy.materials });
            }
            if (strategy.tools) {
              steps = _lodash2.default.concat(steps, { tools: strategy.tools });
            }
          }
  
          steps = _lodash2.default.concat(steps, strategy.steps);
        } else {
          strategy.steps.map(function (s) {
            if (s.imgUrl) strategy.description += "<img src=" + _CDN2.default.coverURL(s.imgUrl) + " />";
            if (s.description) strategy.description += "<p>" + s.description + "</p>";
            return;
          });
          steps = [];
          console.log(strategy.description);
        }
        // }
        var label = '../../label_normal@2x.png';
  
        var removedIndex = 0;
        return _react2.default.createElement(
          'div',
          { className: _Strategy2.default.App },
          _react2.default.createElement(
            'div',
            { className: _Strategy2.default.AppHeader },
            _react2.default.createElement('img', { src: _CDN2.default.strategyCoverURL(strategy.cover), className: _Strategy2.default.AppCover, alt: 'logo' }),
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.AppCounting },
              _react2.default.createElement(
                'span',
                null,
                (0, _numeral2.default)(strategy.tryCount).format('0 a') + " 感兴趣"
              ),
              strategy.collectCount > 0 ? _react2.default.createElement(
                'span',
                null,
                strategy.collectCount + " 收藏"
              ) : null,
              strategy.score > 0 ? _react2.default.createElement(
                'span',
                null,
                (0, _numeral2.default)(strategy.score).format('0.0') + " 分"
              ) : null
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Strategy2.default.AppIntro },
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.AppUser },
              _react2.default.createElement('img', { src: _CDN2.default.photoURL(strategy.owner.avatar), alt: '' }),
              _react2.default.createElement(
                'span',
                null,
                strategy.owner.nickname
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              strategy.title
            ),
            _react2.default.createElement(
              'ul',
              { className: _Strategy2.default.AppRequire },
              this.renderTime(strategy),
              this.renderLevel(strategy),
              this.renderFit(strategy)
            ),
            this.renderAudio(strategy.soundStory)
          ),
          steps.length > 0 ? _react2.default.createElement(
            'section',
            { className: _Strategy2.default.AppSection, style: {
                background: '#f7f7f7'
              } },
            _react2.default.createElement(
              _nukaCarousel2.default,
              (0, _extends3.default)({}, setting, {
                slideIndex: this.state.slideIndex,
                afterSlide: function afterSlide(newSlideIndex) {
                  return _this2.setState({ slideIndex: newSlideIndex });
                } }),
              steps.map(function (s, i) {
                var stepClass = cx({
                  step: true,
                  active: _this2.state.slideIndex === i
                });
  
                if (s.video) {
                  removedIndex += 1;
                  return _react2.default.createElement(
                    'div',
                    { className: stepClass },
                    _react2.default.createElement(
                      'div',
                      { className: cx('title'), style: { background: 'url(' + label + ')', backgroundSize: '25px 90px' } },
                      '教程'
                    ),
                    _react2.default.createElement(
                      'video',
                      { ref: 'video', id: 'really-cool-video', className: 'video-js vjs-default-skin vjs-big-play-centered', controls: true,
                        preload: 'auto', width: '287', height: '287', poster: _CDN2.default.videoCoverURL(strategy.cover),
                        'data-setup': '{}' },
                      _react2.default.createElement('source', { src: s.video, type: 'application/x-mpegURL' })
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: {
                          lineHeight: '120px',
                          color: '#666'
                        } },
                      '(视频教程)'
                    )
                  );
                }
                if (s.total) {
                  removedIndex += 1;
                  return _react2.default.createElement(
                    'div',
                    { className: stepClass },
                    _react2.default.createElement(
                      'div',
                      { className: cx('title'), style: { background: 'url(' + label + ')', backgroundSize: '25px 90px' } },
                      '用料'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: cx('title2'), style: { background: 'url(' + label + ')', backgroundSize: '25px 90px' } },
                      '工具'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: cx('ul') },
                      _react2.default.createElement(
                        'ul',
                        null,
                        strategy.materials.map(function (m) {
                          return _react2.default.createElement(
                            'li',
                            null,
                            m.title,
                            _react2.default.createElement(
                              'span',
                              null,
                              m.amount
                            )
                          );
                        })
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: cx('ul') },
                      _react2.default.createElement(
                        'ul',
                        null,
                        strategy.tools.map(function (m) {
                          return _react2.default.createElement(
                            'li',
                            null,
                            m.title,
                            _react2.default.createElement(
                              'span',
                              null,
                              m.amount
                            )
                          );
                        })
                      )
                    )
                  );
                } else {
                  if (s.materials) {
                    removedIndex += 1;
                    return _react2.default.createElement(
                      'div',
                      { className: stepClass },
                      _react2.default.createElement(
                        'div',
                        { className: cx('title'), style: { background: 'url(' + label + ')', backgroundSize: '25px 90px' } },
                        '用料'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: cx('ul') },
                        _react2.default.createElement(
                          'ul',
                          null,
                          strategy.materials.map(function (m) {
                            return _react2.default.createElement(
                              'li',
                              null,
                              m.title,
                              ' ',
                              _react2.default.createElement(
                                'span',
                                null,
                                m.amount
                              )
                            );
                          })
                        )
                      )
                    );
                  }
  
                  if (s.tools) {
                    removedIndex += 1;
                    return _react2.default.createElement(
                      'div',
                      { className: stepClass },
                      _react2.default.createElement(
                        'div',
                        { className: cx('title'), style: { background: 'url(' + label + ')', backgroundSize: '25px 90px' } },
                        '工具'
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: cx('ul') },
                        _react2.default.createElement(
                          'ul',
                          null,
                          strategy.tools.map(function (m) {
                            return _react2.default.createElement(
                              'li',
                              null,
                              m.title,
                              ' ',
                              _react2.default.createElement(
                                'span',
                                null,
                                m.amount
                              )
                            );
                          })
                        )
                      )
                    );
                  }
                }
  
                var descClass = cx({
                  'description': true,
                  'descriptionOnly': !s.imgUrl
                });
  
                var imgClass = cx({
                  'cover': true,
                  'coverOnly': !s.description
                });
                return _react2.default.createElement(
                  'div',
                  { className: stepClass },
                  _react2.default.createElement(
                    'div',
                    { className: cx('title'), style: { background: 'url(' + label + ')', backgroundSize: '25px 90px' } },
                    "步骤",
                    ' ',
                    _react2.default.createElement(
                      'span',
                      { className: cx('num') },
                      i - removedIndex + 1
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: cx('dividing') },
                      '/'
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: cx('num') },
                      steps.length - removedIndex
                    )
                  ),
                  s.imgUrl ? _react2.default.createElement('img', { src: _CDN2.default.stepCoverURL(s.imgUrl), alt: '', className: imgClass }) : '',
                  s.description ? _react2.default.createElement(
                    'p',
                    { className: descClass },
                    s.description
                  ) : ''
                );
              })
            )
          ) : null,
          this.renderPhotos(strategy.photos),
          strategy.commentCount > 0 ? _react2.default.createElement(
            'section',
            { className: _Strategy2.default.AppSection, style: {
                paddingBottom: 10
              } },
            _react2.default.createElement(
              'div',
              { className: _Strategy2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Strategy2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '评论'
              )
            ),
            _react2.default.createElement('div', { className: _Strategy2.default.AppCommentsArrow }),
            _react2.default.createElement(_Comment2.default, { comments: strategy.comments })
          ) : null,
          strategy.good ? _react2.default.createElement(
            'section',
            { className: _Strategy2.default.AppSection, style: {
                paddingBottom: 5,
                backgroundColor: '#f7f7f7',
                paddingTop: 5
              } },
            _react2.default.createElement(
              'a',
              { className: _Strategy2.default.AppCenterGoodButton, href: strategy.good },
              '购买材料包'
            )
          ) : null
        );
      }
    }]);
    return Strategy;
  }(_react.Component);
  
  Strategy.propsTypes = {
    strategy: _react.PropTypes.object
  };
  
  Strategy.defaultProps = {
    strategy: {}
  };
  
  exports.default = (0, _withStyles2.default)(Strategy, _Strategy2.default);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(158);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "ul{list-style:none}._1Lno{margin:0 0 45px;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%}*,._1Lno{padding:0}*{margin:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}._2-9y{text-align:left;background-color:#fff;font-family:PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-bottom:50px}.Dcyd{position:relative;height:100%;width:100%;-o-object-fit:cover;object-fit:cover}._1nc7{height:50px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;position:absolute;top:-75px;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}._1nc7 img{width:50px;height:50px;min-width:50px;min-height:50px;border-radius:50%;border:2px solid #fff;-o-object-fit:cover;object-fit:cover}._1nc7 span{font-size:14px;color:#ff989e}.Jh5g{height:25px;position:absolute;bottom:0;left:0;right:0;background-color:RGBA(0,0,0,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.Jh5g span{color:#fff;font-size:11px;margin-right:10px}.u8Ux{background-color:#222;height:210px;color:#fff}._17Pl,.u8Ux{position:relative}._17Pl{font-size:18px;padding-left:10px;padding-right:10px;min-height:75px;background-color:#fff}._17Pl p{margin-top:50px;line-height:25px}.Dmfu{list-style-type:none;font-size:12px;color:#666;margin-top:15px;margin-bottom:10px}.Dmfu,.Dmfu li{display:-webkit-box;display:-ms-flexbox;display:flex}.Dmfu li{border:1px solid #fed271;height:16px;border-radius:10px;padding:2px 4px;margin-right:5px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.Dmfu li img{height:9px;width:50px;-o-object-fit:contain;object-fit:contain}._2hCH{list-style-type:none;-ms-flex-item-align:start;align-self:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin:0 10px 10px;height:60px;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;width:calc(100% - 10px)}._1lwy,._2hCH{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._1lwy{height:80px;width:100%;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._1lwy img{width:57px;height:auto;margin-bottom:10px}._1lwy p{font-size:13px;line-height:13px;color:#999}._2hCH li{height:60px;width:60px;padding:0 7px 0 0;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}._2nWu{height:100%;width:100%;-o-object-fit:cover;object-fit:cover}._3-0n{background-color:#f7f7f7;width:calc(100% - 20px)}._2ywx{width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #f7f7f7;-ms-flex-item-align:start;align-self:flex-start;margin-left:25px}._3-0n{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:5px 10px}._3-0n ._14jh{color:#ff989e;font-size:12px;line-height:12px}._3-0n ._3ngp{font-size:12px;color:#666;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;float:left;margin-top:4px}._3-0n ._6yzn{font-size:13px;line-height:17px;color:#666;margin:0;padding:2px 0 0}._3-0n ._3ngp span{font-size:12px;color:#ff989e;line-height:17px}._3-0n ._23BZ{font-size:12px;line-height:17px;color:#999;padding:0 0 0 10px;margin:5px;display:-webkit-box;display:-ms-flexbox;display:flex;border-left:1px solid #666}._3-0n ._1GSs{font-size:10px;line-height:12px;color:#cbcbcb;margin-left:9px}._3-0n ._29Ha{color:#666;margin:0;padding:2px 0 0;display:block}._1H30{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}._2nyB{width:25px;height:25px}._1MUb{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;border-bottom:5px solid #f7f7f7;overflow:hidden}._1MUb,._2DFn{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal}._2DFn{color:#666;font-size:16px;height:40px;background-color:#fff;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}._2DFn .gs5T{width:2px;height:15px;background-color:#ff989e;margin-right:8px;margin-left:10px;border-radius:1px}._3lWk{width:100%;font-size:15px;background-color:#fff}._3lWk,._35K2{display:-webkit-box;display:-ms-flexbox;display:flex;height:45px;color:#666;border-top:1px solid #ededed;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._35K2{font-size:13px;background-color:#f7f7f7}._3JsY,._35K2{width:calc(100% - 20px)}._3JsY{display:-webkit-box;display:-ms-flexbox;display:flex;height:45px;font-size:15px;color:#fff;background-color:#ff989e;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:5px;text-decoration:none}._1uet{margin-bottom:10px}._1uet p{font-size:15px;line-height:20px;color:#666;width:100%}._1uet img{height:auto;width:100%;-o-object-fit:contain;object-fit:contain}._3QGF{height:420px;min-height:420px;width:287px;background:#fff;color:#fff;text-align:center;border-radius:5px;border:1px solid #ededed;overflow:hidden;position:relative}._3QGF ._2zCQ{padding:25px 10px 10px 35px;list-style-type:none;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:220px;position:relative;min-height:170px}._3QGF ._2zCQ,._3QGF ul li{display:-webkit-box;display:-ms-flexbox;display:flex}._3QGF ul li{font-size:15px;line-height:24px;color:#666;-webkit-box-flex:1;-ms-flex:1;flex:1;width:210px}._3QGF ul li span:last-child{color:#999;-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:right}._3QGF .Y3wt{vertical-align:middle;line-height:18px;font-size:15px;color:#333;width:25px;height:90px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;top:55px;z-index:1;-webkit-writing-mode:vertical-lr;-ms-writing-mode:tb-lr;writing-mode:vertical-lr;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-ms-flex-item-align:center;align-self:center}.Y3wt ._1fKv{-webkit-text-combine:horizontal;text-combine:horizontal}._3QGF ._2QRy{vertical-align:middle;line-height:18px;font-size:15px;color:#333;width:25px;height:90px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;bottom:75px;z-index:1}._3QGF ._1jKP{padding:15px;font-size:15px;color:#666;text-align:left;line-height:20px}._3QGF ._1JX-{padding-left:30px}._3QGF img{height:287px;-o-object-fit:cover;object-fit:cover}._3QGF ._1sw7,._3QGF img{width:287px;overflow:hidden}._3QGF ._1sw7{height:420px;-o-object-fit:contain;object-fit:contain}._3QGF{opacity:1;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:scale(.9);transform:scale(.9)}._3Qyd{color:#e67e22;opacity:1;-webkit-transform:scale(1);transform:scale(1)}._29Ha{padding:20px;margin:auto;width:90%}._2V1E{-webkit-pointer-events:none;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.PHTx{position:relative;width:100%;margin-top:10px}._2dG3{height:60px;position:absolute;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding-bottom:10px;color:#ff989e;font-size:14px;background:-webkit-gradient(linear,left bottom,left top,from(#fff),color-stop(30%,#fff),to(hsla(0,0%,100%,0)));background:-webkit-linear-gradient(bottom,#fff,#fff 30%,hsla(0,0%,100%,0));background:linear-gradient(0deg,#fff 0,#fff 30%,hsla(0,0%,100%,0))}._2dG3 img{width:22px}.Wq-A{width:calc(100% - 20px);position:absolute;z-index:2;bottom:0;margin-bottom:-60px}._1wsf{margin-top:5px;margin-bottom:5px;position:relative}._1wsf ._3mUM{margin-left:0}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_1Lno",
  	"App": "_2-9y",
  	"AppCover": "Dcyd",
  	"AppUser": "_1nc7",
  	"AppCounting": "Jh5g",
  	"AppHeader": "u8Ux",
  	"AppIntro": "_17Pl",
  	"AppRequire": "Dmfu",
  	"AppPhotos": "_2hCH",
  	"AppPhotosEmpty": "_1lwy",
  	"photos": "_2nWu",
  	"AppComments": "_3-0n",
  	"AppCommentsArrow": "_2ywx",
  	"AppComment": "_35aa",
  	"nameWrap": "_3KEj",
  	"nickname": "_14jh",
  	"replyUser": "_3ngp",
  	"detail": "_6yzn",
  	"replyContent": "_23BZ",
  	"time": "_1GSs",
  	"content": "_29Ha",
  	"morePhoto": "_1H30",
  	"arrow": "_2nyB",
  	"AppSection": "_1MUb",
  	"AppSectionHeader": "_2DFn",
  	"line": "gs5T",
  	"AppCenterButton": "_3lWk",
  	"AppCenterCommentButton": "_35K2",
  	"AppCenterGoodButton": "_3JsY",
  	"longText": "_1uet",
  	"step": "_3QGF",
  	"ul": "_2zCQ",
  	"title": "Y3wt",
  	"num": "_1fKv",
  	"title2": "_2QRy",
  	"description": "_1jKP",
  	"descriptionOnly": "_1JX-",
  	"coverOnly": "_1sw7",
  	"active": "_3Qyd",
  	"pace": "_2V1E",
  	"fullText": "PHTx",
  	"readMore": "_2dG3",
  	"player": "Wq-A",
  	"playerLongText": "_1wsf",
  	"audio": "_3mUM"
  };

/***/ },
/* 159 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 160 */
/***/ function(module, exports) {

  module.exports = require("numeral");

/***/ },
/* 161 */
/***/ function(module, exports) {

  module.exports = require("moment");

/***/ },
/* 162 */
/***/ function(module, exports) {

  module.exports = require("nuka-carousel");

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ReadMore = __webpack_require__(164);
  
  var _ReadMore2 = _interopRequireDefault(_ReadMore);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ReadMore = function (_Component) {
    (0, _inherits3.default)(ReadMore, _Component);
  
    function ReadMore() {
      var _Object$getPrototypeO;
  
      (0, _classCallCheck3.default)(this, ReadMore);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(ReadMore)).call.apply(_Object$getPrototypeO, [this].concat(args)));
  
      _this.state = {
        readMore: true
      };
  
      _this.toggleLines = _this.toggleLines.bind(_this);
      return _this;
    }
  
    (0, _createClass3.default)(ReadMore, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var height = this.refs.ab;
        console.log(this.refs.ab);
        this.setState({
          height: height
        });
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        console.log(document.getElementById('ab'));
      }
    }, {
      key: 'toggleLines',
      value: function toggleLines(event) {
        event.preventDefault();
  
        this.setState({
          readMore: !this.state.readMore,
          height: document.getElementById('ab').clientHeight
        });
        console.log(this.state);
      }
    }, {
      key: 'render',
      value: function render() {
        var children = this.props.children;
  
  
        return _react2.default.createElement(
          'div',
          { className: _ReadMore2.default.fullText, style: {
              height: this.state.readMore ? 200 : this.state.height
            } },
          _react2.default.createElement(
            'div',
            { ref: 'ab', id: 'ab' },
            '        ',
            children
          ),
          this.state.readMore ? _react2.default.createElement(
            'div',
            { className: _ReadMore2.default.readMore, onClick: this.toggleLines.bind(this) },
            '展开全部 ',
            _react2.default.createElement('img', { src: '../../pullDown@2x.png', alt: '' })
          ) : null
        );
      }
    }]);
    return ReadMore;
  }(_react.Component);
  
  ReadMore.defaultProps = {
    lines: 10,
    text: 'Read more'
  };
  
  ReadMore.propTypes = {
    children: _react.PropTypes.node.isRequired,
    text: _react.PropTypes.node,
    lines: _react.PropTypes.number
  };
  
  exports.default = (0, _withStyles2.default)(ReadMore, _ReadMore2.default);

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(165);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "ul{list-style:none}._3n_h{margin:0 0 45px;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%}*,._3n_h{padding:0}*{margin:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}._13kV{text-align:left;background-color:#fff;font-family:PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}._3a-a{position:relative;height:100%;width:100%;-o-object-fit:cover;object-fit:cover}._1IIt{height:50px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;position:absolute;top:-75px;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}._1IIt img{width:50px;height:50px;border-radius:50%;border:2px solid #fff;-o-object-fit:cover;object-fit:cover}._1IIt span{font-size:14px;color:#ff989e}.ICyE{height:25px;position:absolute;bottom:0;left:0;right:0;background-color:RGBA(0,0,0,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.ICyE span{color:#fff;font-size:11px;margin-right:10px}.FTCm{background-color:#222;height:210px;color:#fff}._388e,.FTCm{position:relative}._388e{font-size:18px;padding-left:10px;padding-right:10px;min-height:75px;background-color:#fff}._388e p{margin-top:50px;line-height:25px}._16rn{list-style-type:none;font-size:12px;color:#666;margin-top:15px;margin-bottom:10px}._16rn,._16rn li{display:-webkit-box;display:-ms-flexbox;display:flex}._16rn li{border:1px solid #fed271;height:16px;border-radius:10px;padding:2px 4px;margin-right:5px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._16rn li img{height:9px;width:50px;-o-object-fit:contain;object-fit:contain}._1NWm{list-style-type:none;-ms-flex-item-align:start;align-self:flex-start;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin:0 10px 10px;height:60px;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;width:calc(100% - 10px)}._1NWm,._3U1z{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._3U1z{height:80px;width:100%;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._3U1z img{width:57px;height:auto;margin-bottom:10px}._3U1z p{font-size:13px;line-height:13px;color:#999}._1NWm li{height:60px;width:60px;padding:0 7px 0 0;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}._3Wzy{height:100%;width:100%;-o-object-fit:cover;object-fit:cover}._3f4d{background-color:#f7f7f7;width:calc(100% - 20px)}._8Atd{width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #f7f7f7;-ms-flex-item-align:start;align-self:flex-start;margin-left:25px}._3f4d{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:5px 10px}._3f4d ._1DwP{color:#ff989e;font-size:12px;line-height:12px}._3f4d ._2Ttp{font-size:12px;color:#666;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;float:left;margin-top:4px}._3f4d ._2Gcl{font-size:13px;line-height:17px;color:#666;margin:0;padding:2px 0 0}._3f4d ._2Ttp span{font-size:12px;color:#ff989e;line-height:17px}._3f4d .eRvA{font-size:12px;line-height:17px;color:#999;padding:0 0 0 10px;margin:5px;display:-webkit-box;display:-ms-flexbox;display:flex;border-left:1px solid #666}._3f4d ._2qEo{font-size:10px;line-height:12px;color:#cbcbcb;margin-left:9px}._3f4d ._1jzm{color:#666;margin:0;padding:2px 0 0;display:block}._1-PU{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}._2ygM{width:25px;height:25px}._1MOb{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;border-bottom:5px solid #f7f7f7;overflow:hidden}._1MOb,._2EoY{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal}._2EoY{color:#666;font-size:14px;height:40px;background-color:#fff;width:100%;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}._2EoY ._3FlU{width:2px;height:15px;background-color:#ff989e;margin-right:8px;margin-left:10px;border-radius:1px}._3h4U{width:100%;font-size:15px;background-color:#fff}._3h4U,.KzoL{display:-webkit-box;display:-ms-flexbox;display:flex;height:45px;color:#666;border-top:1px solid #ededed;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.KzoL{width:calc(100% - 20px);font-size:13px;background-color:#f7f7f7}.G2tA{margin-bottom:10px}.G2tA p{font-size:15px;line-height:20px;color:#666;width:100%}.G2tA img{height:auto;width:100%;-o-object-fit:contain;object-fit:contain}._3ALt{height:420px;min-height:420px;width:287px;background:#fff;color:#fff;text-align:center;border-radius:5px;border:1px solid #ededed;overflow:hidden;position:relative}._3ALt ._3xAO{padding:25px 10px 10px 35px;list-style-type:none;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:220px;position:relative;min-height:170px}._3ALt ._3xAO,._3ALt ul li{display:-webkit-box;display:-ms-flexbox;display:flex}._3ALt ul li{font-size:15px;line-height:24px;color:#666}._3ALt ul li,._3ALt ul li span{-webkit-box-flex:1;-ms-flex:1;flex:1}._3ALt ul li span{color:#999;text-align:right}._3ALt ._2a47{vertical-align:middle;line-height:18px;font-size:15px;color:#333;width:25px;height:90px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;top:55px;z-index:1;-webkit-writing-mode:vertical-lr;-ms-writing-mode:tb-lr;writing-mode:vertical-lr;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-ms-flex-item-align:center;align-self:center}._2a47 ._3KbL{-webkit-text-combine:horizontal;text-combine:horizontal}._3ALt ._3iYY{vertical-align:middle;line-height:18px;font-size:15px;color:#333;width:25px;height:90px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;bottom:75px;z-index:1}._3ALt ._1cnf{padding:15px;font-size:15px;color:#666;text-align:left;line-height:20px}._3ALt ._3Nwt{padding-left:30px}._3ALt img{height:287px;-o-object-fit:cover;object-fit:cover}._3ALt ._2_Aa,._3ALt img{width:287px;overflow:hidden}._3ALt ._2_Aa{height:420px;-o-object-fit:contain;object-fit:contain}._3ALt{opacity:1;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:scale(.9);transform:scale(.9)}._2iMV{color:#e67e22;opacity:1;-webkit-transform:scale(1);transform:scale(1)}._1jzm{padding:20px;margin:auto;width:90%}._1klw{-webkit-pointer-events:none;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}._1Ix5{position:relative;width:100%;margin-top:10px}._3tUk{height:60px;position:absolute;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding-bottom:10px;color:#ff989e;font-size:14px;background:-webkit-gradient(linear,left bottom,left top,from(#fff),color-stop(30%,#fff),to(hsla(0,0%,100%,0)));background:-webkit-linear-gradient(bottom,#fff,#fff 30%,hsla(0,0%,100%,0));background:linear-gradient(0deg,#fff 0,#fff 30%,hsla(0,0%,100%,0))}._3tUk img{width:22px}.Dd36{width:calc(100% - 20px);position:absolute;z-index:2;bottom:0;margin-bottom:-60px}._1dmP{margin-top:5px;margin-bottom:5px;position:relative}._1dmP ._3pNr{margin-left:0}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3n_h",
  	"App": "_13kV",
  	"AppCover": "_3a-a",
  	"AppUser": "_1IIt",
  	"AppCounting": "ICyE",
  	"AppHeader": "FTCm",
  	"AppIntro": "_388e",
  	"AppRequire": "_16rn",
  	"AppPhotos": "_1NWm",
  	"AppPhotosEmpty": "_3U1z",
  	"photos": "_3Wzy",
  	"AppComments": "_3f4d",
  	"AppCommentsArrow": "_8Atd",
  	"App-comment": "_1Czz",
  	"nameWrap": "_1OHe",
  	"nickname": "_1DwP",
  	"replyUser": "_2Ttp",
  	"detail": "_2Gcl",
  	"replyContent": "eRvA",
  	"time": "_2qEo",
  	"content": "_1jzm",
  	"morePhoto": "_1-PU",
  	"arrow": "_2ygM",
  	"AppSection": "_1MOb",
  	"AppSectionHeader": "_2EoY",
  	"line": "_3FlU",
  	"AppCenterButton": "_3h4U",
  	"AppCenterCommentButton": "KzoL",
  	"longText": "G2tA",
  	"step": "_3ALt",
  	"ul": "_3xAO",
  	"title": "_2a47",
  	"num": "_3KbL",
  	"title2": "_3iYY",
  	"description": "_1cnf",
  	"descriptionOnly": "_3Nwt",
  	"coverOnly": "_2_Aa",
  	"active": "_2iMV",
  	"pace": "_1klw",
  	"fullText": "_1Ix5",
  	"readMore": "_3tUk",
  	"player": "Dd36",
  	"playerLongText": "_1dmP",
  	"audio": "_3pNr"
  };

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _TimeFormat = __webpack_require__(167);
  
  var _TimeFormat2 = _interopRequireDefault(_TimeFormat);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Audio = __webpack_require__(168);
  
  var _Audio2 = _interopRequireDefault(_Audio);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Audio = function (_Component) {
    (0, _inherits3.default)(Audio, _Component);
  
    function Audio(props) {
      (0, _classCallCheck3.default)(this, Audio);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Audio).call(this, props));
  
      _this.state = { isPlay: false, duration: '00:00:00' };
      return _this;
    }
  
    (0, _createClass3.default)(Audio, [{
      key: 'onClick',
      value: function onClick() {
        if (this.refs.audio.paused) {
          this.setState({ isPlay: true });
          this.refs.audio.play();
        } else {
          this.refs.audio.pause();
          this.setState({ isPlay: false });
        }
      }
    }, {
      key: 'onUpdateTime',
      value: function onUpdateTime() {
        var audio = this.refs.audio;
        var fill = this.refs.fill;
        var now = this.refs.now;
        var end = this.refs.end;
        var current = 100 * (audio.currentTime / audio.duration);
        fill.style.width = current + '%';
        now.innerHTML = _TimeFormat2.default.audioTime(audio.currentTime);
        end.innerHTML = _TimeFormat2.default.audioTime(this.refs.audio.duration);
      }
    }, {
      key: 'onEnded',
      value: function onEnded() {
        this.setState({ isPlay: false });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.refs.audio.oncanplaythrough = function (e) {
          var end = this.refs.end;
          end.innerHTML = _TimeFormat2.default.audioTime(this.refs.audio.duration);
        }.bind(this);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.refs.audio.pause();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        var play = '../../icon_audio_play@2x.png';
        var pause = '../../icon_audio_pause@2x.png';
        return _react2.default.createElement(
          'div',
          { className: _Audio2.default.audio, style: this.props.style },
          _react2.default.createElement('audio', { ref: 'audio', src: this.props.src, onTimeUpdate: function onTimeUpdate() {
              return _this2.onUpdateTime();
            }, onEnded: function onEnded() {
              return _this2.onEnded();
            } }),
          _react2.default.createElement(
            'i',
            { className: _Audio2.default.playCircle, onClick: function onClick() {
                return _this2.onClick();
              } },
            _react2.default.createElement('img', { src: this.state.isPlay ? pause : play, alt: '' })
          ),
          _react2.default.createElement(
            'span',
            { ref: 'now', className: _Audio2.default.now },
            '00:00:00'
          ),
          _react2.default.createElement(
            'span',
            { className: _Audio2.default.progress },
            _react2.default.createElement('span', { ref: 'fill', className: _Audio2.default.fill })
          ),
          _react2.default.createElement(
            'span',
            { ref: 'end', className: _Audio2.default.end },
            '00:00:00'
          )
        );
      }
    }]);
    return Audio;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(Audio, _Audio2.default);

/***/ },
/* 167 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var TimeFormat = {
    audioTime: function audioTime(value) {
      var times = new Array(3600, 60, 1);
      var time = '';
      var tmp = void 0;
      for (var i = 0; i < times.length; i++) {
        tmp = Math.floor(value / times[i]);
        if (tmp < 1) {
          tmp = '00';
        } else if (tmp < 10) {
          tmp = '0' + tmp;
        }
        time += tmp;
        if (i < 2) {
          time += ':';
        }
        value = value % times[i];
      }
      return time;
    }
  };
  
  exports.default = TimeFormat;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(169);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._2MLI{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;background:#fff;width:287px;margin:auto;height:40px;border-radius:5px;border:1px solid #ededed;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._1Rx5,.pRRu{font-size:11px;color:#666;-ms-flex-item-align:center;align-self:center;margin-left:5px;width:46px}.pRRu{margin-right:5px}._26Fb{background:#f7f7f7;height:5px;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-item-align:center;align-self:center;margin:0 10px}._1tZo,._26Fb{border-radius:2px}._1tZo{background:#ff989e;width:0;display:block}._1tZo,img{height:100%}img{width:100%;vertical-align:top}._3BAo{background:#ff989e;border-radius:50%;border:2px solid #ff989e;margin-left:5px}._3BAo,._18ky{width:26px;height:26px}", ""]);
  
  // exports
  exports.locals = {
  	"audio": "_2MLI",
  	"now": "_1Rx5",
  	"end": "pRRu",
  	"progress": "_26Fb",
  	"fill": "_1tZo",
  	"playCircle": "_3BAo",
  	"playBtn": "_18ky"
  };

/***/ },
/* 170 */
/***/ function(module, exports) {

  'use strict';
  
  /**
   * Created by diwu on 19/11/2016.
   */
  
  exports.updateURL = function (string) {
    if (string.indexOf('http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com') > -1) {
      string = string.replace('http://yuanzi-dev.oss-cn-hangzhou.aliyuncs.com', 'http://assets-dev.iyuanzi.net');
    } else if (string.indexOf('http://yuanzi-beijing.oss-cn-beijing.aliyuncs.com') > -1) {
      string = string.replace('http://yuanzi-beijing.oss-cn-beijing.aliyuncs.com', 'http://assets.iyuanzi.net');
    } else if (string.indexOf('http://img.iyuanzi.net') > -1) {
      string = string.replace('http://img.iyuanzi.net', 'http://assets.iyuanzi.net');
    }
    return string;
  };
  
  exports.photoURL = function (string) {
    string = this.updateURL(string);
    return string + '@120w_120h_1pr.jpg';
  };
  
  exports.coverURL = function (string) {
    string = this.updateURL(string);
    return string + '@1pr.jpg';
  };
  
  exports.userCoverURL = function (string) {
    string = this.updateURL(string);
    return string + '@20-15bl.jpg';
  };
  
  exports.strategyCoverURL = function (string) {
    string = this.updateURL(string);
    return string + '@420h_1pr.jpg';
  };
  
  exports.stepCoverURL = function (string) {
    string = this.updateURL(string);
    return string + '@500h_1pr.jpg';
  };
  
  exports.videoCoverURL = function (string) {
    string = this.updateURL(string);
    return string + '@287w_480h_1pr.jpg';
  };

/***/ },
/* 171 */
/***/ function(module, exports) {

  module.exports = require("classnames/bind");

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Comment = __webpack_require__(173);
  
  var _Comment2 = _interopRequireDefault(_Comment);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _lodash = __webpack_require__(159);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _moment2.default.locale('zh-cn');
  
  var Comments = function (_React$Component) {
    (0, _inherits3.default)(Comments, _React$Component);
  
    function Comments(props) {
      (0, _classCallCheck3.default)(this, Comments);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Comments).call(this, props));
    }
  
    (0, _createClass3.default)(Comments, [{
      key: 'renderComment',
      value: function renderComment(comment) {
        return _react2.default.createElement(
          'li',
          { className: _Comment2.default.AppComment, key: comment.commentId },
          _react2.default.createElement(
            'div',
            { className: _Comment2.default.nameWrap },
            _react2.default.createElement(
              'span',
              { className: _Comment2.default.nickname },
              comment.commentUser.nickname
            ),
            _react2.default.createElement(
              'span',
              { className: _Comment2.default.time },
              (0, _moment2.default)(comment.createdAt).fromNow()
            )
          ),
          _react2.default.createElement(
            'p',
            { className: _Comment2.default.content },
            comment.targetUser ? _react2.default.createElement(
              'div',
              { className: _Comment2.default.replyUser },
              '回复',
              _react2.default.createElement(
                'span',
                null,
                '@',
                comment.targetUser.nickname
              ),
              '的:'
            ) : null,
            _react2.default.createElement(
              'span',
              { className: _Comment2.default.detail },
              comment.content
            )
          ),
          comment.targetComment ? _react2.default.createElement(
            'p',
            { className: _Comment2.default.replyContent },
            comment.targetComment.content
          ) : null
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        var comments = this.props.comments;
  
        if (!comments || comments.length === 0) {
          return null;
        }
        comments = _lodash2.default.slice(comments, 0, 3);
        return _react2.default.createElement(
          'div',
          { className: _Comment2.default.AppCommentsWrap },
          _react2.default.createElement('div', { className: _Comment2.default.AppCommentsArrow }),
          _react2.default.createElement(
            'ul',
            { className: _Comment2.default.AppComments },
            comments.map(function (c) {
              return _this2.renderComment(c);
            })
          )
        );
      }
    }]);
    return Comments;
  }(_react2.default.Component);
  
  exports.default = (0, _withStyles2.default)(Comments, _Comment2.default);

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(174);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;padding:0}.blMp{width:calc(100% - 20px)}._2clo{width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #f7f7f7;-ms-flex-item-align:start;align-self:flex-start;margin-left:25px}._35qJ{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:5px 10px;background-color:#f7f7f7}._35qJ ._3wc5{color:#ff989e;font-size:12px;line-height:12px}._35qJ ._3eCP{font-size:12px;color:#666;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;float:left;margin-top:4px}._35qJ ._3v8S{font-size:13px;line-height:17px;color:#666;margin:0;padding:2px 0 0}._35qJ ._3eCP span{font-size:12px;color:#ff989e;line-height:17px}._35qJ ._1JpX{font-size:12px;line-height:17px;color:#999;padding:0 0 0 10px;margin:5px;display:-webkit-box;display:-ms-flexbox;display:flex;border-left:1px solid #666}._35qJ ._2JS3{font-size:10px;line-height:12px;color:#cbcbcb;margin-left:9px}._35qJ ._2GFZ{color:#666;margin:0;padding:2px 0 0;display:block}", ""]);
  
  // exports
  exports.locals = {
  	"AppCommentsWrap": "blMp",
  	"AppCommentsArrow": "_2clo",
  	"AppComments": "_35qJ",
  	"AppComment": "_1tmV",
  	"nameWrap": "_31C-",
  	"nickname": "_3wc5",
  	"replyUser": "_3eCP",
  	"detail": "_3v8S",
  	"replyContent": "_1JpX",
  	"time": "_2JS3",
  	"content": "_2GFZ"
  };

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _moment2.default.locale('zh-cn'); /**
                                     * Created by MAC on 16/3/21.
                                     */
  
  var DateFormat = {
    postDate: function postDate(date) {
      return (0, _moment2.default)(date).format('YYYY 年 MM 月 DD 日 HH:mm');
    },
    commentDate: function commentDate(date) {
      return (0, _moment2.default)(date).format('YYYY-MM-DD HH:mm ');
    }
  };
  exports.default = DateFormat;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _UrlFormat = __webpack_require__(177);
  
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
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Topic = __webpack_require__(179);
  
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
              query = '{\n  topic(path: "' + topicId + '") {\n    owner {\n      nickname\n      avatar\n    }\n    title\n    cover\n    subTitle\n    viewCount\n    collectCount\n    content\n    strategies {\n      strategyId\n      tryCount\n      score\n      cover\n      title\n      owner{\n        nickname\n        avatar\n      }\n    }\n    labels {\n      title\n    }\n  }\n}\n';
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
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Topic = __webpack_require__(180);
  
  var _Topic2 = _interopRequireDefault(_Topic);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _numeral = __webpack_require__(160);
  
  var _numeral2 = _interopRequireDefault(_numeral);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Topic(_ref) {
    var topic = _ref.topic;
  
    return _react2.default.createElement(
      'div',
      { className: _Topic2.default.container },
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.cover },
        _react2.default.createElement(_Image2.default, { height: '225', src: topic.cover }),
        _react2.default.createElement(
          'p',
          { className: _Topic2.default.title },
          topic.title
        ),
        _react2.default.createElement(
          'div',
          { className: _Topic2.default.shadow },
          _react2.default.createElement(
            'span',
            null,
            (0, _numeral2.default)(topic.viewCount).format('0 a') + " 参加"
          ),
          _react2.default.createElement(
            'span',
            null,
            topic.collectCount + " 收藏"
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.user },
        _react2.default.createElement(
          'div',
          { className: _Topic2.default.avatar },
          _react2.default.createElement(_Image2.default, { height: '96', width: '96', src: topic.owner.avatar })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: _Topic2.default.nickname },
            topic.owner.nickname
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.content },
        _react2.default.createElement(
          'p',
          null,
          ' ',
          topic.subTitle
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Topic2.default.strategies },
        _react2.default.createElement(
          'ul',
          { style: { backgroundColor: 'white' } },
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
                  { className: _Topic2.default.participate },
                  _react2.default.createElement(
                    'p',
                    null,
                    item.tryCount,
                    '人参与'
                  )
                )
              )
            );
          })
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
  
  Topic.propTypes = {
    topic: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Topic, _Topic2.default);

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(181);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._36pJ{position:relative;height:225px}._36pJ img{-o-object-fit:cover;object-fit:cover;width:100%;height:225px}._36pJ ._1ERD{position:absolute;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);height:25px;text-align:right;font-size:11px;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}._36pJ ._1ERD span{margin-top:5px;margin-right:10px}._36pJ ._30vZ{font-size:18px;color:#fff;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:100%;text-align:center}.MK-0{z-index:999;margin-top:-26.5px;padding:0 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.MK-0 .cbfF img{height:50px;width:50px;border:3px solid #fff;border-radius:25px;margin-right:5px}.MK-0 ._30vZ{font-size:18px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:#fff}.MK-0 ._2S8u{margin:30px 0 0;font-size:14px;color:#ff989e}.P0Ts{margin:0 auto 45px 0;padding:0;max-width:768px}._2Zor,.P0Ts{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:100%}._2Zor{background:#fff;padding:12px 10px 10px}._1NDr{width:100%;padding-top:6px;background:#f7f7f7}._1NDr ._3iUr{border-left:6px solid #ff989e;height:31px;padding-left:15px}._1NDr ._3iUr span{font-size:14px}._1NDr ._3iUr span:nth-child(2){color:#999}._1NDr ul{padding:0 1.6% 20px;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;list-style:none}._1NDr ul li{margin-top:6px;width:49.175%;background:#fff}._1NDr ul li a{-webkit-tap-highlight-color:rgba(0,0,0,0)}._1NDr ul li a img{width:100%}._1NDr ul li ._1Fyz{padding:0 12px 12px}._1NDr ul li ._1Fyz p{margin:6px 0}._1NDr ul li ._1Fyz ._30vZ{font-size:13px}._1NDr ul li ._1Fyz .ZJCp{color:#666;font-size:11px}._1NDr ul li ._1Fyz .ZJCp ._2S8u{color:#ff989e}._1NDr ul li ._1Fyz ._2Gzc{border-top:.5px solid #e5e5e5}._1NDr ul li ._1Fyz ._2Gzc p{margin-top:9px;font-size:10px;color:#666}._1NDr ul li:nth-child(even){margin-left:1.65%}", ""]);
  
  // exports
  exports.locals = {
  	"cover": "_36pJ",
  	"shadow": "_1ERD",
  	"title": "_30vZ",
  	"user": "MK-0",
  	"avatar": "cbfF",
  	"nickname": "_2S8u",
  	"container": "P0Ts",
  	"content": "_2Zor",
  	"strategies": "_1NDr",
  	"strategiesCount": "_3iUr",
  	"main": "_1Fyz",
  	"by": "ZJCp",
  	"participate": "_2Gzc"
  };

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Event = __webpack_require__(183);
  
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
              query = '{\n  event(path: "' + eventId + '") {\n    strategy {\n      title\n      strategyId\n    }\n    title\n    cover\n    startDate\n    endDate\n    content\n    maxAge\n    minAge\n    minNumber\n    number\n    enrollCount\n    location\n    enrollCount\n    number\n    price\n    commentCount\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n    participants {\n      participant {\n        avatar\n        nickname\n        userId\n      }\n    }\n    owner {\n      avatar\n      nickname\n    }\n  }\n}\n';
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
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Event = __webpack_require__(184);
  
  var _Event2 = _interopRequireDefault(_Event);
  
  var _Comments = __webpack_require__(172);
  
  var _Comments2 = _interopRequireDefault(_Comments);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _Footer = __webpack_require__(130);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Image = __webpack_require__(176);
  
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
        { className: _Event2.default.cover },
        _react2.default.createElement(_Image2.default, { className: _Event2.default.cover, height: '450', src: event.cover }),
        _react2.default.createElement('div', { className: _Event2.default.shadow })
      ),
      _react2.default.createElement(
        'div',
        { className: _Event2.default.user },
        _react2.default.createElement(_Image2.default, { className: _Event2.default.avatar, height: '100', width: '100', src: event.owner.avatar, type: 'avatar' }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: _Event2.default.title },
            event.title
          ),
          _react2.default.createElement(
            'p',
            { className: _Event2.default.nickname },
            'by  ',
            event.owner.nickname
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _Event2.default.info },
        _react2.default.createElement(
          'div',
          { className: _Event2.default.startDate },
          _react2.default.createElement('img', { src: '../../icon_time.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '开始时间'
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
          _react2.default.createElement('img', { src: '../../icon_time.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '结束时间'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            _dateFormat2.default.postDate(event.endDate)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Event2.default.age },
          _react2.default.createElement('img', { src: '../../icon_age.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '适合年纪'
          ),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.value },
            event.minAge,
            ' - ',
            event.maxAge,
            '岁'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Event2.default.location },
          _react2.default.createElement('img', { src: '../../icon_mark.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '活动地点'
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
          _react2.default.createElement('img', { src: '../../icon_count.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '人数限制'
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
          _react2.default.createElement('img', { src: '../../icon_pluse.png', alt: '' }),
          _react2.default.createElement(
            'span',
            { className: _Event2.default.title },
            '活动价格'
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
      renderStrategy(event.strategy),
      renderParticipants(event.participants),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Comments2.default, { comments: event.comments, commentCount: event.commentCount })
      ),
      _react2.default.createElement(_Footer2.default, null)
    );
  }
  function renderParticipants(participants) {
    if (!participants.length || participants.length == 0) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _Event2.default.participants },
      _react2.default.createElement(
        'p',
        null,
        '参与活动',
        _react2.default.createElement(
          'span',
          null,
          '(',
          participants.length,
          ')'
        )
      ),
      _react2.default.createElement(
        'ul',
        null,
        participants.map(function (item, key) {
          if (key > 3) {
            return null;
          }
          return _react2.default.createElement(
            'li',
            { key: key },
            _react2.default.createElement(_Image2.default, { height: '64', width: '64', src: item.participant.avatar })
          );
        })
      )
    );
  }
  
  function renderStrategy(strategy) {
    if (strategy == null) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: _Event2.default.strategy },
      _react2.default.createElement('div', { className: _Event2.default.triangle }),
      _react2.default.createElement(
        'div',
        { className: _Event2.default.content },
        _react2.default.createElement(
          'p',
          null,
          '来自妙招：'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'a',
            { href: '/strategies/' + strategy.strategyId + '/view' },
            strategy.title
          ),
          _react2.default.createElement('img', { src: '../../icon_next_grey.png' })
        )
      )
    );
  }
  
  Event.propTypes = {
    event: _react.PropTypes.object.isRequired
  };
  exports.default = (0, _withStyles2.default)(Event, _Event2.default);

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(185);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._3g6o{margin:0 0 45px;padding:0;width:100%;background:#fff;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}._3_4u{position:relative}._3_4u img{-o-object-fit:cover;object-fit:cover;height:225px;width:100%}._3_4u .ak8Q{position:absolute;bottom:0;left:0;right:0;background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.65)));background:-webkit-linear-gradient(transparent,rgba(0,0,0,.65));background:linear-gradient(transparent,rgba(0,0,0,.65));height:10vw}.yRxb{z-index:999;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin-top:-25px;padding:0 10px}.yRxb ._37HN{height:50px;width:50px;border-radius:25px;border:3px solid #fff}.yRxb div{margin-left:15px}.yRxb div ._1MaT{margin-top:10px;font-size:15px;color:#ff989e}.yRxb div ._1MaT span:nth-child(1){color:#666;margin-right:10px}.yRxb div ._3StE{color:#fff;font-size:18px}._36-d{background:#fff;padding:12px}._36-d ._1i5M img,._36-d ._2dz4 img,._36-d ._3j99 img,._36-d ._25TK img,._36-d .teJM img,._36-d .YMWt img{width:17px;height:17px;margin-right:15px}._36-d ._1i5M ._3StE,._36-d ._2dz4 ._3StE,._36-d ._3j99 ._3StE,._36-d ._25TK ._3StE,._36-d .teJM ._3StE,._36-d .YMWt ._3StE{width:51px;font-size:12px;color:#666;line-height:30pt}._36-d ._1i5M ._1KIr,._36-d ._2dz4 ._1KIr,._36-d ._3j99 ._1KIr,._36-d ._25TK ._1KIr,._36-d .teJM ._1KIr,._36-d .YMWt ._1KIr{font-size:12px;color:#999;margin-left:22px}._2a12{background:#fff;line-height:1.8;width:100%;padding:15px 12px}._2a12 img{height:100%;width:100%}._1lG4{padding:0 10px}._1lG4 ._34i2{margin-left:22px;width:0;height:0;border-left:15.6px solid transparent;border-right:15.6px solid transparent;border-bottom:20px solid #ededed}._1lG4 ._2a12{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;height:67px;background:#ededed;padding:23px 10px}._1lG4 ._2a12 p{font-size:15px;color:#666}._1lG4 ._2a12 a{text-decoration:none;color:#999;font-size:14px}._1lG4 ._2a12 img{margin-left:10px;width:9px;height:15.5px}._2Gde{width:100%;background:#fff;height:91px;padding:35px 20px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}._2Gde,._2Gde ul{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}._2Gde ul{list-style:none;margin-right:31px}._2Gde ul li{width:32px;height:32px}._2Gde ul li img{border-radius:16px;width:100%;height:100%}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3g6o",
  	"cover": "_3_4u",
  	"shadow": "ak8Q",
  	"user": "yRxb",
  	"avatar": "_37HN",
  	"nickname": "_1MaT",
  	"title": "_3StE",
  	"info": "_36-d",
  	"startDate": "teJM",
  	"endDate": "_25TK",
  	"age": "_2dz4",
  	"location": "_1i5M",
  	"number": "YMWt",
  	"price": "_3j99",
  	"value": "_1KIr",
  	"content": "_2a12",
  	"strategy": "_1lG4",
  	"triangle": "_34i2",
  	"participants": "_2Gde"
  };

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _numeral = __webpack_require__(160);
  
  var _numeral2 = _interopRequireDefault(_numeral);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var obj = __webpack_require__(187);
  _numeral2.default.language('chs', obj);
  var NumeralFormat = {
    money: function money(value) {
      return '￥' + (0, _numeral2.default)(value).format('0,0.00');
    }
  };
  exports.default = NumeralFormat;

/***/ },
/* 187 */
/***/ function(module, exports) {

  module.exports = require("numeral/languages/chs");

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Photo = __webpack_require__(189);
  
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
              query = '{\n  photo(path: "' + photoId + '") {\n  commentCount\n    owner {\n      nickname\n      avatar\n    }\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      content\n      createdAt\n      commentId\n      images\n    }\n    createdAt\n    content {\n         desc\n         img\n    }\n  }\n}';
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
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Photo = __webpack_require__(190);
  
  var _Photo2 = _interopRequireDefault(_Photo);
  
  var _Comments = __webpack_require__(172);
  
  var _Comments2 = _interopRequireDefault(_Comments);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _Image = __webpack_require__(176);
  
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
      _react2.default.createElement(_Comments2.default, { comments: photo.comments, commentCount: photo.commentCount })
    );
  }
  
  Photo.propTypes = {
    photo: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Photo, _Photo2.default);

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(191);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._1Nld{margin:0 0 45px;padding:0;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;background-color:#fcf8f5}._25cW img{height:347px;width:100%;-o-object-fit:cover;object-fit:cover}._2boW{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;background:#fff;border-bottom:1px solid #e5e5e5}._2boW ._3nx2 img{margin:17px 17px 0;height:41px;width:41px;border-radius:20.5px}._2boW ._3JkA p{margin:14px 0}._2boW ._3JkA .aX5j{color:#ff989e;font-size:12px}._2boW ._3JkA ._3K_D{font-size:17px;color:#666}._2boW ._3JkA .H0ny{font-size:12px;color:#999}", ""]);
  
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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Artcle = __webpack_require__(193);
  
  var _Artcle2 = _interopRequireDefault(_Artcle);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/articles/*/view'; /**
                                                 * Created by diwu on 3/12/16.
                                                 */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var articleId, query, response, _ref, data, title;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              articleId = state.path.replace('/articles/', '').replace('/view', '');
              query = '{\n  article(path: "' + articleId + '") {\n    owner {\n      nickname\n      avatar\n    }\n    title\n    photos\n    createdAt  \n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n    commentsCount\n    \n  }\n}\n';
              _context.next = 4;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 4:
              response = _context.sent;
              _context.next = 7;
              return response.json();
  
            case 7:
              _ref = _context.sent;
              data = _ref.data;
              title = data.article.title;
  
              state.context.onSetMeta('og:type', 'article');
              state.context.onSetMeta('og:image', data.article.photos[0]);
              state.context.onSetMeta('og:title', data.article.title);
              state.context.onSetMeta('format-detection', 'telephone-no');
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Artcle2.default, { article: data.article }));
  
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
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Artcle = __webpack_require__(194);
  
  var _Artcle2 = _interopRequireDefault(_Artcle);
  
  var _Comments = __webpack_require__(172);
  
  var _Comments2 = _interopRequireDefault(_Comments);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Article(_ref) {
    var article = _ref.article;
  
    return _react2.default.createElement(
      'div',
      { className: _Artcle2.default.container },
      _react2.default.createElement(
        'div',
        { className: _Artcle2.default.header },
        _react2.default.createElement(_Image2.default, { className: _Artcle2.default.avatar, height: '64', width: '64', src: article.owner.avatar, type: 'avatar' }),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: _Artcle2.default.nickname },
            article.owner.nickname
          ),
          _react2.default.createElement(
            'p',
            { className: _Artcle2.default.time },
            _dateFormat2.default.commentDate(article.createdAt)
          )
        )
      ),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        'div',
        { className: _Artcle2.default.main },
        _react2.default.createElement(
          'p',
          { className: _Artcle2.default.content },
          article.title
        ),
        _react2.default.createElement(
          'ul',
          { className: _Artcle2.default.images },
          article.photos.map(function (value) {
            return _react2.default.createElement(
              'li',
              { key: value },
              _react2.default.createElement(_Image2.default, { height: '230', width: '230', src: value })
            );
          })
        )
      ),
      _react2.default.createElement(_Comments2.default, { comments: article.comments, commentCount: article.commentsCount })
    );
  }
  Article.propTypes = {
    article: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Article, _Artcle2.default);

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(195);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._2pFD{margin-bottom:50px;padding:0 15px}._2fUd{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;min-width:48px;padding:15px 0}._2fUd ._2l8w{height:32px;width:32px;border-radius:16px}._2fUd div{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-left:12px}._2fUd div ._37sA{margin:2px 0;font-size:10px;color:#cbcbcb}._2fUd div ._2avC{font-size:13px;color:#ff989e}hr{border-top:.5px solid #ededed;margin:0}.jcin ._2MBT{padding:15px 0;font-size:12px;color:#666}.jcin ._11fi{padding:0;list-style:none;background:#f7f7f7;background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.jcin ._11fi li{width:120px;height:120px}.jcin ._11fi li img{-o-object-fit:cover;object-fit:cover;width:115px;height:115px}.jcin ._11fi li:nth-child(1){margin-left:0}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_2pFD",
  	"header": "_2fUd",
  	"avatar": "_2l8w",
  	"time": "_37sA",
  	"nickname": "_2avC",
  	"main": "jcin",
  	"content": "_2MBT",
  	"images": "_11fi"
  };

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Podcasts = __webpack_require__(197);
  
  var _Podcasts2 = _interopRequireDefault(_Podcasts);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/podcasts/'; /**
                                           * Created by diwu on 3/12/16.
                                           */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var query, response, _ref, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = '{\n  podcasts {\n     recommendPodcasts {\n      podcastId\n      title\n      cover\n      price\n      user {\n        nickname\n        avatar\n      }\n      content\n      startDate\n      enrollCount\n      userScore\n      roomNumber\n      startDate\n    }\n  }\n  podcasts{\n    hotPodcasts  {\n      podcastId\n      title\n      cover\n      price\n      user {\n        nickname\n        avatar\n      }\n      content\n      startDate\n      enrollCount\n      userScore\n      roomNumber\n      startDate\n    }\n  }\n}\n';
              _context.next = 3;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();
  
            case 6:
              _ref = _context.sent;
              data = _ref.data;
  
              state.context.onSetMeta('og:title', '精彩课程');
              state.context.onSetMeta('title', '精彩课程');
              return _context.abrupt('return', _react2.default.createElement(_Podcasts2.default, { hotPodcasts: data.podcasts.hotPodcasts, recommendPodcasts: data.podcasts.recommendPodcasts }));
  
            case 11:
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
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Podcasts = __webpack_require__(198);
  
  var _Podcasts2 = _interopRequireDefault(_Podcasts);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _Location = __webpack_require__(118);
  
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
  
  var Podcasts = function (_Component) {
    (0, _inherits3.default)(Podcasts, _Component);
  
    function Podcasts(props, context) {
      (0, _classCallCheck3.default)(this, Podcasts);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Podcasts).call(this, props, context));
    }
  
    (0, _createClass3.default)(Podcasts, [{
      key: 'render',
      value: function render() {
        var hotPodcasts = this.props.hotPodcasts;
        var recommendPodcasts = this.props.recommendPodcasts;
        return _react2.default.createElement(
          'div',
          { className: _Podcasts2.default.container },
          _react2.default.createElement(
            'section',
            { className: _Podcasts2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcasts2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Podcasts2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '热门优选'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _Podcasts2.default.podcasts },
              _react2.default.createElement(
                'ul',
                { style: { backgroundColor: 'white' } },
                hotPodcasts.map(function (item) {
                  return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '/podcasts/' + item.podcastId + '/view' },
                      _react2.default.createElement(_Image2.default, { src: item.cover, h: '357', w: '357' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: _Podcasts2.default.main },
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.title },
                        item.title
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.price },
                        item.price == 0 ? '免费' : _NumberFotmat2.default.money(item.price / 100)
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.by },
                        _react2.default.createElement('img', { className: _Podcasts2.default.avatar, width: '80', height: '80', src: item.user.avatar }),
                        _react2.default.createElement(
                          'span',
                          { className: _Podcasts2.default.nickname },
                          item.user.nickname
                        )
                      )
                    )
                  );
                })
              )
            )
          ),
          _react2.default.createElement(
            'section',
            { className: _Podcasts2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcasts2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Podcasts2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '畅销推荐'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _Podcasts2.default.podcasts },
              _react2.default.createElement(
                'ul',
                { style: { backgroundColor: 'white' } },
                recommendPodcasts.map(function (item) {
                  return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '/podcasts/' + item.podcastId + '/view' },
                      _react2.default.createElement(_Image2.default, { src: item.cover, h: '357', w: '357' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: _Podcasts2.default.main },
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.title },
                        item.title
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.price },
                        item.price == 0 ? '免费' : _NumberFotmat2.default.money(item.price / 100)
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.by },
                        _react2.default.createElement('img', { className: _Podcasts2.default.avatar, width: '80', height: '80', src: item.user.avatar }),
                        _react2.default.createElement(
                          'span',
                          { className: _Podcasts2.default.nickname },
                          item.user.nickname
                        )
                      )
                    )
                  );
                })
              )
            )
          )
        );
      }
    }]);
    return Podcasts;
  }(_react.Component);
  
  Podcasts.propTypes = {};
  
  exports.default = (0, _withStyles2.default)(Podcasts, _Podcasts2.default);

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(199);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "ul{list-style:none}._1hEh{margin:0 0 45px;padding:0;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:left;-ms-flex-align:left;align-items:left;width:100%}._1hEh *{margin:0;padding:0}._1hEh ._3kQ7{width:100%;height:40px;background-color:#ffb7bb;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}._1hEh ._3kQ7 span{margin:0 5px}._1hEh ._3kQ7 ._1hxo{font-size:11px}._1hEh ._3kQ7 ._1EpA{font-size:15px}._1hEh .XmlA{width:100%;min-height:141px;border-bottom:5px solid #f7f7f7}._1hEh .XmlA .LCcR{font-size:21px;color:#333;font-weight:400;text-align:center;margin:20px}._1hEh .XmlA .h2Zo{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin:0 45px}._1hEh .XmlA .h2Zo,._1hEh .XmlA .h2Zo li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._1hEh .XmlA .h2Zo li{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;max-width:88px;min-width:88px}._1hEh .XmlA .h2Zo img{width:40px;height:40px}._1hEh .XmlA .h2Zo span{font-size:11px;color:#999}._1hEh ._2JA5{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;border-bottom:5px solid #f7f7f7}._1hEh ._2JA5 ._1jSc{width:50px;height:50px;min-height:50px;min-width:50px;border-radius:50%;margin:10px}._1hEh ._2JA5 ._3lKM{margin:15px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}._1hEh ._2JA5 ._3lKM .A9rF{font-size:15px;line-height:18px;color:#ff989e}._1hEh ._2JA5 ._3lKM .LCcR{font-size:12px;line-height:18px;color:#999}._1hEh ._2JA5 ._3lKM ._1Lv5{font-size:16px;line-height:24px;color:#666}._1hEh ._1Nj-{font-size:15px;color:#999;padding:10px}._2D5G{border-radius:50%;width:125px;height:125px;border:2px solid #fed271;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._2D5G ._3M8c{margin:0;padding:0;color:#fff;font-size:18px}._2D5G ._1n4q{margin:0;padding:0;font-size:22px;color:#fed271}._1hdf{position:relative}._1hdf,._1hdf img{width:100%;height:225px}._1hdf img{-o-object-fit:cover;object-fit:cover}._1hdf ._1icE{position:absolute;left:0;right:0;bottom:0;background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.65)));background:-webkit-linear-gradient(transparent,rgba(0,0,0,.65));background:linear-gradient(transparent,rgba(0,0,0,.65));height:10vw}._1avL{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;border-bottom:5px solid #f7f7f7;overflow:hidden}._1avL,.arzr{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal}.arzr{color:#666;font-size:16px;height:40px;background-color:#fff;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}.arzr ._2pyG{width:2px;height:15px;background-color:#ff989e;margin-right:8px;margin-left:10px;border-radius:1px}._2gKt{font-size:16px;line-height:24px;color:#666;margin:0 10px 10px;width:calc(100% - 20px)}._1-2c{position:absolute;display:block;width:100%;float:left;top:0;background-color:rgba(0,0,0,.5);height:auto;left:0;right:0;bottom:0}._1-2c img{margin-top:85px;width:50%;height:auto;-webkit-transform:translateX(50%);transform:translateX(50%)}._3KAj{text-decoration:none;color:#666;border-top:1px solid #ededed}._3KAj p{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.Zpml{width:100%;padding-top:6px;background:#fff}.Zpml ul{padding:0 1.6% 20px;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;list-style:none}.Zpml ul li{margin-top:6px;width:49.175%;background:#fff}.Zpml ul li a{-webkit-tap-highlight-color:rgba(0,0,0,0)}.Zpml ul li a img{width:100%;height:100px;-o-object-fit:cover;object-fit:cover}.Zpml ul li ._2Tc6{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:10px 0}.Zpml ul li ._2Tc6 .LCcR{font-size:13px;height:40px}.Zpml ul li ._2Tc6 ._1EpA{font-size:12px;color:#ff989e;margin:6px;-ms-flex-item-align:end;align-self:flex-end}.Zpml ul li ._2Tc6 ._31WW{border-top:1px solid #ededed;padding:10px 6px;color:#666;font-size:11px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.Zpml ul li ._2Tc6 ._31WW ._1jSc{width:16px;height:16px;border-radius:50%}.Zpml ul li ._2Tc6 ._31WW .A9rF{margin-left:6px;color:#999}.Zpml ul li:nth-child(even){margin-left:1.65%}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_1hEh",
  	"countingWrap": "_3kQ7",
  	"counting": "_1hxo",
  	"price": "_1EpA",
  	"infoWrap": "XmlA",
  	"title": "LCcR",
  	"info": "h2Zo",
  	"user": "_2JA5",
  	"avatar": "_1jSc",
  	"nameWrap": "_3lKM",
  	"nickname": "A9rF",
  	"description": "_1Lv5",
  	"time": "_1Nj-",
  	"countdown": "_2D5G",
  	"countdownLabel": "_3M8c",
  	"date": "_1n4q",
  	"cover": "_1hdf",
  	"shadow": "_1icE",
  	"AppSection": "_1avL",
  	"AppSectionHeader": "arzr",
  	"line": "_2pyG",
  	"content": "_2gKt",
  	"startLesson": "_1-2c",
  	"more": "_3KAj",
  	"podcasts": "Zpml",
  	"main": "_2Tc6",
  	"by": "_31WW"
  };

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Podcast = __webpack_require__(201);
  
  var _Podcast2 = _interopRequireDefault(_Podcast);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/podcasts/*/view'; /**
                                                 * Created by diwu on 3/12/16.
                                                 */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var d, appData, token, podcastId, query, response, _ref, data, title, _podcastId, _query, _response, _ref2, _data, _title;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.context.appData && state.context.appData.length > 0)) {
                _context.next = 23;
                break;
              }
  
              d = state.context.appData.replace(/&quot;/g, '"');
              appData = JSON.parse(d);
              token = appData.access_token || "unsign";
              podcastId = state.path.replace('/podcasts/', '').replace('/view', '');
              query = '{\n  podcast(path: "' + podcastId + '", token: "' + token + '") {\n    podcastId\n    title\n    cover\n    price\n    content\n    syllabus\n    startDate\n    endDate\n    enrollCount\n    userScore\n    joined\n    roomNumber\n    scope\n    user {\n      nickname\n      avatar\n      description\n    }\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n    relevantPodcasts {\n    podcastId\n     user {\n     avatar\n      nickname\n    }\n    cover\n    price\n    startDate\n    title\n    }\n  }\n}\n';
              _context.next = 8;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 8:
              response = _context.sent;
              _context.next = 11;
              return response.json();
  
            case 11:
              _ref = _context.sent;
              data = _ref.data;
              title = data.podcast.title;
  
              state.context.onSetMeta('og:type', 'podcast');
              state.context.onSetMeta('og:image', data.podcast.cover);
              state.context.onSetMeta('image', data.podcast.cover);
              state.context.onSetMeta('og:title', data.podcast.title);
              state.context.onSetMeta('description', data.podcast.content);
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Podcast2.default, { podcast: data.podcast, context: state, token: token }));
  
            case 23:
              _podcastId = state.path.replace('/podcasts/', '').replace('/view', '');
              _query = '{\n  podcast(path: "' + _podcastId + '", token: "unsign") {\n    podcastId\n    title\n    cover\n    price\n    content\n    syllabus\n    startDate\n        endDate\n    enrollCount\n    userScore\n    joined\n    roomNumber\n    scope\n    user {\n      nickname\n      avatar\n      description\n    }\n    comments {\n      commentUser {\n        nickname\n        avatar\n      }\n      createdAt\n      content\n      commentId\n      images\n    }\n    relevantPodcasts {\n    podcastId\n     user {\n     avatar\n      nickname\n    }\n    cover\n    price\n    startDate\n    title\n    }\n  }\n}\n';
              _context.next = 27;
              return (0, _fetch2.default)('/graphql?query=' + _query);
  
            case 27:
              _response = _context.sent;
              _context.next = 30;
              return _response.json();
  
            case 30:
              _ref2 = _context.sent;
              _data = _ref2.data;
              _title = _data.podcast.title;
  
              state.context.onSetMeta('og:type', 'podcast');
              state.context.onSetMeta('og:image', _data.podcast.cover);
              state.context.onSetMeta('image', _data.podcast.cover);
              state.context.onSetMeta('og:title', _data.podcast.title);
              state.context.onSetMeta('description', _data.podcast.content);
              state.context.onSetTitle(_title);
              return _context.abrupt('return', _react2.default.createElement(_Podcast2.default, { podcast: _data.podcast, context: state, token: 'unsign' }));
  
            case 40:
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
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(116);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Podcast = __webpack_require__(202);
  
  var _Podcast2 = _interopRequireDefault(_Podcast);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _reactLinkify = __webpack_require__(204);
  
  var _reactLinkify2 = _interopRequireDefault(_reactLinkify);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _Comment = __webpack_require__(172);
  
  var _Comment2 = _interopRequireDefault(_Comment);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Podcast = function (_Component) {
    (0, _inherits3.default)(Podcast, _Component);
  
    function Podcast(props, context) {
      (0, _classCallCheck3.default)(this, Podcast);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Podcast).call(this, props, context));
  
      _this.tick = _this.tick.bind(_this);
      _this.state = { date: (0, _moment2.default)(_this.props.podcast.startDate).fromNow() };
      return _this;
    }
  
    (0, _createClass3.default)(Podcast, [{
      key: 'tick',
      value: function tick() {
        this.setState({
          date: (0, _moment2.default)(this.props.podcast.startDate).fromNow()
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        // setInterval(this.tick, 1000);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // clearInterval(this.tick)
      }
    }, {
      key: 'renderScore',
      value: function renderScore(podcast) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            null,
            podcast.enrollCount + ' 学过'
          ),
          _react2.default.createElement(
            'span',
            null,
            '评分 ' + podcast.userScore > 0 ? podcast.userScore : 9.9 + ' 分'
          )
        );
      }
    }, {
      key: 'renderScope',
      value: function renderScope(scope) {
        var result = '0 岁以下';
        switch (scope) {
          case 1:
            result = '1-2 岁';break;
          case 2:
            result = '3-4 岁';break;
          case 3:
            result = '5 岁以上';break;
          default:
            result = '0 岁以下';
        }
  
        return _react2.default.createElement(
          'span',
          null,
          result
        );
      }
    }, {
      key: 'redirectOrder',
      value: function redirectOrder(event) {}
    }, {
      key: 'render',
      value: function render() {
        var podcast = this.props.podcast;
        var token = this.props.token || 'unsign';
        var url = '';
        if (podcast.joined) {
          url = '/podcastdetail/' + podcast.podcastId + '/view';
        } else if (!podcast.joined && podcast.price == 0) {
          // Location.push('/podcastdetail/'+podcast.podcastId+'/view');
          url = '/podcastdetail/' + podcast.podcastId + '/view';
        } else {
          url = '/podcastdetail/order/' + podcast.podcastId;
        }
        var feature = (0, _moment2.default)(this.props.podcast.startDate) > (0, _moment2.default)();
  
        return _react2.default.createElement(
          'div',
          { className: _Podcast2.default.container },
          _react2.default.createElement(
            'div',
            { style: { margin: '0 auto', display: 'none' } },
            _react2.default.createElement('img', { src: this.props.podcast.cover, alt: '' })
          ),
          _react2.default.createElement(
            'div',
            { className: _Podcast2.default.cover },
            _react2.default.createElement(_Image2.default, { width: '768', height: '225', src: this.props.podcast.cover }),
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.startLesson },
              feature ? _react2.default.createElement(
                'div',
                { className: _Podcast2.default.countdown },
                _react2.default.createElement(
                  'p',
                  { className: _Podcast2.default.countdownLabel },
                  '倒计时'
                ),
                _react2.default.createElement(
                  'p',
                  { className: _Podcast2.default.date },
                  this.state.date
                )
              ) : _react2.default.createElement(
                'a',
                { href: url, style: { height: '225px' } },
                _react2.default.createElement('img', { src: '../../btnStart@2x.png', style: { width: '50%' } })
              )
            ),
            _react2.default.createElement('div', { className: _Podcast2.default.shadow })
          ),
          _react2.default.createElement(
            'div',
            { className: _Podcast2.default.countingWrap },
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.counting },
              feature ? _react2.default.createElement('div', null) : this.renderScore(podcast)
            ),
            _react2.default.createElement(
              'span',
              { className: _Podcast2.default.price },
              podcast.price == 0 ? '免费' : _NumberFotmat2.default.money(podcast.price / 100)
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Podcast2.default.infoWrap },
            _react2.default.createElement(
              'h3',
              { className: _Podcast2.default.title },
              podcast.title
            ),
            _react2.default.createElement(
              'ul',
              { className: _Podcast2.default.info },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('img', { src: '/iconPodcastBaby@2x.png', alt: '' }),
                this.renderScope(podcast.scope)
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('img', { src: '/iconPodcastTime@2x.png', alt: '' }),
                _react2.default.createElement(
                  'span',
                  null,
                  _dateFormat2.default.commentDate(podcast.startDate)
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('img', { src: '/iconPodcastTimer@2x.png', alt: '' }),
                _react2.default.createElement(
                  'span',
                  null,
                  (0, _moment2.default)(this.props.podcast.endDate).from((0, _moment2.default)(this.props.podcast.startDate), true)
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Podcast2.default.user },
            _react2.default.createElement('img', { className: _Podcast2.default.avatar, width: '80', height: '80', src: podcast.user.avatar }),
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.nameWrap },
              _react2.default.createElement(
                'p',
                { className: _Podcast2.default.nickname },
                podcast.user.nickname,
                ' ',
                _react2.default.createElement(
                  'span',
                  { className: _Podcast2.default.title },
                  '讲师'
                )
              ),
              _react2.default.createElement(
                'p',
                { className: _Podcast2.default.description },
                podcast.user.description
              )
            )
          ),
          _react2.default.createElement(
            'section',
            { className: _Podcast2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Podcast2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '课程描述'
              )
            ),
            _react2.default.createElement(Text, { className: _Podcast2.default.content, content: podcast.content.replace(/\n/g, "<br />") })
          ),
          _react2.default.createElement(
            'section',
            { className: _Podcast2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Podcast2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '课程大纲'
              )
            ),
            _react2.default.createElement(Text, { className: _Podcast2.default.content, content: podcast.syllabus.replace(/\n/g, "<br />") })
          ),
          _react2.default.createElement(
            'section',
            { className: _Podcast2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Podcast2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '相关微课'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.podcasts },
              _react2.default.createElement(
                'ul',
                { style: { backgroundColor: 'white' } },
                podcast.relevantPodcasts.map(function (item) {
                  return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '/podcasts/' + item.podcastId + '/view' },
                      _react2.default.createElement(_Image2.default, { src: item.cover, h: '357', w: '357' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: _Podcast2.default.main },
                      _react2.default.createElement(
                        'p',
                        { className: _Podcast2.default.title },
                        item.title
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcast2.default.price },
                        item.price == 0 ? '免费' : _NumberFotmat2.default.money(item.price / 100)
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcast2.default.by },
                        _react2.default.createElement('img', { className: _Podcast2.default.avatar, width: '80', height: '80', src: item.user.avatar }),
                        _react2.default.createElement(
                          'span',
                          { className: _Podcast2.default.nickname },
                          item.user.nickname
                        )
                      )
                    )
                  );
                })
              )
            ),
            _react2.default.createElement(
              'a',
              { href: '/podcasts', style: { width: '100%' }, className: _Podcast2.default.more },
              _react2.default.createElement(
                'p',
                { style: { height: '40px', width: '100%', textAlign: 'center', fontSize: '15px' } },
                '更多精彩课程'
              )
            )
          ),
          _react2.default.createElement(
            'section',
            { className: _Podcast2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcast2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _Podcast2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                '问答'
              )
            ),
            _react2.default.createElement(_Comment2.default, { comments: podcast.comments })
          )
        );
      }
    }]);
    return Podcast;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  var Text = _react2.default.createClass({
    displayName: 'Text',
  
    render: function render() {
      return _react2.default.createElement(
        'p',
        (0, _extends3.default)({}, this.props, { style: { overflow: 'hidden' } }),
        _react2.default.createElement(
          _reactLinkify2.default,
          null,
          breakLine(this.props.content)
        )
      );
    }
  });
  
  function breakLine(text) {
    var regex = /(<br \/>)/g;
    return text.split(regex).map(function (line) {
      return line.match(regex) ? _react2.default.createElement('br') : line;
    });
  }
  
  Podcast.propTypes = {
    podcast: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Podcast, _Podcast2.default);

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(203);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "ul{list-style:none}._3RZh{margin:0 0 45px;padding:0;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:left;-ms-flex-align:left;align-items:left;width:100%}._3RZh *{margin:0;padding:0}._3RZh ._2I12{width:100%;height:40px;background-color:#ffb7bb;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}._3RZh ._2I12 span{margin:0 5px}._3RZh ._2I12 .Pg6d{font-size:11px}._3RZh ._2I12 ._3H7P{font-size:15px}._3RZh ._3Npf{width:100%;min-height:141px;border-bottom:5px solid #f7f7f7}._3RZh ._3Npf ._1ogT{font-size:21px;color:#333;font-weight:400;text-align:center;margin:20px}._3RZh ._3Npf .sN7G{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin:0 45px}._3RZh ._3Npf .sN7G,._3RZh ._3Npf .sN7G li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._3RZh ._3Npf .sN7G li{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;max-width:88px;min-width:88px}._3RZh ._3Npf .sN7G img{width:40px;height:40px}._3RZh ._3Npf .sN7G span{font-size:11px;color:#999}._3RZh ._23DB{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;border-bottom:5px solid #f7f7f7}._3RZh ._23DB ._3PSQ{width:50px;height:50px;min-height:50px;min-width:50px;border-radius:50%;margin:10px}._3RZh ._23DB .avpl{margin:15px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}._3RZh ._23DB .avpl ._20P-{font-size:15px;line-height:18px;color:#ff989e}._3RZh ._23DB .avpl ._1ogT{font-size:12px;line-height:18px;color:#999}._3RZh ._23DB .avpl .ICUB{font-size:16px;line-height:24px;color:#666}._3RZh .y5X5{font-size:15px;color:#999;padding:10px}._3a-8{border-radius:50%;width:125px;height:125px;border:2px solid #fed271;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._3a-8 .mOOU{margin:0;padding:0;color:#fff;font-size:18px}._3a-8 ._1-M0{margin:0;padding:0;font-size:22px;color:#fed271}._39Uv{position:relative}._39Uv,._39Uv img{width:100%;height:225px}._39Uv img{-o-object-fit:cover;object-fit:cover}._39Uv ._3kyK{position:absolute;left:0;right:0;bottom:0;background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.65)));background:-webkit-linear-gradient(transparent,rgba(0,0,0,.65));background:linear-gradient(transparent,rgba(0,0,0,.65));height:10vw}._2o5U{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;border-bottom:5px solid #f7f7f7;overflow:hidden}._2o5U,._36j_{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal}._36j_{color:#666;font-size:16px;height:40px;background-color:#fff;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}._36j_ .tk3Z{width:2px;height:15px;background-color:#ff989e;margin-right:8px;margin-left:10px;border-radius:1px}._38ww{font-size:16px;line-height:24px;color:#666;margin:0 10px 10px;width:calc(100% - 20px)}._3P7G{position:absolute;display:block;width:100%;float:left;top:0;background-color:rgba(0,0,0,.5);height:auto;left:0;right:0;bottom:0}._3P7G img{margin-top:85px;width:50%;height:auto;-webkit-transform:translateX(50%);transform:translateX(50%)}._326v{text-decoration:none;color:#666;border-top:1px solid #ededed}._326v p{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._2XIq{width:100%;padding-top:6px;background:#fff}._2XIq ul{padding:0 1.6% 20px;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;list-style:none}._2XIq ul li{margin-top:6px;width:49.175%;background:#fff}._2XIq ul li a{-webkit-tap-highlight-color:rgba(0,0,0,0)}._2XIq ul li a img{width:100%;height:100px;-o-object-fit:cover;object-fit:cover}._2XIq ul li .tC8-{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:10px 0}._2XIq ul li .tC8- ._1ogT{font-size:13px;height:40px}._2XIq ul li .tC8- ._3H7P{font-size:12px;color:#ff989e;margin:6px;-ms-flex-item-align:end;align-self:flex-end}._2XIq ul li .tC8- ._36jT{border-top:1px solid #ededed;padding:10px 6px;color:#666;font-size:11px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._2XIq ul li .tC8- ._36jT ._3PSQ{width:16px;height:16px;border-radius:50%}._2XIq ul li .tC8- ._36jT ._20P-{margin-left:6px;color:#999}._2XIq ul li:nth-child(even){margin-left:1.65%}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3RZh",
  	"countingWrap": "_2I12",
  	"counting": "Pg6d",
  	"price": "_3H7P",
  	"infoWrap": "_3Npf",
  	"title": "_1ogT",
  	"info": "sN7G",
  	"user": "_23DB",
  	"avatar": "_3PSQ",
  	"nameWrap": "avpl",
  	"nickname": "_20P-",
  	"description": "ICUB",
  	"time": "y5X5",
  	"countdown": "_3a-8",
  	"countdownLabel": "mOOU",
  	"date": "_1-M0",
  	"cover": "_39Uv",
  	"shadow": "_3kyK",
  	"AppSection": "_2o5U",
  	"AppSectionHeader": "_36j_",
  	"line": "tk3Z",
  	"content": "_38ww",
  	"startLesson": "_3P7G",
  	"more": "_326v",
  	"podcasts": "_2XIq",
  	"main": "tC8-",
  	"by": "_36jT"
  };

/***/ },
/* 204 */
/***/ function(module, exports) {

  module.exports = require("react-linkify");

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _PodcastDetail = __webpack_require__(206);
  
  var _PodcastDetail2 = _interopRequireDefault(_PodcastDetail);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/podcastdetail/*/view'; /**
                                                      * Created by diwu on 3/12/16.
                                                      */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var d, appData, token, userId, podcastId, query, response, _ref, data, q;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.context.appData && state.context.appData.length > 0)) {
                _context.next = 21;
                break;
              }
  
              d = state.context.appData.replace(/&quot;/g, '"');
              appData = JSON.parse(d);
              token = appData.access_token;
              userId = appData.userId;
  
              if (!token) {
                _context.next = 21;
                break;
              }
  
              podcastId = state.path.replace('/podcastdetail/', '').replace('/view', '');
              query = '{\n  podcast(path: "' + podcastId + '", token: "' + token + '") {\n    title\n    joined\n    roomNumber\n  }\n}\n';
  
              console.log(query);
              _context.next = 11;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 11:
              response = _context.sent;
              _context.next = 14;
              return response.json();
  
            case 14:
              _ref = _context.sent;
              data = _ref.data;
  
              state.context.onSetMeta('title', data.podcast.title);
              state.context.onSetMeta('og:title', data.podcast.title);
  
              q = '{\n  order(podcastId: "' + podcastId + '", token: "' + token + '", ) {\n    orderId\n  }\n}';
  
              if (token != 'unsign') {
                (0, _fetch2.default)('/graphql?query=' + q);
              }
              return _context.abrupt('return', _react2.default.createElement(_PodcastDetail2.default, { podcastId: data.podcast.roomNumber, userId: userId }));
  
            case 21:
              return _context.abrupt('return', _react2.default.createElement('div', null));
  
            case 22:
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
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _PodcastDetail = __webpack_require__(207);
  
  var _PodcastDetail2 = _interopRequireDefault(_PodcastDetail);
  
  var _ChatVoice = __webpack_require__(209);
  
  var _ChatVoice2 = _interopRequireDefault(_ChatVoice);
  
  var _ChatVideo = __webpack_require__(212);
  
  var _ChatVideo2 = _interopRequireDefault(_ChatVideo);
  
  var _lodash = __webpack_require__(159);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var Realtime = __webpack_require__(216).Realtime;
  var realtime = new Realtime({
    appId: 'cbz3iy9f47mvirszhhfepphoyocm1uorzrps7w9tsb71h3ix',
    region: 'cn' });
  
  // 美国节点为 "us"
  
  var Podcast = function (_Component) {
    (0, _inherits3.default)(Podcast, _Component);
  
    function Podcast(props, context) {
      (0, _classCallCheck3.default)(this, Podcast);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Podcast).call(this, props, context));
  
      _this.state = { messages: [], chatRoom: null, conversationId: null };
      return _this;
    }
  
    (0, _createClass3.default)(Podcast, [{
      key: 'changeVoice',
      value: function changeVoice(item) {
        this.setState({ audioUrl: item });
        this.refs.audio.pause();
        var self = this;
        setTimeout(function () {
          self.refs.audio.play();
        }, 150);
      }
    }, {
      key: 'renderItem',
      value: function renderItem(item) {
        var message = item._lcattrs;
        return _react2.default.createElement(
          'div',
          { key: message.id, className: _PodcastDetail2.default.message },
          _react2.default.createElement('img', { className: _PodcastDetail2.default.avatar,
            src: message.avatar.replace('http://static.qunzhibo.com/', 'http://static.qunkefu.com/')
          }),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', marginLeft: 10, maxWidth: '90%' } },
            _react2.default.createElement(
              'span',
              { className: _PodcastDetail2.default.name },
              message.nickname
            ),
            _react2.default.createElement(
              'span',
              { className: _PodcastDetail2.default.time },
              message.time
            ),
            this.renderMessage(message)
          )
        );
      }
    }, {
      key: 'renderMessage',
      value: function renderMessage(item) {
        if (item.type == 'image') {
          return _react2.default.createElement(
            'div',
            { className: _PodcastDetail2.default.content, style: { width: '80%' } },
            _react2.default.createElement('img', { style: { width: '100%' }, src: item.message.replace('http://static.qunzhibo.com/', 'http://static.qunkefu.com/'), alt: '' })
          );
        } else if (item.type == 'voice') {
          return _react2.default.createElement(_ChatVoice2.default, { audioUrl: item.message, isPlay: this.state.audioUrl == item.message, changeAudio: this.changeVoice.bind(this, item.message) });
        } else if (item.type == 'link') {
          return _react2.default.createElement(
            'div',
            { className: _PodcastDetail2.default.content, style: { width: '100%', display: 'block', wordBreak: 'break-word' } },
            _react2.default.createElement(
              'a',
              { href: item.message },
              item.message
            )
          );
        } else if (item.type == 'video') {
          return _react2.default.createElement(_ChatVideo2.default, { videoUrl: item.message.replace('http://static.qunzhibo.com/', 'http://static.qunkefu.com/') });
        } else {
          return _react2.default.createElement(
            'div',
            { className: _PodcastDetail2.default.content },
            item.message
          );
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var self = this;
        realtime.createIMClient(this.props.userId).then(function (jerry) {
          self.setState({ chatRoom: jerry });
          jerry.on('message', function (message, conversation) {
            if (conversation.id == self.state.conversationId) {
              self.setState({ messages: self.state.messages.concat([message]) });
            }
          });
          var query = jerry.getQuery();
          return query.equalTo('name', self.props.podcastId).find().then(function (conversations) {
            if (conversations[0]) {
              return conversations[0];
            }
          }).catch(console.error.bind(console));
        }).then(function (conversation) {
          if (conversation) {
            self.setState({ conversationId: conversation.id });
            conversation.queryMessages({
              limit: 999 }). // limit 取值范围 1~1000，默认 20
            then(function (messages) {
              self.setState({ messages: messages });
            }).catch(console.error.bind(console));
          }
        });
  
        this.refs.audio.onended = function () {
          var messages = _lodash2.default.filter(self.state.messages, function (message) {
            return message._lcattrs.type == 'voice';
          });
  
          messages = _lodash2.default.map(messages, function (message) {
            return message._lcattrs.message;
          });
  
          var currentIndex = _lodash2.default.indexOf(messages, self.state.audioUrl);
  
          if (currentIndex + 1 < messages.length) {
            self.changeVoice(messages[currentIndex + 1]);
          }
        };
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.state.chatRoom.close().then(function () {}).catch(console.error.bind(console));
      }
    }, {
      key: 'createItems',
      value: function createItems(items) {
        var output = [];
        for (var i = 0; i < items.length; i++) {
          output.push(this.renderItem(items[i]));
        }return output;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _PodcastDetail2.default.container },
          _react2.default.createElement('audio', { className: 'player', ref: 'audio', src: this.state.audioUrl }),
          this.state.messages.length > 0 ? this.createItems(this.state.messages) : _react2.default.createElement(
            'div',
            { className: _PodcastDetail2.default.loading },
            _react2.default.createElement('div', { className: _PodcastDetail2.default.sprite }),
            _react2.default.createElement(
              'p',
              null,
              '加载中'
            )
          )
        );
      }
    }]);
    return Podcast;
  }(_react.Component);
  
  Podcast.propTypes = {};
  
  exports.default = (0, _withStyles2.default)(Podcast, _PodcastDetail2.default);

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(208);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._1hrp{margin:0 0 45px;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:left;-ms-flex-align:left;align-items:left;width:100%;padding:10px;background-color:#f7f7f7}._2RKn{background:#fff}._1OU6{overflow-y:auto;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;margin-right:10px}._1OU6,.D5lR{-webkit-box-direction:normal}.D5lR{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;min-height:80px;margin:10px}.D5lR.CXI1 img{float:left;cursor:pointer;margin-right:10px}.D5lR .Coxb{font-size:12px;color:#cbcbcb;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-top:15px}._1hX5{padding:5px 10px;background-color:#fff;display:inline-table;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border-radius:6px;position:relative;margin-top:5px}._1hX5:after{border-width:13px;margin-top:0;content:\"\";position:absolute;top:10px;width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;left:-.6rem;border-right:12px solid #fff}._1hX5:after,._1hX5:before{content:\" \";height:0;width:0;position:absolute;pointer-events:none;right:100%;border-right-color:#fff}._1_P7{font-size:12px;margin:0;color:#666;cursor:pointer;line-height:12px}._1sHW{width:32px;height:32px;min-width:32px;border-radius:50%}._1nqT{font-size:12px;color:#cbcbcb;line-height:12px;font-weight:lighter;margin-top:5px}._1crN{font-style:italic;margin:0 0 0 80px}._1U2j{width:40px;top:20px;z-index:0;left:-40px}._1U2j ul{padding:0 2px 0 10px;margin:0;list-style:none;display:-webkit-box;display:-ms-flexbox;display:flex}._1U2j ul ._1eHG{position:relative;display:block;margin:5px 0;height:4px;border-radius:3px;background:#ccc}._1U2j ul ._1eHG:nth-of-type(3){height:9%}._1U2j ul ._1eHG:nth-of-type(2){height:27%}._1U2j ul ._1eHG:nth-of-type(1){height:51%}._-iX7{height:90vh;text-align:center;-ms-flex-item-align:center;align-self:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}._-iX7 ._18uQ{width:150px;height:150px;background-image:url('/loadingsh.png');-webkit-animation:xBDL 2s steps(16) infinite;animation:xBDL 2s steps(16) infinite}._-iX7 p{color:#666;font-size:12px}@-webkit-keyframes xBDL{0%{background-position:0}to{background-position:-4800px}}@keyframes xBDL{0%{background-position:0}to{background-position:-4800px}}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_1hrp",
  	"chat": "_2RKn",
  	"chat-history": "_1OU6",
  	"message": "D5lR",
  	"left": "CXI1",
  	"groupBy": "Coxb",
  	"content": "_1hX5",
  	"name": "_1_P7",
  	"avatar": "_1sHW",
  	"time": "_1nqT",
  	"chat-feedback": "_1crN",
  	"volume": "_1U2j",
  	"listvol": "_1eHG",
  	"loading": "_-iX7",
  	"sprite": "_18uQ",
  	"play": "xBDL"
  };

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ChatVoice = __webpack_require__(210);
  
  var _ChatVoice2 = _interopRequireDefault(_ChatVoice);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Audio = function (_React$Component) {
    (0, _inherits3.default)(Audio, _React$Component);
  
    function Audio(props) {
      (0, _classCallCheck3.default)(this, Audio);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Audio).call(this, props));
  
      _this.state = { isPlay: false, duration: '0' };
      return _this;
    }
  
    (0, _createClass3.default)(Audio, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var audio = this.refs.audio;
        var self = this;
        audio.addEventListener('loadedmetadata', function () {
          self.setState({ duration: audio.duration });
        }, false);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;
  
        if (nextProps.isPlay) {
          var images;
          var i;
  
          (function () {
            var self = _this2;
            images = ["../../voice1@2x.png", "../../voice2@2x.png", "../../voice3@2x.png"];
            i = 0;
  
            setInterval(function () {
              i++;
              if (i == images.length) {
                i = 0;
              }
              self.setState({
                images: images[i]
              });
            }, 500);
          })();
        }
        this.setState({ isPlay: nextProps.isPlay });
      }
    }, {
      key: 'render',
      value: function render() {
        var width = this.state.duration / 2 > 5 ? this.state.duration / 2 : 5;
        return _react2.default.createElement(
          'div',
          { style: { flexDirection: 'row', display: 'flex' }, onClick: this.props.changeAudio },
          _react2.default.createElement(
            'div',
            { className: _ChatVoice2.default.content },
            _react2.default.createElement(
              'div',
              { style: { width: width + 'vw', minHeight: '24px' } },
              _react2.default.createElement('img', { src: this.state.isPlay ? this.state.images : '../../voice3@2x.png', alt: '', style: { height: '24px' } }),
              _react2.default.createElement('audio', { ref: 'audio', src: this.props.audioUrl })
            )
          ),
          this.state.duration > 0 ? _react2.default.createElement(
            'var',
            { className: _ChatVoice2.default.duration },
            parseInt(this.state.duration) + '″'
          ) : ''
        );
      }
    }]);
    return Audio;
  }(_react2.default.Component);
  
  exports.default = (0, _withStyles2.default)(Audio, _ChatVoice2.default);

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(211);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._10Q2{padding:5px 10px;background-color:#fff;display:inline-table;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border-radius:6px;position:relative;margin-top:5px;border:1px solid #ededed}._10Q2:after{border-width:13px;margin-top:0;content:\"\";position:absolute;top:10px;width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;left:-.6rem;border-right:12px solid #fff}._10Q2:after,._10Q2:before{content:\" \";height:0;width:0;position:absolute;pointer-events:none;right:100%;border-right-color:#fff}._1GE3{-ms-flex-item-align:end;align-self:flex-end;font-size:11px;margin-left:10px}", ""]);
  
  // exports
  exports.locals = {
  	"content": "_10Q2",
  	"duration": "_1GE3"
  };

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ChatVideo = __webpack_require__(213);
  
  var _ChatVideo2 = _interopRequireDefault(_ChatVideo);
  
  var _reactVideojs = __webpack_require__(215);
  
  var _reactVideojs2 = _interopRequireDefault(_reactVideojs);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Audio = function (_React$Component) {
    (0, _inherits3.default)(Audio, _React$Component);
  
    function Audio(props) {
      (0, _classCallCheck3.default)(this, Audio);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Audio).call(this, props));
  
      _this.state = { isPlay: false, duration: '10%' };
      return _this;
    }
  
    (0, _createClass3.default)(Audio, [{
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { style: { flexDirection: 'row', display: 'flex' } },
          _react2.default.createElement(
            'div',
            { className: _ChatVideo2.default.content },
            _react2.default.createElement(_reactVideojs2.default, { ref: 'audio', width: '250px', height: '200px',
              src: this.props.videoUrl,
              type: 'video/mp4'
            })
          )
        );
      }
    }]);
    return Audio;
  }(_react2.default.Component);
  
  exports.default = (0, _withStyles2.default)(Audio, _ChatVideo2.default);

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(214);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, ".ubK4{padding:5px 10px;background-color:#fff;display:inline-table;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;border-radius:6px;position:relative;margin-top:5px}.ubK4:after{border-width:13px;margin-top:0;content:\"\";position:absolute;top:10px;width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;left:-.6rem;border-right:12px solid #fff}.ubK4:after,.ubK4:before{content:\" \";height:0;width:0;position:absolute;pointer-events:none;right:100%;border-right-color:#fff}._365g{-ms-flex-item-align:end;align-self:flex-end;font-size:11px;margin-left:10px}", ""]);
  
  // exports
  exports.locals = {
  	"content": "ubK4",
  	"duration": "_365g"
  };

/***/ },
/* 215 */
/***/ function(module, exports) {

  module.exports = require("react-videojs");

/***/ },
/* 216 */
/***/ function(module, exports) {

  module.exports = require("leancloud-realtime");

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Topics = __webpack_require__(218);
  
  var _Topics2 = _interopRequireDefault(_Topics);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/'; /**
                                  * Created by diwu on 3/12/16.
                                  */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var type, query, response, _ref, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(state);
              type = state.query.type || null;
              query = null;
  
              if (type) {
                query = '{\n  topics(type: "labelTitle=' + state.query.type + '") {\n     topics {\n      topicId\n          topicId\n          title\n          cover\n          viewCount\n          collectCount\n      labels {\n        title\n      } \n    }\n  }\n}\n';
              } else {
                query = '{\n  topics {\n     topics {\n      topicId\n          topicId\n          title\n          cover\n          viewCount\n          collectCount\n      labels {\n        title\n      } \n    }\n  }\n}\n';
              }
              console.log(query);
              _context.next = 7;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 7:
              response = _context.sent;
              _context.next = 10;
              return response.json();
  
            case 10:
              _ref = _context.sent;
              data = _ref.data;
  
              state.context.onSetMeta('og:title', '元子育儿');
              state.context.onSetMeta('title', '元子育儿');
              return _context.abrupt('return', _react2.default.createElement(_Topics2.default, { topics: data.topics }));
  
            case 15:
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
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Topics = __webpack_require__(219);
  
  var _Topics2 = _interopRequireDefault(_Topics);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _classnames = __webpack_require__(123);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _CDN = __webpack_require__(170);
  
  var _CDN2 = _interopRequireDefault(_CDN);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Podcasts(_ref) {
    var topics = _ref.topics;
  
    var p = topics.topics;
    return _react2.default.createElement(
      'div',
      { className: _Topics2.default.topics },
      _react2.default.createElement(
        'ul',
        null,
        p.map(function (item, key) {
  
          var roomId = '/topics/' + item.topicId + '/view';
          var background = 'url(' + _CDN2.default.coverURL(item.cover) + ')';
          return _react2.default.createElement(
            'a',
            { href: roomId, key: item.topicId },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: _Topics2.default.topic, style: { backgroundImage: background } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement('div', { className: _Topics2.default.overlay }),
                  item.labels && item.labels.length > 0 ? _react2.default.createElement(
                    'p',
                    { className: _Topics2.default.label },
                    item.labels[0].title
                  ) : null,
                  _react2.default.createElement(
                    'p',
                    { className: _Topics2.default.title },
                    item.title
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: _Topics2.default.count },
                    _react2.default.createElement('img', { src: '../icon_eye@2x.png', alt: '' }),
                    item.viewCount,
                    _react2.default.createElement('img', { src: '../icon_collect@2x.png', alt: '' }),
                    item.collectCount
                  )
                )
              )
            )
          );
        })
      )
    );
  }
  Podcasts.propTypes = {};
  
  exports.default = (0, _withStyles2.default)(Podcasts, _Topics2.default);

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(220);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._1ZgI{width:100%;margin-bottom:50px}._1ZgI ul{padding:0}._1ZgI li{list-style:none;position:relative}._1ZgI li ._3r3e{padding-bottom:56.25%;background-size:cover;background-repeat:no-repeat}._1ZgI li ._3r3e div,._1ZgI li ._3r3e div ._1aRX{position:absolute;top:0;bottom:0;left:0;right:0}._1ZgI li ._3r3e div ._1aRX{width:100%;height:100%;background-color:rgba(0,0,0,.2);background-image:url(\"/imageOutline@2x.png\");background-repeat:no-repeat;background-position:50%;background-size:290px 108px}._1ZgI li ._3r3e div .zcE0{top:calc(50% - 50px)}._1ZgI li ._3r3e div ._2aoL,._1ZgI li ._3r3e div .zcE0{font-size:18px;color:#fff;position:absolute;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:100%;text-align:center}._1ZgI li ._3r3e div ._2aoL{top:50%}._1ZgI li ._3r3e div .B4sn{font-size:12px;color:#fff;position:absolute;bottom:0;right:0;width:100%;text-align:right;marign-right:10px;margin-bottom:10px}._1ZgI li ._3r3e div .B4sn span{margin:0 10px}._1ZgI li ._3r3e div .B4sn img{width:15px;height:15px;-o-object-fit:cover;object-fit:cover}", ""]);
  
  // exports
  exports.locals = {
  	"topics": "_1ZgI",
  	"topic": "_3r3e",
  	"overlay": "_1aRX",
  	"label": "zcE0",
  	"title": "_2aoL",
  	"count": "B4sn"
  };

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Order = __webpack_require__(222);
  
  var _Order2 = _interopRequireDefault(_Order);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by diwu on 3/12/16.
   */
  
  var path = exports.path = '/podcastdetail/order/*';
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var d, appData, token, openId, podcastId, query, response, _ref, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.context.appData && state.context.appData.length > 0)) {
                _context.next = 17;
                break;
              }
  
              d = state.context.appData.replace(/&quot;/g, '"');
              appData = JSON.parse(d);
              token = appData.access_token;
              openId = appData.openId;
              podcastId = state.path.replace('/podcastdetail/order/', '');
  
              state.context.onSetMeta('og:title', '确认订单');
              state.context.onSetMeta('title', '确认订单');
  
              query = '{\n  podcast(path: "' + podcastId + '", token: "' + token + '") {\n    podcastId\n    title\n    cover\n    price\n    lecturer\n    lecturerIntroduction\n    lecturerAvatar\n    content\n    startDate\n    enrollCount\n    userScore\n    joined\n    roomNumber\n  }\n}\n';
              _context.next = 11;
              return fetch('/graphql?query=' + query);
  
            case 11:
              response = _context.sent;
              _context.next = 14;
              return response.json();
  
            case 14:
              _ref = _context.sent;
              data = _ref.data;
              return _context.abrupt('return', _react2.default.createElement(_Order2.default, { podcastId: podcastId,
                coupon: state.coupon, podcast: data.podcast,
                openId: openId,
                token: token, context: state }));
  
            case 17:
              return _context.abrupt('return', _react2.default.createElement('div', null));
  
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
/* 222 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Order = __webpack_require__(223);
  
  var _Order2 = _interopRequireDefault(_Order);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _Location = __webpack_require__(118);
  
  var _Location2 = _interopRequireDefault(_Location);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var pingpp = __webpack_require__(225);
  
  var Order = function (_Component) {
    (0, _inherits3.default)(Order, _Component);
  
    function Order(props, context) {
      (0, _classCallCheck3.default)(this, Order);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Order).call(this, props, context));
  
      _this.state = {
        price: props.coupon ? 0 : props.podcast.price / 100,
        selectedCoupon: props.coupon
      };
      return _this;
    }
  
    (0, _createClass3.default)(Order, [{
      key: 'payment',
      value: function payment() {
        var podcastId = this.props.podcast.podcastId;
        var coupon = this.props.coupon;
        var token = this.props.token;
        var self = this;
        var openId = this.props.openId;
  
        (0, _fetch2.default)('/orders', {
          headers: {
            'Accept': 'application/vnd.yuanzi.v4+json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: (0, _stringify2.default)({
            podcastId: podcastId,
            token: token
          })
        }).then(function (response) {
          return response.json();
        }).then(function (d) {
          console.log(d);
          if (coupon) {
            (0, _fetch2.default)('/paymentByCoupon', {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: (0, _stringify2.default)({
                podcastId: podcastId,
                couponCode: coupon,
                token: token,
                orderId: d.orderId
              })
            }).then(function (response) {
              return response.json();
            }).then(function (json) {
              self.props.context.window.location = '/podcastdetail/' + podcastId + '/view';
            });
          } else {
            (0, _fetch2.default)('/payment', {
              headers: {
                'Accept': 'application/vnd.yuanzi.v4+json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: (0, _stringify2.default)({
                orderId: d.orderId,
                openId: openId,
                token: token
              })
            }).then(function (r) {
              return r.json();
            }).then(function (json) {
              console.log(json);
              pingpp.createPayment(json.charge, function (result, err) {
                if (result == "success") {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                  self.props.context.window.location = '/podcastdetail/' + podcastId + '/view';
                } else if (result == "fail") {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  return _react2.default.createElement('div', null);
                } else if (result == "cancel") {
                  // 微信公众账号支付取消支付
                  return _react2.default.createElement('div', null);
                }
              });
            });
          }
        });
      }
    }, {
      key: 'chooseCoupons',
      value: function chooseCoupons() {
        _Location2.default.push({ pathname: '/podcastdetail/' + this.props.podcastId + '/coupons', state: { podcast: this.props.podcast } });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _Order2.default.order },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: _Order2.default.payment },
                _react2.default.createElement(
                  'div',
                  { className: _Order2.default.method },
                  _react2.default.createElement(
                    'p',
                    { className: _Order2.default.title },
                    '支付方式'
                  )
                ),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(
                  'div',
                  { className: _Order2.default.wechat },
                  _react2.default.createElement('img', { className: _Order2.default.logo, src: '../../icon_wechat@2x.png', alt: '' }),
                  _react2.default.createElement(
                    'div',
                    { className: _Order2.default.desc },
                    _react2.default.createElement(
                      'p',
                      { className: _Order2.default.title },
                      '微信支付'
                    )
                  ),
                  _react2.default.createElement('div', { className: _Order2.default.space }),
                  _react2.default.createElement('img', { className: _Order2.default.logo, style: { width: 17, height: 17 }, src: '../../select@2x.png', alt: '' })
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'div',
                { className: _Order2.default.coupon, onClick: this.chooseCoupons.bind(this) },
                _react2.default.createElement(
                  'div',
                  { className: _Order2.default.title },
                  '优惠券'
                ),
                _react2.default.createElement('div', { className: _Order2.default.space }),
                _react2.default.createElement(
                  'div',
                  { className: _Order2.default.title },
                  this.state.selectedCoupon ? '畅听一节' : '请选择优惠券'
                ),
                _react2.default.createElement(
                  'a',
                  { href: '#' },
                  _react2.default.createElement('img', { className: _Order2.default.logo, src: '../../icon_next_grey@2x.png', alt: '' })
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Order2.default.pay },
            _react2.default.createElement(
              'div',
              { className: _Order2.default.desc },
              _react2.default.createElement(
                'p',
                { className: _Order2.default.title },
                '订单金额'
              ),
              _react2.default.createElement(
                'p',
                { className: _Order2.default.subtitle },
                _NumberFotmat2.default.money(this.state.price)
              )
            ),
            _react2.default.createElement(
              'a',
              { onClick: this.payment.bind(this) },
              '去支付'
            )
          )
        );
      }
    }]);
    return Order;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(Order, _Order2.default);

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(224);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._2co4{background-color:#f7f7f7;height:100vh}._2co4 img{-o-object-fit:contain;object-fit:contain}._2co4 ul{list-style:none;padding:0;background-color:#f7f7f7}._2co4 ul li{background-color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:10px}._2co4 ul li ._3D4g{font-size:14px;color:#666}._2co4 ul ._14tt{padding:0 20px;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}._2co4 ul ._14tt,._2co4 ul ._14tt ._1SH5{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._2co4 ul ._14tt ._1SH5{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:40px}._2co4 ul ._14tt ._1SH5 ._3D4g{color:#666;font-size:15px;text-align:left}._2co4 ul ._14tt hr{margin-top:0;margin-bottom:0;border-top:1px solid #ededed}._2co4 ul ._14tt ._1PY8{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:50px}._2co4 ul ._14tt ._1PY8 ._2VH_{height:20px;width:20px}._2co4 ul ._14tt ._1PY8 ._2lNj{display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:8px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._2co4 ul ._14tt ._1PY8 ._2lNj ._3D4g{color:#666;font-size:15px;text-align:left}._2co4 ul ._14tt ._1PY8 ._2lNj .Vf4d{margin-left:10px;color:#ff989e;font-size:15px;text-align:left}._2co4 ul ._3CnQ,._2co4 ul ._14tt ._1PY8 ._3ehr{-webkit-box-flex:1;-ms-flex:1;flex:1}._2co4 ul ._3CnQ{display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:8px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;padding:0 20px 0 10px;height:50px}._2co4 ul ._3CnQ,._2co4 ul ._3CnQ a{-webkit-box-align:center;align-items:center}._2co4 ul ._3CnQ a{-ms-flex-item-align:center;align-self:center;-ms-flex-align:center;-ms-grid-row-align:center;margin-bottom:5px}._2co4 ul ._3CnQ ._2VH_{height:12px;width:8px;-ms-flex-item-align:center;align-self:center}._2co4 ul ._3CnQ ._3D4g{color:#666;font-size:15px;text-align:left;margin-right:10px}._2co4 ul ._3CnQ ._3ehr{-webkit-box-flex:1;-ms-flex:1;flex:1}._2vsd{position:fixed;left:auto;bottom:0;max-width:768px;height:50px;width:100%;background:#fff;margin-bottom:50px}._2vsd,._2vsd ._2lNj{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}._2vsd ._2lNj{margin-left:8px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._2vsd ._2lNj ._3D4g{color:#333;font-size:15px;text-align:left}._2vsd ._2lNj .Vf4d{margin-left:10px;color:#ff989e;font-size:15px;text-align:left}._2vsd a{right:0;height:49px;width:120px;position:absolute;color:#fff;background-color:#ff989e;text-decoration:none;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-item-align:center;align-self:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}", ""]);
  
  // exports
  exports.locals = {
  	"order": "_2co4",
  	"title": "_3D4g",
  	"payment": "_14tt",
  	"method": "_1SH5",
  	"wechat": "_1PY8",
  	"logo": "_2VH_",
  	"desc": "_2lNj",
  	"subtitle": "Vf4d",
  	"space": "_3ehr",
  	"coupon": "_3CnQ",
  	"pay": "_2vsd"
  };

/***/ },
/* 225 */
/***/ function(module, exports) {

  module.exports = require("pingpp-js");

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Coupons = __webpack_require__(227);
  
  var _Coupons2 = _interopRequireDefault(_Coupons);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by diwu on 3/12/16.
   */
  
  var path = exports.path = '/podcastdetail/*/coupons';
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var d, appData, token, query, podcastId, response, _ref, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.context.appData && state.context.appData.length > 0)) {
                _context.next = 16;
                break;
              }
  
              d = state.context.appData.replace(/&quot;/g, '"');
              appData = JSON.parse(d);
              token = appData.access_token;
              // let token = 'KF57CbAJPLm11476pXX66SRgRHdLUceGXcLVUzy0CLo=';
  
              query = '{\n  coupons(token: "' + token + '") {\n     coupons {\n      expired\n      coupon\n    }\n  }\n}\n';
              podcastId = state.path.replace('/podcastdetail/', '').replace('/coupons', '');
              _context.next = 8;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 8:
              response = _context.sent;
              _context.next = 11;
              return response.json();
  
            case 11:
              _ref = _context.sent;
              data = _ref.data;
  
  
              state.context.onSetMeta('og:title', '选择优惠券');
              state.context.onSetMeta('title', '选择优惠券');
              return _context.abrupt('return', _react2.default.createElement(_Coupons2.default, { coupons: data.coupons.coupons, podcastId: podcastId, podcast: state.podcast }));
  
            case 16:
              return _context.abrupt('return', _react2.default.createElement('div', null));
  
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
/* 227 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Coupons = __webpack_require__(228);
  
  var _Coupons2 = _interopRequireDefault(_Coupons);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _bind = __webpack_require__(171);
  
  var _bind2 = _interopRequireDefault(_bind);
  
  var _Location = __webpack_require__(118);
  
  var _Location2 = _interopRequireDefault(_Location);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var cx = _bind2.default.bind(_Coupons2.default); /**
                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                    *
                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                    *
                                                    * This source code is licensed under the MIT license found in the
                                                    * LICENSE.txt file in the root directory of this source tree.
                                                    */
  
  var Coupons = function (_Component) {
    (0, _inherits3.default)(Coupons, _Component);
  
    function Coupons(props, context) {
      (0, _classCallCheck3.default)(this, Coupons);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Coupons).call(this, props, context));
  
      _this.state = {
        price: 0,
        coupon: {}
      };
      return _this;
    }
  
    (0, _createClass3.default)(Coupons, [{
      key: 'selectedCoupon',
      value: function selectedCoupon(coupon) {
        this.setState({
          coupon: coupon
        });
        _Location2.default.push({ pathname: '/podcastdetail/order/' + this.props.podcastId, state: { coupon: coupon.coupon, podcast: this.props.podcast } });
      }
    }, {
      key: 'addMore',
      value: function addMore() {
        _Location2.default.push({
          pathname: '/podcastdetail/' + this.props.podcastId + '/coupons/add'
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var self = this;
        return _react2.default.createElement(
          'div',
          { className: _Coupons2.default.coupons },
          _react2.default.createElement(
            'ul',
            null,
            this.props.coupons.map(function (coupon) {
  
              var btnClass = cx({
                'coupon': true,
                'couponPressed': coupon == self.state.coupon
              });
              var localTime = (0, _moment2.default)(parseInt(coupon.expired)).format('YYYY-MM-DD');
              return _react2.default.createElement(
                'li',
                { key: coupon.coupon, onClick: self.selectedCoupon.bind(self, coupon) },
                _react2.default.createElement(
                  'div',
                  { className: btnClass },
                  _react2.default.createElement(
                    'p',
                    { className: _Coupons2.default.label },
                    '元子优惠券'
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: _Coupons2.default.title },
                    '畅听一节课'
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: _Coupons2.default.expired },
                    '有效期至: ',
                    localTime
                  )
                )
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Coupons2.default.addMore, onClick: this.addMore.bind(this) },
            _react2.default.createElement('img', { className: _Coupons2.default.logo, src: '../../icon_plus@2x.png', alt: '' }),
            _react2.default.createElement(
              'p',
              { className: _Coupons2.default.title },
              '添加优惠券'
            )
          )
        );
      }
    }]);
    return Coupons;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(Coupons, _Coupons2.default);

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(229);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._2fqo{background-color:#f7f7f7;height:100vh}._2fqo img{-o-object-fit:contain;object-fit:contain}._2fqo ul{list-style:none;padding:0;background-color:#f7f7f7}._2fqo ul li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:5px 10px 0}._2fqo ul li ._1tNG{font-size:14px;color:#666}._2fqo ul ._2t9S{-webkit-box-flex:1;-ms-flex:1;flex:1;background-color:transparent;border-style:solid;height:103px;border-width:8px 100px 8px 12px;-o-border-image:url(" + __webpack_require__(230) + ") 8 100 8 12 repeat;border-image:url(" + __webpack_require__(230) + ") 8 100 8 12 fill repeat;padding:0 20px}._2fqo ul ._2t9S ._1sn4{color:#999;font-size:12px;margin-bottom:10px}._2fqo ul ._2t9S ._1tNG{font-size:18px;color:#666;margin-bottom:20px}._2fqo ul ._2t9S ._1jh-{color:#666;font-size:12px;text-align:end}._2fqo ul ._2TWl{-o-border-image:url(" + __webpack_require__(231) + ") 8 100 8 12 repeat;border-image:url(" + __webpack_require__(231) + ") 8 100 8 12 fill repeat}._2fqo ul ._2TWl ._1sn4{color:#fff;font-size:12px;margin-bottom:10px}._2fqo ul ._2TWl ._1tNG{font-size:18px;color:#fff;margin-bottom:20px}._2fqo ul ._2TWl ._1jh-{color:#fff;font-size:12px;text-align:end}._3TA-{position:fixed;left:auto;display:-webkit-box;display:-ms-flexbox;display:flex;bottom:0;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;max-width:768px;height:50px;width:100%;background:#fff;padding:6px 0;margin-bottom:50px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._3TA- ._1tNG{color:#666;font-size:15px;text-align:left;margin-left:10px}._3TA- ._1Q40{width:30px;height:30px}", ""]);
  
  // exports
  exports.locals = {
  	"coupons": "_2fqo",
  	"title": "_1tNG",
  	"coupon": "_2t9S",
  	"label": "_1sn4",
  	"expired": "_1jh-",
  	"couponPressed": "_2TWl",
  	"addMore": "_3TA-",
  	"logo": "_1Q40"
  };

/***/ },
/* 230 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWYAAABnCAYAAAAzDegHAAAAAXNSR0IArs4c6QAAEVdJREFUeAHtnc9vFOcdh9dgfhiSIBxkLHqplAscQm+JokpJhFQrqtRT/4ekx4jmQpUDB1RuKMeG/6GnSj2AhBouVXsrOSSXSrkUgUUcKQIMxnj7PsN+nNfjmdn58e7Obvx5pTcz+/6cfRw9++U74/XC4KeyEE5VD0XnP43wmQmYgAm8IrATDqrDEij4BJeolgw7sM1wo8JR5xnLxRESAVy8evWzUx+++85bp86srmztHAOoiwmYgAnsEjh8+PDw+PHjLy9fvnzn1q1bm6OOTCi7g0ZB3tra2vEbN25cevbs2eGXL1/iGZcRgcXFxRfr6+sP7969+93169d/DM3boWaSjiPkow+++uTjldMnroXO1xbOfjQYrKyNlvDBBEzABPYS+Prrrz+4ePHiP0MrQikS8+K9e/fee/vtt7/aO9OvYgLD4fBxEPTnq6urN0P7Vqg7SlksjqT8RWh8LZ7kcxMwARMoInDu3LnfhHb+1S2PaNjuv8BHY9TuYwGBhYWF186ePfvFgwcPPg7d8FzIgJK+GEXKBdPcZAImYAL7CSwvL//x9u3b50PPkVBxSVyP0MeY/TPdUkRgZWXl2pUrV94IfZmYD5FTDi8cKRfRcpsJmEAhgRDpLV26dOlv33zzzW/DgKVQj43qEm30MaZwshv3ESByfv/9938ZOg5lYfPpM2+c2zfKDSZgAiYwhsChQ4d+cf78+b9ubW3de/LkyXBnZ+dXr7/++r0jR45cHDPV3QUEQtR8NjQvvMpnDLNjwTA3mYAJmMB4Aoj42LFjg83NzYGlPJ5X2Yjt7W3SQlkqo2yM203ABEzABHogQLLexQRMwARMYIYIWMwz9MPwpZiACZgABCxm/39gAiZgAjNGwGKesR+IL8cETMAEeCrDxQRMwAQ6E1haWhpQXboTcMTcnaFXMAETMIGkBCzmpDi9mAmYgAl0J2Axd2foFUzABEwgKQGLOSlOL2YCB5cAv/W3sbFxcAEkfOcWc0KYXsoETMAEUhDwUxkpKHoNEzCBuSEQvph+EL5sKaucUynh292yGr6YaUDldV/FYu6LvPc1AROYGgFE/OLFi0H4kqBMyHU2Dn9Ciy9kGoQ/ATV1SVvMdX5CHmMCJjCXBBBx+ErSQfh7g9n1EwUjWqSrqFiRsaJnxsaViQj66NGj2ZxpgLCYp0HZe5iACUyVABFy+AOwu0JGrFSEPK4gbgqiRuxE2qrImSqZj1urbb/F3Jac55mACcwkASSKlClIlu+JJjpuWpCvhE4EzZpE38g6/JXwWpJvuqfGW8wi4aMJmEAnAn3/SjYR7vPnz7PoFqlyPXUi5DpvmnVOnDiRrc0eT58+zeSMuCdRLOZJUPWaJmACUyWAlIloiWaRKFJOnW5gPdIYrM8z24rKJyHn5vH9VHF7MxMwARMYT4AoFimTupiElOMrUPSMqPVhEPenOLeYU1D0GiZgAr0RIO9LXhlhkvtNHSkXvTFy1qQ22IvoWU99FI1t02Yxt6HmOSZgAvsI9PEr2QiRaBlRTjpSzr9h7Uk7kTPplFTFOeZUJL2OCZjAVAkor8ymcaTMo3IIm6MKEiWi5li3sL7WkXSJkLUW56xJ3pmoncoTICmKxZyCotcwAROYOgFyyshXN+T0rHFVWgGp6hG4spQHayo9UvWm9Cge+3MtzGHtJvIvW99iLiPjdhMwgZklQASLCCkIksfXJGTkSCRLVVEUjbz1SF3Rs8isST+F+azNURJXFI2IVREzkTKpHOazbtdiMXcl6PkmYAJTJ6AUA+JEiAgTISNISTS+KKJYxiJRyTl+Fpn5esKCsUXS1nqImnW4BiSOjFmbfVm77Bo0v87RYq5DyWNMwARmigACpBC1UrjxhxzHFeSJVBmLmJExbYp+aY/z1VXrIWj2VQSusazFh0SXUj8T3mUXzzUBEzCBRASUTtBydaWs8RyJiuPH3RB9EylrLaSOyGMR68NCY9ocLeY21DzHBExgHwEEuby8vK89dQP5YuRMUfTbZg+lLJgrwXJsU0hfsB5Fue4262iOxSwSPpqACcwFAcRMQaKIuUvRWohesm+zHteCnCmso3XbrMUci7ktOc8zAROYGgFkR4qAfK6emmBzcsS8bhulxmmH+LzNGyMVooi7q5jHZ8vbXKHnmIAJmEACAgiZpx7IASuiRX5KG0imjKGNCFr5XuTIHNolzPiS6EPoCJV1quSusfGjc/FaOmet+FrV3vRoMTcl5vEmYAKFBHhsjZoqz4xYWY+jpIv4OEeiceTMBTFOj7wxjnMK43WjL2sY/YfxFGTLuV6PuncPtPMEB3JG8KzFmkWFtfTESFF/3TaLuS4pjzMBE5gaAcSLDCnkbomCFfUiPkmXCFlRLAKlj+iXSruKpKrXHGmjsC61TMyspbEc2UP55GyB6D+6Ro2PuhqdWsyNcHmwCZjApAkgSCJlCtFpLFiEjZSJWHkKJI5cGYfASWsommaMZJm/brWPk2i8B2vE15Nfc9xa+fFlr4vj8bLRbjcBEzCBCRNAvAgOqeYlSB9CzUs5viSiaCoSR9JlRWLmg4CaF7DmkRbhWeX4qL780WLOE/FrEzCBuSegm3CIFRHGRQIlKo4ligyJkImyJUbmMwYxqy1ei3P6kbNSFfGa+bHsyYcBx6rCh0GK4og5BUWvYQImkISAIlzEmi+SXl7YiJV5Ei3zEK7ywFU341hL4s6vm9+/zmtdY52xVWMs5io67jMBE5gaAQSJ2IhKlWagDekSDStvzOtYgAgZkUvEumBEq4hYbfmjPgBYo6uYiegl+fw+TV/v/bdC09kebwImYAIjAvxTn9q2SLbKK8dPXyBYKuIjQqYiUn0LnObk96ZdqQrJPh6DkFmDY9dSFZk3XdtibkrM403ABCZCQNEmkpSUOScSRsL0P378OJMo7QiXSJoPgyLpcpESLnPLxozLG9d5s6yfUszdPybqXLXHmIAJmMAYAhIzRz0Sx+NySjEgViRKyoA20hBE2cpLFy0vGWvtojEp2pAye+hau65pMXcl6PkmYAJJCSiXTIpBYtUGRM9EwYibwrmkqDHxcdJCZi/24MNBHxzx/m3PLea25DzPBExgDwHSChsbG3va2rzQM8VFeWPkR+qCPmSoG24ci0pZe9HYtm18kCDn/M3HtusxzznmLvQ81wRMYCIEYikjPeRH2gIpEyWT4iBSJs9cJl/m0T/JwjVQSWGQZkm1n8U8yZ+a1zYBE2hFAKmqIGTkpzSG2hFh1Y27VJLUfvkj6+s3EUm7pCxOZaSk6bVMwASSEEDGkjMRMlLWM8d1NlCUXWdsmzFImdQNqRWi93wuvM2a8RyLOabhcxMwgd4JkMaI0xCIuYmUeQPK+8YpkVRvjOhdUlZqJdXaWsdiFgkfTcAEZoIA0TERKGmCpukIRcrK+6Z6fA0w5LIRcvwo3yTEz14WMxRcTMAEZoZAnB5AhIp+x12gxMnTGggzVd5Xsn/y5En2QYHsSV8QyZeVrqkN3/wrI+t2EzCBRgT4Zz01RUF6J0+ezCJUREsEzI0+pEifxIc0yUcTWTOGQtqDqjG0IXjdLKwSKmMpResyj2g+ZRT+arf9/7WY9zNxiwmYwAwQUOSMdImaETSVQh/yjAvCRMhF6QXGaj5zGSPBx2sRdVORvQpjtS5jp1Es5mlQ9h4mYAKtCSBcKsJE0hwlZYmU1EKRkLUp/XEUXJW7lri1b50IW/ukOlrMqUh6HRMwgYkSQJBErnHhRhxyLpMnfRRFx8iWdASSVuVvC9Kvb5mbVlQcv4/8eXn2Oj/Sr03ABEygggB53BS/kl2xxb4uUg6S7r7O0EA/os3LltfMI8pWX3xetNY02yzmadL2XiZgAskIKI1BFFxUkDJjyvo1B0ErslZb30eLue+fgPc3ARNoRYAbgpSyX8vWjcKyfm2KmCmzJGeLWT8dH03ABOaGADfvqEhXYo0vXv1Ey1U3BZmj/vhJjHitPs4t5j6oe08TMIHWBBAo+Wxyw9zIy5e4v84vmSjVUfWkRn6PSb8uTs5MelevbwImYAItCPBLJPpGt6IvD1I/S/PLLrqxV7UVY5AzYiadURSBV82fRJ/FPAmqXtMETCAZAT1/TM6YaBiRxr8SXdSPlJWiqHMhpEQQM2IvisLrrJFyjMWckqbXMoEDTCDVr2QjYOSr54yRMecqRLcItKyf9EUTKbMuaxIps3dZ3lr7T+NoMU+DsvcwARMYS0BpB6RbVeJ+5iBU5K1C/pmoN//LKOovOzKHuTztkeo7P8r2GtduMY8j5H4TMIGpECBS1Y24qg11c4/xurlH3hlh85qoF7mSmuB13Zwxe1OV0mD9vkpnMfMmqC4mYAI/XwIS4KTfoaLmqn2UdsA7pDOYg0QRM23knxEzr/mqTvqInusImvfJHH3nctOUSNV1N+nrLGZ9yjTZ1GNNwAR+fgRIA1CXl5cn/uaQraJizhEoFTHzZAWC1RgETaVfviqTNJInjcH3Z/Be4puME39T0QadxRyt5VMTMAETaE0AoZKGqFN0MxA5x/ll5ira5Vw5aNZmHJU5FORcJmjamYOgmz7hkS3e8T8Wc0eAnm4CJpCGANIksm1SEHR+DkKljit1xrE+clYEPm7NVP0WcyqSXscETKATAVIPpBq6FkSKdFNEuqxDSiO+uVgWZXe97nh+dwrxaj43ARMwgQ4E6tz8G7c8QtYNvK5yJi/Nn7iKbyby4aG/aDLuWtr2+7sy2pLzPBMwgZkkQETLTTvSEES7+Rx0m4vWBwZHbjASlSN/3YCskzppsq8j5ia0PNYETGAuCBDpEi0jZiTa5hdOeKPInTQGMtaatHGTkrb8zUoJvCski7krQc83ARPICCBC6qwUUg76S9uKbBE0gq1TuKnIPETMWtwARLxUzilE40TLHBmn2jUPbTHX+Ql5jAmYwFwSUFpDOWKi56ocMWJVJIxwkTAfNswpKkieyo3LlKV4t5Q7eC0TMAET6JGAIlzkqRQE8kXaCBexSsiKfLlcbvBRmT/tYjFPm7j3MwET6IUAAib6Rb6kKRQZxxeDrJExEu9DyLoWi1kkfDQBE+hEgBtt1Gn8SnaXC1X6gShZ+WEkTHvX3HCX64rnWswxDZ+bgAkcGAKSMUKeteLnmGftJ+LrMQETOPAELOYD/7+AAZiACcwaAYt51n4ivh4TMIEDT8BiPvD/CxiACZjArBGwmGftJ+LrMQETOPAE/FTGgf9fwABMIA2BWfuV7DTvqp9VHDH3w927moAJmEApAYu5FI07TMAETKAfAhZzP9y9qwmYgAmUErCYS9G4wwRMoAkBfh17Y2OjyRSPLSFgMZeAcbMJmIAJ9EUAMQ93FobbfV2A9zUBE5h/AuHb2u6F7zz+D++E8/l/R/28g/A1pPyZ8GEm5h8e/Xi/n8vwriZgAvNMIHw72/++/fbb34evyvz16dOn33vzzTdPcE4bffP83vq49vX19Ydh30zMO//417//G1487uNCvKcJmMB8Eghfm7l5586d3124cOHv4R1shvp8VDdpo48x8/nupn/VgdXju3fvfhd23uGr+Ymajzz46pM/rJw+8UU4z8rC2Y8Gg5U1vfTRBEzABPYQ+P7776+dOXPmz6FxK9SdUIejAfLK0UePHv0pRNGfj9p9qCDw8OHDT1dXV/8ShrzIUhnhZHv1gy9vrv/w9NNw7si5Ap67TMAEXhG4f//+7XDG/alYynQiaNq2R2NocykhQKQ8kvLNMASeQ/0xK33CLV69+tmpD999561TZ1ZXtnaOIW4XEzABE9glEL5Yfhj+SvTLy5cv37l16xapCkSsaFnjcMrC2tra0o0bNy49e/bscPiTTvKNxhzoIzf6yCmTvrh+/fqPAcbuh1wMKgMJzFARsl6HUxcTMAET2EOAiFg1L2UNlEvwiYM8UfnpqA80/YtDrwf/B53Fkv3Tg4qFAAAAAElFTkSuQmCC"

/***/ },
/* 231 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWYAAABnCAYAAAAzDegHAAAAAXNSR0IArs4c6QAAE35JREFUeAHtne+rZVUZx9f5ce/8cHKYEcdBSS1TC2oQwUKhNMGJouhFf4AGYWJQYa8CX/gi8FUiBaYSWO/zhRQFI0kqJBWIjIGRWhokOpKDw4wzc+8597Q+a53nnnX33fucffbe59xz7/0u2HfvvX6fzxm+55lnP2vtlhullr+0o51cj2roSgREQAQigTV/smNQAAU9QUvsKKi2a7PhxgFHuw4su0MkBrD70H23Hbzj1muuO7h/6chKrw9QJREQARFYJ9BptwZ793T7Dzz28nMnTpw8PywIgrJeaWjkHT9+bO8j999854WLvU5/bYDOKA0JdFud1VNnzr73wkvvv/XwUy+e8dk9fwSRTi3k5Xef/+69Rw7t/4kvPDBsq5MIiIAI5BL4++sf3H7sW79+yRciKHnC3D359N23fvb6w8/ndqBMI3D21OmPHjx6+xNP+owVf6yZy6I7FOVHfaZE2XDpLAIiUEjgyiP77/KF/K/bdMTqrv8PfFjH8nXOJ3DAG8SPosG+GJ6tABT3xdBSzm+mXBEQARHIEDh86d4fPfvLb33aZy/5Ay1JjyXKqJNpptsCAmjwj7/9xUt9cRDmNj5lfyNLuQCYskVABHIItNy+O2+5+revPXPP13zpPn/sGR77yKPMhxOQr1SOwIEv3Xr5tb5qO5jNhy5ZvrJcO9USAREQgRGBVstddeMnDj298vIPTl5Y6b9Cyd7lzk3dbvvYqNYuu2rv9Wbu9c4tXxY/+Mr/nDv7uvccX5gI4silB67wlVrRn9ENAj2xkSqIgAiIQB4BhPjAvsuOueXDzp17M6/Kzs/rXOLcFV917vAXXKvV2fB5B4O+cx/8xbn3/uBc/9yGsvSmN+jjFgqujDRf1yIgAiJQjcChz7vWJ79Xre12b7XHG7qfesC1Lrttkyjz0RBqyqjjqDsh4axXEgEREAERqEoAS/nae11r+dDEHkIdX9fRZkySMI+BoyIREAERmEjAuy/KiPKgd84NPnw11sXlMSZJmMfAUZEIiIAIjCXAgz7vU56UEGX378edO/92rEob2hYkCXMBGGWLgAiIwEQCB27I9Smn7dZF+WM3utbRr4ei8HCQyI2CRFSGkgiIgAjUJ3D6r25w7o36/WynHohCGabBqT86d/BzrrXniGW5PFFeL7RwuvWM0YUs5hELXYmACNQhsHp694bKwW3JL9r71y/c4OKpQHGsKE/gLIt5AiAVi4AIiEAhARaPDFPr0C1xJyfE+eq7nXvnaecS94XVWz8nbdfzhhcS5iwR3YuACIhAWQJ+RR+LR2xByUicf+7c5V9e9ylnuwsLTlgNWJAkzAVglC0CIiACEwmwzJoVfSweGaYgznuPuta+j1vW5jNtxizRlo95MzLliIAIVCGw5BdYXMJ+aLss+WXWgxXvX0/SOFEOdVmaPSZJmMfAUZEIiMAUBHbrkmz2vnjryU3inEcuiLKvO26/DNrJlZFHT3kiIAI7lsDa2sD7hTk2f8R2u+X9xextwV7/U6SL7zn3xiNuUHMTIxtRwmwkdBYBEdiRBBBhxNi/czCcx35IvwkcCV1u+z+dTtsh1qUSlvM7v3Hu3d+5QcVtP20cCbOR0FkERGBHEUCQ+/2B6/V5v2lMwSL2l9EyjoKLCJv1bNb0Gm2DmBNx4V0LQ4EuZUnzUO/MqzZkpbOEuRI2NRIBEVhkAr3e2rogI6yddttbv7gpohhn527ZqXUcrGwv6gj0qu+POkvdTnkLOjvIFPcS5ilgqaoIiMAYAguwJBsrGRFFVElLXQS5WowDIt1ud1zX94nQI9Arq30v8i3nXwxQKPJjCJUukjCXRqWKIiACYwmwJJtjixJijHCSmhRPrOylpY7r+P5xiyDQAy/UiH6RBV4XQbWfkrqjqr0IiIAINEggFWUEEyFtWjSxoIMF7s82Hhb6LJKEeRZU1acIiMDcCJhIMuAylm1F10WZCZv1zMNANBkLfRbiLGEu822ojgiIwEISiD7l6L7Amk0f3s1ywviYcZcgzvifm04S5qaJqj8R2K0EtmBJNg/6EMfgYpihpZz3leIu4YcghNUlIXl5dafNkzBPS0z1RUAE8gnMeUl234shbgzE0dwXWNDkYcWuejcDR4io8HWndTlQnzGsL+uH/i3xg0CKPxCjfCuvelZURlVyaicCIrBlBBBNWziCOIZ7L8ZYr5vTKA8Rt8Uim+ux0GQo7EHIszVG/RDTbLHRjI8wI9xY0U0kCXMTFNWHCIjAXAlgtXoNDSKbru4zwUSAuSZRj/qs5uO8spYfi0zZao+HebEdPuTYT+yLfBNufgBi6FxcdMJY5BHz3EQ0iIQ5fgf6KwIisI0ImLWMUCKICCOWsLk00o9CGQJLQnwtFnnNuzmI4kBIg2D7e1JRDDT9+F00/Bh+LMYdLve2RSf9YV63G8eidtUkH3NVcmonAiKwJQQQUa+BISHKiG7ZMDmra+FutkrQFqbQT5kYaMScyAzqk5hHPDcToSGLOeDUHxEQgdoE5rQkG2G2hNDi453WfYCokrCecW2QEFmzrENGiT8m9Cbs/GAwv2n7yQ4lYc4S0b0IiEA1AnNako2v2FIVUba2bGrkdTlY3+MeCFr9orP9OGB9k5oQZrkyimgrXwREYCEJ4FcmIabTWsrZD2Qab31my8ve49uOPuj4gLBsu6J6spiLyChfBERgYQhghYbDK6mJaX/NxyavRrcBVuu0Ik1/lpqIqOCHIsQzW6c1zhLmGvDUVAREYLYEEE/8wKmIjixT/9DNq7Q9eEujKbCAEXDqFgm29Uk7+rD6eZ/I6o7zHVtZXeub8SXMed+C8kRABKYnwJLs5cPOnXtz+rY5LViwYWFxiGfqLrBQtbQZ4tpf6YeHgVybmOKHzgujM3sZQY3CTM7mULfsPIoWkfADwA8BAl83ycdcl6Dai4AIRAINLcnG4gxLqb2ljNBZCJtZpERAINjc4z4I5YivvydZCBzlHJOE0izqonr240DfCPg8kizmeVDWGCIgAqUJhD0pvACmrglrHHy4XhsRZAt5i2WjhR8INyJrVra1LTqb64EfgbyEuJv1XVQnr12dPFnMdeiprQiIQKMEEECs0mANZ+KTbdMiE+y8gbF+bdFHFPFiC9d02Cxls5yz/QZXiBdnxrW+s3Xs3vqy+6pnCXNVcmonAiLQOAH2qiDlxSebG2GjpRzjhoN7YxhHjMDSnoT1XZRMiM1VUWQNh/5KrAg0q7povGnyJczT0FJdERCBmRFA2LA4i+KTcTlgSZug2kQQc9pSZskeFI4e6lnJ6MwCE0t5/VpZ2bO5RMrWH1dPPuZxdFQmAiJQnkDNJdm4KkipYAbXBuFyXpSjm8CHz3krmDom0G1v6na8hZwKc+in3V4PtUv7DIP4P7SnDWPgpqibzKKv2w/tJcxNUFQfIiAC8Q3ZNd6SjfjiTkAwQ2SGF2BEk0Q+CXHG9YDHw8LgisLXEGPqBeEt2CaZPgi9y4p6HK38X+Zrcy3fqrimhLmYjUpEQATmSADRRSARuTSyAp8yYk0IHVYp1i1nHu6R8mKU02lHaU9zRtf028Q2nYh7k0k+5iZpqi8REIHaBHBVINJYs+kWnPbQD8vaoiPGRV4guvNI/JCwPJzU1JAS5nl8cxpDBESgFIEoctG1kLWEg3Xr45cRbR748ZCQVGSt0tc8EuMzlM2niTElzE1QVB8iIALexPVLsi+5rhYJ09Kih3FYzQgg9SzMLd0GNB3c+krzmr7Gr8w8sJTzHjBWHU/CXJWc2omACGwk0NCSbDpNH8YhfhdXeusxyYjznuVO8DUjiEUOiyYfxm38oPEOi3wUdx1fUZVXr0qeHv5VoaY2IiACMyWAtWv+WhO/1CLFrVEUjcHEUr/vLCYaRTn6wrHg0x+SJsaTMDdBUX2IgAg0SgBr18Su4+OREeVpHubRflauDBNlxsDlYg8lmwQgV0aTNNWXCIhALQJmJYdN8IfKivBNK8pEa1hftSaUaYwoE8pnojzOas80nepWwjwVLlUWARGYJYGNkRe4CqaLrEAwzfWx1C1YVVLxA7Ay8aLf75kp4b6YlSgzPbkyKn5JaiYCIpAhUHNJtvVmrgGiHbBOEVhza1id7BkBj6Ic44mJgZ7UJttH0T39MhfOJFtxWFS/iXwJcxMU1YcIiEDtJdkpwui+iJveI86ILP5czubWQIyxXhHM6PqIDwyzQk45fWTbp+Nlr+mb+GTrl3LzJ9v42TZN3kuYm6SpvkRABBojwAIThNg2zjeLtWgA3AtFDwlpa+3xPbPxUVZgg9D7zk3wbZx5CrKNKWE2EjqLgAgsHAHEE19ud+iqQFzN60z8MntmIN64F7JCax/GyrGA4y51WML0Yj1ZzXhGuM26Ti30jbVmeydhni1f9S4CItAAAUQXa7iTPM8L7gb/MC7P+mVIykkIOO3TzYrMKuaBHiKd+qSLBD50Nqc/isqYE2gNIwI7nkADS7KnYZS6JvLaWTlWbzYhvuSnZeQtgigzVwlz9hvTvQiIQDUCDS7JLjOB6I7YuHw7bTepnLomxEPjOm2+pdcS5i3Fr8FFQASqEMAa5sAXbOKa9mPlk3zE3kgOydweaR9beS1h3kr6GlsERGBqAoioLSKxmOe0kw3lPlJjXIruCx9yt2Am8/hZj/tEKhMBERCBOROIojvaPChrLWfLUx9y0VR5eIgum0+6qN488yXM86StsURABCoTMNE1F0bWWp5UXjSwbchvL4MtqjfPfIXLzZO2xhKBnUygoSXZWUQILjHItjE+fuV0n4q88qxoZ/tM76MfOsZEEy+dtcLTuvO6ljDPi7TGEYGdToA3ZNd4SzZ4gtXrl0+H6+F96v411wQvZiXFBSPhMvzhYV5czr05RG5Ua/MVqwbZkY5Vhqnob645nxwJ83w4axQREIEJBBBVRLifKnGmTdYPTBtrZ2f2xeBlrdNYvrgzsMgJsev4w34AMsPP7ba+MPOOr5rv+Zrbp9VAIiAC1QicOlGt3RSt7M3Xk5pg2SLQvF4K8cXKZjtOrnFzILDcj9s7I28MNj9C1In4mFbY8/qrk1dfmM+96RyHkgiIgAjUIFDWwkV8EWb8ziyzph0WLnndpbZbbneCuEYLOO6dHP3I490b1EHMabfVLg1FZdT4h6SmIiACCYE5Lck2NwNbclpCUEmIKuVYvOThFcHCxoLGL03kBRZ2UWI/Dtrj0kCctyrVt5i3auYaVwREYLEIsCT7iq+4wasPVJoXQjhONNNOU39yagdjNeOOsDxEljwSYmvLtGlvFrrVTfvnGpFnPlUeJmb7mvZewjwtMdUXARGYCYF0U/qyA5jopvXz8tJyrjGay/wIIOQD/4MxblvRbN9N3EuYm6CoPkRABGoTKPvwb9xAFu+MpYyY1k1Y8YhzlYeJdcaWMNehp7YiIAKNETDXQp0OeRiIJYyYIqp13RDENLd5GDg8/MlHfhS/KaXO3NO2EuaUhq5FQAS2PQHEGPdD8Cc3IM7pDwYukCjScbtR9tnAOk991k0AlDA3QVF9iIAIODejJdnTokVIcWMQjYE4r1VYcGJjEsVBPyR7ywk+7NAvffN6qrgI0Zo0cpYwN4JRnYiACITl2DWXZDdF0cTZfM7T+ohxh9hCFuaE/xvLmGSvuKIOIo0VbduGkocVXTdJmOsSVHsREIGFJIA443NGUFnNhwtiko84WMOhnldbn1jMUuSnpn9EehZJwjwLqupTBERgYQggzFi8Zj3n+YhxWaQbImH0xiXd9SM7qoCQMFehpjYiIALbioBZz1i443zEiDiCbG6LrfqQEuatIq9xRWCnEWBJ9vLhhd47x9wPnU5cYGI+YoQYK5nyRUhbY6cvwifXHERABJolMOe3ZNedfBTpdvAhR2FeDFHmc0mY6367ai8CIiACDROQMDcMVN2JgAiIQF0CEua6BNVeBERABBomIGFuGKi6EwEREIG6BBSVUZeg2ouACEQCC7Ikeyd8HRLmnfAt6jOIwCIQaOAt2YvwMRZhDnJlLMK3oDmIgAiIQEJAwpzA0KUIiIAILAIBCfMifAuagwiIgAgkBCTMCQxdioAI1CAwp7dk15jhtmnKw7/BWm+tt21mrImKgAgsHAH/GqeTF1ZWXnG9i25vb+0mv1XmsYWb5DaYULfVWfXTHARhPn1u5Z1tMGdNUQREYMEI+H3h//vPt05//zPf/NUJPzV7l0fntWfuOX7DtYd+5vcEumrBprzQ0zl15ux7foIDXBlrf3rp7Tf9+exCz1iTEwERWCwCA3f+ub/95xtelH/vJ3beHxeHx3nyKPNvXiJfqRyBsy+89P5bvuoawjx46PE/f3jq9EcPlmurWiIgAiLg3AdnLvz0ru88/Q/Pgv9+82K89FiljDpiVY4AGvzwUy+e8bWDxcw7VHpHb3/iSV/wQ38ty7kcR9USgV1N4J1THz3rAfB8CkGO72KKRLgmrzesE3P1t4jAWbQXDYaZPwa2ASlnrOfuQ/fddvCOW6+57uD+pSMrvb6iNjwUJREQgREB/x68wd493f4Dj7383IkTJ3FVIMSpMFMZTWkdP35s3yP333znhYu9jn+ztOkN5bs+8aAPnzLui6GlvP4jl4IKID0tzgiy3e96gAIgAiKwiUDqtsiKslU2LUFPZOQZldHZftDsfxx27/4P5vqyoSBPLUEAAAAASUVORK5CYII="

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Coupon = __webpack_require__(233);
  
  var _Coupon2 = _interopRequireDefault(_Coupon);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by diwu on 3/12/16.
   */
  
  var path = exports.path = '/podcastdetail/*/coupons/add';
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var d, appData, token;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(state.context.appData && state.context.appData.length > 0)) {
                _context.next = 7;
                break;
              }
  
              d = state.context.appData.replace(/&quot;/g, '"');
              appData = JSON.parse(d);
              token = appData.access_token;
  
  
              state.context.onSetMeta('og:title', '优惠券');
              state.context.onSetMeta('title', '优惠券');
              return _context.abrupt('return', _react2.default.createElement(_Coupon2.default, { token: token }));
  
            case 7:
              return _context.abrupt('return', _react2.default.createElement('div', null));
  
            case 8:
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
/* 233 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(2);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Coupon = __webpack_require__(234);
  
  var _Coupon2 = _interopRequireDefault(_Coupon);
  
  var _bind = __webpack_require__(171);
  
  var _bind2 = _interopRequireDefault(_bind);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Location = __webpack_require__(118);
  
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
  
  var cx = _bind2.default.bind(_Coupon2.default);
  
  var Coupons = function (_Component) {
    (0, _inherits3.default)(Coupons, _Component);
  
    function Coupons(props, context) {
      (0, _classCallCheck3.default)(this, Coupons);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Coupons).call(this, props, context));
  
      _this.state = {
        value: ''
      };
      return _this;
    }
  
    (0, _createClass3.default)(Coupons, [{
      key: 'getCoupon',
      value: function getCoupon() {
        if (this.state.value.length == 8) {
          var coupon = this.state.value;
          var token = this.props.token;
          (0, _fetch2.default)('/coupons', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: (0, _stringify2.default)({
              couponCode: coupon,
              token: token
            })
          }).then(function (response) {
            return response.json();
          }).then(function (json) {
            _Location2.default.goBack();
          });
        }
      }
    }, {
      key: 'handleChange',
      value: function handleChange(event) {
        this.setState({ value: event.target.value });
      }
    }, {
      key: 'render',
      value: function render() {
        var style = cx({
          'addMore': true,
          'selected': this.state.value.length == 8
        });
        return _react2.default.createElement(
          'div',
          { className: _Coupon2.default.coupons },
          _react2.default.createElement('input', { value: this.state.value, onChange: this.handleChange.bind(this), type: 'text', name: '', id: '', style: { width: '100%', height: '44', textAlign: 'center' }, placeholder: '请输入优惠券', ref: 'couponInput' }),
          _react2.default.createElement(
            'div',
            { className: style, onClick: this.getCoupon.bind(this) },
            _react2.default.createElement(
              'p',
              { className: _Coupon2.default.title },
              '添加优惠券'
            )
          )
        );
      }
    }]);
    return Coupons;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(Coupons, _Coupon2.default);

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(235);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._1lD-{background-color:#f7f7f7;height:calc(100vh - 90px);overflow:hidden}._1lD- img{-o-object-fit:contain;object-fit:contain}._1lD- ul{list-style:none;padding:0;background-color:#f7f7f7}._1lD- ul li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:5px 10px 0}._1lD- ul li .Aln2{font-size:14px;color:#666}._1lD- ul ._3g-H{-webkit-box-flex:1;-ms-flex:1;flex:1;background-color:transparent;border-style:solid;height:103px;border-width:8px 100px 8px 12px;-o-border-image:url(" + __webpack_require__(230) + ") 8 100 8 12 repeat;border-image:url(" + __webpack_require__(230) + ") 8 100 8 12 fill repeat;padding:0 20px}._1lD- ul ._3g-H ._2CaM{color:#999;font-size:12px;margin-bottom:10px}._1lD- ul ._3g-H .Aln2{font-size:18px;color:#666;margin-bottom:20px}._1lD- ul ._3g-H ._1xby{color:#666;font-size:12px;text-align:end}._1lD- ul .dqHN{-o-border-image:url(" + __webpack_require__(231) + ") 8 100 8 12 repeat;border-image:url(" + __webpack_require__(231) + ") 8 100 8 12 fill repeat}._1lD- ul .dqHN ._2CaM{color:#fff;font-size:12px;margin-bottom:10px}._1lD- ul .dqHN .Aln2{font-size:18px;color:#fff;margin-bottom:20px}._1lD- ul .dqHN ._1xby{color:#fff;font-size:12px;text-align:end}._XDk{position:fixed;left:auto;display:-webkit-box;display:-ms-flexbox;display:flex;bottom:0;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;max-width:768px;height:50px;width:calc(100% - 20px);background:#cbcbcb;padding:6px 0;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:0 10px 90px;border-radius:5px}._XDk .Aln2{color:#fff;font-size:15px;text-align:left;margin-left:10px}._1Se-{background:#ff989e}", ""]);
  
  // exports
  exports.locals = {
  	"coupons": "_1lD-",
  	"title": "Aln2",
  	"coupon": "_3g-H",
  	"label": "_2CaM",
  	"expired": "_1xby",
  	"couponPressed": "dqHN",
  	"addMore": "_XDk",
  	"selected": "_1Se-"
  };

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _User = __webpack_require__(237);
  
  var _User2 = _interopRequireDefault(_User);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/users/*/view'; /**
                                              * Created by diwu on 3/12/16.
                                              */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var userId, query, response, _ref, data, user, query1, shares;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = state.path.replace('/users/', '').replace('/view', '');
              query = '{\n  user(path: "' + userId + '") {\n    nickname\n    avatar\n    description\n    fansCount\n    followersCount\n  }\n}\n';
              _context.next = 4;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 4:
              response = _context.sent;
              _context.next = 7;
              return response.json();
  
            case 7:
              _ref = _context.sent;
              data = _ref.data;
              user = data;
              query1 = '{\n  shares(path: "' + userId + '") {\n  \tdata{\n      title\n      cover\n      type\n      createdAt\n      additionalId\n    }\n  }\n}\n\n';
              _context.next = 13;
              return (0, _fetch2.default)('/graphql?query=' + query1);
  
            case 13:
              response = _context.sent;
              _context.next = 16;
              return response.json();
  
            case 16:
              data = _context.sent;
              shares = data.data.shares.data;
  
  
              state.context.onSetMeta('og:type', 'user');
              state.context.onSetMeta('title', '「' + user.user.nickname + '」的个人主页');
              state.context.onSetMeta('og:image', user.user.avatar);
              state.context.onSetMeta('og:title', '「' + user.user.nickname + '」的个人主页');
              state.context.onSetMeta('og:description', '来元子，育见更好的达人');
              state.context.onSetMeta('description', '来元子，育见更好的达人');
              state.context.onSetMeta('format-detection', 'telephone-no');
              return _context.abrupt('return', _react2.default.createElement(_User2.default, { user: user.user, context: state, shares: shares }));
  
            case 26:
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
/* 237 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _User = __webpack_require__(238);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _lodash = __webpack_require__(159);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _CDN = __webpack_require__(170);
  
  var _CDN2 = _interopRequireDefault(_CDN);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = function (_Component) {
    (0, _inherits3.default)(User, _Component);
  
    function User() {
      (0, _classCallCheck3.default)(this, User);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(User).apply(this, arguments));
    }
  
    (0, _createClass3.default)(User, [{
      key: 'renderShares',
      value: function renderShares(shares) {
        var _this2 = this;
  
        shares = _lodash2.default.slice(shares, 0, 5);
        return _react2.default.createElement(
          'ul',
          { className: _User2.default.shares },
          shares.map(function (c) {
            return _this2.renderShare(c);
          })
        );
      }
    }, {
      key: 'redirectDetail',
      value: function redirectDetail(share) {
        if (share.type == '1') {
          this.props.context.window.location = '/strategies/' + share.additionalId + '/view';
        } else {
          this.props.context.window.location = '/podcasts/' + share.additionalId + '/view';
        }
      }
    }, {
      key: 'renderShare',
      value: function renderShare(share) {
        return _react2.default.createElement(
          'li',
          { className: _User2.default.share, onClick: this.redirectDetail.bind(this, share) },
          _react2.default.createElement('img', { src: share.cover, alt: '' }),
          _react2.default.createElement(
            'div',
            { className: _User2.default.titleWrap },
            _react2.default.createElement(
              'span',
              { className: _User2.default.title },
              share.title
            ),
            _react2.default.createElement(
              'div',
              { className: _User2.default.from },
              _react2.default.createElement(
                'div',
                null,
                '来自',
                _react2.default.createElement(
                  'span',
                  { className: _User2.default.type },
                  share.type == '1' ? '妙招' : '微课'
                )
              ),
              _react2.default.createElement(
                'span',
                null,
                (0, _moment2.default)(share.createdAt).fromNow()
              )
            )
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var user = _props.user;
        var shares = _props.shares;
  
        return _react2.default.createElement(
          'div',
          { className: _User2.default.container },
          _react2.default.createElement(
            'div',
            { className: _User2.default.cover, style: { backgroundImage: 'url(' + _CDN2.default.userCoverURL(user.avatar) + ')' } },
            _react2.default.createElement('img', { className: _User2.default.avatar, height: '80', width: '80', src: user.avatar }),
            _react2.default.createElement(
              'p',
              { className: _User2.default.title },
              user.nickname
            ),
            _react2.default.createElement(
              'div',
              { className: _User2.default.counting },
              _react2.default.createElement(
                'span',
                null,
                '关注 ' + user.followersCount
              ),
              _react2.default.createElement(
                'span',
                null,
                '粉丝 ' + user.fansCount
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _User2.default.description },
            user.description
          ),
          _react2.default.createElement(
            'section',
            { className: _User2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _User2.default.AppSectionHeader },
              _react2.default.createElement('div', { className: _User2.default.line }),
              _react2.default.createElement(
                'span',
                null,
                'TA 的分享'
              )
            ),
            this.renderShares(shares)
          )
        );
      }
    }]);
    return User;
  }(_react.Component);
  
  User.propTypes = {
    user: _react.PropTypes.object.isRequired
  };
  
  exports.default = (0, _withStyles2.default)(User, _User2.default);

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(239);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "._2pCa{margin:0 auto 45px 0;padding:0;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:100%}._2pCa *{margin:0;padding:0}.MAvk{position:relative;height:225px;background-repeat:no-repeat;background-size:cover;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.MAvk ._1IAf{margin-top:10px;font-size:15px;color:#fff;width:100%;text-align:center}.MAvk ._2Jpb{width:80px;height:80px;border:2px solid #fff;border-radius:46px}._1nlm{margin-top:10px;font-size:11px;color:#fff}._1nlm span{margin:0 5px}._340G{font-size:15px;line-height:22px;min-height:20px;color:#666;padding:10px}.Byv5{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;border-top:5px solid #f7f7f7;overflow:hidden}._22pY,.Byv5{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal}._22pY{color:#666;font-size:16px;height:40px;background-color:#fff;width:100%;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}._22pY ._1R9L{width:2px;height:15px;background-color:#ff989e;margin-right:8px;margin-left:10px;border-radius:1px}._3ZXR{background-color:#f7f7f7;width:100%;list-style:none}._3ZXR ._2vy_{height:91px;background-color:#fff;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;border-bottom:1px solid #ededed;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._3ZXR ._2vy_,._3ZXR ._2vy_ ._247h{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._3ZXR ._2vy_ ._247h{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1;margin-left:10px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;height:66px}._3ZXR ._2vy_ ._247h ._1IAf{font-size:14px;color:#333;-webkit-box-flex:1;-ms-flex:1;flex:1}._3ZXR ._2vy_ ._247h ._1ZoV{margin-right:10px;font-size:11px;color:#cbcbcb;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;max-height:11px}._3ZXR ._2vy_ ._247h ._1ZoV,._3ZXR ._2vy_ ._247h ._1ZoV span{line-height:11px;height:11px}._3ZXR ._2vy_ ._247h ._1ZoV ._3GzU{color:#ff989e}._3ZXR ._2vy_ img{margin-left:10px;width:144px;height:66px;-o-object-fit:cover;object-fit:cover}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_2pCa",
  	"cover": "MAvk",
  	"title": "_1IAf",
  	"avatar": "_2Jpb",
  	"counting": "_1nlm",
  	"description": "_340G",
  	"AppSection": "Byv5",
  	"AppSectionHeader": "_22pY",
  	"line": "_1R9L",
  	"shares": "_3ZXR",
  	"share": "_2vy_",
  	"titleWrap": "_247h",
  	"from": "_1ZoV",
  	"type": "_3GzU"
  };

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(3);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fetch = __webpack_require__(24);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _Podcasts = __webpack_require__(241);
  
  var _Podcasts2 = _interopRequireDefault(_Podcasts);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/paid_podcasts'; /**
                                               * Created by diwu on 3/12/16.
                                               */
  
  var action = exports.action = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var query, response, _ref, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = '{\n  podcastsPay {\n     podcasts {\n      podcastId\n      title\n      cover\n      price\n      user {\n        nickname\n        avatar\n      }\n      content\n      startDate\n      enrollCount\n      userScore\n      roomNumber\n      startDate\n    }\n  }\n}\n';
              _context.next = 3;
              return (0, _fetch2.default)('/graphql?query=' + query);
  
            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();
  
            case 6:
              _ref = _context.sent;
              data = _ref.data;
  
              state.context.onSetMeta('og:title', '付费微课');
              state.context.onSetMeta('title', '付费微课');
              return _context.abrupt('return', _react2.default.createElement(_Podcasts2.default, { podcasts: data.podcastsPay.podcasts }));
  
            case 11:
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
/* 241 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(100);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(101);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(102);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(103);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(104);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(74);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(112);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Podcasts = __webpack_require__(242);
  
  var _Podcasts2 = _interopRequireDefault(_Podcasts);
  
  var _Image = __webpack_require__(176);
  
  var _Image2 = _interopRequireDefault(_Image);
  
  var _dateFormat = __webpack_require__(175);
  
  var _dateFormat2 = _interopRequireDefault(_dateFormat);
  
  var _NumberFotmat = __webpack_require__(186);
  
  var _NumberFotmat2 = _interopRequireDefault(_NumberFotmat);
  
  var _moment = __webpack_require__(161);
  
  var _moment2 = _interopRequireDefault(_moment);
  
  var _Location = __webpack_require__(118);
  
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
  
  var Podcasts = function (_Component) {
    (0, _inherits3.default)(Podcasts, _Component);
  
    function Podcasts(props, context) {
      (0, _classCallCheck3.default)(this, Podcasts);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Podcasts).call(this, props, context));
    }
  
    (0, _createClass3.default)(Podcasts, [{
      key: 'render',
      value: function render() {
        var podcasts = this.props.podcasts;
        return _react2.default.createElement(
          'div',
          { className: _Podcasts2.default.container },
          _react2.default.createElement(
            'section',
            { className: _Podcasts2.default.AppSection },
            _react2.default.createElement(
              'div',
              { className: _Podcasts2.default.podcasts },
              _react2.default.createElement(
                'ul',
                { style: { backgroundColor: 'white' } },
                podcasts.map(function (item) {
                  return _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '/podcasts/' + item.podcastId + '/view' },
                      _react2.default.createElement(_Image2.default, { src: item.cover, h: '357', w: '357' })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: _Podcasts2.default.main },
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.title },
                        item.title
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.price },
                        item.price == 0 ? '免费' : _NumberFotmat2.default.money(item.price / 100)
                      ),
                      _react2.default.createElement(
                        'p',
                        { className: _Podcasts2.default.by },
                        _react2.default.createElement('img', { className: _Podcasts2.default.avatar, width: '80', height: '80', src: item.user.avatar }),
                        _react2.default.createElement(
                          'span',
                          { className: _Podcasts2.default.nickname },
                          item.user.nickname
                        )
                      )
                    )
                  );
                })
              )
            )
          )
        );
      }
    }]);
    return Podcasts;
  }(_react.Component);
  
  Podcasts.propTypes = {};
  
  exports.default = (0, _withStyles2.default)(Podcasts, _Podcasts2.default);

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(243);
      var insertCss = __webpack_require__(109);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(108)();
  // imports
  
  
  // module
  exports.push([module.id, "ul{list-style:none}._2Vqq{margin:0 0 45px;padding:0;max-width:768px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:left;-ms-flex-align:left;align-items:left;width:100%}._2Vqq *{margin:0;padding:0}._2Vqq ._1ntY{width:100%;height:40px;background-color:#ffb7bb;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}._2Vqq ._1ntY span{margin:0 5px}._2Vqq ._1ntY .GSoa{font-size:11px}._2Vqq ._1ntY .SnPo{font-size:15px}._2Vqq ._1qU7{width:100%;min-height:141px;border-bottom:5px solid #f7f7f7}._2Vqq ._1qU7 ._19Qu{font-size:21px;color:#333;font-weight:400;text-align:center;margin:20px}._2Vqq ._1qU7 ._3bb7{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin:0 45px}._2Vqq ._1qU7 ._3bb7,._2Vqq ._1qU7 ._3bb7 li{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}._2Vqq ._1qU7 ._3bb7 li{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;max-width:88px;min-width:88px}._2Vqq ._1qU7 ._3bb7 img{width:40px;height:40px}._2Vqq ._1qU7 ._3bb7 span{font-size:11px;color:#999}._2Vqq ._1b8z{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;border-bottom:5px solid #f7f7f7}._2Vqq ._1b8z ._1fuj{width:50px;height:50px;min-height:50px;min-width:50px;border-radius:50%;margin:10px}._2Vqq ._1b8z ._3Vx6{margin:15px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}._2Vqq ._1b8z ._3Vx6 ._2R54{font-size:15px;line-height:18px;color:#ff989e}._2Vqq ._1b8z ._3Vx6 ._19Qu{font-size:12px;line-height:18px;color:#999}._2Vqq ._1b8z ._3Vx6 ._2wHj{font-size:16px;line-height:24px;color:#666}._2Vqq ._2_gx{font-size:15px;color:#999;padding:10px}._3mlm{border-radius:50%;width:125px;height:125px;border:2px solid #fed271;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._3mlm ._33TM{margin:0;padding:0;color:#fff;font-size:18px}._3mlm ._3e1D{margin:0;padding:0;font-size:22px;color:#fed271}._1WFs{position:relative}._1WFs,._1WFs img{width:100%;height:225px}._1WFs img{-o-object-fit:cover;object-fit:cover}._1WFs ._2Uqb{position:absolute;left:0;right:0;bottom:0;background:-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.65)));background:-webkit-linear-gradient(transparent,rgba(0,0,0,.65));background:linear-gradient(transparent,rgba(0,0,0,.65));height:10vw}.vbLQ{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;border-bottom:5px solid #f7f7f7;overflow:hidden}._37dq,.vbLQ{width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-direction:normal}._37dq{color:#666;font-size:16px;height:40px;background-color:#fff;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row}._37dq ._3jet{width:2px;height:15px;background-color:#ff989e;margin-right:8px;margin-left:10px;border-radius:1px}.YDZj{font-size:16px;line-height:24px;color:#666;margin:0 10px 10px;width:calc(100% - 20px)}._2nhg{position:absolute;display:block;width:100%;float:left;top:0;background-color:rgba(0,0,0,.5);height:auto;left:0;right:0;bottom:0}._2nhg img{margin-top:85px;width:50%;height:auto;-webkit-transform:translateX(50%);transform:translateX(50%)}._2xLT{text-decoration:none;color:#666;border-top:1px solid #ededed}._2xLT p{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._1_7F{width:100%;padding-top:6px;background:#fff}._1_7F ul{padding:0 1.6% 20px;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;list-style:none}._1_7F ul li{margin-top:6px;width:49.175%;background:#fff}._1_7F ul li a{-webkit-tap-highlight-color:rgba(0,0,0,0)}._1_7F ul li a img{width:100%;height:100px;-o-object-fit:cover;object-fit:cover}._1_7F ul li ._1cX8{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:10px 0}._1_7F ul li ._1cX8 ._19Qu{font-size:13px;height:40px}._1_7F ul li ._1cX8 .SnPo{font-size:12px;color:#ff989e;margin:6px;-ms-flex-item-align:end;align-self:flex-end}._1_7F ul li ._1cX8 ._3KVd{border-top:1px solid #ededed;padding:10px 6px;color:#666;font-size:11px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._1_7F ul li ._1cX8 ._3KVd ._1fuj{width:16px;height:16px;border-radius:50%}._1_7F ul li ._1cX8 ._3KVd ._2R54{margin-left:6px;color:#999}._1_7F ul li:nth-child(even){margin-left:1.65%}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_2Vqq",
  	"countingWrap": "_1ntY",
  	"counting": "GSoa",
  	"price": "SnPo",
  	"infoWrap": "_1qU7",
  	"title": "_19Qu",
  	"info": "_3bb7",
  	"user": "_1b8z",
  	"avatar": "_1fuj",
  	"nameWrap": "_3Vx6",
  	"nickname": "_2R54",
  	"description": "_2wHj",
  	"time": "_2_gx",
  	"countdown": "_3mlm",
  	"countdownLabel": "_33TM",
  	"date": "_3e1D",
  	"cover": "_1WFs",
  	"shadow": "_2Uqb",
  	"AppSection": "vbLQ",
  	"AppSectionHeader": "_37dq",
  	"line": "_3jet",
  	"content": "YDZj",
  	"startLesson": "_2nhg",
  	"more": "_2xLT",
  	"podcasts": "_1_7F",
  	"main": "_1cX8",
  	"by": "_3KVd"
  };

/***/ },
/* 244 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(246);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (appData, body, css, description, entry, title, trackingId) {
  buf.push("<!DOCTYPE html><html lang=\"\" class=\"no-js\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("description", description, true, true)) + "><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\"><style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp) + "</style><link href=\"https://vjs.zencdn.net/5.10.7/video-js.css\" rel=\"stylesheet\"></head><body><div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp) + "</div><script>window.appData = '" + (jade.escape((jade_interp = appData) == null ? '' : jade_interp)) + "'</script><script" + (jade.attr("src", entry, true, true)) + "></script><script>window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\nga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')</script><script src=\"https://vjs.zencdn.net/5.10.7/video.js\"></script><script src=\"https://lkme.cc/js/linkedme.min.js\"></script><script>linkedme.init(\"b94d75c383a1127d94d29258e8a5526e\", {type: \"live\"}, null);\nvar data = {};\ndata.type = \"live\";  //表示现在使用线上模式,如果填写\"test\", 表示测试模式.【可选】\nvar value1 = document.URL;\ndata.params = '{\"link\":\"' + value1 + '\"}'; //注意单引号和双引号的位置\n\nlinkedme.link(data, function (err, data) {\n  if (err) {\n  } else {\n    document.getElementById('deeplink').href = data.url\n  }\n}, false);</script>");
  if ( trackingId)
  {
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer></script>");
  }
  buf.push("</body></html>");}.call(this,"appData" in locals_for_with?locals_for_with.appData:typeof appData!=="undefined"?appData:undefined,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  }

/***/ },
/* 246 */
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
      str = str || __webpack_require__(32).readFileSync(filename, 'utf8')
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
/* 247 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(246);
  
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