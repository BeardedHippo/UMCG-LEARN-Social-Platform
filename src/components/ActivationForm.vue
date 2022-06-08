// Dit is het component dat ervoor zorgt dat gebruikers hun accounts kunnen 'activeren' of registreren. Wat hier eigenlijk
// gebeurt is dat gebruikers een 'activatiecode' krijgen. Op de achtergrond is dit eigenlijk het wachtwoord van een
// account dat op de achtergrond al vooraf wordt ingevuld. Dus in werkelijkheid logt een persoon in en met het opgegeven
// email adres maakt die persoon een nieuw account. En de app staat dit pas toe als de gebruiker is ingelogd met het
// hoofdemail adres.

<template>
    <div id="activation-container">
            <form id="activation-form">
                <h1>Account activation</h1>
                <span class="title-deco-line"></span>
                <p>Welcome to the activation form for members from LEARN.<br>
                Please activate your account by submitting the verificationcode, found in the mail, and your email address to activate your account. By activating your account here you are one step closer to easily connect with your LEARN associates.</p>
                <br><br />
                <p style="color:red">Op Github staat hoe deze registratie origineel werkte. Maar voor demo-doeleinden, hoeft er alleen een willekeurig e-mail adres ingevuld te worden (mag nep zijn, maar onthoud voor de volgende stap).</p>
                <br>
                
<!--                <span>Verification code</span><span v-if="this.$v.domain.code.$dirty && this.$v.domain.code.$invalid" class="err input-el"> - Invalid verificationcode</span> <br>               -->
<!--                <input class="input-el" type="password" name="code" v-model.lazy="domain.code" v-on:blur="$v.domain.code.$touch()" placeholder="verificationcode"><br><br />-->
                
                <span v-bind:class="{succes:succes}">Your e-mail address</span>
                <span v-if="this.$v.activeMail.email.$dirty && this.$v.activeMail.email.$invalid" class="err input-el"> - This is not a valid e-mail adress.  </span><br>
                <input class="input-el" type="email" name="email" v-model.lazy="activeMail.email" v-on:blur="$v.activeMail.email.$touch()" placeholder="Example@Example.com"><br><br />
                <button class="input-el"  v-on:click.prevent="mailLogin">Activate</button>
            </form>
    </div>
</template>


<script>
import firebase from 'firebase'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            actioncodeSettings: {
                url: 'https://cloud.hippoworks.nl/umcg-learn/activate',
                handleCodeInApp: true
            },

            activeMail: {
                email: ""
            },

            succes: false,
            // Dit is het hoofdaccount waarmee de gebruiker inlogd. Zodat de gegevens, die de gebruiker invult,
            // gebruikt kan worden om een nieuw account te maken.
            domain: {
                domain: "hippo@demohippo.nl",
                code: "demohippo" // Normaal gesproken zou dit de 'activatiecode' zijn. En vult de gebruiker zijn eigen wachtwoord pas later in.
            },

            errorcode: []
        }
    },
    validations: {
        activeMail: {
           email: {
               required: required,
               maxLength: maxLength(80),
               email: email
           }
        },
        domain: {
            code: {
                required: required
            }
        }
    },
    methods: {
        mailLogin: function () {
            if (!this.$v.$invalid) {
                let domain2 = this.domain;
                let tempDetails = this.activeMail;
                let vm = this;
                //
                // Hiermee wordt er ingelogd, en met een serie aan then-callbacks een nieuw account gemaakt.
                // Tegenwoordig zou ik dit eerder met eigen promises willen oplossen of tenminste async blokken.
                //
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
                    return firebase.auth().signInWithEmailAndPassword(domain2.domain, domain2.code).then(function() {
                        firebase.auth().createUserWithEmailAndPassword(tempDetails.email, 'demo1234').then(() => {
                            firebase.auth().signOut().then(function () {
                                vm.$router.push('/umcg-learn/login/');
                            });
                        })
                        //De code hieronder was de originale bedoeling. Dit zorgde ervoor dat gebruikers een email kregen waarmee ze direct konden inloggen.
                        //
                        // firebase.auth().sendSignInLinkToEmail(tempDetails.email, vm.actioncodeSettings).then(function() {
                        //     window.localStorage.setItem('emailForSignIn', tempDetails.email);
                        //     alert('Thank you for activating your account. Please find the activation mail in your inbox')
                        // }).catch(function(error) {
                        //     if (!error.code == 'auth/invalid-email') {
                        //         alert('Your session has timed out, please refresh the page. If this problem persists please contact support.')
                        //     }
                        // });
                    }, 
                    function(err) {
                        alert(err.message)
                    });
                });
            } else {
                this.$v.activeMail.$touch();
            }
        },
    },
    mounted() {
        // Deze blok controleerde of de gebruiker aan het inloggen was met de email-link of niet. Zo wel dan ging de gebruiker
        // naar de 'profile creation' scherm.
        let auth = firebase.auth();
        let vm = this;

         if (auth.isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            
            if (!email) {
                email = window.prompt('Please submit your e-mail one more time for security reasons.');
            }

            let route = this.$router;
            auth.signInWithEmailLink(email, window.location.href).then( function() {
                route.push('/umcg-learn/profile-creation/');
                
            }).catch(function(error) {
                vm.errorcode.push(error);
            });
        }
    }
}
</script>

<style>
#app {
  font-family: 'Montserrat';
  color: #2c3e50;
}
</style>

<style scoped>

    #activation-container {
        width: 1088px;
        margin: 0 auto;
        margin-top: 40px;
        box-shadow: 0px 3px 6px rgba(0,0,0, 10%);
        font-size: 16px;
        background-color: white;
    }

    h1 {
        font-size: 1.125em;
        font-weight: 600;
        padding-left: 40px;
        padding-right: 40px;
    }

    .title-deco-line{
        display: block;
        width: 100%;
        height: 1px;
        background: rgba(71,91,99, 10%);
    }
    
    p {
        padding: 10px 40px;
    }

    span {
        margin-left: 40px;
    }

    button {
        margin-left: 40px;
    }

    .succes {
        display: none;
    }

    #activation-form {
        padding: 10px 0 40px 0;   
    }

    #activation-form input {
        height: 20px;
        margin-top: 10px;
        padding: 10px;
        margin-left: 40px;
        text-align: center;
        width: 50%;
        border-color: rgba(0,0,0, 10%);
        border-style: solid;
        border-width: 1px;
    }

    #activation-form input:focus {
        outline-color: #FF934B;
        border-style: none;
    }

    button {
        width: 100px;
        height: 40px;
        color: white;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        background: #FF934B;
        border: 0;
        cursor: pointer;
    }

    button:active, button:hover {
        background: rgb(209, 120, 60);
    }

    .err {
        color: red;
        font-size: 12px;
    }

    @media only screen and (max-width: 1088px) {
        #activation-container {
            width: 100%;
        }
    }

</style>
