var express = require('express');
var user = require('../models/user.js');
var order = require('../models/order.js');
var record = require('../models/record.js');
var router = express.Router();

router.get('/admin', function(req, res, next) {
  res.send('respond with a resource');
});

//获取所有用户列表
router.get('/getUserList', function(req, res, next) {
    user.findAll(function(err, userList) {
        res.json({status: 0, data: userList});
    })
})

//更新用户管理权限
router.post('/updatePower', function(req, res, next) {
    if(!req.body.username) {
        res.json({status: 1, message: "未指定更新权限的用户!"});
    }
    user.findByUsername(req.body.username, function(err, findUser){
        user.update({_id: findUser[0]._id}, {userAdmin: !findUser[0].userAdmin}, function(err, result) {
            res.json({status: 0, message: '用户权限已更新！', data: result});
        })
    })
})

//对排序集合进行初始化
router.post('/initPersonSpeechInfo', function(req, res, next) {
    if(!req.body.username) {
        res.json({status: 1, message: "初始化对象不能为空！"});
    }
    var orderModel = new order({
        name: req.body.username,
        speechTime: "",
        speechTopic: "",
        finished: false
    });
    orderModel.save(function(err) {
        if(err) {
            res.json({status: 1, message: err});
        } else {
            res.json({status: 0, message: '初始化成功！'});
        }
    });
})

//进行排序，存储并返回排序结果
router.get('/generateOrder', function(req, res, next) {
    order.findAll(function(err, findResult) {
        var arr = findResult;
        var len = arr.length;
        var temp = null;    //用于交换的中间数
        var seed = null;    //随机数种子
        for(var i = 0; i < len; i++){
            temp = arr[i];
            seed = Math.floor((Math.random(0,1) * 5));
            arr[i] = arr[seed];
            arr[seed] = temp;
            if(i == len - 1) {
                var recordModel = new record({
                    order: arr,
                    createdTime: Date.now()
                });
                recordModel.save(function(err) {
                    if(err) {
                        res.json({status: 1, message: '保存失败！'});
                    } else {
                        res.json({status: 0, message: '执行成功！', data: arr});
                    }
                })
            }
        }
    })
})

//获取最新的排序结果
router.get('/getOrder', function(req, res, next) {
    record.findAll(function(err, findResult) {
        if(err) {
            res.json({status: 1, message: err});
        } else {
            //返回最新的排序结果
            res.json({status: 0, data: findResult[findResult.length - 1]});
        }
    })
})

//更改用户当前的演讲状态（已完成）
router.post('/modifySpeechState', function(req, res, next) {
    if(!req.body.user_id) {
        res.json({status: 1, message: '操作对象不明！'});
    }
    if(!req.body.topic){
        res.json({status: 1, message: '演讲主题不能为空！'});
    }
    if(!req.body.finishTime){
        res.json({status: 1, message: '完成日期不能为空！'});
    }
    //获取最新的排序记录
    record.findAll(function(err, findResult) {
        if(err) {
            res.json({status: 1, message: err});
        } else {
            //最新的排序结果
            var data = findResult[findResult.length - 1];
            var record_id = data._id;   //排序集合id
            for(var i = 0; i < data.order.length; i++) {
                //更新指定用户的演讲情况
                if(data.order[i]._id == req.body.user_id) {
                    data.order[i].speechTime = req.body.finishTime;
                    data.order[i].speechTopic = req.body.topic;
                    data.order[i].finished = true;
                }
            }
            record.update({_id: record_id}, {order: data}, function(err, updateResult) {
                if(err) {
                    res.json({status: 1, message: '更新失败！'});
                }
                res.json({status: 0, message: '更新成功！', data: updateResult});
            })
        }
    })
})

module.exports = router;