import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    // It signs the payload { userId } with a secret key (process.env.JWT_SECRET) and expiration of 30 days.
    const token = jwt.sign({userId}, process.env.JWT_SECRET,
        {expiresIn: '30d'
    })

//Set JWT as an HTTP-only Cookie

res.cookie('jwt', token,
    {httpOnly: true,
    secure: process.env.NODE_ENV != 'development', //ensures that the secure option for the cookie is set to true only when the application is not in the development stage.
    sameSite: 'strict', //The sameSite option is used to control when a cookie should be sent with cross-origin requests. It helps prevent Cross-Site Request Forgery (CSRF) 
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days in milliseconds
    })

    return token;

};

export default generateToken;

