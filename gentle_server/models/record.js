var mongoose = require('../common/db');

//定义用户模型
var record = new mongoose.Schema({
    order: Array,
    createdTime: Date,
});

record.statics.findAll = function(callBack){
    this.find({},callBack);
}

var recordModel= mongoose.model('record',record);
module.exports = recordModel;