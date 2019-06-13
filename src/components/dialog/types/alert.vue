<template>
    <div class="dialog-cont">
        <div class="dialog-cont-body">
            <div class="dialog-cont-title">{{title}}</div>
            <p class="dialog-cont-msg" v-if="msg">{{msg}}</p>
        </div>
        <div class="dialog-cont-footer">
            <a href="javascript:void(0)" @click="isOk">确认</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dialog-alert',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        msg: {
            type: String,
            default: ''
        },
    },
    methods: {
        isOk(){
            this.$emit('ok')
        }
    }
}
</script>
<style lang="less" scoped>
.dialog-cont{
    position: relative;
    text-align: left;
    max-width: 360px;
    margin:0 auto;
    background-color: #fff;
    border:solid 1px red;
    border-radius: 4px;
    overflow: hidden;

    .dialog-cont-body{
        padding: 12px;
        text-align: center;

        .dialog-cont-title{
            font-size: 16px;
            line-height: 18px;
            color: #000;
        }

        .dialog-cont-msg{
            margin-top: 8px;
        }
    }

    .dialog-cont-footer{
        text-align: center;
        border-top: 2px solid #ccc;
        padding: 6px;

        a:hover{
            text-decoration:none;
        };

        a{
            font-size: 16px;
            letter-spacing: 4PX
        }
    }

}
</style>