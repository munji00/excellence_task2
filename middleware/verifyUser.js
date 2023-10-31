import Users from '../models/userModel.js'
export const verifyUser = async(req, res, next) => {
        const token = req.headers.access_token;
        try {
            const user = await Users.findOne({_id:token})
            if(user)
                next();
            else
                res.status(403).send({message:"user not authorized"})
            
        } catch (error) {
            res.status(400).send({message:"internal server error", error})
        }
}