import React, { useRef, useState } from "react";
import style from "./WebSocket.module.css";

export const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        userName,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("Connection established");
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket closed");
    };
    socket.current.onerror = () => {
      console.log("Something wrong with Socket");
    };
  };

  const sendMessage = () => {
    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: "message",
    };

    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  const onKeydownSendMessage = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const onKeyDownSetUserName = (e) => {
    if (e.keyCode === 13) {
      setUserName(e.target.value);
      connect();
    }
  };

  if (!connected) {
    return (
      <div className={style.container}>
        <div className={style.form}>
          <input
            type="text"
            value={userName}
            className={style.input}
            placeholder="Please, enter your name"
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={onKeyDownSetUserName}
          />
          <button
            className={style.button}
            onClick={() => connect()}
            disabled={!userName}
          >
            Income
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.form}>
        <input
          type="text"
          className={style.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeydownSendMessage}
        />
        <button
          className={style.button}
          onClick={sendMessage}
          disabled={!value}
        >
          Send
        </button>
      </div>
      <div className={style.messages}>
        {messages.map((mess) => (
          <div key={mess.id} className={style.messageBlock}>
            {mess.event === "connection" ? (
              <div>User with name {mess.userName} connected</div>
            ) : (
              <div key={mess.id} className={style.message}>
                {mess.userName} - {mess.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
