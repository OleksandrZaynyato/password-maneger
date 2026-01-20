import Password from "./Password.model";
import { encrypt, decrypt } from "../../shared/utils/crypto";

export const createPassword = async ({
                                         userId,
                                         userLogin,
                                         title,
                                         website,
                                         password,
                                     }: {
    userId: string;
    userLogin: string;
    title: string;
    website: string;
    password: string;
}) => {
    if (!password) throw new Error("Password is required");

    const encrypted = encrypt(password);

    return Password.create({
        userId,
        userLogin,
        title,
        website,
        encryptedPassword: encrypted.encryptedPassword,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
    });
};


export const getPasswordsByUser = async (userId: string) => {
    const passwords = await Password.find({ userId }).lean();

    return passwords.map(p => {
        if (!p.encryptedPassword || !p.iv || !p.authTag) {
            // Skip or return a placeholder
            return { ...p, password: null };
        }

        return {
            ...p,
            password: decrypt({
                encryptedPassword: p.encryptedPassword,
                iv: p.iv,
                authTag: p.authTag,
            }),
        };
    });
};


export const deletePassword = async (id: string, userId: string) => {
    return Password.findOneAndDelete({ _id: id, userId });
};