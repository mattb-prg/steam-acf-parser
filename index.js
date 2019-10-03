const nearley = require('nearley')
const grammar = require('./grammar')

const parserGrammar = nearley.Grammar.fromCompiled(grammar)

module.exports = function(acfString){
    const parser = new nearley.Parser(parserGrammar)
    const res = parser.feed(acfString).results[0]
    return res
}