<template>
<div class="login-form-container">
    <div class="login-container">
        <div v-if="login" class="login-container-title">
            <h4>LOGIN</h4>
            <p style="color:red">Net een account gemaakt? Gebruik hier die e-mail adres. En gebruik als wachtwoord: 'demo1234'. Nog geen account gemaakt? Klik dan
                <router-link class="rb" to="/umcg-learn/activate">hier</router-link>
            </p>
            <span class="title-deco-line"></span>
        </div>
        <form v-if="login" class="form-container" v-on:submit.prevent="LoginUser">
            <div class="input-container">
                <label class="label-style" for="email">Name or email</label>
                <input class="input_field-style" style="margin-bottom: 30px;" type="text" name="email" v-model="email">
            </div>
            <div class="input-container">
                <label class="label-style" for="password">Password</label>
                <input class="input_field-style" type="password" name="password" v-model="password">
            </div>
            <div class="forgot-pass">
                <p v-on:click="passwordSender()">Forgot password?</p>
            </div>
            <div class="error">
                <p :v-show="errorMessage">{{errorMessage}}</p>
            </div>
            <input class="btn-standard-submit" type="submit" value="Login">
        </form>
        
        <div v-if="!login" class="form-container">
            <h4>FORGOT PASSWORD</h4>
            <span class="title-deco-line"></span>
            <p>If you have forgotten your password you can fill in this field with your registered email and press the send button. You will then receive reset instructions in your mailbox. </p>
            <input type="email" v-model="passwordEmail">
            <button class="btn-standard-submit" v-on:click="forgotPassword">Send reset instructions</button>
        </div>
    </div>
   
</div>
</template>

<script>
import {auth} from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: "LoginForm",
    data(){
        return{
            email: '',
            passwordEmail: '',
            password: null,
            errorMessage: null,
            login: true
        }
    },
    methods:{
        passwordSender: function() {
            this.login = false;
        },
        forgotPassword: function() {
            let auth = firebase.auth();
            let emailAddress = this.passwordEmail;
            let route = this.$router;

            auth.sendPasswordResetEmail(emailAddress).then(function() {
            alert('An e-mail with resetinstructions has been send. Returning you to the homepage');
            route.push('/umcg-learn');
            });
        },
        LoginUser(){
            let route = this.$router;
            auth.signInWithEmailAndPassword(this.email, this.password).then(result =>{
                const name = result.user.displayName === null ? '.' : ' ' + result.user.displayName + '.';
                alert(`Welcome back${name} Redirecting you to your profile.`)
                route.push('/umcg-learn/profile/' + result.user.uid);
            }).catch(err =>{
                this.errorMessage = err.message;
            })
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');
    h4{
        font-size: 1.125em;
        text-align: center;
        font-weight: 700;
    }
    .login-form-container{
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        display: flex;
        justify-content: center;
        min-height: 650px;
        width: 100%;
        margin: 0 auto;
        color:#475B63;
        
        background-size: cover;
        background-position: center;
    }
    .login-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 80px;
        height: 530px;
        width: 58%;
        background: #fff;
        box-shadow: 0px 3px 6px rgba(0,0,0, 10%);
    }
    .login-container-title{
        width: 100%;
    }
    .title-deco-line{
        display: block;
        width: 100%;
        height: 1px;
        background: rgba(71,91,99, 10%);
    }
    .form-container{
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-top: 37px;
    }
    .input-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }
    .label-style{
        margin-bottom: 10px;
        font-size: 1.6rem;
        font-weight: 500;
    }
    .input_field-style{
        width: 100%;
        height: 46px!important;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }
    .error{
        color: red;
        /* margin: 15px; */
        height: 45px;
    }
    .error p{
        margin: 0;
    }
    .forgot-pass{
        display: flex;
        font-size: 0.9em;
        cursor: pointer;
    }
    .forgot-pass p{
        margin-bottom: 5px;
    }

    .forgot-pass:hover {
        color: #FF934B!important;
    }
    .btn-standard-submit{
        align-self: flex-end;
        background: #FF934B;
        border: none;
        height: 50px!important;
        width: 45%;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        color: #fff;
        cursor: pointer;
    }
    .btn-standard-submit:hover{
        background: rgb(209, 120, 60);
    }

    @media only screen and (max-width: 1240px){
        .login-container{
            width: 100%;
        }
        .btn-standard-submit{
            width: 100%;
        }
    }

    @media only screen and (max-width: 768px) {
        /* For mobile phones: */
        .login-form-container{
            width: 100%;
            margin:0;
        }
        .login-container{
            width: 100%;
        }
        .form-container{
            width: 79%;
        }
        .btn-standard-submit{
            width: 100%;
        }
    }
    
</style>
