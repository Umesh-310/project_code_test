import React from "react";
import css from "./Home.module.css";
// import { Footer, Header, Home } from "../../components";

const HomePage = () => {
  return (
    <div className={css.homeRoot}>
      <div className={css.homeHeading}>
        <h3 className={css.lableText}>CoderTest Home Page</h3>
      </div>
      <div className={css.imageWrap}>
        <img
          src={process.env.PUBLIC_URL + "/assets/img/home_bg_new.png"}
          alt="hero_image"
        />
      </div>
    </div>
  );
};

export default HomePage;
