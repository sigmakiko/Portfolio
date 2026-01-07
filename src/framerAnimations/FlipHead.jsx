import { motion } from "framer-motion";
import { useRef } from "react";

const DURATION = 0.35;
const STAGGER = 0.025;

const FlipHead = ({ children }) => {
  const colorFlag = useRef(false);

  return (
    <motion.h2
      initial="initial"
      whileInView={"hovered"}
      className="position-relative d-block text-nowrap overflow-hidden fw-bold text-center"
      style={{fontSize: "50px", marginBottom: "50px"}}
    >
      <div>
        {children.split("").map((l, i) => {
          if(i === 0) colorFlag.current = false;
          if(l === " ") {
            colorFlag.current = true;
          }
          
          return <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-500%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="d-inline-block"
            key={i}
            style={{color: !colorFlag.current ? "rgb(152 180 206)": "white"}}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
      })}
      </div>
      <div className="position-absolute w-100 h-100 top-0 start-0">
        {children.split("").map((l, i) => {
          if(i == 0) colorFlag.current = false;
          if(l === " ") colorFlag.current = true;
        
          return <motion.span
            variants={{
              initial: {
                y: "500%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="d-inline-block"
            key={i}
            style={{color: colorFlag.current ? "rgb(152 180 206)": "white"}}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
})}
      </div>
    </motion.h2>
  );
};

export default FlipHead;