<template>
    <div id="navigation">
        <input id="toggle" type="checkbox"/>
        <label class="hamburger" for="toggle">
            <div class="top-bun"></div>
            <div class="meat"></div>
            <div class="bottom-bun"></div>
        </label>

        <ul class="menu" id="menuItems">
            <li><a href="/umcg-learn/" id="home">HOME</a></li>
            <li><a href="/umcg-learn/members" id="members">MEMBERS</a></li>
            <li><a href="/umcg-learn/events" id="events">EVENTS</a></li>
            <li v-if="signedIn"><a v-bind:href="profileLink">Profile</a></li>
            <li v-if="!signedIn"><a href="/umcg-learn/login" id="login">LOGIN</a></li>
            <li v-if="signedIn"><a href="#" id="login" v-on:click.prevent="signOut()">LOGOUT</a></li>
        </ul>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        data() {
            return {
                signedIn: false
            }
        },
        computed: {
            profileLink: function () {
                if (this.signedIn == true) {
                    return '/umcg-learn/profile/' + firebase.auth().currentUser.uid;
                } else {
                    return '/umcg-learn/members/'
                }
            }
        },
        methods: {
            signOut: function () {
                firebase.auth().signOut().then(function () {
                    alert('Succesfully signed out. Refreshing page.')
                    location.reload();
                });
            }
        },
        beforeCreate() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.signedIn = true;
                }
            });
        }
    }
</script>

<style scoped>
    #navigation {
        font-size: 16px;
        position: fixed;
        width: 100%;
        z-index: 15;
        top: 0;
    }

    /*Everything for the menu*/

    .menu {
        background: white;
        box-shadow: 2px 2px lightgrey;
        text-align: right;
        margin: 0;
        padding-top: 20px;
        padding-bottom: 17px;
    }

    .menu li {
        list-style-type: none;
        border-bottom: 3px solid transparent;
        display: inline;
    }

    .menu li a {
        padding: 30px;
        font-size: 0.7em;
        color: #475B63;
        text-decoration: none;
    }

    #login {
        margin-right: 6.5%;
    }

    #events {
        margin-right: 3px;
    }

    #members {
        margin-right: -7px;
    }

    #home {
        margin-right: -2px;
    }

    /*Menu responsive*/

    #toggle {
        position: fixed;
        z-index: 99;
        display: none;
    }

    @media screen and (max-width: 1024px) {
        #menuItems a {
            display: none;
            float: none;
        }

        #toggle {
            display: none;
        }
    }

    @media screen and (max-width: 1024px) {
        .menu {
            padding-top: 28px;
            padding-bottom: 28px;
        }

        .hamburger {
            margin-top: 14px;
            float: right;
            width: 3em;
        }

        .hamburger div {
            position: relative;
            z-index: 50;
            width: 1.5em;
            height: 4px;
            border-radius: 3px;
            background-color: #475B63;
            margin-top: 5px;
            transition: all 0.1s ease-in-out;
        }

        #toggle:checked + .hamburger + .menu {
            position: fixed;
            z-index: 45;
            width: 100%;
            height: 100%;
            padding-top: 0;
            padding-left: 0;
            padding-bottom: 0;
        }

        #toggle:checked + .hamburger + .menu li a {
            text-align: center;
            display: block;
            float: none;
            padding-top: 40px;
            font-size: 1.3em;
        }

        #toggle:checked + .hamburger + #menuItems #login {
            margin-right: 0;
        }

        #toggle:checked + .hamburger + #menuItems #home {
            margin-top: 17%;
        }
    }

    /* Animation toggle  */

    #toggle:checked + .hamburger .top-bun {
        transform: rotate(45deg);
        opacity: 0;
    }

    #toggle:checked + .hamburger .bottom-bun {
        transform: rotate(-45deg);
        margin-top: -4px;
    }

    #toggle:checked + .hamburger .meat {
        transform: rotate(45deg);
    }
</style>
