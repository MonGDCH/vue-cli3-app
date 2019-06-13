<template>
	<div class="music-btn" @click="togglePlay" :class="isRotate ? 'rotate' : ''">
		<audio :autoplay="isPlay" id="music-audio-mon" loop="loop">
			<source :src="music" type="audio/ogg" />
  			<source :src="music" type="audio/mpeg" />
		</audio>
	</div>
</template>
<script>
export default {
	props: {
		isPlay: {
			type: Boolean,
			default: true
		},
		music: {
			type: String,
			default: 'http://music.163.com/song/media/outer/url?id=449818741.mp3'
		}
	},
	data(){
		return {
			isRotate: true,
		}
	},
	mounted(){
		this.isRotate = this.isPlay
	},
	methods: {
		togglePlay(){
			const audio = document.getElementById('music-audio-mon');
			if(audio.paused){
				audio.play();
				this.isRotate = true
			}
			else{
				audio.pause();
				this.isRotate = false
			}
		}
	}
}
</script>
<style scoped>
.music-btn{
	text-align: center;
	display: inline-block;
	overflow: hidden;
	width: 40px;
	height: 40px;
	background-image: url(./music.png);
	background-size: contain;
}
.rotate {
    -webkit-animation: rotating 1.8s linear infinite;
    -moz-animation: rotating 1.8s linear infinite;
    -o-animation: rotating 1.8s linear infinite;
    animation: rotating 1.8s linear infinite
}

@-webkit-keyframes rotating {
    from { -webkit-transform: rotate(0) }
    to { -webkit-transform: rotate(360deg) }
}

@keyframes rotating {
    from { transform: rotate(0) }
    to { transform: rotate(360deg) }
}
@-moz-keyframes rotating {
    from { -moz-transform: rotate(0) }
    to { -moz-transform: rotate(360deg) }
}
</style>