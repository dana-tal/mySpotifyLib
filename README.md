# MySpotifyLib

A React-based web app inspired by Spotify.  
It provides AI-generated song and album recommendations and integrates YouTube  
content for an extended listening and viewing experience.

---

## Live Demo

https://myspotifylib.onrender.com

Note: This project is hosted on a free Render plan.  
After a period of inactivity, the server may go to sleep,  
so the first load can take up to five minutes.

---

## Overview

MySpotifyLib integrates the Spotify Web API, YouTube Data API,  
and an AI language model (LLM) such as OpenAI.  
Users can explore their personal Spotify content,  
perform global searches, and view dynamic artist, album,  
and song pages enriched with AI insights and YouTube media.

---

## Main Features

### Songs Page

- Shows a paginated list of songs from the user's Spotify library.  
- Includes a dedicated search that searches songs  
  either in the personal library or in Spotify’s global catalog.  
- Clicking a song opens its Song Detail Page.

### Song Detail Page

- Displays song information and the album cover.  
- Includes a Spotify play button for Premium users only.  
- Integrates a YouTube video or link related to the song.  
- Shows more songs by the same artist at the bottom.  
- Interactive AI behavior:  
  - MouseOver on the album image shows a popup  
    with more songs by the same artist (AI-generated).  
  - Clicking the album image replaces it with  
    the artist’s Top Ten Songs (AI-generated).  
  - Clicking again restores the original image.

---

### Albums Page

- Displays a paginated list of albums from the user’s Spotify library.  
- Includes a dedicated search for albums,  
  allowing searches within the personal library or globally.  
- Clicking an album opens its Album Detail Page.

### Album Detail Page

- Displays album details and a link to the artist page.  
- Lists all tracks in the album.  
- Clicking a track navigates to the corresponding Song Page.  
- Shows more albums by the same artist at the bottom.  
- Interactive AI behavior:  
  - MouseOver on an album image shows a popup  
    with more albums by the same artist (AI-generated).  
  - Clicking the image replaces it with  
    the artist’s Top Ten Albums (AI-generated).  
  - Clicking again restores the original image.

---

### Artists Page

- Displays a paginated list of artists.  
- Includes a dedicated search for artists.  
- Clicking an artist opens the Artist Detail Page.

### Artist Detail Page

- Shows the artist’s number of followers, popularity score,  
  and music genres.  
- Lists albums by that artist.  
- Interactive AI behavior:  
  - MouseOver on the artist image shows a popup  
    with more albums by the same artist (AI-generated).  
  - Clicking the image replaces it with  
    the artist’s Top Ten Songs (AI-generated).  
  - Clicking again restores the original image.

---

## AI Integration

AI-generated content appears throughout the app:  
song detail pages, album detail pages, and artist detail pages.  
All such data (for example, lists of top songs or albums)  
is generated dynamically using an LLM API such as OpenAI.

---

## Technologies

Frontend: React  
Backend: Node.js and Express  
APIs: Spotify Web API, YouTube Data API, OpenAI API (via LangChain)  
Hosting: Render (free plan)

---

## Authentication and Access

Spotify requires that each app define a whitelist of user emails for login.  
If you would like to access the live demo:

1. Send your Spotify-linked email address to the developer.  
2. I’ll add it to the app’s whitelist and notify you when it is ready.

---

## Limitations

Spotify Premium Requirement:  
Non-Premium users will not be able to play songs using the Spotify play button.  
They can still watch the song video through the YouTube iframe  
(if available) or through the provided YouTube link.

Free Hosting Delay:  
Render’s free plan may cause a delay on the first request  
after a period of inactivity.  
Please wait patiently during this initial load.

---

## Repository

GitHub: https://github.com/dana-tal/mySpotifyLib  
Demo: https://myspotifylib.onrender.com

---

## Developer

Dana Tal
