var mongoose = require('mongoose');
var url = 'mongodb://localhost/GentleDB' //设定连接路径
mongoose.connect(url, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});  //连接数据库
mongoose.connection.once('open', function() {
    console.log('MongoDB连接成功...');
})
module.exports = mongoose;  //导出已经连接数据库的中间件