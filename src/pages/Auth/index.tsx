import api from "../../config"
import "./style.scss"

const Auth = () => {
  const loginUrl = `${api.authUrl}?client_id=${api.clientId}&response_type=token&show_dialog=true&redirect_uri=${api.redirectUri}&scope=${api.scopes.join(
    "%20"
  )}`
  return (
    <div className='auth'>
      <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify-Logo" />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  )
}

export default Auth