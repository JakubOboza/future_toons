var fs = require('fs');
var events = require('events');
var util = require('util');

// accepts only text files, will force utf-8!

function FutureToons(filename, callback, end_callback){
  // in case someone will call it wrong way ;)
  if(false === (this instanceof FutureToons)) {
    return new FutureToons(filename, callback);
  }
  events.EventEmitter.call(this);

  this.onEnd(end_callback);

  if(filename && callback){
    // if both present run instant
    this.onLine(callback);
    this.run(filename);
  }

}

// do not put methods between this line and initial definition
util.inherits(FutureToons, events.EventEmitter);

FutureToons.prototype.onLine = function(callback){
  if( (typeof callback) === 'function'){
    this.on("line", callback);
  }
};

FutureToons.prototype.onEnd = function(callback){
  if( (typeof callback) === 'function'){
    this.on("end", callback);
  }
};

FutureToons.prototype.run = function(filename){
  this.readFileStream = fs.createReadStream(filename, {encoding: "utf-8"});
  this.readFileStream.on('data', this.onRawData(this));
  this.readFileStream.on('end', this.onRawDataEnd(this));
}

FutureToons.prototype.onRawDataEnd = function(self){
    return function(){
      self.emit("end");
    }
};

FutureToons.prototype.onRawData = function(self){
    return function(data){
        var splitted = data.split("\n");
        for(var i = 0; i < splitted.length; i++){
           self.emit("line", splitted[i]);
        }
    }
};

module.exports = FutureToons;


