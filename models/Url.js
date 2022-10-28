import mongoose from "mongoose";

//Model for Urls

const UrlSchema = new mongoose.SchemaTypeOptions({

    urlId:{
        type: String,
        required: true,
    },

    originalUrl: {
        type: String,
        required: true,
    },

    shortUrl: {
        type: String,
        required: true,
    },

    clicks: {
        type: Number,
        required: true,
        default: 0,
    },

    date: {
        type: String,
        default: Date.now,
    }






}) //end UrlSchema

export default mongoose.model('Url', UrlSchema);