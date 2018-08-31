<template>
<div class="container title">
    <h1>View Your Events</h1>
    <hr>
    <div class="row">
        <div class="col-4 events">
            <img src="./../assets/plus-512.png" alt="add" @click="addEvent()">
            <h6>Select your event:</h6>
            <hr>
            <ol>
                <li class="col-12" :class="{active: event.id == active}" v-for="(event, index) in events" :key="event.name" @click="showEvent(event, index)"> {{ event.name }} </li>
            </ol>

        </div>
        <div class="col-8 eventInfo" ref="eventInfo">
            <div class="row align-items-center about">
                <div class="event container">
                    <input :class="{'editInput': edit}" type="text" ref="name" :readonly="!edit" v-model="eventData.name" v-if="eventData.name">
                    <hr v-if="eventData.about || edit">
                    <div v-if="eventData.about || edit" class="aboutEvent">
                        <textarea :class="{'editInput': edit}" :readonly="!edit" ref="about" v-model="eventData.about"></textarea>
                    </div>
                    <hr v-if="eventData.about || edit">
                    <div class="time form-control" :class="{'correctTime': !edit }" v-if="eventData.time">
                        <input :class="{editInput: edit}" ref="hours" class="timeInput" type="number" min="0" max="23" placeholder="00" :readonly="!edit"> :
                        <input :class="{editInput: edit}" ref="mins" class="timeInput" type="number" min="0" max="59" placeholder="00" :readonly="!edit">
                    </div>
                </div>
                <div v-if="eventData.name">
                    <button class="btn edit" @click="edit = !edit">Edit</button>
                    <button class="btn save" @click="save">Save</button>
                    <button class="btn delete" @click="deleteEvent()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            events: [],
            eventData: {},
            edit: false,
            index: null,
            id: null
        };
    },
    methods: {
        showTime: function (time) {
            return time.hours + " : " + time.mins;
        },
        addEvent: function () {
            var date = this.$store.getters.getCurrentEventInfoDate;
            this.$router.push({
                name: "addevent",
                params: {
                    date: date
                }
            });
        },
        showEvent: function (event, index) {
            this.edit = false
            this.index = index
            this.id = event.id
            this.eventData = event;
            this.$store.commit("setActiveEvent", event.id);
        },
        save: function () {
            // this.edit = false
            // var events = new Map(
            //     JSON.parse(localStorage.getItem(this.$route.params.date))
            // )
            // events.get("events")[this.index].name = this.$refs.name.value
            // events.get("events")[this.index].about = this.eventData.about
            // events.get("events")[this.index].time.hours = this.$refs.hours.value
            // events.get("events")[this.index].time.mins = this.$refs.mins.value
            // localStorage.setItem(this.$store.getters.getCurrentEventInfoDate, JSON.stringify(Array.from(events.entries())));

            

            var Revents = new Map(
                JSON.parse(localStorage.getItem(this.$route.params.date))
            )
            var events = Revents.get("events")
            var RlEvents = new Map(
                JSON.parse(localStorage.getItem("lastingEvents"))
            )
            var lEvents = RlEvents.get("events")
            if (events) {
                var eventIndex = events.map(events => events.id).indexOf(this.id)
                if (eventIndex >= 0) {
                   events[eventIndex].name = this.$refs.name.value
                   events[eventIndex].about = this.eventData.about
                   events[eventIndex].time.hours = this.$refs.hours.value
                   events[eventIndex].time.mins = this.$refs.mins.value
                   localStorage.setItem(this.$store.getters.getCurrentEventInfoDate, JSON.stringify(Array.from(Revents.entries())));
                }
            }
            if (lEvents) {
                var lEventIndex = lEvents.map(lEvents => lEvents.id).indexOf(this.id)
                if (lEventIndex >= 0) {
                   lEvents[lEventIndex].name = this.$refs.name.value
                   lEvents[lEventIndex].about = this.eventData.about
                   lEvents[lEventIndex].time.hours = this.$refs.hours.value
                   lEvents[lEventIndex].time.mins = this.$refs.mins.value
                   localStorage.setItem("lastingEvents", JSON.stringify(Array.from(RlEvents.entries())));

                }
            }
    },
    deleteEvent: function () {
        var Revents = new Map(
            JSON.parse(localStorage.getItem(this.$route.params.date))
        )
        var events = Revents.get("events")
        var RlEvents = new Map(
            JSON.parse(localStorage.getItem("lastingEvents"))
        )
        var lEvents = RlEvents.get("events")
        if (events) {
            var eventIndex = events.map(events => events.id).indexOf(this.id)
            console.log('TCL: eventIndex', eventIndex);
            if (eventIndex >= 0) {
                events.splice(this.index, 1)
                if (events.length == 0) {
                    localStorage.removeItem(this.$store.getters.getCurrentEventInfoDate)
                    this.$router.push("/")
                } else {
                    localStorage.setItem(this.$store.getters.getCurrentEventInfoDate, JSON.stringify(Array.from(Revents.entries())));
                    this.$router.push("/eventinfo")
                }
            }
        }
        if (lEvents) {
            var lEventIndex = lEvents.map(lEvents => lEvents.id).indexOf(this.id)
            console.log("dawawd", lEventIndex)
            if (lEventIndex >= 0) {
                lEvents.splice(this.index, 1)

                if (lEvents.length == 0) {
                    localStorage.removeItem("lastingEvents")
                    this.$router.push("/")
                } else {
                    localStorage.setItem("lastingEvents", JSON.stringify(Array.from(RlEvents.entries())));
                    this.$router.push("/eventinfo")
                }
            }
        }
    }
},
computed: {
        active: function () {
            return this.$store.getters.getActiveEvent;
        }
    },
    created() {
        if (this.$route.params.date) {
            if (localStorage.getItem(this.$route.params.date)) {
                var events = new Map(
                    JSON.parse(localStorage.getItem(this.$route.params.date))
                );
                this.events = events.get("events");
            }
            var lEvents = new Map(JSON.parse(localStorage.getItem("lastingEvents")));
            lEvents = lEvents.get("events");
            if (lEvents) {
                var date = this.$route.params.date;
                date = new Date(date)
                for (var i = 0; i < lEvents.length; i++) {
                    var refDate = new Date(lEvents[i].date)
                    var toDate = new Date(lEvents[i].ToDate)
                    if (date >= refDate && date <= toDate) {
                        this.events.push(lEvents[i])
                    }
                }
            }

        } else {
            this.$router.push("/");
        }
    },
    beforeDestroy() {
        this.$store.commit("setActiveEvent", null);
    }
};
</script>

<style lang="less" scoped>
.events,
.eventInfo {
    border: 1px solid black;
    height: 300px;
    >.about {
        height: 100%;
        position: relative;
    }
}

.edit {
    position: absolute;
    bottom: 10px;
    left: 10px;
}

.save {
    position: absolute;
    transform: translateX(-50%);
    left: 49.5%;
    bottom: 10px;
}

.delete {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

input {
    text-align: center;
    border: none;
    font-weight: 600;
}

.time {
    border: none;
    >input {
        padding-left: 15px;
    }
}

.correctTime {
    >input:first-of-type {
        margin-right: -22px;
    }
    >input:last-of-type {
        padding-left: 0;
        margin-left: -4px;
    }
}

.aboutEvent {
    >textarea {
        text-align: center;
        border: none;
        resize: none;
        width: 100%;
        height: auto;
    }
}

.events {
    padding-top: 10px;
    position: relative;
    >img {
        width: 20px;
        position: absolute;
        right: 16px;
        top: 12px;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.5s;
    }
    >img:hover {
        opacity: 1;
    }
}

.title {
    text-align: center;
}

ol {
    text-align: center;
    list-style-position: inside;
    padding: 0;
}

li {
    cursor: pointer;
}

li:hover {
    background-color: #00ff4333;
}

.active {
    background-color: #00ff4333;
}

.editInput {
    border: 1px solid #cdcdcdd1 !important;
}
</style>
