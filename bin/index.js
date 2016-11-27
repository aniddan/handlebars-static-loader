'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HandlebarsStaticLoader;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _uppercamelcase = require('uppercamelcase');

var _uppercamelcase2 = _interopRequireDefault(_uppercamelcase);

var _loaderUtils = require('loader-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HandlebarsStaticLoader(source) {
    var template = _handlebars2.default.compile(source);

    var _parseQuery = (0, _loaderUtils.parseQuery)(this.query),
        _parseQuery$data = _parseQuery.data,
        data = _parseQuery$data === undefined ? {} : _parseQuery$data,
        partials = _parseQuery.partials;

    if (partials) {
        var partialsPath = _path2.default.resolve(__dirname, partials);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _fs2.default.readdirSync(partialsPath)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var partial = _step.value;

                _handlebars2.default.registerPartial((0, _uppercamelcase2.default)(partial.replace(/\.hbs$/, '')), _fs2.default.readFileSync(_path2.default.resolve(partialsPath, partial), 'utf-8'));
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
    return template(data);
}
module.exports = exports['default'];