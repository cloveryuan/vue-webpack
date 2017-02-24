<style>
    .navbar{
        color: blue;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
    }
    .navbar-list{
        text-align: center;
        padding-bottom: 15px;
    }
    .navbar-list li{
        font-size: 16px;
        display: inline-block;
        margin: 0 10px;
        font-weight: bold;
    }
    .navbar-list li.active a{
        color: red;
    }
</style>
<template>
    <div class="navbar">这是导航组件{{msgShow}}</div>
    <ul class="navbar-list">
        <li v-bind:class="{ 'active': isindex}"><a href="{{rootPath}}">首页</a></li>
        <li v-bind:class="{ 'active': ist1 }"><a href="{{rootPath}}t1/t1.html">t1</a></li>
    </ul>
</template>
<script>
module.exports = {
    data: function(){
        var data = {
            isindex: false,
            ist1: false
        };
        return data;
    },
    props: {
        msg: String
    },
    computed: {
        msgShow: function(){
            var msg = this.msg;
            this[msg] = true;
            return 'show';
        },
        rootPath: function(){
            var url = window.location.href;
            url = url.replace('http://','');
            var path = url.split('\/');
            if(path.length>2){
                path = url.match('dist') ? path[1]+'/'+path[2] : path[1];
                path = '/'+path+'/';
            }else{
                path = '/';
            }
            return path;
        }
    }
};
</script>