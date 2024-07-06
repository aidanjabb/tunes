import {useState, useEffect} from "react"
import axios from "axios"

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // exchange auth code for access and refresh tokens
    useEffect(() => {
        // console.log("useEffect for auth code");
        axios.post("http://localhost:3001/login", {
            code
        }).then(res => {
            // console.log("setting access token: " + accessToken);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            // remove the auth code from the URL
            window.history.pushState({}, null, "/");
        }).catch(() => {
            /*
            redirect the user to the login page in case of error (eg auth code expires) 
            */
            window.location = "/";
        })
    }, [code]);

    useEffect(() => {
        /*
        don't want to run this useEffect if either refreshToken or expiresIn hasn't been set yet
        */
        if (!refreshToken || !expiresIn) {
            return;
        }

        /*
        set a timeout to make sure we only refresh the token right before (in this case 1 min before) it expires
        */
        const timeout = setInterval(() => {
            console.log("posting refresh token");
            axios.post("http://localhost:3001/refresh", {
                refreshToken
            }).then(res => {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            }).catch(() => {
                window.location = "/";
            })
        }, (expiresIn - 60) * 1000);
        
        // clear timeout in case of error
        return () => clearInterval(timeout);
    }, [refreshToken, expiresIn]);

    return accessToken;
};

