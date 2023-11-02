import userTokenCollection from '../models/accessTokenSchema.js'


export const verifyUser = async(req, res, next) => {
        const token = req.headers.access_token;
        try {
            const isExist = await userTokenCollection.findOne({accessToken:token})
            if(isExist)
            {
              req.id=isExist.user_id;
              next();
            }
            else
                res.status(403).send({message:"user not authorized, please login"})
            
        } catch (error) {
            res.status(400).send({message:"internal server error", error})
        }
}