/*istanbul ignore next*/"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


// futurize :: Constructor -> CPS -> ( ...args -> Future )
var futurize = /*istanbul ignore next*/exports.futurize = function futurize(Future) /*istanbul ignore next*/{
  return function (fn) /*istanbul ignore next*/{
    return function () {
      /*istanbul ignore next*/for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Future(function (rej, res) /*istanbul ignore next*/{
        return void /*istanbul ignore next*/fn.apply( /*istanbul ignore next*/undefined, /*istanbul ignore next*/args.concat([function (err, result) /*istanbul ignore next*/{
          return err ? rej(err) : res(result);
        }]));
      });
    };
  };
};

// futurizeV :: Constructor -> VariadicCPS -> ( ...args -> Future Array )
var futurizeV = /*istanbul ignore next*/exports.futurizeV = function futurizeV(Future) /*istanbul ignore next*/{
  return function (fn) /*istanbul ignore next*/{
    return function () {
      /*istanbul ignore next*/for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new Future(function (rej, res) /*istanbul ignore next*/{
        return void /*istanbul ignore next*/fn.apply( /*istanbul ignore next*/undefined, /*istanbul ignore next*/args.concat([function (err) /*istanbul ignore next*/{
          for (var _len3 = arguments.length, results = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            results[_key3 - 1] = arguments[_key3];
          }

          return err ? rej(err) : res(results);
        }]));
      });
    };
  };
};

// futurizeP :: Constructor -> Promise -> ( ...args -> Future )
var futurizeP = /*istanbul ignore next*/exports.futurizeP = function futurizeP(Future) /*istanbul ignore next*/{
  return function (fn) /*istanbul ignore next*/{
    return function () {
      /*istanbul ignore next*/for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return new Future(function (rej, res) /*istanbul ignore next*/{
        return void /*istanbul ignore next*/fn.apply( /*istanbul ignore next*/undefined, args).then(res, rej);
      });
    };
  };
};