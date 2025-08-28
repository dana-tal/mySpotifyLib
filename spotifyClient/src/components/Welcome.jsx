
const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

function Welcome() {
  return (
    <div>
        <h1>Welcome :-)</h1>
        <a href={`${DOMAIN}/auth/login`}>
                                  <button>Login with Spotify</button>
                              </a> 
        </div>
  )
}

export default Welcome