import mongoose from "mongoose";

const passwordModel = new mongoose.Schema({
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
        userLogin: {type: String, required: true},
        title: {type: String, required: true},
        website: {type: String, required: true},
        hashedPassword: {type: String, required: true},
        salt: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now}
    },
    {
        timestamps: true, collection: 'passwords'
    });

export default mongoose.model("Password", passwordModel);