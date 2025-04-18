import jwt from 'jsonwebtoken'

export const generateToken = (userId,res) =>{
  const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'7d',
  });

  res.cookie('jwt',token,{
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days ms
    httpOnly: true, // Prevents client-side JS(xss attacks) from accessing the cookie
    sameSite : 'strict', // Prevents CSRF attacks
    secure: process.env.NODE_ENV !== 'developement', // Only send cookie over HTTPS in production
  })

  return token;
}   