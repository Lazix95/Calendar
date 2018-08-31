<template>
<div class="calendarHolder">
    <app-event-apert v-if="eventToday"></app-event-apert>
    <p>{{ month }}</p>
    <p>{{ year }}</p>
    <img src="./../assets/next.png" @click="pagination = pagination + 1" alt="arrow">
    <img src="./../assets/Pervius.png" @click="pagination = pagination - 1" alt="arrow">
    <div class="container header">
        <div class="row align-items-center days">
            <div class="col">Sun</div>
            <div class="col">Mon</div>
            <div class="col">Tue</div>
            <div class="col">Wed</div>
            <div class="col">Thu</div>
            <div class="col">Fri</div>
            <div class="col">Sat</div>
        </div>
    </div>
    <div class="container calendar">
        <div class="row ">
            <div class="col sun">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date, d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Sun')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today}">{{ d.date }}</app-day>
            </div>
            <div class="col mon">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date, d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Mon')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today}">{{ d.date }}</app-day>
            </div>
            <div class="col tue">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date, d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Tue')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today }">{{ d.date }}</app-day>
            </div>
            <div class="col wed">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date, d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Wed')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today }">{{ d.date }}</app-day>
            </div>
            <div class="col thu">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date, d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Thu')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today}">{{ d.date }}</app-day>
            </div>
            <div class="col fri">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date ,d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Fri')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today}">{{ d.date }}</app-day>
            </div>
            <div class="col sat">
                <app-day @click.native="eventInfo(d.date, d)" :date="sendDate(d.date ,d)" :today="d.today" class="col" :lasting="lastingEvents(d)" v-for="d in calendar.get('Sat')" :key="d.id" :class="{'text-muted': d.offset || d.offsetN, 'today': d.today}">{{ d.date }}</app-day>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import day from "./day";
import eventAlert from "./eventAlert";

export default {
    data: function () {
        return {
            start: false,
            shownDates: [],
            pagination: 0
        };
    },
    created() {
        this.$store.commit("setMonth", this.pagination);
        this.$store.commit("setDate");
        this.$store.commit("setDay", this.date.getDay());
        this.$store.commit("setDaysInMonth", this.pagnation);
        this.$store.commit("setFirstDayInMonth", this.pagination);
        this.$store.commit("setLastDayInMonth", this.pagination);
        this.$store.dispatch("fillCalendar", this.pagination);
    },
    computed: {
        date: function () {
            return this.$store.getters.getDate;
        },
        day: function () {
            return this.$store.getters.getDay;
        },
        shortDay: function () {
            return this.$store.getters.getShortDay;
        },
        daysInMonth: function () {
            return this.$store.getters.getDaysInMonth;
        },
        firstDayInMonth: function () {
            return this.$store.getters.getFirstDayInMonth;
        },
        lastDayInMonth: function () {
            return this.$store.getters.getFirstDayInMonth;
        },
        currentDate: function () {
            return this.date.getDate();
        },
        calendar: function () {
            return this.$store.getters.getCalendar;
        },
        month: function () {
            return this.$store.getters.getMonth;
        },
        year: function () {
            return this.$store.getters.getYear;
        },
        numbMonth: function () {
            return this.$store.getters.getNumbMonth;
        },
        eventToday: function () {
            return this.$store.getters.getEventToday;
        }
    },
    components: {
        appDay: day,
        appEventApert: eventAlert
    },
    methods: {
        order: function (item, condition) {
            if (this.shownDates.indexOf(item.date) >= 0) {
                this.start = true;
                console.log("dawd", item.date);
            }
            if (!this.start && item.date != 1) {
                console.log("dawdaw");
                return {
                    status: true,
                    item: " "
                };
            } else if (item.day == condition) {
                this.shownDates.push(item.date);
                return {
                    status: true,
                    item: item.date
                };
            } else {
                return false;
            }
        },
        eventInfo: function (date, d) {
            var correction = 0;
            if (d.offset) correction = -1;
            if (d.offsetN) correction = +1;

            if (date < 10) {
                date = "0" + date;
            }
            if (this.numbMonth < 10) {
                var m = "0" + (this.numbMonth + correction);
            }
            var eventDate = this.year + "-" + m + "-" + date;
            this.$store.commit("setCurrentEventInfoDate", eventDate);
            var lasting = this.lastingEvents(d)
            if (!localStorage.getItem(eventDate) && !lasting.status && !lasting.first ) {
                this.$router.push({
                    name: "addevent",
                    params: {
                        date: eventDate
                    }
                });
            } else {
                this.$router.push({
                    name: "eventinfo",
                    params: {
                        date: eventDate
                    }
                });
            }
        },
        sendDate: function (date, d) {
            var correction = 0;
            if (d.offset) correction = -1;
            if (d.offsetN) correction = +1;

            if (date < 10) {
                date = "0" + date;
            }
            if (this.numbMonth < 10) {
                var m = "0" + (this.numbMonth + correction);
            }
            return this.year + "-" + m + "-" + date;
        },
        lastingEvents: function (d) {
            var lEvents = new Map(JSON.parse(localStorage.getItem("lastingEvents")));
            lEvents = lEvents.get("events");
            var date = this.year + "/" + (this.numbMonth) + "/" + d.date
            var date = new Date(date)
            if (!lEvents) {
                return {
                    status: false,
                    last: false,
                    first:false
                }
            }
            console.log(new Date().getMonth() == date.getMonth())
            for (var i = 0; i < lEvents.length; i++) {
                var refDate = new Date(lEvents[i].date)
                var toDate = new Date(lEvents[i].ToDate)
                var a = date.getDate()+"/"+date.getMonth()
                var b = refDate.getDate()+"/"+refDate.getMonth()
                var cmp = (a == b)
                if (date >= refDate && date < toDate) {
                    if (date.getDate()+"/"+date.getMonth() == toDate.getDate()+"/"+toDate.getMonth() && !d.offsetN && !d.offset) {
                        return {
                            status: true,
                            last: true,
                            first:false
                        }
                    }else if(!d.offset && !d.offsetN){
                         return {
                            status: true,
                            last: false,
                            first:false
                        }
                    }
                }else if(d.offsetN && date.getMonth() == toDate.getMonth()-1 && !d.offset) {
                    return {
                            status: true,
                            last: false,
                            first:false
                        }
                }else if(d.offset && new Date().getMonth() == date.getMonth()) {
                    return {
                            status: true,
                            last: false,
                            first:false
                        }
                }
                if (cmp){
                        return {
                            status: false,
                            last: false,
                            first: true
                        }
                    }
            }
            return {
                status: false,
                last: false
            }
        }
    },
    watch: {
        pagination: function () {
            this.$store.commit("setMonth", this.pagination);
            this.$store.commit("setDaysInMonth", this.pagnation);
            this.$store.commit("setFirstDayInMonth", this.pagination);
            this.$store.commit("setLastDayInMonth", this.pagination);
            this.$store.dispatch("fillCalendar", this.pagination);
        }
    }
};
</script>

 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
div {
    text-align: center;
}

.calendarHolder {
    width: 500px;
    height: 800px;
    margin: 50px auto;
    position: relative;
    >img {
        position: absolute;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.5s;
    }
    >img:first-of-type {
        transform: translateX(-50%) translateY(-50%);
        top: 32px;
        right: 0;
    }
    >img:last-of-type {
        transform: translateX(-50%) translateY(-50%);
        top: 32px;
        left: 36px;
    }
    >img:hover {
        opacity: 1;
    }
}

.days {
    background-color: rgb(102, 133, 102);
}

.day {
    width: 20px;
}

.sun,
.mon,
.wed,
.tue,
.thu,
.fri,
.sat {
    padding: 0;
}

.lasting {
    background-color: red
}

.text-muted {
    color: #b4b1b1;
}
</style>
