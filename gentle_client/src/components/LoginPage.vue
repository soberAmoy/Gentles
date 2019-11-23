<template>
<div class="container">
    <div class="topArea">
        <div class="titleBox">
            <div class="title">Gentle</div>
            <div class="introduction">
                Share your knowledge with gentles.
            </div>
        </div>
    </div>
    <div class="downArea">
        <div class="infoBox">
            <div class="inpBox">
                <Icon type="ios-contact" style="font-size: 25px;"/>
                <span class="text1">Username：</span>
                <Input v-model="username" autofocus style="width: 200px;"></Input><br>
                <Icon type="md-unlock" style="font-size: 25px; margin-top: 8px;"/>
                <span class="text2">Password ：</span>
                <Input v-model="pwd" type="password" style="width: 200px; margin-top: 8px;"
                 @keyup.enter.native="checkInfo"></Input>
            </div>
            <div class="btnBox">
                <Button type="primary" size="large" v-on:click="checkInfo" >Click Login</Button>
                <Button type="text" style="margin-left: 15px;" @click="skipRegisterPage">Join Gentle</Button>
            </div>
        </div>
    </div>
    <span class="tip" v-if="loginFail">温馨提示：若您忘记了账号或密码，请联系管理员进行密码找回~</span>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            username: "",
            pwd: "",
            loginFail: false,
        }
    },
    created: function() {
        localStorage.clear();
    },
    methods: {
        checkInfo: function() {
            var self = this;
            this.$axios.post('http://' + window.config.Host +'/users/login', {
                username: self.username,
                password: self.pwd
            }).then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.error(res.data.message);
                    self.pwd = "";
                    self.loginFail = true;
                } else {
                    self.$Message.success(res.data.message);
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('username', res.data.data.user[0].username);
                    localStorage.setItem('_id', res.data.data.user[0]._id);
                    self.$router.push('/home');
                }
            })
        },
        skipRegisterPage: function() {
            this.$router.push('/register');
        }
    }
}
</script>
<style lang="css" scoped>
.container{
    position: absolute;
    width: 100%;
    height:100%;
}
.container .topArea{
    width: 100%;
    height: 60%;
    background-color: #2d8cf0;
}
.container .topArea .titleBox{
    position: relative;
    top: 20%;
    color: #e8eaec;
    font-family: Hiragino Sans GB;
}
.container .topArea .titleBox .title{
    position: relative;
    width: 400px;
    left: 28%;
    font-size: 170px;
    animation: titleChange 1s 3 alternate;
}
@keyframes titleChange{
    0% {
        color: #2db7f5;
    }
    100% {
        color: #e8eaec;
    }
}
.container .topArea .titleBox .introduction{
    position: relative;
    width: 400px;
    font-size: 20px;
    left: 60%;
    bottom: 10px;
}
.container .downArea{
    position: relative;
    width: 100%;
    height: 40%;
}
.container .downArea .infoBox{
    position: absolute;
    width: 400px;
    height: 90%;
    left: 35%;
    margin-top: 14px;
    border-radius: 15px;
    border: 2px solid #ddd;
}
.container .downArea .infoBox:hover{
    box-shadow: 3px 3px 3px 3px #eee;
}
.container .downArea .infoBox .inpBox{
    position: relative;
    left: 10%;
    top: 20%;
    font-size: 15px;
}
.container .downArea .infoBox .inpBox .text1{
    position: relative;
    top: 2.5px;
}
.container .downArea .infoBox .inpBox .text2{
    position: relative;
    top: 6px;
}
.container .downArea .infoBox .btnBox{
    position: relative;
    left: 25%;
    top: 30%;
}
.tip{
    position: absolute;
    left: 37%;
    color: #7CCD7C;
    animation: textMove 4s 1;
    animation-fill-mode: forwards;
}
@keyframes textMove{
    0%{
        bottom: 0px;
        opacity: 0;
    }
    100%{
        bottom: 3.3%;
        opacity: 1;
    }
}
</style>
