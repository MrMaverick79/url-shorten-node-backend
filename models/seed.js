import mongoose from 'mongoose';

//Require models here

//Connecting mongoose to the DB

mongoose.connect(process.env.NODE_ENV="development" ? 'mongodb://127.0.0.1/url': "ATLAS" );

const db = mongoose.connection;

db.on('error', err=> {
    console.log('DB connection error', err);
    process.exit(1) //quit
});

db.once('open', async()=> {
    console.log('Success! DB connected');

    //TODO: Once models created

    // await Url.deleteMany()

    //...create

    //log 'created'


    process.exit(0)
});