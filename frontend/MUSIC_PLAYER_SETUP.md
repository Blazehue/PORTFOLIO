# Music Player Setup Guide

The music player in your portfolio has three modes: **Spotify**, **Random Music**, and **YouTube Search**. Here's how to configure each feature:

## 🎵 Random Music (Works Out of the Box)

The random music feature is **already functional** and doesn't require any setup! It plays curated lofi/chill music videos from YouTube.

**How it works:**
1. Click the music icon in the Dynamic Island (top center)
2. Click "Play Random Music"
3. A random song will play in the background via embedded YouTube iframe

## 🔍 YouTube Search

To enable YouTube search with video results, you need a YouTube Data API key.

### Setup Steps:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com

2. **Create a New Project** (or use existing)
   - Click "Select a project" → "New Project"
   - Name it (e.g., "Portfolio Music Player")
   - Click "Create"

3. **Enable YouTube Data API v3**
   - In the left sidebar, go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API key"
   - Copy your API key

5. **Add API Key to Code**
   - Open `src/pages/Professional.jsx`
   - Find the `searchYouTube` function (around line 107)
   - Replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual API key:
   ```javascript
   const YOUTUBE_API_KEY = 'AIzaSyC...your-actual-key-here';
   ```

6. **Optional: Restrict API Key**
   - In Google Cloud Console, click your API key
   - Add "HTTP referrers" restriction: `http://localhost:3000/*` and your production domain
   - Save

### Without API Key:
If you don't configure the API key, the search will fallback to opening YouTube in a new tab, which still works but won't show results inline.

## 🎧 Spotify Integration

To enable Spotify playback, you need a Spotify Developer account and Client ID.

### Setup Steps:

1. **Create Spotify Developer Account**
   - Visit: https://developer.spotify.com/dashboard
   - Log in with your Spotify account (create one if needed)

2. **Create a New App**
   - Click "Create app"
   - Fill in:
     - **App name**: Portfolio Music Player
     - **App description**: Music player for my portfolio website
     - **Redirect URIs**: `http://localhost:3000` (add your production URL later)
     - **APIs used**: Web API
   - Check the terms checkbox
   - Click "Save"

3. **Get Client ID**
   - Click on your newly created app
   - Copy the "Client ID" from the app settings

4. **Add Client ID to Code**
   - Open `src/pages/Professional.jsx`
   - Find the `handleSpotifyConnect` function (around line 164)
   - Replace `YOUR_SPOTIFY_CLIENT_ID_HERE` with your actual Client ID:
   ```javascript
   const SPOTIFY_CLIENT_ID = 'abc123...your-actual-client-id';
   ```

5. **Add Production Redirect URI** (when deploying)
   - Go back to your Spotify app in the dashboard
   - Click "Edit Settings"
   - Add your production URL to "Redirect URIs" (e.g., `https://yourdomain.com`)
   - Click "Save"

### How Spotify Login Works:
1. User clicks "Connect Spotify"
2. A popup opens with Spotify login
3. User authorizes your app
4. Spotify redirects back with an access token
5. Your app can now control Spotify playback (requires Spotify Premium)

**Note:** Full Spotify playback requires a Premium account. Without Premium, users can still authorize but playback features will be limited.

---

## 🚀 Quick Start (No Setup Required)

If you just want to test the music player without setting up APIs:

1. **Use Random Music** - Works immediately with the pre-configured YouTube playlist
2. **Use YouTube Search** - Will open YouTube in a new tab (fallback mode)
3. **Skip Spotify** - Only needed if you want Spotify integration

---

## 📝 Summary

| Feature | Setup Required | Fallback Behavior |
|---------|----------------|-------------------|
| Random Music | ✅ None | N/A - Works out of the box |
| YouTube Search | ⚠️ API Key | Opens YouTube in new tab |
| Spotify | ⚠️ Client ID | Shows setup instructions |

---

## 🛠️ Troubleshooting

### YouTube Search opens in new tab instead of showing results
- You haven't configured the YouTube API key yet
- Check the console for errors
- Verify your API key is valid and the YouTube Data API v3 is enabled

### Spotify shows "Invalid Client"
- Your Client ID is incorrect or still set to the placeholder
- Check that you've added the correct Redirect URI in Spotify Dashboard
- Make sure your app is not in "Development Mode" with user limits

### Random music has no sound
- Check browser permissions (some browsers block autoplay)
- Look for any console errors
- Try clicking play/pause again

### CORS errors with YouTube API
- Make sure you're using the correct API endpoint
- Check that your API key restrictions aren't too strict
- Try accessing from `localhost:3000` as configured

---

## 🎨 Customizing

Want to change the music selection?

Edit the `randomSongs` array in `src/pages/Professional.jsx`:

```javascript
const randomSongs = [
  { title: 'Your Song Title', url: 'https://www.youtube.com/watch?v=VIDEO_ID' },
  // Add more songs...
];
```

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors (F12 → Console tab)
2. Verify all API keys are correctly copied (no extra spaces)
3. Ensure all redirect URIs match exactly
4. Try in incognito mode to rule out browser extensions

Enjoy your music player! 🎵
