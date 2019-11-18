var mongoose = require('../common/db');

//定义用户模型
var order = new mongoose.Schema({
    name: String, //演讲人姓名
    speechTime: String,  //演讲时间
    speechTopic: String, //演讲主题
    finished: String,    //是否已完成
});

order.statics.findAll = function(callBack){
    this.find({},callBack);
}
order.statics.findByUsername = function(name, callBack){
    this.find({username:name},callBack);
}

var orderModel= mongoose.model('order',order);
module.exports = orderModel;