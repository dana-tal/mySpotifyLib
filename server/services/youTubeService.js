import { google } from "googleapis";


const getYouTubeVideoId = async (artistName, songName) =>{

    const query = `${artistName} ${songName} official music video`; //official music video //-official

    try
    {
        const youtube = google.youtube({
            version: "v3",
            auth: process.env.YOUTUBE_API_KEY, 
            });

        const response = await youtube.search.list({
            part: "snippet",
            q: query,
            maxResults: 10, // how many results 
            type: "video", // get me only videos , not playlists or something else
            }); 
            
        if (response.data.items.length > 0) 
        {

            /*    const ids = response.data.items.map(item => item.id.videoId).join(',');

                const details = await youtube.videos.list({
                        part: "status",
                        id: ids,
                });

                const embeddableVideos = details.data.items.filter(video => video.status.embeddable);

                console.log("embeddable:");
                console.log(embeddableVideos )
            */

            const videoId =  response.data.items[0].id.videoId; //  embeddableVideos.length >0? embeddableVideos[0].id 

            
            return videoId;
        } 
        else 
        {
            console.log("Youtube did not find any matches for the query:"+query);
            return null;
        }
    }
    catch(err)
    {
           console.error(err);
    }
    

}

export default { getYouTubeVideoId}