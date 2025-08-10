import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import errlogger from '../utils/errorLogger.js';


const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri =  process.env.REDIRECT_URI;




const getTempCode = (req,res)=>{
       console.log("inside getTempCode");
       const scope = 'user-library-read user-read-email'; // this is how to ask spotify to give access permission to the user library

        const authUrl = process.env.SPOTIFY_AUTHORIZE_URL+'?' +
        new URLSearchParams({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        });  
        console.log("authUrl:");
        console.log (authUrl);
        
        res.redirect(authUrl);
}


const getAccessToken = async (req,res) =>{

      console.log("Inside getAccessToken");
    const code = req.query.code; // read the temporary code returned from spotify 

      console.log("code="+code);
    const body = new URLSearchParams({     // this is the information to be sent to Spotify in order to get the access token
                grant_type: 'authorization_code',
                code,
                redirect_uri,
            });
    
      try {
                const tokenResponse = await axios.post(process.env.SPOTIFY_TOKEN_API_URL, body, {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                });

                const access_token = tokenResponse.data.access_token;
                console.log("access_token:"+access_token)

                res.redirect(`${process.env.CLIENT_SIDE_URL}?access_token=${access_token}`);  // redirect to the client side 

            } 
            catch (err) 
            {
                 errlogger.error(`login failed: ${err.message}`, { stack: err.stack });
                return res.status(500).json(err);                 
            }
};


export default { getTempCode ,getAccessToken}