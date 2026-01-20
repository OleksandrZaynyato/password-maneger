import { User } from "./auth.model";
import { MagicToken } from "./magicToken.model";
import { generateToken } from "../../shared/utils/token";
import { RegisterDTO } from "./auth.types";

export const registerUser = async ({ email }: RegisterDTO) => {
    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({ email });
    }

    // Generate magic link token
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await MagicToken.create({
        userId: user._id,
        token,
        expiresAt,
        used: false,
    });

    return { user, token };
};

// Verify token
export const verifyMagicToken = async (tokenStr: string) => {
    const magicToken = await MagicToken.findOne({ token: tokenStr });

    if (!magicToken) throw new Error("Invalid token");
    if (magicToken.used) throw new Error("Token already used");
    if (magicToken.expiresAt < new Date()) throw new Error("Token expired");

    // Mark token as used
    magicToken.used = true;
    await magicToken.save();

    // Mark user verified
    const user = await User.findById(magicToken.userId);
    if (!user) throw new Error("User not found");

    user.isVerified = true;
    await user.save();

    return user;
};

export const loginUser = async ({ email }: RegisterDTO) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await MagicToken.create({
        userId: user._id,
        token,
        expiresAt,
        used: false,
    });

    return { user, token };
};
