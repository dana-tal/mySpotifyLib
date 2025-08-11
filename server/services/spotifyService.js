
import axios from 'axios';

const fetchAccessToken =  (spotifyCode) =>{
   
    const redirect_uri =  process.env.REDIRECT_URI;    
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const body = new URLSearchParams({     // this is the information to be sent to Spotify in order to get the access token
                grant_type: 'authorization_code',
                spotifyCode,
                redirect_uri,
            });

    return axios.post(process.env.SPOTIFY_TOKEN_API_URL, body, {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                });

}


const fetchUserId = () =>{

        return  axios.get( process.env.SPOTIFY_USER_API_URL, {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                  });

}


const refetchAccessToken = (refreshToken) =>{

    const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refreshToken,
        });

    return axios.post(process.env.SPOTIFY_TOKEN_API_URL, body, {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

}


export default { fetchAccessToken, fetchUserId, refetchAccessToken }