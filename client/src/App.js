import "./App.css";
import { EventSourcing } from "./components/EventSourcing";
import { Longpulling } from "./components/LongPulling";

function App() {
  return (
    <div className="app">
      {/* <Longpulling /> */}
      <EventSourcing />
    </div>
  );
}

export default App;
