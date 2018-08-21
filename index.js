const htmlLoader = require('html-loader');
const compiler = require('vue-template-compiler');
const transpile = require('vue-template-es2015-compiler');
const loaderUtils = require('loader-utils');

module.exports = function(content) {
    let options = loaderUtils.getOptions(this) || {};
    let shouldCompile = false;
    let include = options.include;
    let resource = this.resource;
    if (Array.isArray(include)) {
        shouldCompile = include.some((v) => resource.startsWith(v));
    } else if (typeof include === 'string') {
        shouldCompile = resource.startsWith(include);
    }

    if (shouldCompile) {
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
