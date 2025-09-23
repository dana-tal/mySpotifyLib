
import errLogger from '../utils/errorLogger.js';
import infoLogger from '../utils/infoLogger.js';
import spotifyService from '../services/spotifyService.js';


import dotenv from 'dotenv';
dotenv.config();

// const log_row = JSON.stringify(summary);
  //     actionsLogger.info(log_row);



const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri =  process.env.REDIRECT_URI;




const getTempCode = (req,res)=>{
       //console.log("inside getTempCode");

      // console.log("redirect_uri:");
      // console.log(redirect_uri)

       const scope = 'user-library-read user-read-email user-read-private user-follow-read streaming user-modify-playback-state user-read-playback-state'; // this is how to ask spotify to give access permission to the user library
    
            const authUrl =
      process.env.SPOTIFY_AUTHORIZE_URL +
      "?" +
      new URLSearchParams({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
     /*  show_dialog: "true", */  // 👈 force re-consent */
      });



        //console.log("authUrl:");
        //console.log (authUrl);
        
        res.redirect(authUrl);
}


const setAccessToken = async (req,res) =>{

    const code = req.query.code; // read the temporary code returned from spotify 

      try {
        //        console.log("calling spotifyService.getAccessToken");
                const tokenResponse = await spotifyService.fetchAccessToken(code);

                console.log("Scopes:", tokenResponse.data.scope);
                
                const access_token = tokenResponse.data.access_token;
                const refresh_token = tokenResponse.data.refresh_token;
             //  console.log("setAccessToken, access_token:"+access_token);
            //    console.log("refresh_token:"+refresh_token);

              //    console.log("calling spotifyService.fetchUserId");
                  const userResponse = await spotifyService.fetchUserId(access_token);
                 // console.log("setAccessToken, userResponse: ");
                //  console.log("Spotify user data:", userResponse.data);
                  const userId = userResponse.data.id;
                  
                 console.log("userId: "+userId);

                req.session.userId = userId;
                req.session.access_token = access_token;
                 req.session.access_token_expires_at = Date.now() + tokenResponse.data.expires_in * 1000; // remember when this access token expires 
               // req.session.access_token_expires_at = Date.now() + 5 * 1000; // expires in 5 seconds, for testing refresh mechanism 
                req.session.refresh_token = refresh_token;

                 // Force session to save before redirecting
              req.session.save(err => {
                  if (err) {
                      console.error("Session save error:", err);
                      return res.status(500).send("Session save failed");
                  }
                  // console.log("Session saved successfully!");
                  res.redirect(`${process.env.CLIENT_SIDE_URL}?login=success`);      
              });

              //  res.redirect(`${process.env.CLIENT_SIDE_URL}?access_token=${access_token}&userId=${userId}`);      // redirect to the client side    
            

            } 
            catch (err) 
            {
                 if (err.response?.status === 403) 
                  {
                      console.error("Spotify user not registered:", err.response.data);
                       res.redirect(`${process.env.CLIENT_SIDE_URL}?login=not_registered`);     
                     // return res.status(400).json({ 
                      //  error: "Spotify account not found. Please log in with a valid Spotify account." 
                      //});
                  } 
                  else 
                  {
                      //errLogger.error(`setAccessToken failed: ${err.message}`, { stack: err.stack });
                      return res.status(500).json({error: err.response?.data || err.message});                 
                   }
            }
};


const refreshAccessToken = async (req, res,next) => {
  const refreshToken = req.session.refresh_token;

//  console.log("Entering refreshAccessToke: ");
 // console.log("refreshToken="+refreshToken);

  if (!refreshToken) 
  {
    return res.status(401).json({ error: 'No refresh token in session' });
  }

  try 
  {
        const response = await spotifyService.refetchAccessToken(refreshToken);
        const new_access_token = response.data.access_token;

      //  console.log('Access token expired. Refreshing...');
       // console.log('New access token:', new_access_token);

        req.session.access_token = new_access_token;
        req.session.access_token_expires_at = Date.now() + response.data.expires_in * 1000; // update the expiration time of the access token

        req.session.save(err => {
                                    if (err) 
                                      console.error('Session save error:', err);
                                    if (next) next();  // call next() if used as middleware, next is undefined when refreshAccessToken is called as a normal endpoint.
                                    else res.json({ access_token: new_access_token }); // keep existing API response
                                    //res.json({ access_token: new_access_token });
                                });
       
  } 
  catch (err) 
  {
     errLogger.error(`refreshAccessToken failed: ${err.message}`, { stack: err.stack });                
    return res.status(500).json({ error: err.message });
  }
};

const getAccessToken = (req,res)=>{

     console.log("inside getAccessToken");

       if (!req.session.access_token)
        {
            return res.status(401).json({ error: 'No access token' });
        }
      const response = { 
                            userId: req.session.userId ,
                            accessToken: req.session.access_token 
                        }
      console.log( response);
      res.json (response);                       
}


const getSDKToken = async (req, res) => {
  try {
    if (!req.session.refresh_token) {
      return res.status(401).json({ error: "No refresh token in session" });
    }

    const resp = await spotifyService.fetchSDKToken(req.session.refresh_token);
    console.log("SDK Token scopes:", resp.data.scope);
    const access_token = resp.data.access_token;

    res.json({ access_token });
  } catch (err) {
    console.error("Error fetching SDK token:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export default { getTempCode ,setAccessToken, refreshAccessToken, getAccessToken, getSDKToken}