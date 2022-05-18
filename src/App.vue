<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view></router-view>
    
  </div>
</template>

<script>
import MembersPage from './components/MembersPage.vue'
import LoginForm from './components/LoginForm.vue'
import ActivationForm from './components/ActivationForm.vue'
import ProfilePage from './components/ProfilePage.vue'
import Unauthorized from './components/Unauthorized.vue'
import HomePage from './components/HomePage.vue'
import ErrorPage from './components/ErrorPage.vue'
import SingleProfile from './components/SingleProfile.vue'
import firebase from 'firebase'
import EventsPage from './components/EventsPage.vue'
import Navigation from './components/Navigation.vue'
import SymposiumPage from './components/SymposiumPage.vue'

export default {
  name: 'app',
  components: {
    MembersPage,
    LoginForm,
    SingleProfile,
    ErrorPage,
    ActivationForm,
    ProfilePage,
    Unauthorized,
    HomePage,
    EventsPage,
    Navigation,
    SymposiumPage
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log(firebase.auth())
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');

body {
  background-color: #fff9f4;
  background-image: url("./assets/bgmeeting3.png");
  background-size: cover;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Montserrat';
  color: #2c3e50;
  margin-top: 56px;
}

input {
  height: 25px!important;
}

button {
  cursor: pointer;
}

button:hover {
  background: rgb(209, 120, 60)!important;
}
</style>
