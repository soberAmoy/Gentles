<template>
<div class="container">
    <top-banner class="navigation"></top-banner>
    <div class="contentBox">
        <Carousel class="slider">
            <CarouselItem>
                <div class="demo-carousel page1">
                    <h1>用户账号状态表</h1>
                    <div class="userTable">
                        <Table border :columns="titles" :data="showList" v-if="isLoad"></Table>
                        <Page :total="userNums" :page-size="page_size"  :current="1" @on-change="changePage" class="pageBtn"/>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel page2">
                    <div class="btnBox">
                        <Button type="warning" @click="showModal = true;">初始化信息</Button>
                        <Modal
                            v-model="showModal"
                            title="输入用户名称，点击确认进行初始化操作！"
                            @on-ok="initInfo"
                            @on-cancel="cancel">
                            <Input v-model="personName" placehoder="请输入初始化对象名称" width="150px;"></Input>
                        </Modal>
                        <Button type="primary" @click="generateOrder" style="margin-top: 25px;">生成新一轮演讲顺序</Button>
                    </div>
                    <div class="conBox">
                        <Table stripe :columns="orderListHeader" :data="orderInfo"></Table>
                        <Modal
                            v-model="showModal2"
                            title="填写信息，完成更新操作"
                            @on-ok="setFinish(opUser)"
                            ok-text="提交"
                            @on-cancel="cancel">
                            <p style="font-size: 18px; font-weight: bolder;"><span>操作对象：{{opUser.name}}</span></p><br>
                            <p style="font-size: 15px;">
                                <span>演讲主题：</span>
                                <Input
                                    v-model="topic"
                                    placehoder="请输入演讲主题"
                                    style="width: 150px;">
                                </Input>
                                <span>完成日期：</span>
                                <DatePicker
                                    type="date"
                                    v-model="finishDate"
                                    placeholder="请填入演讲日期"
                                    style="width: 150px">
                                </DatePicker>
                            </p>
                        </Modal>
                    </div>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div  class="demo-carousel page3">
                    <span class="title">网站更新内容发布</span>
                    <div class="formBox">
                        <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px; margin-top: 20px;">
                            <FormItem
                                    v-for="(item, index) in formDynamic.items"
                                    v-if="item.status"
                                    :key="index"
                                    :label="'更新内容 ' + item.index"
                                    :prop="'items.' + index + '.value'"
                                    :rules="{required: true, message: '请删除多余的输入框', trigger: 'blur'}">
                                <Row>
                                    <Col span="18">
                                        <Input type="text" v-model="item.value"></Input>
                                    </Col>
                                    <Col span="4" offset="1">
                                        <Button @click="handleRemove(index)">删除</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span="12">
                                        <Button type="dashed" long @click="handleAdd" icon="md-add">新增条目</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Row style="margin-left: -25%; margin-bottom: 15px;">
                                    <span style="margin-right: 5%;">版本号</span>
                                    <Input style="width: 170px;" v-model="vision"></Input>
                                </Row>
                                <Button type="primary" @click="handleSubmit('formDynamic')">推送</Button>
                                <Button @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</div>
</template>
<script>
import TopBanner from './TopBanner.vue'

export default{
    data: function() {
        return {
            vision: "", //版本号
            personName: "",
            topic: "",
            finishDate: "",
            speechId: "",
            opUser: [], //操作对象
            orderInfo: [],
            userInfo: [],
            showList: [],
            colorList: ["magenta", "cyan", "geekblue", "purple", "volcano"],
            isLoad: false,
            showModal: false,
            showModal2: false,
            index: 1,   //输入框的索引值
            formDynamic: {  //数量动态变化的输入框
                items: [
                    {
                        value: '',
                        index: 1,
                        status: 1
                    }
                ]
            },
            titles: [{
                title: '用户名',
                key: 'username',
                align: "center"
            }, {
                title: '管理权限',
                key: 'isAdmin',
                align: "center",
                render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: params.row.isAdmin ? 'success' : 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            var self = this;
                                            params.row.isAdmin = !params.row.isAdmin;
                                            this.$axios.post('http://' + window.config.Host + '/admin/updatePower', {
                                                username: params.row.username
                                            }).then(function(res){
                                                self.$Message.success(res.data.message);
                                            })
                                        }
                                    }
                                }, params.row.isAdmin ? '管理员' : '普通会员')
                            ]);
                        }
            }, {
                title: '账号等级',
                key: 'level',
                align: "center"
            }],
            orderListHeader: [{
                title: '用户名',
                align: "center",
                key: "name",
            }, {
                title: '完成情况',
                align: 'center',
                key: "finished",
            }, {
                title: '完成日期',
                align: "center",
                key: "speechTime",
            }, {
                title: '操作',
                align: "center",
                render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: "primary",
                                        size: 'small',
                                        disabled: params.row.finished == "已结束" ? true : false
                                    },
                                    on: {
                                        click: () => {
                                            this.showModal2 = true;
                                            this.opUser = params.row;
                                        }
                                    }
                                }, "更改状态")
                            ]);
                        }
            }],
            userNums: 0,
            page_size: 3,
        }
    },
    components: {
        TopBanner,
    },
    created: function() {
        var self = this;
        this.$axios.get('http://' + window.config.Host + '/admin/getUserList')
            .then(function(res) {
                self.userInfo = res.data.data;
                var len = self.userInfo.length;
                self.userNums = len;
                if(len <= self.page_size) {
                    self.showList = self.userInfo;
                } else {
                    self.showList = self.userInfo.slice(0, self.page_size);
                }
                for(var i = 0; i < len; i++){
                    self.showList[i] = {};
                    self.showList[i].username = self.userInfo[i].username;
                    self.showList[i].isAdmin = self.userInfo[i].userAdmin;
                    self.showList[i].level = self.userInfo[i].level + "级";
                    if(i == len - 1) {
                        self.isLoad = true;
                    }
                }
            })
            this.getOrder();
    },
    methods: {
        getOrder: function() {
            var self = this;
            this.$axios.get('http://' + window.config.Host + '/admin/getOrder')
            .then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.err(res.data.message);
                } else {
                    var data = res.data.data.order;
                    var len = data.length;
                    for(var i = 0; i < len; i++) {
                        data[i].finished = data[i].finished == true ? '已结束' : '未开始';
                        data[i].speechTime = data[i].speechTime != "" ? data[i].speechTime.substring(0, 10) : '暂无';
                    }
                    self.orderInfo = data;
                }
            })
        },
        changePage: function(index) {
            var _start = (index - 1) * this.pageSize;
            var _end = index * this.pageSize;
            this.showList = this.users.slice(_start, _end);
        },
        generateOrder: function() {
            var self = this;
            this.$axios.get('http://' + window.config.Host + '/admin/generateOrder')
                .then(function(res) {
                    if(res.data.status == 1) {
                        self.$Message.error(res.data.message);
                    } else {
                        self.$Message.success(res.data.message);
                        self.$axios.get('http://' + window.config.Host + '/admin/getOrder')
                            .then(function(res) {
                                if(res.data.status == 1) {
                                    self.$Message.err(res.data.message);
                                } else {
                                    self.orderInfo = res.data.data[0];
                                }
                            })
                    }
                })
        },
        setFinish: function(item) {
            var self = this;
            this.showModal2 = false;
            alert(item._id);
            this.$axios.post('http://' + window.config.Host + '/admin/modifySpeechState', {
                user_id: item._id,
                topic: self.topic,
                finishTime: self.finishDate,
            }).then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.error(res.data.message);
                } else {
                    self.$Message.success(res.data.message);
                }
            })
        },
        cancel: function() {
            this.showModal = false;
            this.showModal2 = false;
            this.personName = "";
            this.finishDate = "";
        },
        initInfo: function() {
            var self = this;
            this.$axios.post('http://' + window.config.Host + '/admin/initPersonSpeechInfo', {
                username: self.personName
            }).then(function(res) {
                self.personName = "";
                if(res.data.status == 1) {
                    self.$Message.error(res.data.message);
                } else {
                    self.$Message.success(res.data.message);
                }
            })
        },
        handleSubmit () {
            var self = this;
            this.formDynamic.items.push(this.vision);
            this.$axios.post('http://' + window.config.Host + '/admin/postUpdateContent', {
                updateData: self.formDynamic.items,
            }).then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.error(res.data.message);
                }
                self.$Message.success(res.data.message);
                self.formDynamic.items = {
                        value: '',
                        index: 1,
                        status: 1
                    };
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleAdd () {
            this.index++;
            this.formDynamic.items.push({
                value: '',
                index: this.index,
                status: 1
            });
        },
        handleRemove (index) {
            this.formDynamic.items[index].status = 0;
            this.index--;
        }
    }
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 100%;
}
.container .navigation{
    position: relative;
    height: 16%;
    left: 0px;
    top: 0px;
}
.container .contentBox{
    position: relative;
    left: 10%;
    margin-top: 15px;
    width: 1000px;
    height: 450px;
}
.container .contentBox .slider{
    width: 100%;
    height: 100%;
}
.page1,
.page2,
.page3{
    width: 1000px;
    height: 450px;
    margin-top: 10px;
    background-color: #C6E2FF;
}
.page1 h1{
    position: relative;
    top: 10px;
    text-align: center;
}
.userTable{
    position: relative;
    width: 80%;
    left: 50%;
    transform: translate(-50%, 0);
    height: 370px;
    margin-top: 15px;
}
.pageBtn{
    position: absolute;
    left: 40%;
    bottom: 15px;
}
.page2{
    position: relative;
}
.btnBox{
    position: absolute;
    width: 150px;
    top: 40%;
    left: 15%;
}
.conBox{
    position: absolute;
    width: 550px;
    right: 5%;
    top: 10%;
    background-color: #fff;
    border-radius: 40px;
    overflow: hidden;
}
.page3{
    padding: 20px;
}
.page3 .title{
    display: flex;
    font-size: 40px;
    justify-content: center;
    font-weight: bold;
}
.page3 .formBox{
    position: relative;
    width: 600px;
    left: 35%;
}
</style>
