// Dit is de ledenpagina waarbij er ook gefiltered kan worden op naam en expertise. Gaandeweg dit bestand leg ik dit uit.
// Tegenwoordig zou ik dit eerder met computed properties en regex filters aanpakken.

<template id="memberspage">
    <div class="member-page-container">
        <div class="header-container">
            <div class="header-title">
                <h3>MEMBERS OF LEARN</h3>
                <p>An overview of all members of LEARN.</p>
            </div>
            <div class="header-member-search">
                <div class="header-member-search-title">
                    <h4>Search Members</h4>
                    <span class="title-deco-line"></span>
                </div>
                <form autocomplete="off" class="form-container" @submit.prevent="this.onSelectDropdown">
                    <div class="search-container">
                        <label class="label-style" for="member-name">Member name</label>
                        <div class="input-field-wrapper">
                            <input type="text" class="search-input-field" placeholder="Name" v-model="searchName">
                            <button v-show="this.searchNameHasValue" type="reset" name="searchName" class="clear-input-btn" @click="onButtonClick">&times;</button>
                        </div>
                    </div>
                    <div class="search-container">
                        <label class="label-style" for="expertise">Expertise</label>
                        <div class="input-field-wrapper">
                            <input type="text" class="search-input-field" placeholder="Expertise" list="expertise-list" v-model="experiseValue" name="expertise" @input="trackChangeDropdown">
                            <button v-show="this.expertiseHasValue" type="reset" name="expertise" class="clear-input-btn" @click="onButtonClick">&times;</button>
                        </div>
                        <datalist id="expertise-list">
                            <option v-for="expertise in this.expertises" :key="expertise.id">{{expertise}}</option>
                        </datalist>
                    </div>
                    <div class="search-container">
                        <label class="label-style" for="interest-group">Interest Group</label>
                        <div class="input-field-wrapper">
                            <input type="text" class="search-input-field" placeholder="Interest Group" list="interest-groups" v-model="groupValue" name="group" @input="trackChangeDropdown">
                            <button v-show="this.groupHasValue" type="reset" name="group" class="clear-input-btn" @click="onButtonClick">&times;</button>
                        </div>
                        <datalist id="interest-groups">
                            <option v-for="(group, index) in this.interestGroups" :key="index">{{group}}</option>
                        </datalist>
                    </div>
                </form>
            </div>
        </div>  
        <div v-show="this.matchCount < this.members.length" class="matches"><span class="matches-highlight">{{this.matchCount}} member(s)</span> match your criteria</div>
        <div class="member-overview-container">
          
            <div v-for="member in this.filterdMembers" :key="member.id">
                <a class="member-container-link" v-bind:href="'/umcg-learn/profile/' + member.id">
                    <div class="member-photo-container">
                        <div class="member-photo">
                            <img :src="member.photo" alt="profile photo">
                        </div>
                        <div class="member-info">
                            <div class="member-name">{{member.name}}</div>
                            <div class="member-position">{{member.position}}</div>
                            <div class="member-email">{{member.email}}</div>
                        </div>
                    </div>
                </a> 
            </div>           
        </div>
    </div>
</template>

<script>
import {database} from '@/firebase/init'
export default {
    data(){
        return{
            members:[],
            filterdMembers:[],
            filterdMembersCopy: [],
            previousCharCount: 0,
            searchName: '',
            searchNameHasValue: false,
            experiseValue: '',
            expertiseHasValue: false,
            groupValue: '',
            groupHasValue: false,
            interestGroups: [],
            expertises: [],
            dropDownInput: '',
            matchCount: 1000000000,
            group: 'group',
            expertise: 'expertise',
        }
    },
    created(){
        // Eerst worden alle leden, interessegroepen en expertises dat aan hen gekoppeld staan opgehaald en in de local state gezet
        this.getMembers()
        this.getInterestGroups()
        this.filterdMembers = this.members
    },
    watch:{
        // Deze watcher voert steeds de zoekfunctie uit als er een nieuwe input is bij 'member name'. De zoekfunctie
        // laadt in de 'filterdmembers' dan alleen de leden die relevant zijn aan de zoekopdracht.
        searchName: function(){
            this.searchMatchingName()
        }
    },
    methods:{
        // Dit zoekt de relevante leden op uit de lijst aan leden.
        searchMatchingName(){
            const currentCharCount = this.searchName.length

            if(this.searchName !== ""){
                this.searchNameHasValue = true;
            }

            // Checks for backspace
            if(currentCharCount < this.previousCharCount){
                this.filterdMembersCopy.length == 0 ? this.filterdMembers = this.members : this.filterdMembers = this.filterdMembersCopy
                this.countMacthes()
                if(!this.searchName == ''){
                    this.filterMembers()
                }  
            }
            else{
                this.filterMembers()
                this.previousCharCount = this.searchName.length
            }
        
        },
        // Op input laat deze funtie een geüpdated lijst zien van relevante resultaten
        onButtonClick(e){
            let elementName = e.currentTarget.name

            switch(elementName){
                case "searchName":
                    this.searchName = ""
                    this.searchNameHasValue = false
                    break
                case "expertise":
                    this.experiseValue = ""
                    this.expertiseHasValue = false
                    break
                case "group":
                    this.groupValue = ""
                    this.groupHasValue = false
                    break
                default:
                    break
            }

            if((this.searchName == "" && (this.experiseValue !== "" || this.groupValue !== "")) && this.filterdMembersCopy.length > 0){
                this.filterdMembers = this.filterdMembersCopy
            }
            else if(this.searchName !== "" && (this.experiseValue == "" && this.groupValue == "")){
                this.filterdMembers = this.members
                this.searchMatchingName()
            }
            else{
                this.filterdMembers = this.members
                this.filterdMembersCopy = []
            }
            
            this.countMacthes()
        },
        getMembers(){
            database.ref('member').on('child_added', snap =>{
                let data = snap.val()
                if(data.expertise == undefined){
                    data.expertise = []
                }
                const newMember = {
                    id: snap.key,
                    name: `${data.firstName} ${data.lastName}`,
                    lastName: data.lastName,
                    position: data.position,
                    photo: data.photoURL,
                    email: `${data.firstPart}@${data.secondPart}${data.thirdPart}`,
                    expertise: data.expertise,
                    interestGroup: data.interesseGroup
                }
                this.members.push(newMember)

                this.getExpertises()
                this.getInterestGroups()
            })
        },
        getExpertises(){
            let tempArr = []
            this.members.map(member => {
                member.expertise.map(exp => {
                    tempArr.push(exp)
                })
            })
            this.expertises = [...new Set(tempArr)]

        },
        getInterestGroups(){
            let tempArr = []
            this.members.map(member => {
                member.interestGroup.map(group => {
                    tempArr.push(group.interestGroupName)
                })
            })
            this.interestGroups = [...new Set(tempArr)]
        },
        filterMembers(){
            this.filterdMembers = this.filterdMembers.filter((member) => {
                if(member.name !== undefined && member.lastName !== undefined){
                    let memberName = member.name.slice(0,this.searchName.length).toLowerCase()
                    let lastName = member.lastName.slice(0,this.searchName.length).toLowerCase()
                    return memberName == this.searchName.toLowerCase() || lastName == this.searchName.toLowerCase()    
                }
            })
            this.countMacthes()
        },
        // Meerdere filterlijst opties
        trackChangeDropdown(e){

            const value = e.currentTarget.value
            const elementName = e.currentTarget.name

            if(value != "" && (this.interestGroups.indexOf(value) > -1 || this.expertises.indexOf(value) > -1)) {
                this.dropDownInput = value
                this.onSelectDropdown(elementName)
            }
            else{
                this.filterdMembersCopy = []
                this.filterdMembers = this.members
                this.countMacthes()
            }

        },
        onSelectDropdown(elementName){
            this.filterdMembers = []
            // Expertise dropdown
            if(elementName == this.expertise){
                this.experiseValue = this.dropDownInput
                this.expertiseHasValue = true
                this.filterdMembers = this.members.filter(member => {
                    return member.expertise.indexOf(this.experiseValue) > -1 ? true : false
                }) 
            }
            // Interest Group dropdown
            if(elementName == this.group){
                this.groupValue = this.dropDownInput
                this.groupHasValue = true
                this.members.forEach(member => {                 
                    if(member.interestGroup !== undefined){
                        member.interestGroup.forEach(group=>{
                            if(group.interestGroupName ==  this.groupValue)
                                this.filterdMembers.push(member)
                        })
                    }
                })
                
            }

            this.filterdMembersCopy = this.filterdMembers
            this.countMacthes()
        },
        countMacthes(){
            this.filterdMembers.length === 0 ? this.matchCount = 0 : this.matchCount = this.filterdMembers.length;
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700');
    html {
        font-size: 10px;
    }
    .member-page-container{
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        font-family: 'Montserrat', sans-serif;
        /* max-width: 164rem; */
        max-width: 85%;
        margin: auto;
        padding-top: 80px;
        min-height: 100vh;
        color: #475B63;
      
    }
    .header-container{
        display: flex;
        justify-content: space-between;
        margin-right: 16px;
    }
    .header-title {
        margin-left: 5px;
    }
    .header-title h3{
        font-size: 3rem;
        font-weight: 600;
        margin: 0;
    }
    .header-title p {
        margin: 5px 0 0 0;
    }
    .header-member-search{
        min-height: 20rem;
        width: 81.2rem;
        background-color: #fff;
        box-shadow: 0px 3px 6px rgba(0,0,0, 10%);
    }
    .header-member-search-title h4{
        /* padding: 2.7rem 0 2.7rem 2.4rem; */
        padding-left: 25px;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 25px 0;
    }
    .title-deco-line{
        display: block;
        width: 100%;
        height: 1px;
        background: rgba(71,91,99, 10%);
    }
    .form-container{
        display: flex;
        padding: 2.4rem 2.4rem 3rem 2.4rem;
        justify-content: space-between;
    }
    .search-container{
        display: flex;
        flex-direction: column;
    }
    .label-style{
        margin-bottom: 10px;
        font-size: 1.6em;
        font-weight: 500;
    }
    .input-field-wrapper {
        display: flex;
        align-items: center;
        height: 46px!important;
        width: 24.5rem;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 1.4rem;
        padding-left: 1rem;
        background-color: #F4F4F7;
        border: 1px solid #475B63;
    }
    .clear-input-btn{
        color: #475B63;
        background-color: transparent;
        border: 0;
        padding: 0 10px;
        outline: none;
        font-size: 18px;
    }
    .clear-input-btn:hover{
        color: #FF934B;
        background-color: transparent!important;
    }
    .search-input-field{
        border: none;
        outline: none;
        background-color: #F4F4F7;
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 1.4rem;
        width: 20rem;
    }
    input::-webkit-calendar-picker-indicator {
	display: none;
    }
    .matches{
        font-size: 1.7rem;
        font-weight: 500;
        margin-left: 1rem; 
    }
    .matches-highlight{
        font-size: 1.7rem;
        font-weight: 600;
        color: #FF934B;
        margin-left: 1rem; 
    }
    .member-overview-container{
        width: 100%;
        margin-top: 40px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .member-container-link{
        text-decoration: none;
        /* color: #FF934B; */
    }
    .member-photo-container{
        height: 370px;
        width: 305px;
        margin: 0 8px 45px 8px;
        background-color: #fff;
        box-shadow: 0px 3px 6px rgba(0,0,0, 10%);
    }
    .member-photo{
        height: 252px;
        width: 305px;
        background-color: #eee;
        overflow: hidden;
    }
    .member-photo img{
        width: 100%;
    }
    .member-info{
        padding: 15px 0 0 15px;
    }
    .member-name{
        font-size: 16px;
        font-weight: 600;
        
        margin-bottom: 1rem;
    }
    .member-name{
        text-decoration: none;
        color: #FF934B;
    }
    .member-position{
        font-size: 14px;
        margin-bottom: 1rem;
        color: #475B63;
    }
    .member-email{
        font-size: 14px;
        color: #475B63;
    }

    .header-title p {
        font-size: 16px;
    }
    /**************** Responsive CSS *****************/
    @media (max-width: 1345px){
        .member-page-container{
            max-width: 125rem;
        }
        .member-overview-container{
            max-width: 125rem;
        }
    }
    @media (max-width: 1024px){
        .member-page-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
            width: 100%;
        }
        .header-container{
            flex-direction: column;
            text-align: center;
            margin-left: 16px;
        }
        .header-title{
            margin-bottom: 2rem;
        }
        .header-member-search{
            flex-direction: column;
        }
        .form-container{
            flex-direction: column;
            align-items: center;
        }
        .search-container{
            margin-bottom: 2rem;
        }
        input::-webkit-calendar-picker-indicator {
            display: block;
        }
        .member-overview-container{
            width: 100%;
            justify-content: center;
            padding: 1rem;
        }
        .member-photo-container{
            justify-content: flex-start;
            margin: 1rem;
        }
    }
    @media (max-width: 671px){
        html{
            font-size: 50%
        }   
        .member-page-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
        }
        .header-container{
            flex-direction: column;
            text-align: center;
            width: 39.8rem
        }
        .header-title{
            margin-bottom: 2rem;
        }
        .header-member-search{
            width: 100%;
            flex-direction: column;
        }
        .member-overview-container{
            width: 100%;
            justify-content: center;
            padding: 0;
        }
        .member-photo-container{
            margin: 0 0 4.5rem 0;
        }
        .form-container{
            flex-direction: column;
            align-items: center;
        }
    }   

</style>


