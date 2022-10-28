import express from 'express';
import Url from '../models/Url.js';
const router = express.Router();

//This get request uses the urlId in the params to find the url 
router.get('/:urlId', async( req, res)=> {
    
    try{
        const url = await Url.findOne({ urlId: req.params.urlId});
        //If the url already exists, we use the inbuolt mongodb $inc method here to increase the clicks.
            if ( url ){
                await Url.updateOne(
                    {
                        urlId: params.urlId
                    },
                    { $inc: {clicks: 1}}
                );
                //The user is then redirected to the original url
                return res.redirect(url.origUrl);
            } else 
                res.status(404).json('Not found');
                

        } catch (err){
            console.log('There has been an error retreiving the url', err);
            res.status( 500 ).json('Server error - index.js')
        }
    
});

export default router;