import Vue from 'vue'
import Router from 'vue-router'
import addEvent from './components/addEvent.vue'
import calendar from './components/Calendar.vue'
import eventinfo from './components/viewEvents.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: calendar
    },
    {
      path: '/addevent',
      name: 'addevent',
      component: addEvent
    },
    {
      path: '/eventinfo',
      name: 'eventinfo',
      component: eventinfo
    }
  ]
})
