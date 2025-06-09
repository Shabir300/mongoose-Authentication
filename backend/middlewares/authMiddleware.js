import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    console.dir(req, { depth: 1 });
    next();
};

export default protect;