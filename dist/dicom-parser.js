/**
 * Modules in this bundle
 * @license
 *
 * dicom-parser:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: Chris Hafey <chafey@gmail.com> (https://github.com/chafey)
 *   homepage: https://github.com/OHIF/dicom-parser
 *   version: 2.0.2
 *
 * This header is generated by licensify (https://github.com/twada/licensify)
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hooks = require('./lib/utils/hooks');

var _dicomParser = require('./lib/dicom-parser/dicom-parser');

_hooks.hooks.version = '2.0.2'; // ! dicom-parser.js
// ! version: 2.0.2
// ! authors: Chris Hafey, dicomParser contributors
// ! license: MIT
// ! https://github.com/OHIF/dicom-parser

(0, _hooks.setHookCallback)(_dicomParser.createLocal);

_hooks.hooks.fn = _dicomParser.dicomParserPrototype;
_hooks.hooks.prototype = _dicomParser.dicomParserPrototype;
_hooks.hooks.parseDA = _dicomParser.parseDA;

exports.default = _hooks.hooks;

},{"./lib/dicom-parser/dicom-parser":4,"./lib/utils/hooks":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLocal = undefined;

var _constructor = require('../dicom-parser/constructor');

var createLocal = exports.createLocal = function createLocal() {
  var config = {};
  var res = new _constructor.DicomParser(config);

  return res;
};

},{"../dicom-parser/constructor":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// DicomParser prototype object
var DicomParser = exports.DicomParser = function DicomParser() {};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDA = exports.dicomParserPrototype = exports.createLocal = undefined;

var _local = require('../create/local');

var _prototype = require('./prototype');

var _prototype2 = _interopRequireDefault(_prototype);

var _parseDa = require('./parse-da');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createLocal = _local.createLocal;
exports.dicomParserPrototype = _prototype2.default;
exports.parseDA = _parseDa.parseDA;

},{"../create/local":2,"./parse-da":5,"./prototype":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Algorithm based on http://stackoverflow.com/questions/1433030/
var daysInMonth = function daysInMonth(m, y) {
  // Note: m is 0 indexed: 0-11
  switch (m) {
    case 2:
      return y % 4 === 0 && y % 100 || y % 400 === 0 ? 29 : 28;
    case 9:case 4:case 6:case 11:
      return 30;
    default:
      return 31;
  }
};

var isValidDate = function isValidDate(d, m, y) {
  // Make year is a number
  if (isNaN(y)) {
    return false;
  }

  return m > 0 && m <= 12 && d > 0 && d <= daysInMonth(m, y);
};

/**
 * Parses a DA formatted string into a Javascript object
 * @param {string} date a string in the DA VR format
 * @param {boolean} [validate] - Shall throw exception when the date is invalid?
 * @returns {*} Object with properties year, month and day<br>
 *              Will return undefined if not present or not 8 bytes long
 */
var parseDA = exports.parseDA = function parseDA(date, validate) {
  if (date && date.length === 8) {
    var yyyy = parseInt(date.substring(0, 4), 10);
    var mm = parseInt(date.substring(4, 6), 10);
    var dd = parseInt(date.substring(6, 8), 10);

    if (validate && isValidDate(dd, mm, yyyy) !== true) {
      throw new Error("invalid DA \"" + date + "\"");
    }

    return {
      year: yyyy,
      month: mm,
      day: dd
    };
  }

  if (validate) {
    throw new Error("invalid DA \"" + date + "\"");
  }

  return undefined;
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parseDicom = exports.parseDicom = function parseDicom() {
  throw new Error('not yet implemented');
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constructor = require('./constructor');

var _parseDicom = require('./parse-dicom');

var _parseDa = require('./parse-da');

var proto = _constructor.DicomParser.prototype;

proto.parseDicom = _parseDicom.parseDicom;
proto.parseDA = _parseDa.parseDA;

exports.default = proto;

},{"./constructor":3,"./parse-da":5,"./parse-dicom":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hookCallback = function hookCallback() {};

// This is done to register the method called with dicomParser()
// Without creating circular dependencies.
var setHookCallback = exports.setHookCallback = function setHookCallback(callback) {
  hookCallback = callback;
};

var hooks = exports.hooks = function hooks() {
  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  return Reflect.apply(hookCallback, null, params);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL2JydW5vL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyY1xcZGljb20tcGFyc2VyLmpzIiwic3JjXFxsaWJcXGNyZWF0ZVxcbG9jYWwuanMiLCJzcmNcXGxpYlxcZGljb20tcGFyc2VyXFxjb25zdHJ1Y3Rvci5qcyIsInNyY1xcbGliXFxkaWNvbS1wYXJzZXJcXGRpY29tLXBhcnNlci5qcyIsInNyY1xcbGliXFxkaWNvbS1wYXJzZXJcXHBhcnNlLWRhLmpzIiwic3JjXFxsaWJcXGRpY29tLXBhcnNlclxccGFyc2UtZGljb20uanMiLCJzcmNcXGxpYlxcZGljb20tcGFyc2VyXFxwcm90b3R5cGUuanMiLCJzcmNcXGxpYlxcdXRpbHNcXGhvb2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0FDTUE7O0FBSUE7O0FBRkEsYUFBWSxPQUFaLEdBQXNCLE9BQXRCLEVBUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFZQTs7QUFFQSxhQUFZLEVBQVo7QUFDQSxhQUFZLFNBQVo7QUFDQSxhQUFZLE9BQVo7Ozs7Ozs7Ozs7OztBQ3BCQTs7QUFFTyxJQUFNLG9DQUFjLFNBQWQsV0FBYyxHQUFZO0FBQ3JDLE1BQU0sU0FBUyxFQUFmO0FBQ0EsTUFBTSxNQUFNLDZCQUFnQixNQUFoQixDQUFaOztBQUVBLFNBQU8sR0FBUDtBQUNELENBTE07Ozs7Ozs7O0FDRlA7QUFDTyxJQUFNLG9DQUFjLFNBQWQsV0FBYyxHQUFZLENBQ3RDLENBRE07Ozs7Ozs7Ozs7QUNEUDs7QUFFQTs7OztBQUVBOzs7O1FBR0U7UUFDQTtRQUNBOzs7Ozs7OztBQ1RGO0FBQ0EsSUFBTSxjQUFjLFNBQWQsV0FBYyxDQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCO0FBQ2xDO0FBQ0EsVUFBUSxDQUFSO0FBQ0EsU0FBSyxDQUFMO0FBQ0UsYUFBUSxJQUFJLENBQUosS0FBVSxDQUFWLElBQWUsSUFBSSxHQUFwQixJQUE0QixJQUFJLEdBQUosS0FBWSxDQUF4QyxHQUE0QyxFQUE1QyxHQUFpRCxFQUF4RDtBQUNGLFNBQUssQ0FBTCxDQUFTLEtBQUssQ0FBTCxDQUFTLEtBQUssQ0FBTCxDQUFTLEtBQUssRUFBTDtBQUN6QixhQUFPLEVBQVA7QUFDRjtBQUNFLGFBQU8sRUFBUDtBQU5GO0FBUUQsQ0FWRDs7QUFZQSxJQUFNLGNBQWMsU0FBZCxXQUFjLENBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUI7QUFDckM7QUFDQSxNQUFJLE1BQU0sQ0FBTixDQUFKLEVBQWM7QUFDWixXQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFPLElBQUksQ0FBSixJQUFTLEtBQUssRUFBZCxJQUFvQixJQUFJLENBQXhCLElBQTZCLEtBQUssWUFBWSxDQUFaLEVBQWUsQ0FBZixDQUF6QztBQUNELENBUEQ7O0FBU0E7Ozs7Ozs7QUFPTyxJQUFNLDRCQUFVLFNBQVYsT0FBVSxDQUFVLElBQVYsRUFBZ0IsUUFBaEIsRUFBMEI7QUFDL0MsTUFBSSxRQUFRLEtBQUssTUFBTCxLQUFnQixDQUE1QixFQUErQjtBQUM3QixRQUFNLE9BQU8sU0FBUyxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLENBQVQsRUFBK0IsRUFBL0IsQ0FBYjtBQUNBLFFBQU0sS0FBSyxTQUFTLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FBVCxFQUErQixFQUEvQixDQUFYO0FBQ0EsUUFBTSxLQUFLLFNBQVMsS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFULEVBQStCLEVBQS9CLENBQVg7O0FBRUEsUUFBSSxZQUFZLFlBQVksRUFBWixFQUFnQixFQUFoQixFQUFvQixJQUFwQixNQUE4QixJQUE5QyxFQUFvRDtBQUNsRCxZQUFNLElBQUksS0FBSixtQkFBeUIsSUFBekIsUUFBTjtBQUNEOztBQUVELFdBQU87QUFDTCxZQUFNLElBREQ7QUFFTCxhQUFPLEVBRkY7QUFHTCxXQUFLO0FBSEEsS0FBUDtBQUtEOztBQUVELE1BQUksUUFBSixFQUFjO0FBQ1osVUFBTSxJQUFJLEtBQUosbUJBQXlCLElBQXpCLFFBQU47QUFDRDs7QUFFRCxTQUFPLFNBQVA7QUFDRCxDQXRCTTs7Ozs7Ozs7QUM3QkEsSUFBTSxrQ0FBYSxTQUFiLFVBQWEsR0FBWTtBQUNwQyxRQUFNLElBQUksS0FBSixDQUFVLHFCQUFWLENBQU47QUFDRCxDQUZNOzs7Ozs7Ozs7QUNBUDs7QUFJQTs7QUFDQTs7QUFIQSxJQUFNLFFBQVEseUJBQVksU0FBMUI7O0FBS0EsTUFBTSxVQUFOO0FBQ0EsTUFBTSxPQUFOOztrQkFFZTs7Ozs7Ozs7QUNWZixJQUFJLGVBQWUsd0JBQU0sQ0FBRSxDQUEzQjs7QUFFQTtBQUNBO0FBQ08sSUFBTSw0Q0FBa0IsU0FBbEIsZUFBa0IsQ0FBVSxRQUFWLEVBQW9CO0FBQ2pELGlCQUFlLFFBQWY7QUFDRCxDQUZNOztBQUlBLElBQU0sd0JBQVEsU0FBUixLQUFRO0FBQUEsb0NBQUksTUFBSjtBQUFJLFVBQUo7QUFBQTs7QUFBQSxTQUFlLFFBQVEsS0FBUixDQUFjLFlBQWQsRUFBNEIsSUFBNUIsRUFBa0MsTUFBbEMsQ0FBZjtBQUFBLENBQWQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gISBkaWNvbS1wYXJzZXIuanNcbi8vICEgdmVyc2lvbjogMi4wLjJcbi8vICEgYXV0aG9yczogQ2hyaXMgSGFmZXksIGRpY29tUGFyc2VyIGNvbnRyaWJ1dG9yc1xuLy8gISBsaWNlbnNlOiBNSVRcbi8vICEgaHR0cHM6Ly9naXRodWIuY29tL09ISUYvZGljb20tcGFyc2VyXG5cbmltcG9ydCB7IGhvb2tzIGFzIGRpY29tUGFyc2VyLCBzZXRIb29rQ2FsbGJhY2sgfSBmcm9tICcuL2xpYi91dGlscy9ob29rcyc7XG5cbmRpY29tUGFyc2VyLnZlcnNpb24gPSAnMi4wLjInO1xuXG5pbXBvcnQge1xuICBjcmVhdGVMb2NhbCBhcyBsb2NhbCxcbiAgZGljb21QYXJzZXJQcm90b3R5cGUgYXMgZm4sXG4gIHBhcnNlREFcbn0gZnJvbSAnLi9saWIvZGljb20tcGFyc2VyL2RpY29tLXBhcnNlcic7XG5cbnNldEhvb2tDYWxsYmFjayhsb2NhbCk7XG5cbmRpY29tUGFyc2VyLmZuID0gZm47XG5kaWNvbVBhcnNlci5wcm90b3R5cGUgPSBmbjtcbmRpY29tUGFyc2VyLnBhcnNlREEgPSBwYXJzZURBO1xuXG5leHBvcnQgZGVmYXVsdCBkaWNvbVBhcnNlcjtcbiIsImltcG9ydCB7IERpY29tUGFyc2VyIH0gZnJvbSAnLi4vZGljb20tcGFyc2VyL2NvbnN0cnVjdG9yJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxvY2FsID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBjb25maWcgPSB7fTtcbiAgY29uc3QgcmVzID0gbmV3IERpY29tUGFyc2VyKGNvbmZpZyk7XG5cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIvLyBEaWNvbVBhcnNlciBwcm90b3R5cGUgb2JqZWN0XG5leHBvcnQgY29uc3QgRGljb21QYXJzZXIgPSBmdW5jdGlvbiAoKSB7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlTG9jYWwgfSBmcm9tICcuLi9jcmVhdGUvbG9jYWwnO1xuXG5pbXBvcnQgZGljb21QYXJzZXJQcm90b3R5cGUgZnJvbSAnLi9wcm90b3R5cGUnO1xuXG5pbXBvcnQgeyBwYXJzZURBIH0gZnJvbSAnLi9wYXJzZS1kYSc7XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZUxvY2FsLFxuICBkaWNvbVBhcnNlclByb3RvdHlwZSxcbiAgcGFyc2VEQVxufTtcbiIsIi8vIEFsZ29yaXRobSBiYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0MzMwMzAvXG5jb25zdCBkYXlzSW5Nb250aCA9IGZ1bmN0aW9uIChtLCB5KSB7XG4gIC8vIE5vdGU6IG0gaXMgMCBpbmRleGVkOiAwLTExXG4gIHN3aXRjaCAobSkge1xuICBjYXNlIDI6XG4gICAgcmV0dXJuICh5ICUgNCA9PT0gMCAmJiB5ICUgMTAwKSB8fCB5ICUgNDAwID09PSAwID8gMjkgOiAyODtcbiAgY2FzZSA5IDogY2FzZSA0IDogY2FzZSA2IDogY2FzZSAxMSA6XG4gICAgcmV0dXJuIDMwO1xuICBkZWZhdWx0IDpcbiAgICByZXR1cm4gMzE7XG4gIH1cbn07XG5cbmNvbnN0IGlzVmFsaWREYXRlID0gZnVuY3Rpb24gKGQsIG0sIHkpIHtcbiAgLy8gTWFrZSB5ZWFyIGlzIGEgbnVtYmVyXG4gIGlmIChpc05hTih5KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBtID4gMCAmJiBtIDw9IDEyICYmIGQgPiAwICYmIGQgPD0gZGF5c0luTW9udGgobSwgeSk7XG59O1xuXG4vKipcbiAqIFBhcnNlcyBhIERBIGZvcm1hdHRlZCBzdHJpbmcgaW50byBhIEphdmFzY3JpcHQgb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZSBhIHN0cmluZyBpbiB0aGUgREEgVlIgZm9ybWF0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt2YWxpZGF0ZV0gLSBTaGFsbCB0aHJvdyBleGNlcHRpb24gd2hlbiB0aGUgZGF0ZSBpcyBpbnZhbGlkP1xuICogQHJldHVybnMgeyp9IE9iamVjdCB3aXRoIHByb3BlcnRpZXMgeWVhciwgbW9udGggYW5kIGRheTxicj5cbiAqICAgICAgICAgICAgICBXaWxsIHJldHVybiB1bmRlZmluZWQgaWYgbm90IHByZXNlbnQgb3Igbm90IDggYnl0ZXMgbG9uZ1xuICovXG5leHBvcnQgY29uc3QgcGFyc2VEQSA9IGZ1bmN0aW9uIChkYXRlLCB2YWxpZGF0ZSkge1xuICBpZiAoZGF0ZSAmJiBkYXRlLmxlbmd0aCA9PT0gOCkge1xuICAgIGNvbnN0IHl5eXkgPSBwYXJzZUludChkYXRlLnN1YnN0cmluZygwLCA0KSwgMTApO1xuICAgIGNvbnN0IG1tID0gcGFyc2VJbnQoZGF0ZS5zdWJzdHJpbmcoNCwgNiksIDEwKTtcbiAgICBjb25zdCBkZCA9IHBhcnNlSW50KGRhdGUuc3Vic3RyaW5nKDYsIDgpLCAxMCk7XG5cbiAgICBpZiAodmFsaWRhdGUgJiYgaXNWYWxpZERhdGUoZGQsIG1tLCB5eXl5KSAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIERBIFwiJHtkYXRlfVwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHl5eXksXG4gICAgICBtb250aDogbW0sXG4gICAgICBkYXk6IGRkXG4gICAgfTtcbiAgfVxuXG4gIGlmICh2YWxpZGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBEQSBcIiR7ZGF0ZX1cImApO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCJleHBvcnQgY29uc3QgcGFyc2VEaWNvbSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdub3QgeWV0IGltcGxlbWVudGVkJyk7XG59O1xuIiwiaW1wb3J0IHsgRGljb21QYXJzZXIgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcblxuY29uc3QgcHJvdG8gPSBEaWNvbVBhcnNlci5wcm90b3R5cGU7XG5cbmltcG9ydCB7IHBhcnNlRGljb20gfSBmcm9tICcuL3BhcnNlLWRpY29tJztcbmltcG9ydCB7IHBhcnNlREEgfSBmcm9tICcuL3BhcnNlLWRhJztcblxucHJvdG8ucGFyc2VEaWNvbSA9IHBhcnNlRGljb207XG5wcm90by5wYXJzZURBID0gcGFyc2VEQTtcblxuZXhwb3J0IGRlZmF1bHQgcHJvdG87XG4iLCJsZXQgaG9va0NhbGxiYWNrID0gKCkgPT4ge307XG5cbi8vIFRoaXMgaXMgZG9uZSB0byByZWdpc3RlciB0aGUgbWV0aG9kIGNhbGxlZCB3aXRoIGRpY29tUGFyc2VyKClcbi8vIFdpdGhvdXQgY3JlYXRpbmcgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuZXhwb3J0IGNvbnN0IHNldEhvb2tDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBob29rQ2FsbGJhY2sgPSBjYWxsYmFjaztcbn07XG5cbmV4cG9ydCBjb25zdCBob29rcyA9ICguLi5wYXJhbXMpID0+IFJlZmxlY3QuYXBwbHkoaG9va0NhbGxiYWNrLCBudWxsLCBwYXJhbXMpO1xuIl19
