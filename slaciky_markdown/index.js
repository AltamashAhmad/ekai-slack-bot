const gfm = require('remark-gfm');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const unified = require('unified');

const { collectDefinitions, removeDefinitions } = require('./definitions');
const createSlackifyOptions = require('./slackify');

module.exports = (markdown, options) => {
    const definitions = {};
    const slackifyOptions = createSlackifyOptions(definitions);

    return unified()
        .use(parse, options)
        .use(gfm)
        .use(collectDefinitions, definitions)
        .use(removeDefinitions)
        .use(stringify, slackifyOptions)
        .processSync(markdown)
        .toString();
};
