<template>
    <div class="dialog-layer" v-show="visable">
        <div class="dialog-cover">
            <div class="dialog-cont-wrap animated zoomIn faster">
                <component :is="type" :title="title" :msg="msg" @ok="ok" @close="close"></component>
            </div>
        </div>
    </div>
</template>
<script>
import Alert from './types/alert';
export default {
    name: 'dialog',
    components: {
        Alert
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'alert'
        },
        title: {
            type: String,
            default: ''
        },
        msg: {
            type: String,
            default: ''
        },
    },
    data(){
        return {
            visable: this.value
        }
    },
    watch: {
        value(val){
            this.visable = Boolean(val)
        },
        visable(val){
            this.$emit('input', val);
        }
    },
    methods: {
        ok(){
            this.$emit('ok')
        },
        close(){
            this.$emit('close')
        }
    }
}
</script>
<style lang="less" scoped>
.dialog-layer{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height: 100%;
    min-height: 100%;
    min-width: 100%;
    margin:0 auto;
    text-align:center;
    z-index: 2004;

    .dialog-cover {
        position: absolute;
        padding: 0px;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        width: 100%;
        height: 100%;
        -moz-opacity:0.7;
        filter: alpha(opacity=40);
        background-color: rgba(0, 0, 0, .7);
        display:block;
        z-index: 1998;

        .dialog-cont-wrap{
            position: absolute;
            display: block;
            width:100%;
            top:50%;
            margin:0 auto;
            margin-top:-160px;
            color:#333;
            text-align: center;
        }

    }

}

@-webkit-keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@media (prefers-reduced-motion) {
  .animated {
    -webkit-animation: unset !important;
    animation: unset !important;
    -webkit-transition: none !important;
    transition: none !important;
  }
}
.animated.faster {
  -webkit-animation-duration: 150ms;
  animation-duration: 150ms;
}

</style>