
import axios from 'axios';

const fetchAccessToken =  (spotifyCode) =>{
   
    const redirect_uri =  process.env.REDIRECT_URI;    
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const body = new URLSearchParams({     // this is the information to be sent to Spotify in order to get the access token
                grant_type: 'authorization_code',
                code:spotifyCode,
                redirect_uri,
            });

    return axios.post(process.env.SPOTIFY_TOKEN_API_URL, body, {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                });

}


const fetchUserId = (access_token) =>{

        return  axios.get( process.env.SPOTIFY_USER_API_URL, {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                  });

}


const refetchAccessToken = (refreshToken) =>{

    const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

    return axios.post(process.env.SPOTIFY_TOKEN_API_URL, body, {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

}

const getSongsGroup = async (accessToken, limit,page) =>{

  const offset = page * limit;

  const url = process.env.SPOTIFY_SONGS_ENTRY_POINT+`?limit=${limit}&offset=${offset}`;
   

  const tracksResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

  return tracksResponse;

}

const getAlbumsGroup = async (accessToken, limit, page)=>
{
    const offset = page * limit;

    const url = process.env.SPOTIFY_ALBUMS_ENTRY_POINT+`?limit=${limit}&offset=${offset}`;
  
    const albumsResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

    return albumsResponse;
}

const getArtistsList = async (accessToken, limit,after=null,before=null) =>
{    
    const url = new URL(process.env.SPOTIFY_ARTISTS_ENTRY_POINT);
    url.searchParams.set("type", "artist");
    url.searchParams.set("limit", limit);
    if (after)
    {
      url.searchParams.set("after", after);
    }
    else if (before)
    {
       url.searchParams.set("before",before);
    }
   
    const artistsResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
    
    return artistsResponse;
}


export default { fetchAccessToken, fetchUserId, refetchAccessToken , getSongsGroup, getAlbumsGroup , getArtistsList }