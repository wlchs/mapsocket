import { useState } from "react";
import gitHubLogo from "../assets/github.svg";
import lbLogo from "../assets/lb.svg";
import "./App.css";
import { Card } from "./Card";

function App() {
  const [trigger, setTrigger] = useState<number>(0);
  const CARD_COUNT = 4;

  /* Create a predefined number of cards */
  const cards = [...Array(CARD_COUNT).keys()].map((_, key) => (
    <Card cardId={key + 1} key={key} trigger={trigger} />
  ));

  return (
    <>
      <div>
        <div>
          <a href="https://laszloborbely.com" target="_blank">
            <img src={lbLogo} className="logo" alt="laszloborbely.com" />
          </a>
          <a href="https://github.com/wlchs/mapsocket" target="_blank">
            <img src={gitHubLogo} className="logo" alt="GitHub logo" />
          </a>
        </div>
        <h1>MapSocket</h1>
        <p>
          Click "Send requests" at the bottom of the page to dispatch every call
          at once, or click on a single card to dispatch a request
          independently.
        </p>
      </div>
      <div className="cards">{cards}</div>
      <div>
        <button onClick={() => setTrigger(trigger + 1)}>Send requests</button>
      </div>
    </>
  );
}

export default App;
