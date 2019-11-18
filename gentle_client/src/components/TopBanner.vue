<template>
<div class="container">
    <div class="text">
        <span><Icon type="ios-aperture-outline" class="icon" @click="skipHome"/>Gentle</span>
    </div>
    <div class="navigation">
        <Menu mode="horizontal" :theme="backgroundColor" active-name="1">
            <Submenu name="1" class="menuItem">
                <template slot="title">
                    <span class="iconText">
                        <Icon type="ios-paper" />
                        日常分享
                    </span>
                </template>
                <MenuGroup title="分类">
                    <MenuItem name="1-1">技术文案</MenuItem>
                    <MenuItem name="1-2">美好生活</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="2" class="menuItem">
                <span class="iconText">
                    <Icon type="ios-people" />
                    精英荟萃
                </span>
            </MenuItem>
            <Submenu name="3" class="menuItem">
                <template slot="title">
                    <span class="iconText">
                        <Icon type="ios-cloud-download-outline" />
                        资源下载
                    </span>
                </template>
                <MenuGroup title="分类">
                    <MenuItem name="3-1">演讲PPT</MenuItem>
                    <MenuItem name="3-2">相关文档</MenuItem>
                    <MenuItem name="3-3">演讲视频</MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="4" class="menuItem">
                <template slot="title">
                    <span class="iconText">
                        <Icon type="ios-body-outline" />
                        会员中心
                    </span>
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="4-1">个人模块</MenuItem>
                    <MenuItem name="4-2">idea记录</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="5" class="menuItem" v-if="isAdmin">
                <span class="iconText" @click="skipBackend">
                    <Icon type="ios-stats" />
                    后台管理
                </span>
            </MenuItem>
        </Menu>
    </div>
    <Button type="dashed" @click="clearInfo" class="quitBtn">安全退出</Button>
</div>
</template>
<script>
export default{
    data: function() {
        return {
            backgroundColor: 'primary',
            isAdmin: false
        }
    },
    created: function() {
        this.isAdmin = localStorage.getItem("power");
    },
    methods: {
        skipBackend: function() {
            this.$router.push('/backend');
        },
        skipHome: function() {
            this.$router.push('/home');
        },
        clearInfo: function() {
            localStorage.clear();
            this.$Message.success("您的用户信息已清除!");
            this.$router.push('/finalPage');
        }
    }
}
</script>
<style lang="css" scoped>
.container{
    position: absolute;
    width: 100%;
    height: 16%;
    background-color: #2d8cf0;
}
.container .text{
    width: 100%;
    height: 100%;
}
.container .text span{
    position: relative;
    font-size: 60px;
    font-weight: bolder;
    font-family: Hiragino Sans GB;
    color: #fff;
    top: 5%;
    left: 8%;
}
.container .text .icon{
    position: relative;
    top: -4%;
    margin-right: 10px;
}
.container .text .icon:hover{
    cursor: pointer;
    animation: rotateIcon 5s infinite;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
}
@keyframes rotateIcon{
    0%{
        -webkit-transform:rotate(0deg);
        -moz-transform:rotate(0deg);
    }
    100%{
        -webkit-transform:rotate(1080deg);
        -moz-transform:rotate(1080deg);
    }
}
.container .navigation{
    position: absolute;
    right: 10%;
    top: 22%;
}
.container .navigation .menuItem{
    margin-left: 10px;
}
.container .navigation .menuItem .iconText:hover{
    color: #C1FFC1;
}
.quitBtn{
    position: absolute;
    top: 40%;
    right: 2%;
}
</style>
