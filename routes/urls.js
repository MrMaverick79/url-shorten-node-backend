import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { validateUrl } from '../utils/utils.js';
import dotenv from 'dotenv';
dotenv.config({path: '../config.env'});

const router = express.Router();

//Generate a short URL
router.post('/short', async (req, res) => {
    const { originalUrl } = req.body; //Note the destrcturing syntax here (ie. originalUrL:originalUrl)
    console.log('The request to post /api/short has been recievedhttps://github.com/MrMaverick79/url-shorten-react-frontend', req.body);

    //TODO: Update BASE for deploy
    const base = process.env.BASE;

    const urlId= nanoid(8); //This will create an ID with length of 8
    console.log('A new urlId has been created with nanoid', urlId);

    if(validateUrl(originalUrl)){
        console.log('The url has been validated');
        try{
            let url = await Url.findOne ({ originalUrl });
            if ( url ){
                console.log('The url was found in the db');
                //if the Url already exists in the DB
                res.json( url )
            } else{
                //Otherwise, create a new one
                console.log('The url was NOT found in the db');

                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    originalUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),

                });

                await url.save();
                res.json(url)
            }
            
        }catch( err ){
            console.log('Error');
            res.status('Server Error-unable to shorten url')
        }
    } else{
        res.status(400).json('Invalid Original Url')
    }

});//end post /short
export default router;
