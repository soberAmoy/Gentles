var mongoose = require('../common/db');

//定义用户模型
var user = new mongoose.Schema({
    username: String,   /*用户名*/
    password: String,   /*密码*/
    userPhone: String,  /*电话*/
    email: String,  /*电子邮箱*/
    userAdmin: Boolean, /*用户权限*/
    level: Number,  /*用户等级*/
    articleNums: Number,    /*上传的文章数量*/
    speechNums: Number, /*演讲次数*/
    introduce: String,  /*个性签名*/
    technology: String, /*擅长的技术*/
    img: String,    /*头像地址*/
    registrationTime : {    /*注册时间*/
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