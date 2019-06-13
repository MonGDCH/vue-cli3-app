<template>
    <jump :code="code" :msg="msg" />
</template>

<script>
import jump from 'components/jump'
export default {
    components: {
        jump
    },
    data: ()=>{
        return {
            code: 404,
            msg: '您的页面好像飞走了~',
        }
    }
};
</script>