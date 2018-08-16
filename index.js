const htmlLoader = require('html-loader');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
    let options = loaderUtils.getOptions(this) || {};

    if (options.include.some((v) => this.resource.startsWith(v))) {
        const compiled = compiler.compile(content);

        if (compiled.errors.length > 0) {
            throw compiled.errors;
        }

        return transpile(`module.exports = {render: ${toFunction(compiled.render)},staticRenderFns: [${compiled.staticRenderFns.map(toFunction).join(',')}]};`);
    } else {
        return htmlLoader(content);
    }
};

function toFunction(code) {
    return `function(){${code}}`;
}
