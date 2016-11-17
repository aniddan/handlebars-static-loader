const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const {parseQuery} = require('loader-utils');

module.exports = function HandlebarsStaticLoader (source) {
    const template = Handlebars.compile(source);
    const {data = {}, partials} = parseQuery(this.query);
    if (partials) {
        const partialsPath = path.resolve(__dirname, partials);
        const partials = fs.readdirSync(partialsPath);
        for (let i = 0; i < partials.length; i++) {
            const partial = partials[i];
            Handlebars.registerPartial(partial.replace(/\.hbs$/, ''), fs.readFileSync(path.resolve(partialsPath, partial)).toString());
        }
    }
    return template(data);
};
