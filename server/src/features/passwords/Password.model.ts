import mongoose from "mongoose";

const passwordModel = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        userLogin: { type: String, required: true },
        title: { type: String, required: true },
        website: { type: String, required: true },

        encryptedPassword: { type: String, required: true },
        iv: { type: String, required: true },
        authTag: { type: String, required: true },

    },
    {
        timestamps: true,
        collection: "passwords",
    });


export default mongoose.model("Password", passwordModel);