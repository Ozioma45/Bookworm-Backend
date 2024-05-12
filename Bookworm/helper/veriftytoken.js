import jwt from 'jsonwebtoken';


export const authenticateUser = async (authHeader) => {
    try {
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return null;
        }
        const decode= jwt.verify(token, process.env.JWT_SECRET)
        return decode.exisitingUser;
    } catch (error) {
        return null;
    }
};