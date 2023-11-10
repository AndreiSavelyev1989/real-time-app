import React from "react";
import style from "./Longpulling.module.css";

export const Longpulling = () => {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <input type="text" className={style.input} />
        <button className={style.button}>Send</button>
      </div>
      <div className={style.messages}></div>
    </div>
  );
};
