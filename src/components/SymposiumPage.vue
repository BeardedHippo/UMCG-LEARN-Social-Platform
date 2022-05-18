<template>
	<div id="symposium">
		<div class="symposiumText">
			<button href="#" v-on:click="prevPage()" class="buttonBack">Go back to event overview</button>
			<h1 id="titleSymposium">{{this.event.title}}</h1>
			<h2 id="subtitleSymposium">{{this.event.date}} at {{this.event.location}}</h2>
		</div>

    <div class="firstRow">
      <div class="info">
        <h1 class="title">Symposium information</h1>
        <div class="line"></div>
        <p id="infoText">{{this.event.info}}</p>
      </div>

      <div class="attend">
        <h1 class="title">Will you be at the symposium 2019?</h1>
        <div class="line"></div>
        <p id="attendText">Log in and let us know if you will attend the symposium of 2019! You will be able to see who will be at the symposium.</p>
        <a href="/login"><button class="buttonAttend">Login</button></a>
      </div>
    </div>

    <div class="speakers">
      <h1 class="title">Speakers</h1>
      <div class="line"></div>
      <div class="speakers-container">
        <div class="wrap-container">
          <div class="speakersInfo" v-for="(speaker, index) in this.event.speakers" :key="index">
            <div class="speaker-container">
              <img :src="speaker.image">
              <p id="speakerName">{{speaker.name}}</p>
              <div class="box">
              <a class="button" :href="`#${index}`">More information</a>
              </div>
            </div>
            <div :id="index" class="overlay">
              <div class="popup">
                <h2>{{speaker.name}}</h2>
                <a class="close" href="#">&times;</a>
                <div class="content">
                  {{speaker.info}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="present">
      <h1 class="title">Present your work</h1>
      <div class="line"></div>
      <p id="infoText1">Sessions 1 and 2 comprise two ‘quick communication’ sessions (5 minutes per person, including discussion) to discuss research that is still in progress and two ‘short communication’ sessions (15 minutes per presentation, including discussion) to discuss completed studies. We invite all LEARN PI’s and PhD students to present their work during these sessions. Be creative in your approach!</p>
      <p id="infoText2">Please let us know whether or not you will attend and what type of presentation you would like to give: a quick or ashort communication. Please provide the title and a short, one-paragraph summary of the content of your presentation, a take-home message or whatever you would like to offer to the audience.</p>
    </div>

    <div class="agenda">
      <h1 class="title">Preliminary programme</h1>
      <div class="line"></div>
        <div id="agendaText">
          <div v-for="(program, index) in this.event.program" :key="index">
            <div class="wrap-agenda">
              <div class="agendaTime">{{program.time}}</div>
              <div class="agendaSubject">{{program.subject}}</div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {database} from '@/firebase/init.js'

export default {
  data() {
    return {
      event:{
        title: '',
        date: '',
        location: '',
        summary: '',
        info: '',
        program: [],
        speakers: []
      }
    }
  },
  methods: {
    prevPage: function() {
      window.history.back();
    },
  },
  created(){
    database.ref('event/' + this.$route.params.id).on('value', snap=>{
      const data = snap.val();
      this.event.title = data.title
      this.event.date = data.date
      this.event.location = data.location
      this.event.summary = data.summary
      this.event.info = data.info

    })
    database.ref('event/' + this.$route.params.id).child('program').on('child_added', snap =>{
      this.event.program.push(snap.val())
    })
    database.ref('event/' + this.$route.params.id).child('speakers').on('child_added', snap =>{
      this.event.speakers.push(snap.val())
    })
  },
}
</script>
<style scoped>

#symposium {
  font-size: 16px;
}
/*popup speakers*/

.button {
  background-color: white;
  margin-bottom: 15%;
  padding: 10px 10px 10px 10px;
  width: 150px;
  border: 1px solid #FF934B;
  color: #FF934B;
  font-weight: 500;
  font-size: 0.8em;
  text-decoration: none;
  display: inline-block;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.popup {
  margin: 70px auto;
  padding: 50px;
  font-size: 0.9em;
  background: #fff;
  width: 30%;
  position: relative;
  transition: all 3s ease-in-out;
}
.popup h2 {
  margin-top: 0;
  font-size: 1.3em;
  color: #475B63;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #475B63;
}
.popup .close:hover {
  color: #FF934B;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}
@media screen and (max-width:  1024px){
  .box{
    width: 90%;
  }
  .popup{
    width: 90%;
  }
}

.firstRow {
  display: flex;
}
.title {
  padding: 15px 0px 5px 30px;
  font-weight: 700;
  font-size: 1.1vw;
}
.line {
  float: left;
  width: 100%;
  border-bottom: 1.5px solid #F4F4F7;
}

/*Title of page*/

.symposiumText {
  margin-left: 7.3%;
  color: #475B63;
  font-weight: 700;
}
.buttonBack {
  color: #FF934B;
  background-color: transparent;
  margin-top: 40px;
  font-weight: 700;
  border: none;
  padding: 0;
}
.buttonBack {
  border-bottom: 1px solid transparent;
}
.buttonBack:focus {
  outline:0;
}
.buttonBack:hover {
  border-bottom: 1px solid #FF934B;
}
#subtitleSymposium {
  margin: 0;
  margin-top: 10px;
}
#titleSymposium {
  margin-bottom: 0;
}

/*Information Symposium*/

.info {
  background-color: white;
  width: 50%;
  margin-left: 7.3%;
  margin-top: 2%;
  color: #475B63;
  float: left;
  margin-right: 1%;
}
#infoText {
  padding: 25px 45px 30px 30px;
  font-size: 0.95vw;
}

/*Will you attend*/

.attend {
  background-color: white;
  width: 34%;
  margin-top: 2%;
  color: #475B63;
  float: left;
}
.buttonAttend {
  margin-left: 30px;
  background-color: #FF934B;
  padding: 15px 35px;
  width: 225px;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 0.8em;
}
#attendText {
  padding: 25px 85px 30px 30px;
  font-size: 0.95vw;
}

/*The speakers*/

.speakers {
  background-color: white;
  margin-left: 7.3%;
  margin-top: 1%;
  width: 85%;
  float: left;
  padding-bottom: 30px;
}
.wrap-container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.speakers-container{
  width: 90%;
  margin: 0 auto;
}
.speakersInfo {
  /* display: inline-block; */
  text-align: center;
  margin: 20px 5%;
}
img {
  margin-top: 15%;
  border-radius: 50%;
  border: 1px solid grey;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.speaker-container {
  display: inline-block;
  margin-right: 5%;
}
#speakerName {
  margin: 5% 0% 10%;
  font-size: 0.8vw;
  font-weight: 700;
}

/*Present your work*/

.present {
  background-color: white;
  width: 50%;
  margin-left: 7.3%;
  margin-top: 1%;
  color: #475B63;
  float: left;
  margin-right: 1%;
}
#infoText1 {
  padding: 0px 45px 0px 30px;
  margin-top: 5%;
  font-size: 0.95vw;
}
#infoText2 {
  padding: 0px 45px 30px 30px;
  font-size: 0.95vw;
}

/*Agenda*/

.agenda {
  background-color: white;
  width: 34%;
  margin-top: 1%;
  margin-bottom: 3%;
  color: #475B63;
  float: left;
}
#agendaText {
  font-family: 'Montserrat';
  padding-top: 20px;
  font-size: 0.95vw;
}
.wrap-agenda {
  display: flex;
}
.agendaTime {
  width: 20%;
  margin: 20px;
}
.agendaSubject {
  width: 80%;
  margin: 20px;
}

@media only screen and (max-width: 1024px) {

  /* first row */
  #titleSymposium {
    font-size: 1.5em;
  }
  #subtitleSymposium {
    font-size: 0.8em;
    margin-bottom: 30px;
  }
  .buttonBack {
    /* display: none; */
  }
  #title {
    font-size: 0.7em;
    padding-left: 7%;
    padding-right: 7%;
  }
  .buttonAttend {
    margin-left: 7%;
    width: 80%;
  }
  #infoText {
    font-size: 0.6em;
  }
  #attendText {
  font-size: 0.6em;
  padding-left: 7%;
  }

  /* second row */

  #speakerName {
    font-size: 0.6em;
  }

  /* third row */

  #infoText1{
    font-size: 0.6em;
  }
  #infoText2{
    font-size: 0.6em;
  }
  #agendaText {
    display: block;
    padding: 5% 7% 10% 0%;
    font-size: 0.6em;
    padding-right: 7%;
  }

}
@media only screen and (max-width: 690px) {

  /* first row */

  .buttonAttend {
    margin-left: 7%;
  }
  #title {
    font-size: 1em;
    padding-left: 7%;
    padding-right: 7%;
  }
  .firstRow {
    display: unset;
  }
  .info {
    width: 85%;
    margin-left: 7.3%;
    float: none;
  }
  #infoText {
    font-size: 0.8em;
    padding: 5% 7% 10% 7%;
  }
  .attend {
    float: none;
    width: 85%;
    margin-left: 7.3%;
  }
  #attendText {
    font-size: 0.8em;
    padding-bottom: 10px;
    padding: 5% 7% 10% 7%;
  }
  .buttonAttend {
    padding: 15px 35px;
    width: 225px;
    font-size: 0.8em;
    margin-bottom: 30px;
  } 

  /*middle row*/

  .speakers {
    float: none;
  }
  .speakerFirst {
    margin: 0;
  }
  .speakerSecond {
    margin: 0;
  }
  .speakerThird {
    margin: 0;
  }
  #speakerName {
    font-size: 0.8em;
  }
  .wrap-container{
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .speaker-container{
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /*last row*/

  .present {
    float: none;
    width: 85%;
    margin-left: 7.3%;
  }
  .agenda {
    float: none;
    width: 85%;
    margin-left: 7.3%;
  }
  #infoText1{
    padding: 5% 7% 0% 7%;
    font-size: 0.8em;
    margin: 0;
  }
  #infoText2{
    padding: 5% 7% 10% 7%;
    font-size: 0.8em;
    margin: 0;
  }
  #agendaText {
    display: block;
    padding: 5% 7% 10% 0%;
    font-size: 0.8em;
    padding-right: 7%;
  }
  .agendaTime {
  width: 40%;
  margin: 20px;
  }
  .agendaSubject {
  width: 60%;
  margin: 20px;
  }

}
</style>

