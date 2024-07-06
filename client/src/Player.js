import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"
import {useState, useEffect} from "react"

export default function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri]);

    if (!accessToken) {
        // console.log("no access token provided to Player")
        return null;
    } else {
        // console.log("access token provided to Player")
    }

    if (trackUri) {
        // console.log("trackUri: " + trackUri)
    }

    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) {
                    setPlay(false);
                }
            }}
            play = {play}
            uris={trackUri ? [trackUri] : []}
        />
    )
};
