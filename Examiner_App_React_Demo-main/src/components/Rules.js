import React, { useEffect, useState } from "react";
import css from "../pages/CandidateGuide/candidateGuide.module.css";
const Rules = ({ rules }) => {
  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (window.screen?.width !== screenWidth) {
          setScreenWidth(window.screen?.width);
        }
      };
    }
  }, [screenWidth]);
  return (
    <div className={css.rules}>
      {rules.map((val, i) => {
        const odd = (i + 1) % 2 === 0;
        const ruleInfo = (
          <div
            className={`${css.ruleInfo} ${!odd ? css.ruleRight : css.ruleLeft}`}
          >
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              {`Step-${i + 1}`}
            </h2>
            <h4>{val.heading}</h4>
            <p> {val.rule}</p>
          </div>
        );
        const image = (
          <div className={css.ruleImage}>
            <img src={process.env.PUBLIC_URL + val.image} alt={val.heading} />
          </div>
        );
        return (
          <div key={i} className={css.ruleCard}>
            {screenWidth > 768 && odd ? (
              <>
                {ruleInfo}
                {image}
              </>
            ) : (
              <>
                {image}
                {ruleInfo}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rules;
