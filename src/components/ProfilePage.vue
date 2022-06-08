// Dit is de profiel creatie pagina. Hier worden nieuwe leden naartoe geleid als hun account net gemaakt is. Deze pagina is
// vooral een opstapeling aan invulvelden met database schrijf acties.

<template>
    <div id="profile-container" class="mobile">
        <div class="new-user container" v-if="this.userData.newUser">
            <form class="new-form" action="post">
                <h1 class="newHeader">First login setup</h1>
                <span class="title-deco-line"></span>
                <p>Welcome to your LEARN dashboard. Through this dashboard you can sign up for comming events and much more. But before you can use these features it is wise to set up your own profile so others know who you are. This wont take long.</p>
                <span>First name</span>
                <span v-if="this.$v.firstProfile.firstName.$dirty && this.$v.firstProfile.firstName.$invalid" class="err"> - Something went wrong with filling in your first name. </span><br>
                <input type="text" name="firstName" v-model.lazy.trim="firstProfile.firstName" v-on:blur="$v.firstProfile.firstName.$touch()" placeholder="First name"><br><br />
            
                <span>Last name</span>
                <span v-if="this.$v.firstProfile.lastName.$dirty && this.$v.firstProfile.lastName.$invalid" class="err"> - Something went wrong with filling in your last name. </span><br>
                <input type="text" name="lastName" v-model.lazy.trim="firstProfile.lastName" v-on:blur="$v.firstProfile.lastName.$touch()" placeholder="Last name"><br><br />
                                
                <span>Title and degree</span>
                <span v-if="this.$v.firstProfile.position.$dirty && this.$v.firstProfile.position.$invalid" class="err"> - Something went wrong with filling in your title.</span><br>
                <input type="text" name="position" v-model.lazy="firstProfile.position" v-on:blur="$v.firstProfile.position.$touch()" placeholder="Title/Position. For example: Phd. proff. economics"><br><br />
                
                <span>Phone number</span>
                <span v-if="this.$v.firstProfile.number.$dirty && this.$v.firstProfile.number.$invalid" class="err"> - Something went wrong with filling in your phone number.</span><br>
                <input type="text" name="number" v-model.lazy="firstProfile.number" v-on:blur="$v.firstProfile.number.$touch()" placeholder="Phonenumber"><br><br />

                <span>Chat with me on Skype</span>
                <span v-if="this.$v.firstProfile.skypeName.$dirty && this.$v.firstProfile.skypeName.$invalid" class="err"> - Something went wrong with filling in your Skype user name.</span><br>
                <input type="text" name="skypeName" v-model.lazy="firstProfile.skypeName" v-on:blur="$v.firstProfile.skypeName.$touch()" placeholder="Skype name"><br><br />

                <button v-on:click.prevent="submitFirstProfile">Submit</button>
            </form>
        </div>
            <div class="new-user container" v-if="this.userData.newUser2">
            <form class="new-form" action="post">
                <h1 class="newHeader">One more thing</h1>
                <span class="title-deco-line"></span>
                <p>There is one more thing. To show others who you are it's best to set up the following three features: </p>
                
<!--                <span>Profile picture</span>-->
<!--                <span v-if="!this.$v.firstProfile2.photo.$dirty">Please paste a URL/weblink to a profile picture stored on facebook, drive or any other medium. Your profile will output this in the dimensions of 100x150 pixels.</span>-->
<!--                <span v-if="this.$v.firstProfile2.photo.$dirty && this.$v.firstProfile2.photo.$invalid" class="err"> Something went wrong with uploading your picture. Make sure it's from a public source and starts with http:// or https:// </span><br>-->
<!--                <input type="text" name="imgURL" v-model.lazy="firstProfile2.photo" v-on:blur="$v.firstProfile2.photo.$touch()" placeholder="Photo url"><br><br />-->
<!--            -->
                <span>Expertises</span>
                <span v-if="this.$v.firstProfile2.expertise.$dirty && this.$v.firstProfile2.expertise.$invalid" class="err"> - Something went wrong with choosing your experises. </span><br>
               <br><button class="selection-button" v-on:click.prevent="selection('selectExpertise')">Show all possible expertises</button><br><br />
               
               <div v-if="selectExpertise" class="selection">
                   <div v-on:click.prevent="selection('selectExpertise')" class="cancel">X</div>
                    <ul>
                        <li v-for="interest in interests" v-bind:key="interest">
                            <input type="checkbox" name="expertise" v-model.lazy.trim="firstProfile2.expertise" v-on:blur="$v.firstProfile2.expertise.$touch()" v-bind:value="interest.interestID">{{interest.interestName}}
                        </li>
                    </ul>   
                </div>

                <span>Interests</span>
                <span v-if="this.$v.firstProfile2.interests.$dirty && this.$v.firstProfile2.interests.$invalid" class="err"> - Something went wrong with choosing your interests. Please select atleast 3 interests. </span><br>
                <br><button class="selection-button" v-on:click.prevent="selection('selectInterest')">Show all possible interests</button><br>
                <div v-if="selectInterest" class="selection">
                    <div v-on:click.prevent="selection('selectInterest')" class="cancel">X</div>
                    <ul>
                        <li v-for="interest in interests" v-bind:key="interest">
                            <input type="checkbox" v-model="firstProfile2.interests" v-on:blur="$v.firstProfile2.interests.$touch()" v-bind:value="interest.interestID">{{interest.interestName}}
                        </li>
                    </ul>
                </div>
                <br><br />
                <span class="title-deco-line"></span>
                <br><button v-on:click.prevent="submitFirstProfile2">Submit</button>
            </form>
        </div>
    </div>
</template>


<script>
import firebase from 'firebase'
import axios from 'axios'
import { required, maxLength, url } from 'vuelidate/lib/validators'


export default {
    data () {
        return {
            userData: {
                newUser: false,
                newUser2: false
            },

            firstProfile: {
                firstName: "",
                lastName: "",
                number: "",
                skypeName: "",
                position: "",
                placeholdGroup: [
                    {
                        interestGroupID: "ojjno2234",
                        interestGroupName: "LEARN Network"
                    }
                ]
            },

            firstProfile2: {
                photo: "https://cloud.hippoworks.nl/umcg-learn/profile_pic.jpg",
                expertise: [],
                interests: [],
                interestGroup: [],
                interestNames: [],
                expertiseNames:[]

            },
            interests: [],
            interestsRef: {},
            interestGroups: {},
            selectExpertise: false,
            selectInterest: false,
            errorcode: [],
        }
    },
    validations: {
        firstProfile: {
           firstName: {
               required: required,
               maxLength: maxLength(35)
           },
           lastName: {
               required: required,
               maxLength: maxLength(35) 
           },
           position: {
               required: required,
               maxLength: maxLength(80) 
           },
           number: {
               required: required,
               maxLength: maxLength(12)
           },
           skypeName: {
               maxLength: maxLength(24)
           }
        },
        firstProfile2: {
           photo: {
               required: required,
               url: url,
            },
           expertise: {
               
           },
           interests: {
               required: required
           },
        }
    },
    methods: {
        selection: function(selector) {
            if(this[selector] == true) {
                this[selector] = false;
            } else if (this[selector] == false) {
                this[selector] = true;
            }   
        },
        // Dit is het eerste scherm met invulvelden van de profiel creatie
        submitFirstProfile: function() {
            if (!this.$v.firstProfile.$invalid) {
                let user = firebase.auth().currentUser;
                let tempDetails = this.firstProfile;
                let firstPartIndex = user.email.indexOf("@");
                let firstPart = user.email.slice(0, firstPartIndex);
                let thirdPartIndex = user.email.lastIndexOf(".");
                let thirdPart = user.email.slice(thirdPartIndex);
                let secondPartPreIndex = user.email.length - thirdPartIndex;
                let secondPartIndex = user.email.length - secondPartPreIndex;
                let secondPart = user.email.slice(firstPartIndex + 1, secondPartIndex );
                let vm = this;

                firebase.database().ref('member/' + user.uid).set({
                    firstName: tempDetails.firstName,
                    lastName: tempDetails.lastName,
                    position: tempDetails.position,
                    phoneNumber: tempDetails.number,
                    skypeName: tempDetails.skypeName,
                    firstPart: firstPart,
                    secondPart: secondPart,
                    thirdPart: thirdPart,
                    interesseGroup: tempDetails.placeholdGroup
                }).then(function(error) {
                    vm.errorcode.push(error);
                });

                let currentUser = tempDetails.firstName + tempDetails.lastName;
                let router = this.$router;
                user.updateProfile({
                    displayName: currentUser
                }).then(function() {
                    alert('Making your profile has been a succes! Please continue. ');
                    router.push('/umcg-learn/profile/' + user.uid);
                });

            } else {
                this.$v.firstProfile.$touch();
            }
        },
        // Dit is het tweede scherm met invulvelden van de profiel creatie
        submitFirstProfile2: function() {
            if (!this.$v.firstProfile2.$invalid) {
                let route = this.$router;
                this.firstProfile2.interestGroup = [];
                var ig = 'https://learn-demo-6a15f-default-rtdb.firebaseio.com/interestGroupInterest.json';
                axios.get(ig).then((response) => {
                    for (let key in response.data) {
                        let interests = this.firstProfile2.interests.length;
                        for (let i = 0; i < interests; i++) {
                            if(response.data[key][this.firstProfile2.interests[i]]) {

                                 let arr = this.firstProfile2.interestGroup;

                                     if (arr.indexOf(key) == -1) {
                                        this.firstProfile2.interestGroup.unshift(key);
                                        this.firstProfile2.interestGroup.push({
                                            interestGroupID: key,
                                            interestGroupName: this.interestGroups[key].name
                                        });
                                     }
                            }
                                                    
                        }
                    };
                    let splice = this.firstProfile2.interestGroup.length / 2;
                    this.firstProfile2.interestGroup.splice(0, splice);
                    this.firstProfile2.interestGroup.unshift({
                        interestGroupID: "ojjno2234",
                        interestGroupName: "LEARN Network"
                    })

                    for (let i = 0; i < this.firstProfile2.interests.length; i++) {
                        this.firstProfile2.interestNames.push(this.interestsRef[this.firstProfile2.interests[i]].name)
                    }
                    for (let i = 0; i < this.firstProfile2.expertise.length; i++) {
                        this.firstProfile2.expertiseNames.push(this.interestsRef[this.firstProfile2.expertise[i]].name)
                    }
                    this.$forceUpdate();
                    this.$nextTick(function() {
                        let user = firebase.auth().currentUser;
                        let tempDetails2 = this.firstProfile2;
                        let vm = this;

                        firebase.database().ref('member/' + user.uid).update({
                            photoURL: tempDetails2.photo,
                            expertise: tempDetails2.expertiseNames,
                            interests: tempDetails2.interestNames,
                            interesseGroup: tempDetails2.interestGroup
                        }).catch(function(error) {
                            vm.errorcode.push(error);
                        });


                user.updateProfile({
                        photoURL: this.firstProfile2.photo
                    }).then(function() {
                        alert('Thank you for finishing your profile.')
                        route.push('/umcg-learn/profile/' + user.uid);
                    });
                    })
                });

            } else {
                this.$v.firstProfile2.$touch()
            }
        },
        updatePassword: function() {
            let user = firebase.auth().currentUser;
            let userProvidedPassword = this.profileForm.oldPassword;
            let credential = firebase.auth.EmailAuthProvider.credential(
                user.email, 
                userProvidedPassword
            );
            let vm = this;

            user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
                let newPassword = this.profileForm.password;

                user.updatePassword(newPassword).then(function() {
                    console.log('Bericht dat het wachtwoord veranderd is. ')
                }).catch(function(error) {
                    console.log('Bericht dat er een fout was en dat een admin tehulp moet schieten')
                    console.log('2' + "- " + error);
                    vm.errorcode.push(error);
                });
            }).catch(function(error) {
                console.log('Bericht dat er een fout was en dat een admin tehulp moet schieten')
                console.log('1' + "- " + error);
                vm.errorcode.push(error);
            });
        }
    },
    beforeCreate () {
        // Hier wordt gevontroleerd of de gebruiker werkelijk is ingelogd en hoever de gebruiker is met het invullen
        // van het profiel. (Voor het geval dat er een disconnect of iets dergelijke was)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var userName = user.displayName;
                var profilePhoto = user.photoURL;
                let route = this.$router;

                axios.get('https://learn-demo-6a15f-default-rtdb.firebaseio.com/interest.json').then((response) => {
                    for (let key in response.data) {
                        this.interests.push(
                            { interestName: response.data[key].name,
                            interestID: key
                            });
                        this.interestsRef[key] = {
                            name: response.data[key].name
                        };
                    };
                });

                axios.get('https://learn-demo-6a15f-default-rtdb.firebaseio.com/interestGroup.json').then((response) => {
                    for (let key in response.data) {
                        this.interestGroups[key] = {
                            name: response.data[key]
                            }
                    };
                });

                // Dit wordt dan gecontroleerd op basis van de userNameen profielfoto.
                if (userName === null) {
                    this.userData.newUser = true;
                } else if (profilePhoto === null) {
                    this.userData.newUser2 = true;

                    let uid = firebase.auth().currentUser.uid
                    axios.get('https://learn-demo-6a15f-default-rtdb.firebaseio.com/member/' + uid + '.json').then((response) => {
                        this.firstProfile.firstName = response.data.firstName,
                        this.firstProfile.lastName = response.data.lastName,
                        this.firstProfile.number = response.data.phoneNumber,
                        this.firstProfile.skypeName = response.data.skypeName,
                        this.firstProfile.position = response.data.position
                    });
                } else if (userName && profilePhoto) {
                    let uid = firebase.auth().currentUser.uid
                    alert('You have already created a profile. Redirecting to your profile..');
                    route.push('/umcg-learn/profile/' + uid);
                }
            }
        });
    }
}
</script>

<style scoped>
    #profile-container {
        width: 1640px;
        margin: 0 auto;
        position: relative;
        font-size: 16px;
        margin-top: 40px;
    }
    
    .selection {
        position: fixed;
        top: 0;
        background: white;
        overflow: scroll;
        height: 100%;
        left: 0;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    h1 {
        font-size: 1.125em;
        font-weight: 600;
        margin-left: 40px;
        margin-right: 40px;
    }

    .title-deco-line{
        display: block;
        margin-bottom: 20px;
        width: 100%;
        height: 1px;
        background: rgba(71,91,99, 10%);
    }

    .new-form p{
        margin-bottom: 40px;
    }

    #profile-container input {
        height: 20px;
        padding: 10px;
        width: 250px;
        text-align: center;
        border-color: rgba(0,0,0, 10%);
        border-style: solid;
        border-width: 1px;
    }

    .selection-button {
        width: 300px!important;
    }

    #profile-container input:focus {
        outline-color: #FF934B;
        border-style: none;
    }

    #profile-container button {
        width: 100px;
        height: 40px;
        color: white;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        background: #FF934B;
        border: 0;
        margin-left: 40px;
    }

    #profile-container button:active {
        background: #c55819;;
        border-bottom: 2px solid #db631d5d;
        box-shadow: inset 0px -5px #db631d5d;
    }

    input {
        margin-left: 40px;
    }

    span {
        padding-left: 40px;
        padding-right: 40px;
        display: inline-block;
    }

    .cancel {
        font-size: 36px;
        position: fixed;
        right: 40px;
        top: 40px;
        cursor: pointer;
    }
    .err {
        color: red;
        font-size: 12px;
    }

    .new-user {
        position: absolute;
        z-index: 20;
        background-color: white;
        width: 600px;
        height: 620px;
        margin: 0 auto;
        left: 50%;
        margin-left: -300px;
    }
    .new-user p{
        padding: 20px;
        padding-left: 40px;
        padding-right: 40px;
    }

    .new-user h1 {
        margin-top: 20px;
    }

    @media screen and (max-width: 1640px) {
        .mobile {
            width: 100%!important;
            padding: 30px 0px;
        }
    }

    @media screen and (max-width: 800px) {
        .new-user {
            width: 100%;
            left: 0%;
            margin-left: 0px;
        }
    }
</style>
