import gitHubLogo from './assets/github.svg'
import lbLogo from './assets/lb.svg'
import './App.css'

function App() {
 
  return (
    <>
      <div>
        <a href="https://laszloborbely.com" target="_blank">
          <img src={lbLogo} className="logo" alt="laszloborbely.com" />
        </a>
        <a href="https://github.com/wlchs/mapsocket" target="_blank">
          <img src={gitHubLogo} className="logo" alt="GitHub logo" />
        </a>
      </div>
      <h1>MapSocket</h1>
      <div className="card">
      </div>
      <p className="read-the-docs">
        Click on the logos to learn more
      </p>
    </>
  )
}

export default App
