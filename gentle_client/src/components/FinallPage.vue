<template>
<div class="container">
    <h1 class="topic">独秃秃不如众秃秃，学到头秃也别忘了常来分享哟~</h1>
    <span class="left">Bye</span>
    <img src="../assets/timg2.jpg" class="bgBox">
    <div class="imgBox">
        <img src="../assets/timg.gif" alt="">
    </div>
    <span class="right">Bye</span>
    <Button type="primary" size="small" @click="loginAgain" class="btn">重新登陆</Button>
</div>
</template>
<script>
export default{
    methods: {
        loginAgain: function() {
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
.container{
    width: 100%;
    height: 100%;
}
.topic{
    position: absolute;
    color: #6CA6CD;
    font-size: 40px;
    width: 100%;
    left: 15%;
    top: 10%;
    opacity: 0;
    animation: showTopic 2s 1;
    animation-fill-mode: forwards;
    animation-delay: 500ms;
    text-shadow: 2px 2px 2px #000;
}
@keyframes showTopic{
    0%{
        top: 30%;
        opacity: 0;
    }
    100%{
        top: 10%;
        opacity: 1;
    }
}
.bgBox{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: 100%;
}
.imgBox{
    position: absolute;
    top: 55%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
       -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
         -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
}
.left,
.right{
    position: absolute;
    font-size: 120px;
    font-weight: bolder;
    color: #6495ED;
    opacity: 0;
    animation: showText 2.5s 1;
    animation-fill-mode: forwards;
    text-shadow: 5px 5px 5px #000;
}
@keyframes showText{
    0%{
        top: 20%;
        opacity: 0;
    }
    100%{
        top: 30%;
        opacity: 1;
    }
}
.left{
    left: 10%;
}
.right{
    right: 10%;
}
.btn{
    position: absolute;
    left: 48%;
    bottom: 10%;
}
</style>
