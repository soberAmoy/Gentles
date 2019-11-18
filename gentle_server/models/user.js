var mongoose = require('../common/db');

//定义用户模型
var user = new mongoose.Schema({
    username: String,
    password: String,
    userPhone: String,
    email: String,
    userAdmin: Boolean,
    level: Number,
    articleNums: Number,
    speechNums: Number,
    introduce: String,
    technology: String,
    registrationTime : {
        type: Date,
        default: Date.now
    }
});

//找出所有用户
user.statics.findAll = function(callBack){
    this.find({},callBack);
};

//校验用户登录
user.statics.checkLogin = function(username, password, callBack) {
    this.find({username: username, password: password}, callBack);
}

//根据用户ID和密码校验登录状态和密码校验登录状态
user.statics.findOne = function(id, password, callBack) {
    this.find({_id: id, password: password}, callBack);
}
//根据用户名进行查找
user.statics.findByUsername = function(name,callBack){
    this.find({username:name},callBack);
}
//根据用户ID进行查找
user.statics.findById = function(id, callBack) {
    this.find({_id: id}, callBack);
}

var userModel= mongoose.model('user',user); //创建用户模型
module.exports = userModel; //将用户模型导出