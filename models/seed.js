import mongoose from 'mongoose';

//Require models here

//Connecting mongoose to the DB

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', err=> {
    console.log('DB connection error', err);
    process.exit(1) //quit
});

db.once('open', async()=> {
    console.log('Success! DB connected');

   
    //Delete any current urls
    await Url.deleteMany()

    //...create

    //log 'created'


    process.exit(0)
});