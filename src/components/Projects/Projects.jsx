import { useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { FlipHead } from "../../framerAnimations";

import styles from "./styles.module.css";

import proj1Img from "../../assets/imgs/proj1.png";
import proj2Img from "../../assets/imgs/proj2.png";
import proj3Img from "../../assets/imgs/proj3.png";
import proj4Img from "../../assets/imgs/proj4.png";
import proj1Vid from "../../assets/vids/proj1Vid.mp4";
import proj2Vid from "../../assets/vids/proj2Vid.mp4";
import proj3Vid from "../../assets/vids/proj3Vid.mp4";
import proj4Vid from "../../assets/vids/proj4Vid.mp4";

const images = [proj1Img, proj2Img, proj3Img, proj4Img];
const vids = [proj1Vid, proj2Vid, proj3Vid, proj4Vid];


function SampleNextArrow(props) {
const { className, style, onClick } = props;
return (
    <div
    className={className}
    style={{ ...style, display: "block", right: "10px"}}
    onClick={onClick}
    />
);
}
  
function SamplePrevArrow(props) {
const { className, style, onClick } = props;
return (
    <div
    className={className}
    style={{ ...style, display: "block", left: "10px", zIndex: 2 }}
    onClick={onClick}
    />
);
}

const Projects = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        customPaging: function (i) {
            return (
              <a className={styles.paggingLink}>
                <img
                  src={images[i]}
                  alt={`Thumbnail ${i + 1}`}
                  className={styles.pagingImg}
                />
              </a>
            );
        },
        dots: true,
        dotsClass: "slick",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        beforeChange: (current, next) => {
            setActiveSlide(next);
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    
    return (
       <section className={`${styles.projects} container-fluid overflow-hidden`}>
            
            
            <FlipHead children={"Selected Projects"} />

            <div className={styles.sliderContainer}>

            {vids.map((videoSrc, i) => {
                if(activeSlide === i) {
                return (
                    <div className={styles.videoContainer} key={`video${i}`}>
                        <video autoPlay loop muted playsInline className="background-video">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                        <div className={styles.scale}></div>
                    </div>
                )
                }
            })}

            <Slider {...settings}>
                <div className={`${styles.card} `}>
                    <div className={styles.cardImg}>
                        <img src={proj1Img} alt="project card image" draggable="false"/>
                    </div>
                    <div className={styles.cardTxt}>
                        <h3>01</h3>
                        <h4>Ecommerce With React.js</h4>
                        <p className={styles.description}>A modern e-commerce frontend built with React, Redux Toolkit, TypeScript, React Bootstrap, and Vite. It features product listings, cart functionality, form handling with Redux Forms, and mock backend integration using JSON-Server. Includes skeleton loaders for improved UX and strong typing with TypeScript for scalable development.</p>
                        <p className={styles.skills}>React | Redux toolkit | TypeScript | Bootstrap | Json-Server | Axios | CSS | HTML</p>
                        <a href="https://kikogamed.github.io/React_Ecommerce/" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Live</a>
                        <a href="https://github.com/kikogamed/React_Ecommerce" target="_blank"><i className="fa-brands fa-github"></i> GitHub</a>  
                    </div>     
                </div>

                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={proj2Img} alt="project card image" draggable="false"/>
                    </div>        
                    <div className={styles.cardTxt}>
                        <h3>02</h3>
                        <h4>Moody</h4>
                        <p className={styles.description}>
                            Moody is a private mood-tracking web app built with JavaScript, Bootstrap, CSS, and HTML, using Firebase Authentication and Firestore as the backend. Authenticated users can privately post and describe their moods, which are securely stored and only visible to the logged-in user.
                            <br/>Firestore Security Rules are implemented to ensure complete privacy and restrict access to each user’s data.
                        </p>
                        <p className={styles.skills}>JavaScript | Firebase | Bootstrap | HTML | CSS</p>
                        
                        <a href="https://kikogamed.github.io/Moody/" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Live</a>
                        <a href="https://github.com/kikogamed/Moody" target="_blank"><i className="fa-brands fa-github"></i> GitHub</a>  
                    </div>          
                </div>

                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={proj3Img} alt="project card image" draggable="false"/>
                    </div>
                    <div className={styles.cardTxt}>
                        <h3>03</h3>
                        <h4>Ecommerce With JS and PHP</h4>
                        <p className={styles.description}>A responsive eCommerce website for electronics built with PHP, MySQL, HTML/CSS, and JavaScript. Features include user login, product categories, admin panel, shopping cart, and order management. Ideal for learning full-stack web development using core PHP and relational databases.</p>
                        <p className={styles.skills}>JavaScript | PHP | MySql | Bootstrap | CSS | HTML</p>
                        <a href="http://kikogamed.free.nf/" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Live</a>
                        <a href="https://github.com/kikogamed/php-electronics-store" target="_blank"><i className="fa-brands fa-github"></i> GitHub</a>  
                    </div>                 
                </div>

                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={proj4Img} alt="project card image" draggable="false"/>
                    </div>
                    <div className={styles.cardTxt}>
                        <h3>04</h3>
                        <h4>Apps and Games With React And Pure JS</h4>
                        <p className={styles.description}>A collection of interactive apps built with JavaScript, HTML, and CSS, including a word guessing game with hints, a classic snake game with score tracking, a real-time weather app using API integration, and a random cards game that displays new cards on each click.</p>
                        <p className={styles.skills}>JavaScript | CSS | HTML</p>
                        <a href="https://app.netlify.com/teams/kikogamed/sites?page=1" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Live</a>
                        <a href="https://github.com/kikogamed/JavaScript_Apps" target="_blank"><i className="fa-brands fa-github"></i> GitHub</a>  
                    </div>                   
                </div>
            </Slider>  
            </div>
       </section> 
    )
}

export default Projects;