const express = require('express');
const axios = require('axios');
const cors = require('cors');

//Initialize Express
const app = express();

//use cors middleware to allow cross-origin requests (if you're testing locally)
app.use(cors());

//set port of the API server
const PORT = 3000;

//define route for fetching Wordpress post by ID
app.get('/get-article',async (req, res)=>{
    const { article_id } = req.query;

    //check if article_id is provided
    if(!article_id){
        return res.status(400).json({error:'missing article id'});
    }
    try{
        //Replace with your actual wordpress APi URl
        const wpUrl = `http://localhost/news/NEWS-CMS/wp-json/wp/v2/posts/${article_id}`;

        //Fetachdata from wordpress using Axios
        const response = await axios.get(wpUrl);

        //send back the post data
        res.json(response.data);
    }catch(error){
        //Handle errors (eg.,post not found or API error)
        res.status(500).json({error: 'post not found or WP API error'});
    }
});

//Start the server
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})