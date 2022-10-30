import express from 'express';
import Url from '../models/Url.js';
const router = express.Router();

//This get request uses the urlId in the params to find the url 
router.get('/:urlId', async( req, res)=> {
    console.log('A request has been made to look up the shortened url', req.params.urlId);
    
    try{
        const url = await Url.findOne({ urlId: req.params.urlId});
        //If the url already exists, we use the inbuolt mongodb $inc method here to increase the clicks.
            if ( url ){
                console.log('The url ahs been found');
                await Url.updateOne(
                    {
                        urlId: req.params.urlId
                    },
                    { $inc: {clicks: 1}}
                );
                //The user is then redirected to the original url
                return res.redirect(url.originalUrl);
            } else 
                res.status(404).json('Not found');
                

        } catch (err){
            console.log('There has been an error retrieving the url', err);
            res.status( 500 ).json('Server error while attempting to retrieve that url - index.js')
        }
    
});

export default router;