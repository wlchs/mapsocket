import { useState } from "react";

import gitHubLogo from "./assets/github.svg";
import lbLogo from "./assets/lb.svg";
import "./App.css";
import { Card } from "./components/Card";

function App() {
  const [trigger, setTrigger] = useState<number>(0);

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
      </div>
      <div className="cards">
        {[...Array(4).keys()].map((_, key) => (
          <Card cardId={key + 1} key={key} trigger={trigger} />
        ))}
      </div>
      <div>
        <button onClick={() => setTrigger(trigger + 1)}>Send requests</button>
      </div>
    </>
  );
}

export default App;
