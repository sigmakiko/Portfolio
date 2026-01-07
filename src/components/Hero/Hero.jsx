import { motion } from "framer-motion"

import styles from "./styles.module.css";

import character from "../../assets/imgs/profilepic.png";
import icon1 from "../../assets/imgs/icon1.png";
import icon2 from "../../assets/imgs/icon2.png";
import { useState } from "react";
import { useMotionValue, useAnimation } from "motion/react";

const Hero = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const controls = useAnimation();
  
    const handleDragEnd = () => {
      controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 100 } });
    };

    return (
        <div className={`${styles.hero} text-center d-flex align-items-center flex-column`}>
            <h1 className={styles.head}>Hi, I am <br /> <span>Karim Ashraf</span></h1>
            <p>I am a <span style={{fontWeight: "bold"}}>frontend developer</span> focused on creating websites that provide the best experience for users.</p>
            
            <div style={{zIndex: 2, transform: "translateY(38px)"}}><img style={{width: '268px'}} src={character} alt="my character"/></div>
            <div className={styles.roundy}></div>
            <>    
            <motion.div
                className={`${styles.icon1}`}
                drag
                onDragEnd={() => handleDragEnd()}
                animate={controls}
                style={{x, y}}
            >
                <img
                    style={{width: "150px"}} 
                    draggable="false" 
                    src={icon1} alt="icon of setting" 
                />
            </motion.div>
            <motion.div 
                className={`${styles.icon2}`} 
            >
                <img 
                    style={{width: "100px"}} 
                    draggable="false" 
                    src={icon2} alt="icon of bar2" 
                />
            </motion.div>
            </>
        </div>
    )
}

export default Hero;