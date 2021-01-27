import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
//sign has three parameters, user object, json webtoken secrets,
//jwt secrets is like a key to ecrypt your data and generate a token
// it's a secure data so don't keep it here to be seen. you need to 
//put it in a .env file and .env package
//the last parameter is options
    }, process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '30d',
    });
}