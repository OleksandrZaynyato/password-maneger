import { Schema, model, Document, Types } from "mongoose";

export interface IMagicToken extends Document {
    userId: Types.ObjectId;
    token: string;
    expiresAt: Date;
    used: boolean;
}

const magicTokenSchema = new Schema<IMagicToken>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
});

export const MagicToken = model<IMagicToken>("MagicToken", magicTokenSchema);
