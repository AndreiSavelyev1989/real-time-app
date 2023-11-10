import React, { useEffect, useState } from "react";
import style from "./Longpulling.module.css";
import axios from "axios";

export const Longpulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (err) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async (e) => {
    await axios.post("http://localhost:5000/new-message", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <input
          type="text"
          className={style.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={style.button} onClick={sendMessage}>
          Send
        </button>
      </div>
      <div className={style.messages}>
        {messages.map((mess) => (
          <div key={mess.id} className={style.message}>{mess.message}</div>
        ))}
      </div>
    </div>
  );
};
