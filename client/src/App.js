import "./App.css";
import { EventSourcing } from "./components/EventSourcing";
import { Longpulling } from "./components/LongPulling";
import { WebSock } from "./components/WebSock";

function App() {
  return (
    <div className="app">
      {/* <Longpulling /> */}
      {/* <EventSourcing /> */}
      <WebSock />
    </div>
  );
}

export default App;
