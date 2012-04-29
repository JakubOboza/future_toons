
// mocha -R landing file_lines.js
var toons = require('../toons');
require('should');

describe('Future Toons', function(){
  describe('reading line by line', function(){
    it("should read line by line an example file", function(done){

      var count = 0;

      var line_cb = function(line){
        count = count + 1;
      };

      var end_cb = function(){
        done();
        count.should.equal(4);
      } 
   
      new toons("./spec/fixtures/four_line.file", line_cb, end_cb);

    });
  });
});

