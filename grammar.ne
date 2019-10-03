@{%

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

%}

@lexer lexer

acf -> "\"AppState\"" _ acfObject _ {% function(d){
    return {
        "AppState": d[2]
    }
}%}

tabs -> "\t\t" {% function(d) { return null; } %}

acfObject -> "{" (_ acfPair):* _ "}" {% extractObject %}

acfPair -> key tabs string {% function(d) { return [d[0], d[2]]; } %}
    | key _ acfObject {% function(d) { return [d[0], d[2]]; } %}

acfValue -> string {% id %} | acfObject

string -> %string {% function(d) { return JSON.parse(d[0].value) } %}

key -> string {% id %}

_ -> null | %space {% function(d) { return null; } %}

@{%

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

%}