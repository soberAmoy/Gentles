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
        img: "",
        registrationTime: Date.now()
    });
    registerModel.save(function() {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.json({status: 0, message: "注册成功"});
    })
})

//获取个人信息
router.post('/getUserInfo', function(req, res, next) {
    if(!req.body.id){
        res.json({status: 1, message: '用户id不能为空！'});
    }
    user.findById(req.body.id, function(err, findUser) {
        res.json({status: 0, data: findUser});
    })
})

//后台接收用户上传的头像图片并进行存储
router.post('/uploadImage', function(req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = 'public' + '/uploadPics/'; //设置上传目录
    form.keepExtensions = true;     //保留文件后缀
    form.maxFieldsSize = 5 * 1024 * 1024;   //设置文件大小上限
    form.parse(req, function(err, fields, files) {
        if(err) {
            res.locals.error = err;
            res.render('index', {title: '图片上传发生错误！'});
            return;
        }
       var extName = '';   //图片后缀名
        switch(files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if(extName.length == 0) {
            res.locals.error = '上传格式只限png和jpg';
            res.render('index', {title: '上传的图片格式错误！'});
            return;
        }
        var reg = /\w+(?=.\w+)/g;
        var name = files.file.name;
        var pic_name = name.match(reg)[0];
        var avatarName = pic_name + '.' + extName; //图片名
        var newPath = form.uploadDir + avatarName;  //图片的写入地址
        var showUrl = 'http://47.103.217.35:3000' + '/uploadPics/' + avatarName;
        fs.renameSync(files.file.path, newPath);   //对文件进行重命名
        res.json({"newPath" : showUrl});
    });
    //图片被接收的形态是一串2进制字符串，用fs模块读取后再写入到新的目录中
})

//获取md5值
function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + init_token
    return md5.update(token_before).digest('hex')
}

module.exports = router;
