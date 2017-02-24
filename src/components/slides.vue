<style lang="scss" src="../assets/slides.scss">
	 /*@import './../assets/slides.scss';*/
</style>
<style lang="scss">
	// @import './../assets/slides.scss';
</style>

<template>
 <div class="slide_wrap">
	 <Carousel style="width:800px;"
		:current-index.sync="currentIndex"
		:autoplay="autoplay"
		:autoplay-speed="autoplaySpeed"
		:dots="dots"
		:trigger="trigger"
		:arrow="arrow"
		:height = "height"
	>
		<template v-for="n in slideobj">
			<carousel-item>
				<a :href="n.url" class="item">
					<img :src="n.imgUrl" alt="">
				</a>
			</carousel-item>
		</template>
	</Carousel> 
	<ul class="slide_dot_wrap slide_note_wrap" :class="dotsClasses">
		<template v-for="n in slideobj.length" >
			<li 
			 :class="{ [`${prefixCls}_active`]: n === currentIndex }"
			 @click="dotsEvent('click', n)"
			 @mouseover="dotsEvent('hover', n)"
			 :style = "{width:liWidth}">
				<span class="slide_item slide_name" v-if="textflag" >{{slideobj[n].title}}</span>
				<div class="slide_item slide_img" v-else>
					<img :src="slideobj[n].imgUrl" alt="">
				</div>
		  	</li>
		</template>
	</ul>
 </div>
</template>

<script>
	const prefixCls = 'item';
	export default{
		data (){
			return {
				currentIndex: 0 ,
				autoplay: true,
				autoplaySpeed:2000,
				remove:false,
				arrow:'never',
				trigger:"hover",
				dots:'outside',
				log:[],
				timer:null,
				prefixCls:prefixCls
			}
		},
		props:{
			dot:{
				type:String,
				default:'slides'
			},
			textflag:{
				type:Boolean,
				default: false
			},
			height:"auto",
			slideobj: []
		},
		computed:{
			dotsClasses () {
                return [
                    `${prefixCls}-dots`,
                    `${prefixCls}-dots-${this.dot}`
                ];
            },
            liWidth (){
            	let slides = this.slideobj;
				return Math.floor(1 / slides.length * 100) + "%" ;
			}
		},
		methods: {
			dotsEvent(e,n){
				if(e === this.trigger && this.currentIndex !== n){
					this.currentIndex = n;
					this.setAutoplay();
				}
			},
			add(offset){
				let index = this.currentIndex;
				let slides = this.slideobj;
				index += offset;
				while(index < 0 ){
					index += slides.length;
				}
				index = index % slides.length;
				this.currentIndex = index;
			},
			setAutoplay:function(){
				window.clearInterval(this.timer);
                if (this.autoplay) {
                    this.timer = window.setInterval(() => {
                        this.add(1);
                    }, this.autoplaySpeed);
                }
			}
		}
	}
</script>
