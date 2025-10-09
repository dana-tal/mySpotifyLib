import axios from "axios";

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

const getSongsGroup = async (limit,page) =>{

    const url = DOMAIN+import.meta.env.VITE_SONGS_ENTRY_POINT+'?limit='+limit+'&page='+page;
    const resp = await axios.get(url);
    return resp.data; 
}


/* search_target may be : library or spotify  */

const getSongsSearchResult = async (limit,page,search_target,search_term) =>{

    const search_obj = new URLSearchParams({limit,page,query_text:search_term, search_type:search_target });
    const url =  DOMAIN+import.meta.env.VITE_SONGS_ENTRY_POINT+'search?'+search_obj;
    const resp = await axios.get(url);
    return resp.data; 
}

const getAlbumsSearchResult = async  (limit,page,search_target,search_term) =>{
    const search_obj = new URLSearchParams({limit,page,query_text:search_term, search_type:search_target });
    const url =  DOMAIN+import.meta.env.VITE_ALBUMS_ENTRY_POINT+'search?'+search_obj;
    const resp = await axios.get(url);
    return resp.data; 

}

const getArtistsSearchResult = async (limit,page,search_target,search_term) =>{
      const search_obj = new URLSearchParams({limit,page,query_text:search_term, search_type:search_target });
    const url =  DOMAIN+import.meta.env.VITE_ARTISTS_ENTRY_POINT+'search?'+search_obj;
    const resp = await axios.get(url);
    return resp.data; 
}

const getSingleSong = async (songId) =>{

    const url = DOMAIN+import.meta.env.VITE_SONGS_ENTRY_POINT+songId;
    const resp = await axios.get(url);   
    return resp.data; 
}

const getSingleAlbum = async (albumId) =>{
    console.log("albumId="+albumId);
    const url = DOMAIN+import.meta.env.VITE_ALBUMS_ENTRY_POINT+albumId;
    console.log("url="+url);
     const resp = await axios.get(url);
     console.log("resp:");
     console.log(resp);

    return resp.data; 
}

const getSingleArtist = async (artistId) =>{
    console.log("artistId="+artistId);
    const url = DOMAIN+import.meta.env.VITE_ARTISTS_ENTRY_POINT+artistId;
    console.log("url="+url);
     const resp = await axios.get(url);
     console.log("resp:");
     console.log(resp);

    return resp.data;
}


const getAlbumsGroup = async (limit, page)=>{

    const url = DOMAIN+import.meta.env.VITE_ALBUMS_ENTRY_POINT+'?limit='+limit+'&page='+page;
    const resp = await axios.get(url);
    return resp.data; 
}

const getArtistsList = async (limit,after=null)=>{

    let url = DOMAIN+import.meta.env.VITE_ARTISTS_ENTRY_POINT+'?limit='+limit;
    if (after)
    {
        url += '&after='+after;
    }
    
     const resp = await axios.get(url);
    return resp.data; 
}

export { getSongsGroup,
         getAlbumsGroup,
          getArtistsList ,
          getSingleSong,
          getSingleAlbum,
          getSingleArtist,
           getSongsSearchResult,
           getAlbumsSearchResult,
           getArtistsSearchResult
        };

