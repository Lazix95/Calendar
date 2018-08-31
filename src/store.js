import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: null,
    Day: null,
    month: null,
    numbMonth: null,
    year: null,
    daysInMonth: null,
    firstDayInMonth: null,
    lastDayInMonth: null,
    calendar: null,
    currentEventInfoDate: null,
    activeEvent: null,
    eventToday: false,
    alertDismissed: false
  },
  mutations: {
    setDate: function (state) {
      state.date = new Date()
    },
    setDay: function (state, payload) {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      state.day = days[payload]
    },
    setDaysInMonth: function (state, payload = 0) {
      var now = new Date()
      state.daysInMonth = (new Date(now.getFullYear(), now.getMonth() + 1 + payload, 0).getDate())
    },
    setFirstDayInMonth: function (state, payload = 0) {
      var d = new Date()
      state.firstDayInMonth = new Date(d.getFullYear(), d.getMonth() + payload, 1).getDay()
    },
    setLastDayInMonth: function (state, payload = 0) {
      var d = new Date()
      state.lastDayInMonth = new Date(d.getFullYear(), d.getMonth() + 1 + payload, 0).getDay()
    },
    setCalendar: function (state, payload) {
      state.calendar = payload
    },
    setMonth: function (state, payload = 0) {
      let d = new Date()
      let monthNumb = new Date(d.getFullYear(), d.getMonth() + payload)
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      state.year = monthNumb.getFullYear()
      state.month = monthNames[monthNumb.getMonth()]
      state.numbMonth = monthNumb.getMonth()
    },
    setCurrentEventInfoDate: function (state, payload) {
      state.currentEventInfoDate = payload
    },
    setActiveEvent: function (state, payload) {
      state.activeEvent = payload
    },
    setEventToday: function (state, payload) {
      state.eventToday = payload
    },
    setAlertDismissed: function (state, payload) {
      state.alertDismissed = payload
    }
  },
  getters: {
    getDate: state => {
      return state.date
    },
    getDay: state => {
      return state.day
    },
    getShortDay: state => {
      return state.day.substring(0, 2)
    },
    getDaysInMonth: state => {
      return state.daysInMonth
    },
    getFirstDayInMonth: state => {
      return state.firstDayInMonth
    },
    getLastDayInMonth: state => {
      return state.lastDayInMonth
    },
    getCalendar: state => {
      return state.calendar
    },
    getMonth: state => {
      return state.month
    },
    getYear: state => {
      return state.year
    },
    getNumbMonth: state => {
      return state.numbMonth
    },
    getCurrentEventInfoDate: state => {
      return state.currentEventInfoDate
    },
    getActiveEvent: state => {
      return state.activeEvent
    },
    getEventToday: state => {
      return state.eventToday
    },
    getAlertDismissed: state => {
      return state.alertDismissed
    }
  },
  actions: {
    fillCalendar: ({
      commit,
      getters,
      dispatch
    }, payload = 0) => {
      var today = {
        day: getters.getDate.getDate(),
        month: getters.getDate.getMonth(),
        year: getters.getDate.getFullYear()
      }
      var startCalendar = true
      let daysString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      commit('setDaysInMonth', payload)
      var end = getters.getDaysInMonth
      var start = 1
      let days = new Map()
      days.set('Sun', [])
      days.set('Mon', [])
      days.set('Tue', [])
      days.set('Wed', [])
      days.set('Thu', [])
      days.set('Fri', [])
      days.set('Sat', [])
      for (var i = start; i <= end; i++) {
        let markDay = false
        let date = new Date(getters.getDate.getFullYear(), getters.getDate.getMonth() + payload, i)
        if (today.day === date.getDate() && today.month === getters.getNumbMonth && today.year === getters.getYear) {
          markDay = true
        }
        let day = {
          'day': daysString[date.getDay()].substring(0, 3),
          'date': date.getDate(),
          'today': markDay
        }
        days.get(day.day).push(day)
      }
      days.forEach((value, key) => {
        for (i = 0; i < value.length; i++) {
          if (value[i].date === 1) {
            startCalendar = false
            break
          } else if (startCalendar) {
            break
          }
        }
      })
      commit('setCalendar', days)
      dispatch('fillEmptySpaces', payload)
    },
    fillEmptySpaces: ({
      commit,
      getters
    }, payload = 0) => {
      let d = new Date()
      let days = []
      let daysInMonth = (new Date(d.getFullYear(), d.getMonth() + payload, 0).getDate())
      let calendar = getters.getCalendar
      let daysString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let firstDayInMonth = getters.getFirstDayInMonth
      for (let i = daysInMonth; i > daysInMonth - firstDayInMonth; i--) {
        let date = new Date(getters.getDate.getFullYear(), getters.getDate.getMonth() + payload - 1, i)
        let day = {
          'day': daysString[date.getDay()].substring(0, 3),
          'date': date.getDate(),
          'offset': true
        }
        days.push(day)
      }
      var frontDays = []
      var max = 35
      var maxDays = getters.getDaysInMonth + firstDayInMonth
      if (maxDays > 35) {
        max = 42
      }
      maxDays = max - maxDays
      for (let i = 1; i <= maxDays; i++) {
        let date = new Date(getters.getDate.getFullYear(), getters.getDate.getMonth() + payload + 1, i)
        let day = {
          'day': daysString[date.getDay()].substring(0, 3),
          'date': date.getDate(),
          'offsetN': true
        }
        frontDays.push(day)
      }
      days.forEach((value, index) => {
        calendar.get(value.day).unshift(value)
      })
      frontDays.forEach((value, index) => {
        calendar.get(value.day).push(value)
      })
    }
  }
})
