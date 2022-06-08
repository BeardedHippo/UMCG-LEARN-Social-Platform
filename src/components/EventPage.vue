// Deze pagina vertoonde een enkele evenement. En vult hiermee de pagina met benodigde informatie.

<template>
  <div class="event-page-container">
      <div class="header">
        <button href="#" v-on:click="prevPage()" class="button-back">Go back to event overview</button>
        <h1 class="event-title">{{this.event.title}}</h1>
        <h2 class="event-sub"><span style="font-weight: 400">{{this.event.date}}</span> at {{this.event.location}}</h2>
      </div>
      <div class="event-content">
        <img src="" alt="">
        <div class="event-info">
          <div class="intro">
            <span style="color: #FF934B; font-weight: 500">{{this.event.date}}</span>
            {{this.event.summary}}
          </div>
        </div>
        <div class="event-program">
            <p style="font-weight: 600">The program for the entire day is as follows:</p>
            <ul class="event-program-list">
              <li class="list-item"><p class="time">09.00-12.00</p><p class="subject">Theme 2</p></li>
              <li class="list-item"><p class="time">12.00-13.00</p><p class="subject">Lunch</p></li>
              <li class="list-item"><p class="time">13.00-16.00</p><p class="subject">Theme 1</p></li>
              <li class="list-item"><p class="time">16.00-16.30</p><p class="subject">Drinks and snacks</p></li>
              <li class="list-item"><p class="time">16.30-19.30</p><p class="subject">Theme 3, including soup and sandwiches</p></li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
import {database} from '@/firebase/init'

export default {
  data() {
    return {
      event:{
        title: '',
        date: '',
        location: '',
        summary: ''
      }
    }
  },
  methods: {
    prevPage: function() {
      window.history.back();
    },
  },
  created(){
    database.ref('event/' + this.$route.params.id ).on('value', snap=>{
      const data = snap.val();
      this.event.title = data.title
      this.event.date = data.date
      this.event.location = data.location
      this.event.summary = data.summary
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');
  body{
    background-color: #F4F4F7;
  }
  p{
    font-size: 1.6rem;
  }
  .event-page-container{
    font-family: 'Montserrat', sans-serif;
    max-width: 164rem;
    background-color: #F4F4F7;
    margin: auto;
    margin-top: 40px;
    min-height: 100vh;
  }
  .header{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .button-back{
    color: #FF934B;
    background-color: transparent;
    font-weight: 700;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .event-title{
    margin: 15px 0 0 0;
    color: #475B63;
  }
  h2.event-sub {
    font-size: 1.8rem;
    margin-top: 10px;
    font-weight: 400;
    color: #475B63;
  }
  .event-content{
    display: flex;
  }
  .event-info {
    width: 60%;
    background: #FFF;
    padding: 20px;
    text-align: left;
  }
  .intro{
    font-size: 1.4rem;
  }
  .event-program {
    display: flex;
    flex-direction: column;
    /* text-align: left; */
    background: #FFF;
    margin: 0 0 0 20px;
    padding: 20px;
  }
  .event-program-list{
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
  }
  .list-item{
    display: flex;
    margin: 10px 0 10px 0;
  }
  p.time{
    margin: 0;
    width: 120px;

  }
  p.subject{
    margin: 0;
  }
  @media (max-width: 1024px){
    .event-page-container{
      display: flex;
      flex-direction: column;
      margin: 4rem 4rem 0 4rem;
    }
    .event-content{
      display: flex;
      flex-direction: column;
    }
    .event-info {
      width: 100%;
    }
    .event-program {
      width: 100%;
      margin: 2rem 0 0 0;
    }
  }
</style>


