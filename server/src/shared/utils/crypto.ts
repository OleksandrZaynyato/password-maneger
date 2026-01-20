import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.PASSWORD_SECRET!, "hex");
// must be 32 bytes (64 hex chars)

export const encrypt = (text: string) => {
    const iv = crypto.randomBytes(12); // GCM recommended 12 bytes
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
        encryptedPassword: encrypted.toString("hex"),
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
    };
};

export const decrypt = ({
                            encryptedPassword,
                            iv,
                            authTag,
                        }: {
    encryptedPassword: string;
    iv: string;
    authTag: string;
}) => {
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        KEY,
        Buffer.from(iv, "hex")
    );

    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedPassword, "hex")),
        decipher.final(),
    ]);

    return decrypted.toString("utf8");
};
