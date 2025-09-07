
const DOMAIN = import.meta.env.VITE_APP_DOMAIN;
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="login-container">
        <h1>Welcome :-)</h1>
        <a href={`${DOMAIN}/auth/login`}>
          <button className="login-button">Login with Spotify</button>
        </a> 
      </div>
    </div>
  )
}

export default Welcome