import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import uppercamelcase from 'uppercamelcase';
import {parseQuery} from 'loader-utils';

export default function HandlebarsStaticLoader (source) {
    const template = Handlebars.compile(source);
    const {data = {}, partials} = parseQuery(this.query);
    if (partials) {
        for (let partial of fs.readdirSync(partials)) {
            Handlebars.registerPartial(
                uppercamelcase(partial.replace(/\.hbs$/, '')),
                fs.readFileSync(path.resolve(partialsPath, partial), 'utf-8')
            );
        }
    }
    return template(data);
}
