
import errLogger from '../utils/errorLogger.js';
import infoLogger from '../utils/infoLogger.js';
import spotifyService from '../services/spotifyService.js';
import youTubeService from '../services/youTubeService.js';


import dotenv from 'dotenv';
dotenv.config();


const getSongsPage = async (req,res) =>{

    try
    {
        let { page = 0, limit = 50 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
          
       // const search_results = await spotifyService.searchMyLibSongs(req.session.access_token,'home');
       // console.log("testing search:");
       // console.log(search_results);

        const resp = await spotifyService.getSongsGroup(req.session.access_token,limit,page);
        res.json (resp.data);    
    }
    catch (err) 
    {
        errLogger.error(`getSongsPage failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

const getSongSearchResults = async (req,res) =>{

    try
    {
        let { page = 0, limit = 50 , query_text,search_type } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        console.log("page="+page);
        console.log("limit="+limit);
        console.log("query_text="+query_text);
        console.log("search_type="+search_type);

        let resp;
        
        if (search_type==='library')
        {
            resp = await spotifyService.searchMyLibSongs(req.session.access_token,query_text,limit,page);
        }
        else // search in global spotify 
        {
           const searchResult  = await spotifyService.getSpotifySearchResult(req.session.access_token,limit,page,'track',query_text);
           resp = searchResult.data.tracks;
          // console.log("resp");
           //console.log(resp);
        }
        console.log("total="+resp.total);
        res.json(resp);
    }
    catch (err) 
    {
        errLogger.error(`getSongSearchResults failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

const getAlbumSearchResults = async (req,res) => {

    try
    {
        let { page = 0, limit = 50 , query_text,search_type } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        console.log("page="+page);
        console.log("query_text="+query_text);
        console.log("search_type="+search_type);

         let resp;
        
        if (search_type==='library')
        {
            resp = await spotifyService.searchMyLibAlbums(req.session.access_token,query_text,limit,page);
        }
        else // search in global spotify 
        {
           const searchResult  = await spotifyService.getSpotifySearchResult(req.session.access_token,limit,page,'album',query_text);
           resp = searchResult.data.albums;
           console.log("resp");
           console.log(resp);
        }
        res.json(resp);
    }
    catch (err) 
    {
        errLogger.error(`getAlbumSearchResults failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }

}

const getSingleSongInfo = async (req,res) =>{

    try
    {
        const songId = req.params.songId;

        const resp = await spotifyService.getSingleSong(req.session.access_token,songId);
        const videoId = await youTubeService.getYouTubeVideoId(resp.data.artists[0].name, resp.data.name);       
       // console.log("videoId: "+videoId);
        resp.data.youTubeVideoId = videoId;

       // resp.data.accessToken = req.session.access_token;

        const resp2 = await spotifyService.fetchSDKToken(req.session.refresh_token);
        resp.data.accessToken = resp2.data.access_token;

       console.log("song access token:");
        console.log(resp.data.accessToken);

        // response.data.access_token 
      // console.log("resp.data=");
       // console.log(resp.data);

        res.json( resp.data);
    }
    catch (err) 
    {
        errLogger.error(`getSingleSongInfo failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

const getSingleAlbumInfo = async (req,res) =>{
    try
    {
        const albumId = req.params.albumId;
        const resp = await spotifyService.getSingleAlbum(req.session.access_token,albumId);
        res.json( resp.data);
    }
    catch(err)
    {
         errLogger.error(`getSingleAlbumInfo failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

const getSingleArtistInfo = async (req,res) =>{

    try
    {
        const artistId = req.params.artistId;
        const resp = await spotifyService.getSingleArtist(req.session.access_token,artistId);
        res.json( resp.data);
    }
    catch(err)
    {
         errLogger.error(`getSingleArtistInfo failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

const getAlbumsPage = async (req,res) =>{
    try
    {
        let { page = 0, limit = 50 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
       
        const resp = await spotifyService.getAlbumsGroup(req.session.access_token,limit,page);
        res.json (resp.data);    
    }
    catch(err)
    {
        errLogger.error(`getAlbumsPage failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }

}

const getArtistsPage = async (req,res)=>{
    try
    {
       // console.log("getArtistsPage");
        let { after = null, before=null,limit = 50 } = req.query;
        limit = parseInt(limit);
        const resp = await spotifyService.getArtistsList(req.session.access_token,limit,after,before);
       // console.log(resp.data);
        res.json (resp.data);   

    }
    catch(err)
    {
         errLogger.error(`getArtistsPage failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

export default { 
    getSongSearchResults,
    getAlbumSearchResults,
    getSongsPage, 
    getAlbumsPage, 
    getArtistsPage, 
    getSingleSongInfo,
    getSingleAlbumInfo,
    getSingleArtistInfo
};