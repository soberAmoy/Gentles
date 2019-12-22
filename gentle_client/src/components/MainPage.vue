<template>
<div class="container">
    <top-banner></top-banner>
    <div class="content">
        <div class="infoShowBox">
            <div class="drawBoard">
                <h1>SPEECH BOARD</h1>
            </div>
            <div class="info">
                <span class="speechTime">日期：<span style="font-weight: bolder;">{{speechTime}}</span></span><br><br>
                <span class="topic">分享主题：<span style="font-weight: bolder;">{{topic}}</span></span><br><br>
                <span class="speaker">主讲人：<span style="font-weight: bolder;">{{speaker}}</span></span>
            </div>
            <Modal
                v-model="showModal"
                title="本轮演讲顺序展示"
                ok-text="我知道了"
                cancel-text="">
                <Table stripe :columns="orderListHeader" :data="orderInfo"></Table>
            </Modal>
        </div>
        <div class="updateBox">
            <h1>平台最新动态</h1>
            <h2>Gentle{{updateInfo._v}}更新内容:</h2>
            <ul class="showBox_right">
                <li v-for="item in updateInfo.content">
                    {{item.index}}、 {{item.value}}
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import TopBanner from '../components/TopBanner.vue'

export default {
    data: function() {
        return {
            speechTime: "",
            topic: "",
            speaker: "",
            vision: "1.0",
            updateContent: "1233333",
            showModal: false,
            updateInfo: [],
            orderInfo: [],
            orderListHeader: [{
                title: '用户名',
                align: "center",
                key: "name",
            }, {
                title: '演讲主题',
                align: 'center',
                key: "speechTopic",
            },  {
                title: '完成情况',
                align: 'center',
                key: "finished",
            }, {
                title: '完成日期',
                align: "center",
                key: "speechTime",
            }],
        }
    },
    components: {
        TopBanner,
    },
    created: function() {
        var self = this;
        this.$axios.get('http://' + window.config.Host + '/admin/getUpdateContent')
            .then(function(res) {
                self.updateInfo = res.data.data;
            })
        this.showOrderList();
    },
    methods: {
        showOrderList: function() {
            var self = this;
            this.$axios.get('http://' + window.config.Host + '/admin/getOrder')
            .then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.err(res.data.message);
                } else {
                    var data = res.data.data.order;
                    console.log(data);
                    var len = data.length;
                    var flag = true;
                    for(var i = 0; i < len; i++) {
                        data[i].finished = data[i].finished == true ? '已结束' : '未开始';
                        data[i].speechTime = data[i].speechTime != "" ? data[i].speechTime.substring(0, 10) : '暂无';
                        if(data[i].finished == '未开始' && flag) {
                            self.speechTime = data[i].speechTime;
                            self.topic = data[i].speechTopic != "" ? data[i].speechTopic : '未定';
                            self.speaker = data[i].name;
                            flag = false;
                        }
                    }
                    self.orderInfo = data;
                    self.showModal = true;
                }
            })
        }
    },
}
</script>
<style scoped>
.container{
    position: absolute;
    width: 100%;
    height: 100%;
}
.container .content{
    width:100% ;
    height: 100%;
    background: -webkit-linear-gradient(180deg, #fff, #87CEFA);
    background: -o-linear-gradient(180deg, #fff, #87CEFA);
    background: -moz-linear-gradient(180deg, #fff, #87CEFA);
    background: linear-gradient(180deg, #fff, #87CEFA);
}
.container .infoShowBox .drawBoard{
    position: absolute;
    width: 30%;
    height: 300px;
    top: 30%;
    left: 5%;
    border: 1px solid #000;
    border-radius: 10px;
}
.container .infoShowBox .drawBoard:hover{
    box-shadow: 3px 3px 3px 3px #333;
}
.container .infoShowBox .drawBoard h1{
    margin-left: 85px;
    margin-top: 15px;
}
.container .infoShowBox .drawBoard img{
    display: block;
    width: 100%;
    height: 100%;
}
.container .infoShowBox .info{
    position: absolute;
    top: 45%;
    left: 8%;
}
.container .infoShowBox .info span{
    font-size: 25px;
}
.container .updateBox{
    position: absolute;
    top: 30%;
    right: 15%;
    width: 500px;
    height: 300px;
    border: 1px solid black;
    border-radius: 10px;
}
.container .updateBox:hover{
    box-shadow: 3px 3px 3px 3px #333;
}
.container .updateBox h1{
    margin-left: 160px;
    margin-top: 15px;
}
.container .updateBox h2{
    margin-top: 10px;
    margin-left: 20px;
}
.container .updateBox .showBox_right{
    position: relative;
    left: 30%;
    top: 6%;
    width: 300px;
    height: 150px;
    font-size: 16px;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
}

</style>

