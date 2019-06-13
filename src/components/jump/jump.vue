<template>
    <div class="jump-body">
        <div class="flex-center position-ref full-height">
            <div class="content">
                <div class="title">
                    {{code}}
                </div>
                <p class="msg">{{msg}}！</p>
                <div class="links" v-show="rediect">
                    <a href="javascript:;" class="b1" @click="goHome" type="primary">
                        返回首页
                    </a>
                    <a href="javascript:;" class="b2" @click="backPage" type="default">
                        返回上一页({{seco}})
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        code: {
            type: Number,
            default: 404,
        },
        msg: {
            type: String,
            default: '您的页面不见了'
        },
        rediect: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            seco: 5,
            timer: null
        }
    },
    mounted(){
        if(this.rediect){
            this.timer = setInterval(() => {
                if (this.seco === 0){
                    this.backPage()
                }else{
                    this.seco--
                }
            }, 1000)
        }
    },
    methods: {
        backPage () {
            this.$router.go(-1)
        },
        goHome () {
            this.$router.push({
                name: 'index'
            });
        }
    },
    beforeDestroy () {
        if(this.rediect){
            clearInterval(this.timer)
        }
    }
};
</script>
<style scoped>
.jump-body {
    color: #636b6f;
    font-weight: 100;
    height: 100vh;
    margin: 0;
}
.full-height {
    height: 100vh;
}
.flex-center {
    align-items: center;
    display: flex;
    justify-content: center;
}
/*.position-ref {
    position: relative;
    top: -128px;
}*/
.top-right {
    position: absolute;
    right: 10px;
    top: 18px;
}
.content {
    text-align: center;
}
.title {
    font-size: 150px;
    padding: 10px;
}
.links{
    font-size: .35rem;
}
.links > a {
    color: #fff;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 4px;
    padding: .18rem;
    width: 3.24rem;
    display: inline-block;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: #357ebd;
    background: #428bca;
    box-shadow: 2px 2px 1px #888888;
}
.links > a.b1{
    margin-right: .3rem;
}
.links > a.b2{
    margin-left: .3rem;
}
.msg{
    font-size: .56rem;
    margin-bottom: .76rem;
}
</style>