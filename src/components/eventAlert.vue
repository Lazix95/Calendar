<template>
<div @click="closeModal($event)" class="myModal">
    <div class="content">
        <h3>You have an event today!!!</h3>
        <router-link :to="{name:'eventinfo', params:{date:todaysDate}}" >Click here for more details.</router-link>
        <br>
        <button @click="dismiss() " class="btn btn-success dismiss">Dismiss</button>
    </div>
</div>
</template>

<script>
export default {
    methods:{
        closeModal:function(e){
            if (e.target.className=="myModal"){
                 this.$store.commit("setEventToday",false)
            } 
        },
        dismiss: function () {
            this.$store.commit('setEventToday', false);
           sessionStorage.setItem("alertDesmissed", true)

        }
    },
    computed:{
        todaysDate: function(){
            var d = new Date()
            var day = d.getDate()
            var month = d.getMonth()
            var year = d.getFullYear()
            if (day < 10){
                day = "0" + day
            }
            if (month < 10 ){
                month = "0" + month
            }
            return year+"-"+month+"-"+day
        }
    }
};
</script>

<style lang="less" scoped>
.myModal {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    >.content{
        width: 500px;
        height: 250px;
        background-color: #74fee4;
        margin: 120px auto 0 auto;
        z-index: 150;
        padding: 20px;
        border-radius: 10px;
        >.dismiss{
            margin-top: 50px;
        }
    }
}
</style>
