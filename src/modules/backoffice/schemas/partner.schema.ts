import * as mongoose from 'mongoose';

export const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: {
            unique: true,
        },
    },
    avatar: {
        type: String,
        trim: true,
    },
    stars: {
        type: Number,
        trim: true,
    },
    latitude: {
        type: String,
        trim: true,
    },
    longitude: {
        type: String,
        trim: true,
    },
    photos: [
        {
            url: {
                type: String,
            },
        },
    ],
    views: [
        {
            rate: {
                type: Number,
            },
        },
    ],
    testmonials: [
        {
            name: {
                type: String,
            },
            rate: {
                type: Number,
            },
            body: {
                type: String,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
