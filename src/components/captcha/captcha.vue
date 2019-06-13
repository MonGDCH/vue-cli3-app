<template>
	<div class="row">
        <div class="col-sm-8 col-8">
            <div class="form-group input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-server" aria-hidden="true"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="验证码" v-model="code" maxlength="4">
            </div>
        </div>
        <div class="col-sm-4 col-4" style="padding-left: 0;">
            <img @click="refreshCaptcha" class="img-fluid" align="captcha" :src="captcha" style="height: 32px;">
        </div>
    </div>
</template>
<script>
export default {
	name: 'captcha',
	props: ['value'],
	data(){
		return {
			code: '',
			captcha: ''
		}
	},
	watch: {
		value(val){
			this.code = val
		},
		code(val){
			this.$emit('input', val);
		}
	},
	mounted(){
        this.refreshCaptcha();
    },
	methods: {
		refreshCaptcha(){
			this.captcha = this.util.getCaptcha()
		},
	}
}
</script>