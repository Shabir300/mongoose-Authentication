import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'

const protect = async (req, res, next) => {
    // console.dir(req, { depth: 1 });
    // console.log('token HERE', req.cookies);
    // next();
    const token = req.headers.authorization.split(' ')[1];
// const token = req.headers.cookies.userToken;
   try {
        const {userId} = jwt.verify(token, 'abc123abc');
     //    console.log('HERE IS USERID', userId);
          const user = await userModel.findOne({_id: userId}).select('-password');
          // console.log('USER FROM USERID', user);
          req.user = user;
        next();
   }catch (err) {
        res.statusCode = 401;
        throw new Error('token no valid!')
}
       
};

export default protect;