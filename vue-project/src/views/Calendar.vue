<template>
<Sidebar>
  <v-app id="dayspan" v-cloak>

    <ds-calendar-app ref="calendar"
      :calendar="calendar"
      :read-only="readOnly"
      >

      <template slot="eventPopover" slot-scope="slotData">
         <ds-calendar-event-popover
          v-bind="slotData"
          :read-only="readOnly"
          @finish="saveState"
        ></ds-calendar-event-popover>
      </template>

      <template slot="eventCreatePopover" slot-scope="{placeholder, calendar}">
        <ds-calendar-event-create-popover
          :calendar-event="placeholder"
          :calendar="calendar"
          :close="$refs.calendar.$refs.calendar.clearPlaceholder"
          @create-edit="$refs.calendar.editPlaceholder"
          @create-popover-closed="saveState"
        ></ds-calendar-event-create-popover>
      </template>

      <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
        <div>
          <v-icon class="ds-ev-icon"
            v-if="details.icon"
            size="14"
            :style="{color: details.forecolor}">
            {{ details.icon }}
          </v-icon>
          <strong class="ds-ev-title">{{ details.title }}</strong>
        </div>
        <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
      </template>

    </ds-calendar-app>

  </v-app>
</Sidebar>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import { Calendar, Weekday, Month } from 'dayspan';
import { usersref } from '@/firebase.js'
import Vue from 'vue';
import debounce from 'lodash/debounce'

export default {
  name: 'calendar',
  data: () => ({
    storeKey: 'dayspanState',
    calendar: Calendar.months(),
    readOnly: false,
    defaultEvents:[],
    key: null,
    position: 0
  }),
  mounted: debounce(function () {
    this.$nextTick(() => {
        for(let i=0;i<this.user.length;i++){
        if(this.user[i].UserId == this.$UID){
        this.key = this.user[i]['.key']
        this.position = i
        }
      }
        this.loadState();
    })
}, 1000),
  components:{
      Sidebar
  },
  firebase:{
    user: usersref
  },
  methods:
  {
    getCalendarTime(calendarEvent)
    {
      let sa = calendarEvent.start.format('a');
      let ea = calendarEvent.end.format('a');
      let sh = calendarEvent.start.format('h');
      let eh = calendarEvent.end.format('h');
      if (calendarEvent.start.minute !== 0)
      {
        sh += calendarEvent.start.format(':mm');
      }
      if (calendarEvent.end.minute !== 0)
      {
        eh += calendarEvent.end.format(':mm');
      }
      return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
    },
    saveState()
    {
      var cal = []
      let state = this.calendar.toInput(true);
      cal.push({id: this.$UID, st: state})
      console.log(cal)
      let json = JSON.stringify(cal.st);
      usersref.child(this.key).update({Calendar: state})
      localStorage.setItem(this.storeKey, json);
    },
    loadState()
    {
      let state = {};
      try
      {
        //let savedState = JSON.parse(localStorage.getItem(this.storeKey));
        let savedState = this.user[this.position].Calendar
        if (savedState)
        {
          state = savedState;
          state.preferToday = false;
        }
      }
      catch (e)
      {
        // eslint-disable-next-line
        console.log( e );
      }
      if (!state.events || !state.events.length)
      {
        state.events = this.defaultEvents;
      }
      state.events.forEach(ev =>
      {
        let defaults = this.$dayspan.getDefaultEventDetails();
        ev.data = Vue.util.extend( defaults, ev.data );
      });
      this.$refs.calendar.setState( state );
    }
  }
}
</script>

<style scoped>
body, html, #app, #dayspan {
  font-family: Roboto, sans-serif !important;
  width: 100%;
  height: 100%;
}
/* .v-btn--flat,
.v-text-field--solo .v-input__slot {
  background-color: #f5f5f5 !important;
  margin-bottom: 8px !important;
} */
.v-toolbar--fixed {
    position: relative !important;
}

</style>