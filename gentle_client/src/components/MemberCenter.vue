<template>
<div class="container">
    <top-banner></top-banner>
    <div class="content">
        <div class="left">
            <Upload
                v-if="!haveImg"
                :action="uploadSrc"
                :format="['jpg','jpeg','png']"
                :max-size="5120"
                class="uploadBtn">
                <Button icon="camera">上传文件</Button>
            </Upload>
            <img v-else :src="imgSrc">
        </div>
        <div class="right">
            <div class="userInfoBox">
                <p>
                    <span>用户名</span>
                    <Tag closable color="blue">{{userInfo.username}}</Tag>
                </p>
                <p>
                    <span>用户等级</span>
                    <Tag closable color="blue">{{userInfo.level}}</Tag>
                </p>
                <p>
                    <span>上传文章数</span>
                    <Tag closable color="blue">{{userInfo.articleNums}}</Tag>
                </p>
                <p>
                    <span>完成SPEECH次数</span>
                    <Tag closable color="blue">{{userInfo.speechNums}}</Tag>
                </p>
                <p>
                    <span>技术栈</span>
                    <Tag closable color="green">{{userInfo.technology}}</Tag>
                </p>
                <p>
                    <span>个性签名</span>
                    <Tag closable color="blue">{{userInfo.introduce}}</Tag>
                </p>
                <p>
                    <span>注册时间</span>
                    <Tag closable color="blue">{{userInfo.registrationTime.substring(0,10)}}</Tag>
                </p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import TopBanner from '../components/TopBanner.vue'

export default {
    data: function() {
        return{
            haveImg: false,
            imgSrc: "",
            uploadSrc: "",
            userInfo: [],   //用户信息
        }
    },
    components: {
        TopBanner,
    },
    created: function(){
        var self = this;
        //绑定图片上传地址
        this.uploadSrc = 'http://' + window.config.Host + '/users/uploadUserImg';
        this.$axios.post('http://' + window.config.Host + "/users/getUserInfo", {
            id: localStorage.getItem('_id'),
        }).then(function(res) {
            self.userInfo = res.data.data[0];
            console.log(self.userInfo);
            if(self.usefInfo.img != "") {
                self.imgSrc = self.usefInfo.img;
                self.haveImg = true;
            }
        })
    }
}
</script>
<style scoped>
    .container{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .container .content{
        display: flex;
        width: 100%;
        height: 100%;
        margin-top: 3%;
        justify-content: center;
        align-items: center;
        background-color: #EAEDED;
    }
    .container .left{
        position: absolute;
        width: 180px;
        height: 220px;
        left: 25%;
        top: 35%;
        border: 5px solid #85C1E9;
        z-index: 10;
        background-color: #fff;
    }
    .container .left .uploadBtn{
        position: relative;
        top: 43%;
        left: 23%;
    }
    .container .left img{
        display: inline-block;
        width: 180px;
        height: 220px;
    }
    .container .right{
        width: 900px;
        height: 400px;
        top: -30%;
        font-size: 15px;
        color: #657180;
        border: 5px solid #85C1E9;
        border-radius: 20px;
        z-index: 5;
        background-color: #fff;
    }
    .container .right .userInfoBox{
        position: relative;
        width: 50%;
        padding: 30px;
        left: 45%;
    }
    .container .right .userInfoBox p{
        margin-top: 15px;
    }
    .container .right .userInfoBox p span{
        margin-right: 10px;
    }
</style>
