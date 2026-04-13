import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export const refreshToken = async (req: Request, res: Response) => {
  try {
    //the cookies is alrady set in the broswer when the user login and it alrady has the data
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.json({ message: "Invalid Token " });
    }
    // decode the refresh token and took the id 
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
    };
    
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_TOKEN!,
      { expiresIn: "15m" },
    );
    return res.status(200).json({ accessToken });
  } catch (err: any) {
    return res.status(500).json({ message: "Invalid refresh token " });
  }
};
