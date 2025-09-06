
import errLogger from '../utils/errorLogger.js';
import infoLogger from '../utils/infoLogger.js';
import spotifyService from '../services/spotifyService.js';


import dotenv from 'dotenv';
dotenv.config();




const getSongsPage = async (req,res) =>{

    try
    {
        let { page = 0, limit = 50 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
          
        const resp = await spotifyService.getSongsGroup(req.session.access_token,limit,page);
        res.json (resp.data);    
    }
    catch (err) 
    {
        errLogger.error(`getSongsPage failed: ${err.message}`, { stack: err.stack });                
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
        console.log("getArtistsPage");
        let { after = null, before=null,limit = 50 } = req.query;
        limit = parseInt(limit);
        const resp = await spotifyService.getArtistsList(req.session.access_token,limit,after,before);
        console.log(resp.data);
        res.json (resp.data);   

    }
    catch(err)
    {
         errLogger.error(`getArtistsPage failed: ${err.message}`, { stack: err.stack });                
        return res.status(500).json({ error: err.message });
    }
}

export default { getSongsPage, getAlbumsPage, getArtistsPage };