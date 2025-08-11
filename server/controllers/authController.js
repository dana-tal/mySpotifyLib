
import errLogger from '../utils/errorLogger.js';
import infoLogger from '../utils/infoLogger.js';
import spotifyService from '../services/spotifyService.js';

// const log_row = JSON.stringify(summary);
  //     actionsLogger.info(log_row);



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
  

      try {
                console.log("calling spotifyService.getAccessToken");
                const tokenResponse = await spotifyService.fetchAccessToken(code);
                const access_token = tokenResponse.data.access_token;
                const refresh_token = tokenResponse.data.refresh_token;
                console.log("access_token:"+access_token);
                console.log("refresh_token:"+refresh_token);

                  console.log("calling spotifyService.fetchUserId");
                  const userResponse = await spotifyService.fetchUserId(access_token);
                  const userId = userResponse.data.id;
                  
                  console.log("userId: "+userId);
                req.session.userId = userId;
                req.session.refresh_token = refresh_token;

                res.redirect(`${process.env.CLIENT_SIDE_URL}?access_token=${access_token}&userId=${userId}`);      // redirect to the client side          

            } 
            catch (err) 
            {
                 errLogger.error(`getAccessToken failed: ${err.message}`, { stack: err.stack });
                return res.status(500).json(err);                 
            }
};


const refreshAccessToken = async (req, res) => {
  const refreshToken = req.session.refresh_token;
  if (!refreshToken) 
  {
    return res.status(401).json({ error: 'No refresh token in session' });
  }

  try 
  {
        const response = await spotifyService.refetchAccessToken(refreshToken);
        const new_access_token = response.data.access_token;
        res.json({ access_token: new_access_token });
  } 
  catch (err) 
  {
     errLogger.error(`refreshAccessToken failed: ${err.message}`, { stack: err.stack });                
    return res.status(500).json({ error: err.message });
  }
};


export default { getTempCode ,getAccessToken, refreshAccessToken}