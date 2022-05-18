import MembersPage from './components/MembersPage.vue'
import LoginForm from './components/LoginForm.vue'
import ActivationForm from './components/ActivationForm.vue'
import ProfilePage from './components/ProfilePage.vue'
import Unauthorized from './components/Unauthorized.vue'
import HomePage from './components/HomePage.vue'
import ErrorPage from './components/ErrorPage.vue'
import SingleProfile from './components/SingleProfile.vue'
import EventsPage from './components/EventsPage.vue'
import SymposiumPage from './components/SymposiumPage.vue'
import EventPage from './components/EventPage.vue'
import firebase from 'firebase'

export default [
    {path: '/umcg-learn/', component: HomePage},
    {path: '/umcg-learn/activate', component: ActivationForm},
    {path: '/umcg-learn/error', component: ErrorPage},
    {path: '/umcg-learn/unauthorized', component: Unauthorized},
    {path: '/umcg-learn/profile-creation/', component: ProfilePage, beforeEnter: (to, from, next) => {
        firebase.auth().onAuthStateChanged(function(user){
            if (user) {
                next();
            } else {
                next('/umcg-learn/unauthorized');
            }
        });
    }},
    {path: '/umcg-learn/members', component: MembersPage},
    {path: '/umcg-learn/events', component: EventsPage},
    {path: '/umcg-learn/symposium/:id', component: SymposiumPage, name: 'symposium'},
    {path: '/umcg-learn/event/:id', component: EventPage, name: 'event'},
    {path: '/umcg-learn/login', component: LoginForm},
    {path: '/umcg-learn/profile/:id', component: SingleProfile}
]