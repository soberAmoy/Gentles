<template>
<div class="container">
    <div class="bgPic">
        <img src="../assets/bgPic1.jpg"></img>
    </div>
    <div class="ContentBox">
        <div class="infoBox">
            <span><i>*</i>用户账号：</span><Input style="width: 220px;" v-model="username" /><br><br>
            <span><i>*</i>登录密码：</span><Input style="width: 220px;" v-model="password" type="password"/><br><br>
            <span><i>*</i>手机号码：</span><Input style="width: 220px;" v-model="telephone" /><br><br>
            <span><i>*</i>电子邮箱：</span><Input style="width: 220px;" v-model="email"
            @keyup.enter.native="userRegister"/>
        </div>
        <div class="btnBox">
            <Button type="success" class="submitBtn" size="large" long circle @click="userRegister">点击提交</Button>
        </div>
    </div>
</div>
</template>
<script>

export default{
    data: function() {
        return {
            username: "",
            password: "",
            telephone: "",
            email: ""
        }
    },
    methods: {
        userRegister: function() {
            var self = this;
            this.$axios.post('http://' + window.config.Host +'/users/register',  {
                username: self.username,
                password: self.password,
                telephone: self.telephone,
                email: self.email,
            }).then(function(res) {
                if(res.data.status == 1) {
                    self.$Message.error(res.data.message);
                } else {
                    self.$Message.success(res.data.message);
                    self.$router.push('/');
                }
            })
        }
    }
}
</script>
<style scoped>
.container{
    position: relative;
    width: 100%;
    height: 100%;
}
.container .bgPic{
    width: 100%;
    height: 100%;
}
.container .bgPic img{
    width: 100%;
    height: 100%;
}
.container .ContentBox{
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 350px;
    border: 1px solid #ddd;
    border-radius: 10px;
    animation: colorChange 2.5s 1;
    animation-fill-mode: forwards;
}
@keyframes colorChange{
    0%{
        top: 0px;
        background-color: rgba(1,1,1,0);
    }
    100%{
        top: 40%;
        background-color: rgba(1,1,1,0.6);
    }
}
.container .ContentBox .infoBox{
    position: relative;
    left: 15%;
    top: 10%;
    width: 100%;
    height: 70%;
    font-size: 18px;
    color: #fff;

}
.container .ContentBox .infoBox i{
    position: relative;
    top: 6.5px;
    margin-right: 5px;
    font-size: 25px;
    color: red;
}
.container .ContentBox .btnBox{
    width: 100%;
    height: 30%;
}
.container .ContentBox .btnBox .submitBtn{
    position: relative;
    top: 45%;
}
</style>
