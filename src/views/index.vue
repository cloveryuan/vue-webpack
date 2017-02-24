<style lang="scss">
@import "../assets/_icons";
.indexhome{
    border: 1px solid;
    span{
        color: red;
        font-size: 14px;
        font-weight: normal;
        display: inline-block;
        @include sprite($rush_rob);
    }
}
body{
    // background-color: pink;
    transform: translateY(30px);
}
</style>
<template>
    <slides 
        :slideobj.sync="setSlides" 
        :textflag ="textflag"
    ></slides>
    <navbar msg="isindex"></navbar>
    <h1 class="indexhome">这是index路由<span>test color</span></h1>
    <div class="logo">
        <!-- <img src="../assets/img/logo.png" alt=""> -->
    </div>
    <div class="icons"></div>
    <div>
    <Radio-group :model.sync="phone">
        <Radio value="apple">
            <Icon type="social-apple"></Icon>
            <span>Apple</span>
        </Radio>
        <Radio value="android">
            <Icon type="social-android"></Icon>
            <span>Android</span>
        </Radio>
    </Radio-group>
    <Radio-group :model.sync="animal">
        <Radio value="金斑蝶"></Radio>
        <Radio value="爪哇犀牛"></Radio>
        <Radio value="印度黑羚"></Radio>
    </Radio-group>
    </div>
</template>

<script>
    import Navbar from 'COMPONENTS/Navbar';
    import Slides from 'COMPONENTS/slides';
    import SlidesService from  '../services/slidesService'; 
    //script
    export default {
        components: { Navbar,Slides},
        data () {
            return {
                phone: 'apple',
                animal: '印度黑羚',
                textflag: false,
                slides:{}
            }
        },
        computed:{
            setSlides (){
                // 返回轮播内容
                this.setSlideData();
                return this.slides;
            },
        },
        methods:{
           setSlideData(){
            var that = this;
            SlidesService.loadData().then(data => {
                that.slides = data.slideData;
            })
           }
        }
    }

    import authService from '../services/authService'  
    var errFun = function(){
        console.warn('login error fun');
    }
    // 先检测登录状态再挂载根组件以便控权
    authService.checkLogin().then(userData => {
        console.log('checkLogin',userData)
      // if (userData) {
      //   const data = App.data // data 属性是一个函数
      //   App.data = () => ({ ...data(), userData })
      // }
      
    })
    //
    authService.login().then(data => {
        console.log('login',data)
      // if (userData) {
      //   const data = App.data // data 属性是一个函数
      //   App.data = () => ({ ...data(), userData })
      // }
      
    })

    // var request = require('superagent');
    // request
    //     .get('/data/a.json')
    //     .send({ name: 'Manny', species: 'cat' })
    //     .set('X-API-Key', 'foobar')
    //     .set('Accept', 'application/json')
    //     .end(function(err, res){
    //         console.log('ssss',res.ok)
    //         // Calling the end function will send the request
    //     })
    
    // fetch('/data/a.json')
    //   .then(function(response) {
    //     return response.json()
    //   }).then(function(json) {
    //     console.log(json)
    //     // document.body.innerHTML = body
    //   }) 
</script>