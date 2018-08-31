<template>
<div class="dayStyle">
    <p>
        <slot></slot>
    </p>
    <img src="./../assets/calendar-icon-upcoming-events-31.png" alt="" v-if="(isSet && !lasting.status) || lasting.first">
    <hr class="las" v-if="lasting.status && !lasting.last">
    <img src="./../assets/theEnd.png" v-if="lasting.status && lasting.last" alt="">
</div>
</template>

<script>
export default {
    props: {
        date: String,
        today: Boolean,
        lasting: Object
    },
    computed: {
        isSet: function () {
            if (localStorage.getItem(this.date)) {
                if (this.today && !sessionStorage.getItem("alertDesmissed")) {
                    this.$store.commit("setEventToday", true)
                }
                return true
            } else {
                return false
            }
        }
    }
};
</script>

<style lang="less">
.dayStyle {
    width: 20px;
    height: 80px;
    background-color: #00800038;
    cursor: pointer;
    overflow: hidden;
    >p {
        margin: auto
    }
    >img {
        width: 40px;
    }
}

.today {
    >p {
        background-color: red;
        color: white;
        border-radius: 10000px;
        height: 25px;
        width: 25px;
        margin: auto
    }
}

hr {
    border-top: 1px solid red !important;
}
</style>
