# Future toons

Text file streaming/processing lightweight library for nodejs.
To process big or semi big amounts of logs aka. ngnix, rails production logs
i decided to build a set of simple tools that will not just blow up on ~7-10 million of lines files.

# Running tests

    npm text

## Testing
i'm using mocha lib by TJ!

# example

    var toons = require('future_toons');
    new toons("example.js", function(line){
      console.log(line);
    });

this will print line by line contents of file example.js, first function you supply is callback that will take each line.
Optionaly you can supply 3 argument which is callback function that will be called at the end of processing.

# command line interface
you can use future_toons from command line like this

    node bin/toons -f lib/toons.js -e 'function(line){ if(line.length > 1){console.log("> " + line)}else{console.log(line)}; }'

    node bin/toons -h for help

# Authors
Jakub Oboza - http://no-fucking-idea.com