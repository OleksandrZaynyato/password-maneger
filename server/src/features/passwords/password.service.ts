import Password from "./Password.model";
import bcrypt from "bcryptjs";

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const passwordDoc = new Password({
        userId,
        userLogin,
        title,
        website,
        hashedPassword,
        salt,
    });

    return passwordDoc.save();
};

export const getPasswordsByUser = async (userId: string) => {
    return Password.find({ userId }).sort({ createdAt: -1 });
};

export const getPasswordById = async (id: string, userId: string) => {
    return Password.findOne({ _id: id, userId });
};

export const deletePassword = async (id: string, userId: string) => {
    return Password.findOneAndDelete({ _id: id, userId });
};