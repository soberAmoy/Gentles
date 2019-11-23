var mongoose = require('../common/db');

//定义用户模型
var vision = new mongoose.Schema({
    _v: String,
    content: Array,
    date: Date,
});

vision.statics.findAll = function(callBack){
    this.find({},callBack);
}

var visionModel= mongoose.model('vision',vision);
module.exports = visionModel;