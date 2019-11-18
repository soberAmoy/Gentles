var express = require('express');
var user = require('../models/user.js');
var crypto = require('crypto'); //用于加密
var iconv = require('iconv-lite');
var router = express.Router();

const init_token = 'TKL02o'; //后台随机字符串，用于加密

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

//用户登录接口
router.post('/login', function(req, res, next) {
    if(!req.body.username) {
        res.json({status: 1, message: '用户名不能为空！'});
    }
    if(!req.body.password) {
        res.json({status: 1, message: '密码不能为空！'});
    }
    user.checkLogin(req.body.username, req.body.password, function(err, userSave) {
        if (userSave.length != 0) {
            var token_after = getMD5Password(userSave[0]._id)
            res.json({status: 0, data: {token: token_after,user:userSave}, message: "用户登录成功"})
        } else {
            res.json({status: 1, message: "用户名或者密码错误"})
        }
    })
})

//用户注册接口
router.post('/register', function(req, res, next) {
    if(!req.body.username) {
        res.json({status: 1, message: '用户名不能为空！'});
    }
    if(!req.body.password) {
        res.json({status: 1, message: '密码不能为空！'});
    }
    if(!req.body.telephone) {
        res.json({status: 1, message: '手机号码不能为空！'});
    }
    if(!req.body.email) {
        res.json({status: 1, message: '电子邮箱不能为空！'});
    }
    var registerModel = new user({
        username: req.body.username,
        password: req.body.password,
        userPhone: req.body.telephone,
        email: req.body.email,
        userAdmin: false,
        level: 0,
        articleNums: 0,
        speechNums: 0,
        introduce: "",
        technology: "",
        registrationTime: Date.now()
    });
    registerModel.save(function() {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.json({status: 0, message: "注册成功"});
    })
})

//获取md5值
function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + init_token
    return md5.update(token_before).digest('hex')
}

module.exports = router;
