// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    ',': ',',
    ':': ':',
    true: 'true',
    false: 'false',
    null: 'null',
})




function extractPair(kv, output) {
    if(kv[1]) { output[kv[1][0]] = kv[1][1]; }
}

function extractObject(d) {
    let output = {};

    for (let i of d[1]) {
        extractPair(i, output);
    }

    return output;
}

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "acf", "symbols": [{"literal":"\"AppState\""}, "_", "acfObject", "_"], "postprocess":  function(d){
            return {
                "AppState": d[2]
            }
        }},
    {"name": "tabs", "symbols": [{"literal":"\t\t"}], "postprocess": function(d) { return null; }},
    {"name": "acfObject$ebnf$1", "symbols": []},
    {"name": "acfObject$ebnf$1$subexpression$1", "symbols": ["_", "acfPair"]},
    {"name": "acfObject$ebnf$1", "symbols": ["acfObject$ebnf$1", "acfObject$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "acfObject", "symbols": [{"literal":"{"}, "acfObject$ebnf$1", "_", {"literal":"}"}], "postprocess": extractObject},
    {"name": "acfPair", "symbols": ["key", "tabs", "string"], "postprocess": function(d) { return [d[0], d[2]]; }},
    {"name": "acfPair", "symbols": ["key", "_", "acfObject"], "postprocess": function(d) { return [d[0], d[2]]; }},
    {"name": "acfValue", "symbols": ["string"], "postprocess": id},
    {"name": "acfValue", "symbols": ["acfObject"]},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": function(d) { return JSON.parse(d[0].value) }},
    {"name": "key", "symbols": ["string"], "postprocess": id},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": function(d) { return null; }}
]
  , ParserStart: "acf"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
