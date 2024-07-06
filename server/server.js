const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require("lyrics-finder")
// const azapi = require('azapi')

const app = express(); 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// refresh access token
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    // console.log("refresh token: " + refreshToken);
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'e96f2fc9b0dd476eb0e370daee89691a',
        clientSecret: 'd4fa681bedf74840ac08021894a5835c',
        refreshToken
    });

    spotifyApi.refreshAccessToken().then(sendToken, errHandler);

    function sendToken(data) {
        console.log("refreshing access token");
        res.json({
            accessToken: data.body['access_token'],
            expiresIn: data.body['expires_in'],
        })
    }

    function errHandler(err) {
        console.log("error refreshing access token");
        console.log(err);
        res.sendStatus(400);
    }
});


// get access token
app.post('/login', (req, res) => {
    console.log("calling login post method");
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'e96f2fc9b0dd476eb0e370daee89691a',
        clientSecret: 'd4fa681bedf74840ac08021894a5835c'
    });

    // exchange auth code for access and refresh tokens
    const code = req.body.code;
    // console.log("calling authorization code grant");
    spotifyApi.authorizationCodeGrant(code).then(sendTokens, errHandler);

    function sendTokens(data) {
        console.log("exchanging auth code for access and refresh tokens");
        res.json({
            accessToken: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
            expiresIn: data.body['expires_in'],
        })
    }

    function errHandler(err) {
        console.log("error exchanging auth code for access and refresh tokens");
        console.log(err);
        res.sendStatus(400);
    }
});


app.get("/lyrics", async (req, res) => {
    const lyrics =
      (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
  })



app.listen(3001);
