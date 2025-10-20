import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts'; 

const model = new ChatOpenAI({
  temperature: 0.8,
  openAIApiKey: process.env.OPENAI_API_KEY,
});


const getMoreAlbumsOfArtist =  async (artistName,albumsNum,  excludeAlbum = "")=>{

  const prompt_template = ChatPromptTemplate.fromMessages([
    ["system", "You are a music expert who is well-versed in famous singers, popular songs, and music albums."],
    ["human", `Return exactly {albumsNum} album names by {artistName}, excluding "{excludeClause}". 
        The albums list should not contain duplicates. Respond only with a JSON array of album names, no explanations.`]
  ]);

  const excludeClause =  excludeAlbum ? `, excluding "${excludeAlbum}"` : "";

  const formatted_prompt = await prompt_template.formatMessages({ artistName,albumsNum,excludeClause });
  const response = await model.invoke(formatted_prompt);

   try 
    {
        let content = response.content.trim();
        content = content.replace(/```json\s*/i, "").replace(/```$/, "").trim();

        const albums_list = JSON.parse(content);
        return albums_list;
        
    } 
    catch (err) 
    {
        console.error("getMoreAlbumsOfArtist, Error parsing model response:", response.content);
        return [];
    }

}

const getTopTenAlbumsOfArtist = async (artistName) =>{

     const prompt_template = ChatPromptTemplate.fromMessages([
    ["system", "You are a music expert who is well-versed in famous singers, popular songs, and music albums."],
     ["human", `Return exactly 10 top most popular album names by {artistName}.
      Avoid duplicate albums. Respond only with a valid JSON array of album names, like this:
      ["Album 1", "Album 2", ...] .Do NOT include any object fields, keys, or explanations..`]
  ]);

    const formatted_prompt = await prompt_template.formatMessages({ artistName});
    const response = await model.invoke(formatted_prompt);

    try 
    {
        let content = response.content.trim();
        content = content.replace(/```json\s*/i, "").replace(/```$/, "").trim();

        const albums_list = JSON.parse(content);
        return albums_list;
        
    } 
    catch (err) 
    {
        console.error("getTopTenAlbumsOfArtist, Error parsing model response:", response.content);
        return [];
    }

}

const getMoreSongsOfArtist = async (artistName,songsNum, excludeSong)=>{

    const prompt_template = ChatPromptTemplate.fromMessages([
    ["system", "You are a music expert who is well-versed in famous singers, popular songs, and music albums."],
    ["human", `Return exactly {songsNum} song names by {artistName}, excluding "{excludeSong}". 
        Each of the songs must be from a different album.
Respond only with a JSON array of song names, no explanations.`]
  ]);

    const formatted_prompt = await prompt_template.formatMessages({ artistName,songsNum,excludeSong });
    const response = await model.invoke(formatted_prompt);
    try 
    {
        let content = response.content.trim();
        content = content.replace(/```json\s*/i, "").replace(/```$/, "").trim();

        const songs_list = JSON.parse(content);
        return songs_list;
        
    } 
    catch (err) 
    {
        console.error(" getMoreSongsOfArtist, Error parsing model response:", response.content);
        return [];
    }
    //const response = await model.invoke(formatted_prompt);
    //return response.content;

}

const getTopTenSongsOfArtist = async (artistName) =>{


      const prompt_template = ChatPromptTemplate.fromMessages([
    ["system", "You are a music expert who is well-versed in famous singers, popular songs, and music albums."],
     ["human", `Return exactly 10 top most popular song names by {artistName}.
Each of the songs must be from a different album.
Respond only with a valid JSON array of album names, like this:
      ["Album 1", "Album 2", ...] .Do NOT include any object fields, keys, or explanations...`]

  ]);

   const formatted_prompt = await prompt_template.formatMessages({ artistName});
    const response = await model.invoke(formatted_prompt);

    try 
    {
        let content = response.content.trim();
        content = content.replace(/```json\s*/i, "").replace(/```$/, "").trim();

        const songs_list = JSON.parse(content);
        return songs_list;
        
    } 
    catch (err) 
    {
        console.error("Error parsing model response:", response.content);
        return [];
    }
  //  return response.content; 

}


export default
{
    getMoreSongsOfArtist,
    getTopTenSongsOfArtist,
    getMoreAlbumsOfArtist,
    getTopTenAlbumsOfArtist
}