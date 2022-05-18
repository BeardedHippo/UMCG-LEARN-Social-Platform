<template>
    <div id="homepage">
        <div class="homeBg">
            <section id="section01"
                     v-bind:style="{backgroundImage: 'linear-gradient( rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(' + homepage.imgURL + ')'}">
                <div class="homeText">
                    <h1 id="titleHome">LEARN<span style="color: #798489;">SYMPOSIUM</span></h1>
                    <h5 id="promoText">{{this.homepage.subTitle}}</h5>
                    <h3 id="announcement">{{this.homepage.date}}</h3>
                    <a href="#section02" v-scroll-to="'#section02'">
                        <button class="buttonLearn">ABOUT LEARN</button>
                    </a>
                    <a v-bind:href="'/umcg-learn/symposium/eventID1'">
                        <button class="buttonSym">SYMPOSIUM</button>
                    </a>
                </div>

                <div class="newsLetter">
                    <h1 id="titleNewsletter">Get our newsletter!</h1>
                    <div class="newsLine"></div>
                    <p>LEARN has a two-montly newsletter with all the interesting topics from us and our fields.
                        Interested? Please send an e-mail Sofie to receive our newsletter. It's worth it!</p>
                </div>

            </section>

            <section class="demo" id="section02">
                <a href="body" v-scroll-to="'body'"><span></span>Scroll</a>
                <div class="learnText">
                    <h3 id="titleLearn">About LEARN</h3>
                    <p id="subLearn">
                        The Lifelong Learning, Education & Assessment Research Network, commonly known as LEARN, is a research programme that participates in the research Institute School of Health Research (SHARE) and the Graduate School of Medical Sciences (GSMS) of the University Medical Center Groningen (UMCG). The vision of LEARN is to be a global, transformative leader in advancing healthcare education and practice through research. Our research in healthcare education informs practice and research in the practice of healthcare informs education.
                        <br> <br>
                        Our mission is to impact on healthcare delivery through innovative and transformed healthcare education, clinical practice, and research. By solving real-world problems that are of concern to stakeholders such as educators, clinicians, students, and patients alike. LEARN will:
                        <br> <br>
                        • Create new knowledge through research and informed innovation relevant to advancing healthcare education and practice.
                        <br> <br>
                        • Foster translation of new knowledge by promoting creative synergy between diverse theoretical perspectives, and between theory and practice.
                        <br> <br>
                        • Build scholarly capacity through faculty development and mentorship activities to cultivate future research leaders in healthcare education and practice.
                        <br> <br>
                        • Foster a culture of collaboration, academic thinking and freedom.
                        <br> <br>
                        The core values of LEARN are being: Engaged, Open, Creative, Empowering, Stimulating positive health and well-being And our Core qualities are being: Approachable, Collaborative, Practical, Personal, and Humble.
                    </p>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                newsEmail: [],
                homepage: {
                    eventTitle: "",
                    date: "",
                    subTitle: "",
                    imgURL: ""
                }
            }
        },
        methods: {},
        created() {

            let ig = 'https://learn-demo-6a15f-default-rtdb.firebaseio.com/homepage.json';

            axios.get(ig).then((response) => {
                let homepage = this.homepage;
                let data = response.data;
                homepage.date = data.date;
                homepage.eventTitle = data.eventTitle;
                homepage.subTitle = data.subTitle;
                homepage.imgURL = data.imgURL;
            });
        },
    }
</script>

<style scoped>
    html, body {
        height: 100%;
    }

    .newsLetter p {
        padding: 10px 30px;
    }

    #homepage {
        font-size: 16px;
    }

    .homeBg {
        background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('../assets/bgmeeting1.jpg');
        height: 100%;
        min-width: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        background-size: cover;
        background-attachment: fixed;
        position: absolute;
    }

    section {
        width: 100%;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }

    #section02 {
        background: #F4F4F7
    }

    /*Text on homepage*/

    .homeText {
        margin-left: 113px;
        filter: opacity(10);
        float: left;
    }

    #titleHome {
        margin-top: 25%;
        margin-bottom: 0;
        font-size: 5.6vw;
        font-weight: 700;
    }

    h1 span {
        display: block;
        line-height: 90%;
        margin: 0;
        font-size: 0.64em;
        font-weight: 700;
    }

    #promoText {
        margin: 0;
        padding-top: 15px;
        font-size: 1.7vw;
        font-weight: 500;
    }

    #announcement {
        margin: 0;
        padding-top: 40px;
        font-size: 1.9vw;
        font-weight: 700;
    }

    /*Button on homepage*/

    .buttonLearn {
        margin-top: 30px;
        margin-right: 10px;
        background-color: #FF934B;
        padding: 15px 55px;
        border: none;
        color: white;
        font-weight: 700;
        font-size: 0.9em;
    }

    .buttonSym {
        margin-top: 10px;
        margin-right: 30px;
        background-color: transparent;
        padding: 14px 62px;
        border: 1.5px solid #FF934B;
        color: #FF934B;
        font-weight: 700;
        font-size: 0.9em;
    }

    /*Newsletter homepage*/

    .newsLetter {
        filter: opacity(10);
        background-color: white;
        width: 320px;
        float: right;
        margin-top: 12%;
        margin-right: 10%;
        box-shadow: 1px 1px 3px 2px lightgrey;
    }

    #titleNewsletter {
        margin-top: 15px;
        font-weight: 700;
        font-size: 1em;
        padding: 5px 45px;
    }

    .newsLine {
        float: left;
        width: 100%;
        border-bottom: 1.5px solid #F4F4F7;
    }

    #subNewsletter {
        margin-top: 20px;
        margin-bottom: 0;
        padding: 10px 45px;
        font-weight: 500;
        font-size: 0.85em;
    }

    #inputNews {
        padding: 13px 15px;
        border: 1.5px solid #ccc;
        width: 190px;
        margin-left: 45px;
        display: inline-block;
    }

    .buttonNews {
        float: left;
        display: inline-block;
        margin: 20px 45px 45px;
        background-color: #FF934B;
        padding: 14px;
        width: 223px;
        border: none;
        color: white;
        font-weight: 500;
        font-size: 0.8em;
    }

    /*About learn*/

    .demo a {
        position: absolute;
        left: 50%;
        z-index: 2;
        transform: translate(0, 60%);
        color: #798489;
        font-size: 13px;
        letter-spacing: .1em;
        text-decoration: none;
    }

    .demo a:hover {
        opacity: .5;
    }

    #section02 a {
        padding-top: 60px;
    }

    #section02 a span {
        position: absolute;
        top: 0;
        width: 46px;
        height: 46px;
        margin-left: -2px;
        border: 1px solid #798489;
        border-radius: 100%;
        box-sizing: border-box;
    }

    #section02 a span::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: '';
        width: 16px;
        height: 16px;
        margin: -4px 0 0 -8px;
        border-left: 1px solid #798489;
        border-bottom: 1px solid #798489;
        -webkit-transform: rotate(-225deg);
    }

    .learnText {
        margin-left: 8%;
        filter: opacity(10);
        float: left;
    }

    #titleLearn {
        margin-top: 11%;
        margin-bottom: 0;
        font-size: 2.7vw;
        font-weight: 700;
    }

    #subLearn {
        width: 60%;
        margin-top: 3%;
        font-size: 0.9vw;
    }

    /*responsive newsletter*/

    @media screen and (max-width: 1024px) {
        .homeText {
            margin-left: 10%;
        }

        .newsLetter {
            float: left;
            margin-left: 10%;
            margin-top: 7%;
        }

        #titleHome {
            font-size: 3.6em;
        }

        #promoText {
            font-size: 1.09em;
            margin-right: 5%;
        }

        #announcement {
            font-size: 1.22em;
            margin-right: 5%;
        }

        .demo a {
            display: none;
        }

        #subLearn {
            width: 90%;
            font-size: 2vw;
        }

        #titleLearn {
            font-size: 4vw;
            margin-top: 10%;
            margin-bottom: 35px;
        }

        #subLearn {
            width: 80%;
        }
    }

    @media screen and (max-width: 671px) {
        .homeText {
            margin-left: 5%;
        }

        #titleHome {
            margin-top: 15%;
        }

        .newsLetter {
            float: left;
            margin: 0;
            margin-top: 10%;
            width: 100%;
            text-align: center;
        }

        #inputNews {
            text-align: center;
            margin-left: 0;
        }

        .buttonNews {
            float: none;
        }

        #titleHome {
            font-size: 3.6em;
        }

        #promoText {
            font-size: 1.09em;
            margin-right: 5%;
        }

        #announcement {
            font-size: 1.22em;
            margin-right: 5%;
        }

        #titleLearn {
            font-size: 5vw;
            margin-bottom: 20px;
        }

        #subLearn {
            width: 90%;
            font-size: 3.8vw;
        }

        #section01 {
            height: 750px;
        }

        #section02 {
            height: 900px;
        }
    }
</style>
