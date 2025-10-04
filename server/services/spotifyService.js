
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


const fetchSDKToken = (refresh_token) =>{

  const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    });


    return axios.post("https://accounts.spotify.com/api/token", body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
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


const getSpotifySearchResult = async (accessToken,limit,page,type,search_term) =>{
    
  const offset = page * limit;

  const search_obj = new URLSearchParams({limit,offset,q:search_term,type});
  const url =  process.env.SPOTIFY_SEARCH_ENTRY_POINT+'?'+search_obj;
    
  const searchResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
  return searchResponse;

}


const searchMyLibAlbums = async (accessToken, query, limit = 50, search_page = 0) => {
  
    let results = [];
    let page = 0;
    let hasMore = true;
    const lowerQuery = query.toLowerCase();

     while (hasMore) {
         const info = await getAlbumsGroup(accessToken, limit, page);
         const data = info.data;

          const matches = data.items.filter((item) => {
          const album = item.album;
          return (
            album.name.toLowerCase().includes(lowerQuery) ||
            album.artists.some((artist) =>
              artist.name.toLowerCase().includes(lowerQuery)
            )
          );
        });

        results.push(...matches);
        hasMore = !!data.next;
        page++;
     }

        
      // Step 2: Paginate matches
      const total = results.length;
      const start = search_page * limit;
      const end = start + limit;
      const items = results.slice(start, end);

      // Step 3: Return structured object
      return {
        items,
        total
      };

}

const searchMyLibSongs = async (accessToken, query, limit = 50, search_page = 0) => {
  let results = [];
  let page = 0;
  let hasMore = true;
  const lowerQuery = query.toLowerCase();

  // Step 1: Collect all matches
  while (hasMore) {
    const info = await getSongsGroup(accessToken, limit, page);
    const data = info.data;

    const matches = data.items.filter((item) => {
      const track = item.track;
      return (
        track.name.toLowerCase().includes(lowerQuery) ||
        track.artists.some((artist) =>
          artist.name.toLowerCase().includes(lowerQuery)
        )
      );
    });

    results.push(...matches);

    hasMore = !!data.next;
    page++;
  }

  // Step 2: Paginate matches
  const total = results.length;
  const start = search_page * limit;
  const end = start + limit;
  const items = results.slice(start, end);

  // Step 3: Return structured object
  return {
    items,
    total
  };
};



const getSingleSong = async (accessToken,songId)=>
{

    const url = process.env.SPOTIFY_SINGLE_SONG_ENTRY_POINT+'/'+songId;
    const songResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
    return songResponse;
}

const getSingleAlbum = async (accessToken, albumId)=>
{
    const url = process.env.SPOTIFY_SINGLE_ALBUM_ENTRY_POINT+'/'+albumId;
     const albumResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
    return albumResponse;   
}

const getSingleArtist = async (accessToken, artistId) =>
{
  const url = process.env.SPOTIFY_SINGLE_ARTIST_ENTRY_POINT+'/'+artistId;
   const artistResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
    return artistResponse;       
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


export default { 
  fetchAccessToken,
  fetchUserId,
  refetchAccessToken ,
  fetchSDKToken,
  getSongsGroup,
  getAlbumsGroup ,
  getArtistsList,
  getSingleSong,
  getSingleAlbum,
  getSingleArtist,
  searchMyLibSongs,
  getSpotifySearchResult,
  searchMyLibAlbums,
}