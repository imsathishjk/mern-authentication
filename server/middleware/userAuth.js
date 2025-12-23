import jwt from 'jsonwebtoken';
const userAuth = async (req, res, next) => {
    const { token } = await req.cookies;

    try {
 
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized, Login Again!' });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_TEXT);
        if (decodeToken.id) {

            req.userId = decodeToken.id;
            next();

        } 
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export default userAuth;