<template>
    <div id="main-container" class="mobile" v-bind:class="{ navheight: editor.topBar }">
        <div v-if="editor.topBar" id="top-bar">
            <p>You are now in editor mode. To submit all changes done to your profile please press submit. To cancel all changes, you can press cancel here. To cancel the changes of a specific section, for example your interests, simply press cancel in that section. </p>
            <button class="cancel-button" v-on:click.prevent="quitEditMode()">Cancel all changes</button>
            <button v-on:click.prevent="confirmEdit()">Submit</button>
            
        </div>
        <div v-if="this.backlight" class="backlight"></div>
                <div v-if="confirmation" id="confirmation" class="padding">
                    Are you sure you wish to submit your profile changes? Any unsubmitted changes from other sections will also be submitted. 
                    <br><button v-on:click.prevent="confirmEdit">Cancel</button>
                    <button v-on:click.prevent="updateProfileData()">Submit</button>
                    
                </div>
                <div id="title-bar">
                    <span class="link" v-on:click="prevPage()">&#60;&#60; Back to previous page</span>
                    <h1><b>Profile</b> {{this.currentProfile.firstName + " " + this.currentProfile.lastName}}</h1>
                </div>
                <div class="outer-left-container mobile">
                    <div v-if="this.editor.abstractEditor" class="profile-abstract-container container mobile">
                        <h3>Update your abstract</h3>
                        <form class="form-class">
                            <span>Change your first name:</span><input type="text" v-model="updateProfile.firstName" v-bind:placeholder="this.currentProfile.firstName">
                            <br><span>Change your last name:</span><input type="text" v-model="updateProfile.lastName" v-bind:placeholder="this.currentProfile.lastName">
                            <br><span>Change your position:</span><input type="text" v-model="updateProfile.position" v-bind:placeholder="this.currentProfile.position">
                            <br><span>Change your phone number:</span><input type="text" v-model="updateProfile.phoneNumber" v-bind:placeholder="this.currentProfile.phoneNumber">
                            <br><span>Change your Skype name:</span><input type="text" v-model="updateProfile.skypeName" v-bind:placeholder="this.currentProfile.skypeName">
                            <br><span>Change your e-mail address:</span><input type="text" v-model="updateProfile.email" v-bind:placeholder="this.currentProfile.email">
                            <br><span>Change your profilephoto:</span><input type="text" v-model="updateProfile.photoURL" v-bind:placeholder="this.currentProfile.photoURL">
                            <br><span>Change your password: To reset your password please click on <a href="#" v-on:click.prevent="forgotPassword()">this</a> link.  </span>
                            <br><button v-on:click.prevent="editMode('abstractEditor')">Cancel</button>
                        </form>
                    </div>
                    <div v-if="!this.editor.abstractEditor" class="profile-abstract-container container mobile">
                        <span v-if="editorPriv" class="editor link" v-on:click="editMode('abstractEditor')">[Edit]</span>
                        <div id="profile-img">
                            <img v-bind:src="this.currentProfile.photoURL" alt="profile-picture">
                        </div>
                        <div id="profile-abstract">
                            <h3>{{this.currentProfile.firstName + " " + this.currentProfile.lastName}}</h3>
                            <p>{{this.currentProfile.position}}</p>
                            <p> 
                                <br><br>
                                {{this.currentProfile.email}}
                                <br>
                                {{this.currentProfile.phoneNumber}}
                                <br>
                                <a v-if="this.currentProfile.skypeName" :href="skypeURL">Chat with me on Skype</a>
                            </p>
                        </div>
                    </div>

                    <div v-if="this.editor.expertiseEditor" class="profile-expertise-container container mobile" v-bind:class="{overflow: this.editor.expertiseEditor}">
                        <h3>Update expertises</h3>
                        <ul>
                            <li v-for="expertise in this.databaseData.interests" v-bind:key="expertise.interestName">{{expertise.interestName}}<input type="checkbox" v-model="updateProfile.expertise" v-bind:value="expertise.interestName" v-bind:key="expertise.interestName"></li>
                        </ul>
                        <br><button v-on:click.prevent="editMode('expertiseEditor')">Cancel</button>
                        
                    </div>

                    <div v-if="publicExpertise" class="profile-expertise-container container mobile">
                        <span v-if="editorPriv" class="editor link" v-on:click="editMode('expertiseEditor')">[Edit]</span>
                        <h3>Expertise</h3>
                        <ul v-if="!this.editor.noExpertise">
                            <li v-for="expertise in this.currentProfile.expertise" v-bind:key="expertise">{{expertise}}</li>
                        </ul>
                        <p v-if="hasExpertise">Because this is your own profile, this message is visible. If you wish to add expertises, please click the edit button. </p>
                    </div>

                    <div v-if="this.editor.interestGroupEditor" class="profile-interestgroup-container container mobile">
                        <h3>Update Interest group</h3>
                        <p>To update your interest group, please select interests. If your interests match the required interests for the group, you will be automaticly added.</p>
                        <br><button v-on:click.prevent="editMode('interestGroupEditor')">Cancel</button>
                    </div>

                    <div v-if="!this.editor.interestGroupEditor" class="profile-interestgroup-container container mobile">
                        <span v-if="editorPriv" class="editor link" v-on:click="editMode('interestGroupEditor')">[Edit]</span>
                        <h3>Interest groups</h3>
                        <ul>
                            <li v-for="interestGroup in this.currentProfile.interesseGroup" v-bind:key="interestGroup.interestGroupName">{{interestGroup.interestGroupName}}</li>
                        </ul>
                    </div>

                    <div v-if="this.editor.interestEditor" id="profile-interest-container" v-bind:class="{overflow: this.editor.interestEditor}" class="container mobile">
                        <h3>Update interests</h3>
                        <ul>
                            <li v-for="interest in this.databaseData.interests" v-bind:key="interest.interestName">{{interest.interestName}}<input type="checkbox" v-model="updateProfile.interests" v-bind:value="interest.interestName"></li>
                        </ul>
                        <br><button v-on:click.prevent="editMode('interestEditor')">Cancel</button>
                       
                    </div>

                    <div v-if="!this.editor.interestEditor" id="profile-interests-container" class="container mobile">
                        <span v-if="editorPriv" class="editor link" v-on:click="editMode('interestEditor')">[Edit]</span>
                        <h3>Interests</h3>
                        
                        <ul class="column-2">
                            <li v-for="interest in this.currentProfile.interests" v-bind:key="interest">{{interest}}</li>
                        </ul>
                    </div>
                </div>
                <div class="outer-right-container mobile">
                    <div class="right-left-container container no-padding mobile">
                        <div id="biography">
                            <span v-if="editorPriv" class="editor link" v-on:click="editMode('biographyEditor')">[Edit]</span>
                            <h3 class="left">Biography</h3>
                            <div v-if="!this.editor.biographyEditor">
                                <p v-if="!this.editor.noBio">{{this.currentProfile.biography}}</p>
                                <p v-if="this.editor.noBio">Welcome to my profile. My name is {{this.currentProfile.firstName + " " + this.currentProfile.lastName}} and I am a part of LEARN. </p>
                                <p v-if="hasBiography">Because this is your profile, and you're logged in, you see this message. Please tell the world what you studied, what your ambitions are and what made you a researcher, so others know more about your background. </p>
                            </div>

                            <div v-if="this.editor.biographyEditor">
                                <p>Use this field to update your biography</p>
                                <textarea v-model="updateProfile.biography" name="biography" id="bio-style" cols="50" rows="10"></textarea>
                                <br><button v-on:click.prevent="editMode('biographyEditor')">Cancel</button>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div class="right-right-container container mobile">
                        <div v-if="this.editor.researchEditor" class="backlight">
                           <div id="profile-research-editor" class="padding">
                                <h3>Research editor</h3>
                                <p>Please use this panel to edit, add or remove any of your research/publications</p>
                                <button v-on:click.prevent="editMode('researchEditor')">Back</button>
                                <button v-on:click="addResearchTrigger($event)">Add research</button>
                                <button v-if="!this.editor.addResearch" v-on:click.prevent="confirmEdit()" class="sp_btn">Delete selected research</button>

                               <div v-if="!this.editor.singleResearchEditor" v-show="!this.editor.addResearch" id="research-list">
                                    <table class="researchTable" style="height: auto;" width="720">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="research in this.currentProfile.research" v-bind:key="research.researchTitle">
                                                <td>{{research.researchTitle}}</td>
                                                <td class="link"><a v-on:click="editResearchTrigger($event)" v-bind:class="research.id">Edit</a> | <input type="checkbox" v-model="updateProfile.deletedResearch" v-bind:value="research.id"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                               </div>

                               <div v-if="this.editor.singleResearchEditor" class="single-editor">
                                    <h3>Update this research</h3>
                                    <form class="form-class">
                                        <span>Update the title:</span><input type="text" v-model="updateProfile.research[editor.currentEdit].researchTitle" v-bind:placeholder="this.editor.researchPlaceholder[0]">
                                        <br><span>Update the abstract:</span><input type="text" v-model="updateProfile.research[editor.currentEdit].researchAbstract" v-bind:placeholder="this.editor.researchPlaceholder[1]">
                                        <br><span>Update the URL:</span><input type="text" v-model="updateProfile.research[editor.currentEdit].researchURL" v-bind:placeholder="this.editor.researchPlaceholder[2]">
                                        <br><button v-on:click.prevent="editResearchTrigger($event)">Cancel</button>
                                        <button v-on:click.prevent="confirmEdit()">Submit</button>
                                    </form>
                               </div>

                               <div v-if="this.editor.addResearch" class="add-research">
                                    <h3>Add research</h3>
                                    <form class="form-class">
                                        <span>Update the title:</span><input type="text" v-model="editor.newResearch.researchTitle" placeholder="Title of your research">
                                        <br><span>Update the abstract:</span><input type="text" v-model="editor.newResearch.researchAbstract" placeholder="Abstract of your research.">
                                        <br><span>Update the URL:</span><input type="text" v-model="editor.newResearch.researchURL" placeholder="URL to research document">
                                        <br><button v-on:click.prevent="addResearchTrigger($event)">Cancel</button>                                        
                                        <button v-on:click.prevent="confirmEdit()">Submit</button>
                                    </form>
                               </div>
                            
                           </div>
                        </div>
                        <div id="profile-research-container">
                            <span v-if="editorPriv" class="editor link" v-on:click="editMode('researchEditor')">[Research editor]</span>
                            <h3 class="left">My research</h3>
                            <div class="searchfield">
                                <p>Research on title</p>
                                <input type="text" placeholder="Search for research" v-model="filterResearch">
                            </div>
                            <br>
                            <br>
                            
                            <ul class="research-list">
                                <li v-for="item in filteredResearch" v-bind:key="item.researchTitle">
                                    <h4>{{item.researchTitle}}</h4>
                                    <p>{{item.researchAbstract}}</p>
                                    <span class="link"><a v-bind:href="item.researchURL" target="_BLANK">Read more</a></span>
                                    <span class="title-deco-line"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
    data () {
        return {
            id: this.$route.params,
            pageLoad: false,
            currentProfile: {
                firstName: "",
                lastName: "",
                position: "",
                email: "",
                phoneNumber: "",
                skypeName: "",
                photoURL: "",
                expertise: [],
                interests: [],
                interestGroup: [],
                biography: "",
                research: []
            },
            updateProfile: {
                firstName: "",
                lastName: "",
                position: "",
                email: "",
                phoneNumber: "",
                skypeName: "",
                photoURL: "",
                expertise: [],
                interests: [],
                interestIDs: [],
                interestGroup: [],
                deletedResearch: [],
                research: [
                ]
            },
            editor: {
                abstractEditor: false,
                expertiseEditor: false,
                interestEditor: false,
                researchEditor: false,
                interestGroupEditor: false,
                biographyEditor: false,
                noBio: false,
                noExpertise: false,
                singleResearchEditor: false,
                currentEdit: "",
                researchPlaceholder: ["none", "none", "none"],
                addResearch: false,
                newResearch: {
                    researchTitle: "",
                    researchAbstract: "",
                    researchURL: "",
                    id: "0"
                },
                topBar: false
            },
            databaseData: {
                interests:[],
                interestsRef: {},
                interestGroups: {}
            },
            editModeActive: false,
            ownProfile: false,
            confirmation: false,
            filterResearch: "",
            backlight: false
        }
    },
    computed: {
        filteredResearch: function() {
            return this.currentProfile.research.filter((research) => {
                return research.researchTitle.toLowerCase().includes(this.filterResearch.toLowerCase());
            });
        },
        skypeURL: function() {
           return `skype:-${this.currentProfile.skypeName}-?chat`;
        },
        editorPriv: function() {
            if (this.pageLoad == true) {
                if (firebase.auth().currentUser.uid == this.$route.params.id) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        hasExpertise: function() {
            if (this.pageLoad == true) {
                if (firebase.auth().currentUser.uid == this.$route.params.id) {
                    if ( this.editor.noExpertise == true ) {
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.editor.noExpertise = false;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }

        },
        publicExpertise: function() {
            if (this.pageLoad == true) {
                if (firebase.auth().currentUser.uid == this.$route.params.id) {
                    if (this.editor.expertiseEditor == true ){
                        return false;
                    } else if (this.editor.expertiseEditor == false) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else if (this.editor.noExpertise == true) {
                return false;
            } else {
                return false;
            }
        },
        hasBiography: function() {
            if (this.pageLoad == true) {
                if (firebase.auth().currentUser.uid == this.$route.params.id) {
                    if ( this.editor.noBio == true ) {
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.editor.noBio = false;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },
    methods: {
        prevPage: function() {
            window.history.back();
        },
        forgotPassword: function() {
            let auth = firebase.auth();
            let emailAddress = auth.currentUser.email;

            auth.sendPasswordResetEmail(emailAddress).then(function() {
            alert('An e-mail with resetinstructions has been send.');
            });
        },
        editMode: function(editor) {
            if(firebase.auth().currentUser.uid == this.$route.params.id) {
                if (this.$data.editor[editor] == false) {
                    this.$data.editor[editor] = true;
                    this.$data.editor[editor] = 
                    this.editor.topBar = true;
                    this.$emit('test', 'hoi');
                    this.$forceUpdate();
                } else if (this.$data.editor[editor] == true) {
                    this.$data.editor[editor] = false;

                    if (
                        this.editor.abstractEditor == false &&
                        this.editor.expertiseEditor == false &&
                        this.editor.interestEditor == false &&
                        this.editor.researchEditor == false &&
                        this.editor.interestGroupEditor == false &&
                        this.editor.biography1Editor == false &&
                        this.editor.biography2Editor == false &&
                        this.editor.biography3Editor == false &&
                        this.editor.singleResearchEditor == false
                    ) {
                        this.editor.topBar = false;
                    }
                    this.$forceUpdate();
                }
            }
        },
        editResearchTrigger: function(event) {
            let id = event.target.className - 1;
            let idSelector = this.currentProfile.research[id];
            
            if (this.editor.singleResearchEditor) {
                this.currentProfile.research[this.editor.currentEdit].researchTitle = this.editor.researchPlaceholder[0];
                this.currentProfile.research[this.editor.currentEdit].researchAbstract = this.editor.researchPlaceholder[1];
                this.currentProfile.research[this.editor.currentEdit].researchURL = this.editor.researchPlaceholder[2];
                this.editor.singleResearchEditor = false;
            } else if (!this.editor.singleResearchEditor) {
                this.editor.singleResearchEditor = true;
                this.editor.currentEdit = id;
                this.editor.researchPlaceholder[0] = idSelector.researchTitle;
                this.editor.researchPlaceholder[1] = idSelector.researchAbstract;
                this.editor.researchPlaceholder[2] = idSelector.researchURL;
            }
           
        },
        addResearchTrigger: function() {

            if (this.currentProfile.research[0] == undefined) {
                this.editor.newResearch.id = '1'
            } else {
                for (let key in this.currentProfile.research) {
                    if (this.currentProfile.research[key].id >= this.editor.newResearch.id) {
                        this.editor.newResearch.id = this.currentProfile.research[key].id;
                        this.editor.newResearch.id++;
                        this.editor.newResearch.id = this.editor.newResearch.id.toString();
                    }
                }
            }

            if (this.editor.addResearch) {
                this.editor.addResearch = false;

            } else if (!this.editor.addResearch) {
                this.editor.addResearch = true;

            }
        },
        confirmEdit: function() {
            if (this.confirmation == true) {
                this.confirmation = false;
                this.backlight = false;
            } else {
                this.confirmation = true;
                this.backlight = true;

                
                for (let key in this.updateProfile.deletedResearch) {
                    let researchID = this.updateProfile.deletedResearch[key];
                    for (let i = 0; i < this.updateProfile.research.length; i++) {
                        
                        if (this.updateProfile.research[i].id == researchID) {
                            this.updateProfile.research[i] = "";
                            this.updateProfile.research.sort();
                            this.updateProfile.research.shift();
                        }
                    }
                }

                if (this.editor.newResearch.id !== '0') {
                    if (this.editor.newResearch.researchTitle !== "" && 
                    this.editor.newResearch.researchAbstract !== "" && 
                    this.editor.newResearch.researchURL !== "") {
                        this.editor.newResearch.id.toString();
                        this.updateProfile.research.push(this.editor.newResearch);

                    }
                }

                this.updateProfile.interestGroup = [];
                this.updateProfile.interestIDs = [];

                for (let key in this.updateProfile.interests) {
                    let interestID = this.databaseData.interests.length;
                    for (let i = 0; i < interestID; i++) {
                        if (this.databaseData.interests[i].interestName == this.updateProfile.interests[key]) {
                            this.updateProfile.interestIDs.push(this.databaseData.interests[i].interestID);
                        }
                    }
                }

                var ig = 'https://learn-demo-6a15f-default-rtdb.firebaseio.com/interestGroupInterest.json';
                axios.get(ig).then((response) => {
                    for (let key in response.data) {
                        let interests = this.updateProfile.interestIDs.length;
                        for (let i = 0; i < interests; i++) {
                            if(response.data[key][this.updateProfile.interestIDs[i]]) {
                                let arr = this.updateProfile.interestIDs;

                                if (arr.indexOf(key) == -1) {
                                    this.updateProfile.interestIDs.unshift(key);
                                    this.updateProfile.interestGroup.push({
                                        interestGroupID: key,
                                        interestGroupName: this.databaseData.interestGroups[key].name
                                    });
                                }
                            }                                                        
                        }
                    }
                });
            }
            
        },
        quitEditMode: function() {
            location.reload();
        },
        updateProfileData: function() {
            let user = firebase.auth().currentUser;
            let firstPartIndex = this.updateProfile.email.indexOf("@");
            let firstPart = this.updateProfile.email.slice(0, firstPartIndex);
            let thirdPartIndex = this.updateProfile.email.lastIndexOf(".");
            let thirdPart = this.updateProfile.email.slice(thirdPartIndex);
            let secondPartPreIndex = this.updateProfile.email.length - thirdPartIndex;
            let secondPartIndex = this.updateProfile.email.length - secondPartPreIndex;
            let secondPart = this.updateProfile.email.slice(firstPartIndex + 1, secondPartIndex );

                if (this.editor.abstractEditor == true) {
                    firebase.database().ref('member/' + user.uid).update({
                        firstName: this.updateProfile.firstName,
                        lastName: this.updateProfile.lastName,
                        position: this.updateProfile.position,
                        firstPart: firstPart,
                        secondPart: secondPart,
                        thirdPart: thirdPart,
                        phoneNumber: this.updateProfile.phoneNumber,
                        skypeName: this.updateProfile.skypeName,
                        photoURL: this.updateProfile.photoURL
                    });
                }

                if (this.editor.expertiseEditor == true) {
                    firebase.database().ref('member/' + user.uid).update({
                        expertise: this.updateProfile.expertise,
                    })    
                }

                if (this.editor.biographyEditor == true) {
                    firebase.database().ref('member/' + user.uid).update({
                        biography: this.updateProfile.biography,
                    })    
                }

                if (this.editor.interestEditor == true) {
                    firebase.database().ref('member/' + user.uid).update({
                        interests: this.updateProfile.interests,
                        interesseGroup: this.updateProfile.interestGroup,
                    })    
                }

                if (this.editor.researchEditor == true) {
                    firebase.database().ref('member/' + user.uid).update({
                        research: this.updateProfile.research
                    })    
                }

            alert('Thank you for finishing your profile. Refreshing in 2 seconds after closing this window.');

            setTimeout(() => {location.reload()}, 2000);
        }
    },
    beforeMount () {
        axios.get('https://learn-demo-6a15f-default-rtdb.firebaseio.com/member/' + this.$route.params.id + '.json').then((response) => {
                this.currentProfile.firstName = response.data.firstName;
                this.currentProfile.lastName = response.data.lastName;
                this.currentProfile.position = response.data.position;
                this.currentProfile.email = response.data.firstPart + "@" + response.data.secondPart + response.data.thirdPart;
                this.currentProfile.phoneNumber = response.data.phoneNumber;
                this.currentProfile.skypeName = response.data.skypeName;
                this.currentProfile.photoURL = response.data.photoURL;
                this.currentProfile.biography = response.data.biography;

                
                this.updateProfile.firstName = response.data.firstName;
                this.updateProfile.lastName = response.data.lastName;
                this.updateProfile.position = response.data.position;
                this.updateProfile.email = response.data.firstPart + "@" + response.data.secondPart + response.data.thirdPart;
                this.updateProfile.phoneNumber = response.data.phoneNumber;
                this.updateProfile.skypeName = response.data.skypeName;
                this.updateProfile.photoURL = response.data.photoURL;
                this.updateProfile.biography = response.data.biography;


                if (response.data.expertise == undefined) {
                    this.editor.noExpertise = true;
                } else {
                    this.currentProfile.expertise = response.data.expertise;
                    this.updateProfile.expertise = response.data.expertise;
                }
                if (response.data.biography == undefined) {
                    this.editor.noBio = true;
                } else {
                    this.currentProfile.biography = response.data.biography;
                    this.updateProfile.biography = response.data.biography;
                }
                if (response.data.interests !== undefined) {
                    this.currentProfile.interests = response.data.interests;
                    this.updateProfile.interests = response.data.interests;
                }
                if (response.data.interesseGroup !== undefined) {
                    this.currentProfile.interesseGroup = response.data.interesseGroup;
                    this.updateProfile.interesseGroup = response.data.interesseGroup;
                }
                if (response.data.research !== undefined) {
                    this.currentProfile.research = response.data.research;
                    this.updateProfile.research = response.data.research;
                }
        });  

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.pageLoad = true;
                var userName = user.displayName;
                var profilePhoto = user.photoURL;
                let route = this.$router;
                if (!userName || !profilePhoto) {
                    route.push('/umcg-learn/profile-creation/');
                }
            }
        });

        axios.get('https://learn-demo-6a15f-default-rtdb.firebaseio.com/interest.json').then((response) => {
                        for (let key in response.data) {
                            this.databaseData.interests.push(
                                { interestName: response.data[key].name,
                                interestID: key                    
                                })
                            this.databaseData.interestsRef[key] = {
                                name: response.data[key].name
                            }
                        }
                    });

        axios.get('https://learn-demo-6a15f-default-rtdb.firebaseio.com/interestGroup.json').then((response) => {
                        for (let key in response.data) {
                            this.databaseData.interestGroups[key] = {
                                name: response.data[key]
                                }
                        }
                    });    
        
    }
}
</script>

<style scoped>
    #main-container {
        font-size: 16px;
        margin-top: 90px!important;
    }

    #bio-style {
        width: 630px;
        max-width: 630px;
        margin-left: 30px!important;
    }

    .overflow {
        height: 400px;
        overflow-y: scroll;
    }

    #biography button {
        margin-left: 30px!important;
        margin-bottom: 30px;
    }
    #biography p {
        padding: 0 30px;
    }
    .navheight {
        margin-top: 240px!important;
    }
    .backlight {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 60%);
        position: fixed!important;
        top: 0;
        left: 0;
        z-index: 10;
    }
    
    #top-bar {
        background-color: #f3f3f3;
        width: 100%;
        height: 150px;
        position: fixed!important;
        top: 58px;
        left: 0;
        z-index: 99;
        padding: 20px 40px;
        box-shadow: 0px 3px 6px rgba(0,0,0, 10%);
    }

    .cancel-button {
        width: 150px!important;
    }

    .link {
        cursor: pointer;
    }

    .link:hover {
        color: #FF934B!important;
    }
    .padding {
        padding: 40px;
    }

    .add-research {
        margin-top: 40px;
    }

    .add-research span {
        margin-right: 50px; 
    }

    .editmode {
        margin-top: 100px;
    }

    #main-container input {
        height: 20px;
        padding: 10px;
        width: 250px;
        text-align: center;
        border-color: rgba(0,0,0, 10%);
        border-style: solid;
        border-width: 1px;
    }

    #main-container input:focus {
        outline-color: #FF934B;
        border-style: none;
    }

    #main-container button {
        width: 100px;
        height: 20px;
        color: white;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        background: #FF934B;
        border: 0;
        margin-right: 10px;
        margin-top: 20px;
    }

    #main-container button:active {
        background: #c55819;;
        border-bottom: 2px solid #db631d5d;
        box-shadow: inset 0px -5px #db631d5d;
    }

    #profile-research-editor, #confirmation {
        position: fixed!important;
        z-index: 999;
        background-color: white;
        box-shadow: 0px 0px 6px rgba(255,255,255, 50%);
        width: 800px;
        height: 620px;
        top: 200px;
        left: 50%;
        margin-left: -400px;
    }

    .form-class {
        text-align: left;
    }

    table {
        border-collapse: collapse;
    }

    .researchTable {
        margin-top: 50px;
    }
    .researchTable tr {
        border-bottom: 1px solid #ccc;
    }

    .editor {
        font-size: 0.875em;
        font-weight: 400!important;
        color: #2c3e50!important;
        position: absolute!important;
        right: 30px;
        z-index: 2;
    }

    .profile-interestgroup-container li, .profile-expertise-container li {
        background: url('../assets/list-bullet.svg');
        background-repeat: no-repeat;
        background-size: 50px auto;
        padding-left: 70px;
        height: 55px;
        margin-bottom: 20px;
        padding-top: 15px;
    }

    ul li {
        text-align: left;
        list-style: none;
    }
   .research-list li .title-deco-line {
        margin-top: 10px;
        height: 2px;
        display: block;
        margin-bottom: 20px;
        width: 100%;
        background: rgba(71,91,99, 10%);
    }

    .sp_btn {
        width: 250px!important;
    }

    .research-list li {
        background: url('../assets/research.svg');
        background-repeat: no-repeat;
        background-size: 50px auto;
        padding-left: 60px;
    }
    .research-list {
        padding: 0;
        list-style: none;
    }

    #profile-research-container {
        text-align: left;
    }

    .left {
        text-align: left;
    }

    #biography .left {
        padding-left: 30px;
    }

    .searchfield p {
        text-align: left;
        padding-bottom: 0;
        margin-bottom: 10px;
    }

    .searchfield input {
        width: 100%!important;
        padding: 10px 0px!important;
    }
    .no-padding {
        padding: 30px 0 0 0!important;
    }

    #biography .half {
        width: 100%;
    }
    /* Acordeon styles */
    #biography .tab {
        position: relative;
        margin-bottom: 1px;
        width: 100%;
        color: #fff;
        overflow: hidden;
    }
    #biography .tab input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }
    #biography .tab label {
        position: relative;
        display: block;
        padding: 0 0 0 1em;
        background: #2c3e50;
        font-weight: bold;
        line-height: 3;
        cursor: pointer;
    }

    #biography .tab-content {
        max-height: 0;
        overflow: hidden;
        background: white;
        -webkit-transition: max-height .35s;
        -o-transition: max-height .35s;
        transition: max-height .35s;
    }
    #biography .tab-content {
        background: rgb(255, 252, 222);
    }
    #biography .tab-content p {
        margin: 1em;
        padding: 30px;
        color: #2c3e50;
    }
    /* :checked */
    #biography .tab input:checked ~ .tab-content {
        max-height: 100vh;
    }
    /* Icon */
    #biography .tab label::after {
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        width: 3em;
        height: 3em;
        line-height: 3;
        text-align: center;
        -webkit-transition: all .35s;
        -o-transition: all .35s;
        transition: all .35s;
    }
    #biography .tab input[type=checkbox] + label::after {
        content: "+";
    }
    #biography .tab input[type=radio] + label::after {
        content: "\25BC";
    }
    #biography .tab input[type=checkbox]:checked + label::after {
        transform: rotate(315deg);
    }

    #biography .tab input[type=radio]:checked + label::after {
        transform: rotateX(180deg);
    }

    .column-2 {
        columns: 2;
        -webkit-columns: 2;
        -moz-columns: 2;
    }
    #profile-container {
        box-shadow: none;
    }
    
    #profile-img {
        width: 170px;
        height: 170px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border-radius: 100px;
        overflow: hidden;
        margin: 0 auto;
    }
    #profile-img img {
        width: 170px;
        height: auto;
    }
    #profile-abstract p {
        text-align: Center;
        font-size: 1em;
    }

    #profile-abstract h3 {
        margin-bottom: 5px;
        text-align: center;
    }

    #profile-abstract span {
        text-align: center;
    }
    #title-bar { 
        text-align: left;
        margin: 0 10px; 
    }

    #title-bar h1 {
        font-size: 1.700em;
        font-weight: 400;
        text-transform: uppercase;
    }

    #title-bar span, #profile-research-container span{
        font-size: 0.875em;
        font-weight: 600;
        color: #FF934B;
    }

    h3 {
        margin-top: 0;
        padding-top: 0;
        margin-bottom: 30px;
    }

    b {
        font-weight: 700;
        padding-right: 10px;
    }
    #main-container {
        width: 1640px;
        margin: 0 auto;
    }

    #main-container *{
        position: relative;
    }

    .outer-left-container {
        width: 380px;
        float: left;
        margin: 0px 10px;
    }

    .outer-right-container {
        width: 1220px;
        float: right;
        margin: 0px 10px
    }

    .right-left-container {
        width: 750px;
        float: left;
        margin-right: 10px;
    }
    
    .right-right-container {
        width: 450px;
        float: right;
        margin-left: 10px;
    }

    .container {
        background-color: white;
        box-shadow: 0px 3px 6px rgba(0,0,0, 10%);
        padding: 30px;
        margin-top: 0px;
        margin-bottom: 10px;
    }

    @media screen and (max-width: 1640px) {
        .mobile {
            width: 100%!important;
            padding: 30px 0px;
        }
        .outer-left-container {
            margin: 0;
        }

        .outer-right-container {
            margin: 0;
        }
    }
</style>

