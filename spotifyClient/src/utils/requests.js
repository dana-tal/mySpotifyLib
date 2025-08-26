import axios from "axios";

const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

const getSongsGroup = async (limit,page) =>{

    const url = DOMAIN+import.meta.env.VITE_SONGS_ENTRY_POINT+'?limit='+limit+'&page='+page;
    const resp = await axios.get(url);
    return resp.data; 
}

const getAlbumsGroup = async (limit, page)=>{

    const url = DOMAIN+import.meta.env.VITE_ALBUMS_ENTRY_POINT+'?limit='+limit+'&page='+page;
    const resp = await axios.get(url);
    return resp.data; 
}

const getArtistsList = async (limit,after=null)=>{

    const url = DOMAIN+import.meta.env.VITE_ARTISTS_ENTRY_POINT+'?limit='+limit;
    if (after)
    {
        url += '&after='+after;
    }
     const resp = await axios.get(url);
    return resp.data; 
}

export { getSongsGroup, getAlbumsGroup, getArtistsList };

