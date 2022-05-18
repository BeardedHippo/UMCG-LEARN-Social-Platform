<template>
    <div id="events">
      <div v-for="event in this.events" :key="event.id">
        <div class="eventGroup" id="container">
            <img :src="event.image">
            <h1 class="title"> {{ event.title }} </h1>
            <h2 class="subGroup"> {{ event.dateString }}, at {{event.location}}</h2>
            <p>{{ event.summary }} </p>
            <router-link class="rb" :to="{name: 'symposium', params: { id: event.id}}"><button type="text" v-if="event.type.toLowerCase() == 'symposium'">Read More</button></router-link>
            <router-link class="rb" :to="{name: 'event', params: { id: event.id}}"><button type="text" v-if="event.type.toLowerCase() == 'event'">Read More</button></router-link>
        </div>
      </div>
    </div>
</template>
<script>
import {database} from '@/firebase/init'

export default {
  data() {
    return {
      events: []
    }
  },
  created() {
    this.getEvents()
  },
  methods:{
    getEvents(){
      database.ref('event').on('child_added', snap => {
        const data = snap.val()
        const newEvent = {
          id: snap.key,
          title: data.title,
          dateString: data.dateString,
          date: data.date,
          location: data.location,
          summary: data.summary,
          image: data.image,
          type: data.type
        }
        this.events.push(newEvent);
        this.events.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })
      })
    }
  }
}
</script>
<style scoped>

#events {
  font-size: 16px;
  line-height: 1.5;
}
/*Event groups*/

.eventGroup {
  display: inline-block;
  width: 57%;
  background-color: white;
  position: relative;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-left: 21.5%;
  box-shadow: 2px 2px lightgrey;
}
.eventGroup1 {
  display: inline-block;
  width: 57%;
  background-color: white;
  margin-bottom: 3%;
  margin-left: 21.5%;
  position: relative;
  box-shadow: 2px 2px lightgrey;
}
button {
  display: block;
  margin-left: 45%;
  margin-bottom: 6%;
  background-color: #FF934B;
  border: none;
  padding: 15px 35px;
  margin-top: 5%;
  width: 225px;
  color: white;
  font-weight: 700;
}
.rb{
  color: white;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
img {
  width:40%;
  height: 100%;
  bottom: 0;
  object-fit: cover;
  position: absolute;
  z-index:1;
}
h1 {
  margin-left: 40%;
  margin-bottom: 0;
  padding: 2% 5% 0 5%;
  color: #FF934B;
  font-size: 1.3em;
}
h2 {
  margin-left: 40%;
  margin-top: 1%;
  padding-left: 5%;
  padding-right: 5%;
  font-size: 1em;
}
p {
  margin-left: 40%;
  padding-left: 5%;
  padding-right: 5%;
}

/*responsive event groups*/

@media screen and (max-width: 1024px) {
  .eventGroup {
    width: 92%;
    margin-left: 4%;
  }
  .eventGroup1 {
    width: 92%;
    margin-left: 4%;
  }
}

@media screen and (max-width: 690px) {
  img {
    display: none;
  }
  h1, h2, p {
    margin-left: 5%;
    padding-left: 0;
  }
  button {
    display: inline-block;
    margin: 5%;
  }
  .eventGroup {
    width: 92%;
    margin-left: 4%;
  }
  .eventGroup1 {
    width: 92%;
    margin-left: 4%;
  }
}

</style>
