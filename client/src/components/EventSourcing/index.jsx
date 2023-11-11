import React, { useEffect, useState } from "react";
import style from "./EventSourcing.module.css";
import axios from "axios";

export const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => {
        return [message, ...prev];
      });
      console.log(event.data);
    };
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
          <div key={mess.id} className={style.message}>
            {mess.message}
          </div>
        ))}
      </div>
    </div>
  );
};
