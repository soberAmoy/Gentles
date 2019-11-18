<template>
<div class="container">
    <top-banner></top-banner>
    <div class="content">
        <div class="infoShowBox">
            <div class="drawBoard">
                <h1>SPEECH BOARD</h1>
            </div>
            <div class="info">
                <span class="speechTime">Date：{{speechTime}}</span><br><br>
                <span class="topic">Topic：{{topic}}</span><br><br>
                <span class="speaker">Talker：{{speaker}}</span>
            </div>
            <div class="order" @click="showOrderList">点击查看本轮演讲顺序</div>
            <Modal
                v-model="showModal"
                title="本轮演讲顺序展示">
                <Table stripe :columns="orderListHeader" :data="orderInfo"></Table>
            </Modal>
        </div>
        <div class="updateBox">
            <h1>新分享，新体会</h1>
            <h2>Gentle{{vision}}更新内容:</h2>
            <div>{{updateContent}}</div>
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
    methods: {
        showOrderList: function() {
            var self = this;
            this.showModal = true;
            this.$axios.get('http://' + window.config.Host + '/admin/getOrder')
            .then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.err(res.data.message);
                } else {
                    var data = res.data.data.order[0].order;
                    var len = data.length;
                    for(var i = 0; i < len; i++) {
                        data[i].finished = data[i].finished == true ? '已结束' : '未开始';
                        data[i].speechTime = data[i].speechTime != "" ? data[i].speechTime.substring(0, 10) : '暂无';
                    }
                    self.orderInfo = data;
                }
            })
        }
    }
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
.container .infoShowBox .order{
    position: absolute;
    bottom: 13%;
    left: 14.5%;
    font-size: 13px;
}
.container .infoShowBox .order:hover{
    cursor: pointer;
    color: #000;
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
.container .updateBox div{
    position: relative;
    left: 15%;
    top: 6%;
    width: 340px;
    height: 150px;
    border: 1px solid #ccc;
}
</style>

