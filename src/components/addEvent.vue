<template>
<div class="container addEvent">
    <h1>Add Event</h1>
    <hr>
    <form @submit.prevent="onSubmit($event)">
        <div class="form-group">
            <input class="form-control" type="text" name="name" placeholder="Event name">
        </div>
        <div class="form-group">
            <textarea class="form-control" placeholder="About this event" name="about"></textarea>
        </div>
        <div class="form-group">
            <h6>Event start on date:</h6>
            <input class="form-control" type="date" name="date" ref="date" value="2017-02-02">
            <h6 class="end">Event ends on date:</h6>
            <input class="form-control" type="date" name="toDate" ref="toDate">
        </div>
        <div class="form-group">
            <div class="time form-control">
                <input name="hrs" class="timeInput" type="number" min="0" max="23" placeholder="00">:
                <input name="mins" class="timeInput" type="number" min="0" max="59" placeholder="00">
            </div>
        </div>
        <hr>
        <button class="btn btn-primary">Save event</button>
    </form>
</div>
</template>

<script>
export default {
    methods: {
        onSubmit: function (e) {
            let data = e.target
            let arrayOfEvents = []
            var arrayOflEvents = []
            var lEvents
            let event = {
                name: data.name.value,
                about: data.about.value,
                date: data.date.value,
                ToDate: data.toDate.value,
                time: {
                    hours: data.hrs.value,
                    mins: data.mins.value
                },
                id: Math.floor(Math.random() * Math.random()*10000)
            }
            if (localStorage.getItem(event.date)) {
                events = new Map(JSON.parse(localStorage.getItem(event.date)))
                arrayOfEvents = events.get("events")
            } else {
                var events = new Map();
            }

             if (localStorage.getItem("lastingEvents") && data.date.value != data.toDate.value) {
                 lEvents = new Map(JSON.parse(localStorage.getItem("lastingEvents")))
                 arrayOflEvents = lEvents.get("events")
            } else {
                 lEvents = new Map();
            }

            arrayOfEvents.push(event)
            events.set("events", arrayOfEvents)
            if (data.date.value != data.toDate.value){
                console.log('TCL: data.toDate', data.toDate);
                console.log('TCL: data.date', data.date);
                console.log(arrayOflEvents)
                arrayOflEvents.push(event)
                lEvents.set("events", arrayOflEvents)
                localStorage.setItem("lastingEvents", JSON.stringify(Array.from(lEvents.entries())))
            }
         //   localStorage.setItem(event.date, JSON.stringify(Array.from(events.entries())));
            this.$store.commit("setAlertDismissed", true)
            this.$router.push({
                name: "home"
            })
        }
    },
    mounted() {
        if (!this.$route.params.date) {
            this.$router.push({
                name: "home"
            })
        }
        if (this.$route.params.date) {

            this.$refs.date.value = this.$route.params.date
            this.$refs.toDate.value = this.$route.params.date
        }

    }
};
</script>

<style lang="less" scoped>
.addEvent {
    text-align: center;
    >h1 {
        margin: 30px auto
    }
}

.time {
    background-color: white;
    display: inline-flex;
    border: 1px solid #ccc;
    color: #555;
    width: 155px;
    >.timeInput {
        border: none;
        color: #555;
        text-align: center;
        width: 60px;
    }
    .timeInput:first-of-type {
        padding-left: 10px
    }
    .timeInput:last-of-type {
        padding-left: 15px;
    }
}
.end{
    margin-top: 15px;
}

.form-group>textarea {
    height: 150px;
}
</style>
