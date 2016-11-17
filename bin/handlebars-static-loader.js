'use strict';

var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');

var _require = require('loader-utils'),
    parseQuery = _require.parseQuery;

module.exports = function HandlebarsStaticLoader(source) {
    var template = Handlebars.compile(source);

    var _parseQuery = parseQuery(this.query),
        _parseQuery$data = _parseQuery.data,
        data = _parseQuery$data === undefined ? {} : _parseQuery$data,
        partials = _parseQuery.partials;

    if (partials) {
        var partialsPath = path.resolve(__dirname, _partials);
        var _partials = fs.readdirSync(partialsPath);
        for (var i = 0; i < _partials.length; i++) {
            var partial = _partials[i];
            Handlebars.registerPartial(partial.replace(/\.hbs$/, ''), fs.readFileSync(path.resolve(partialsPath, partial)).toString());
        }
    }
    return template(data);
};