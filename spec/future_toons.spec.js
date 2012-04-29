
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

    it("should emit correct content", function(done){
      var content = ">";

      var line_cb = function(line){
        content = content + ":" + line;
      };

      var end_cb = function(){
        done();
        content.should.equal(">:first line:second line:third line:fourth line");
      } 
   
      new toons("./spec/fixtures/four_line.file", line_cb, end_cb);

    });

    it("should be able to delay execution", function(done){

      var count = 0;

      var line_cb = function(line){
        count = count + 1;
      };

      var end_cb = function(){
        done();
        count.should.equal(4);
      } 

      var streamer = new toons();
      streamer.onLine(line_cb);
      streamer.onEnd(end_cb);
      streamer.run("./spec/fixtures/four_line.file");
      
    });

  });
});

