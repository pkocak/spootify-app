const api = {
  baseUrl: 'https://api.spotify.com/v1/browse',
  authUrl: 'https://accounts.spotify.com/authorize',
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/',
  scopes: [
    "streaming",
    "user-read-email",
    "user-read-private",
  ]
}

export default api