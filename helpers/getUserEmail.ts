import User from "../models/User";


export const getUserEmail = async (userId: string) => {
    const userData: any = await User.findOne({_id: userId});
    if (!userData) {
        return null;
    }
    return userData.email;
}