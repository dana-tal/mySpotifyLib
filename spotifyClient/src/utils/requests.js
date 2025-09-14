import axios from "axios";

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

const getSongsGroup = async (limit,page) =>{

    const url = DOMAIN+import.meta.env.VITE_SONGS_ENTRY_POINT+'?limit='+limit+'&page='+page;
    const resp = await axios.get(url);
    return resp.data; 
}

const getSingleSong = async (songId) =>{

    console.log("songId="+songId);
    const url = DOMAIN+import.meta.env.VITE_SONGS_ENTRY_POINT+songId;
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

const getArtistsList = async (limit,after=null,before=null)=>{

    let url = DOMAIN+import.meta.env.VITE_ARTISTS_ENTRY_POINT+'?limit='+limit;
    if (after)
    {
        url += '&after='+after;
    }
    else if (before)
    {
        url += '&before='+before;
    }
     const resp = await axios.get(url);
    return resp.data; 
}

export { getSongsGroup, getAlbumsGroup, getArtistsList ,getSingleSong};

