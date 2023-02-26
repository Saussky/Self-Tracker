import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'moon';

interface JwtPayload {
    email: string;
}

declare module 'next' {
  interface NextApiRequest {
    user?: any;
  }
}

export const jwtMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = req.headers.authorization?.replace(/^Bearer\s/, "");
        if (!token) {
            throw new Error("Missing authorization header");
        }

        const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
        req.user = decodedToken;

        await handler(req, res);
    } catch (e) {
        console.log(e)
        console.log("mMiddleware failed")
        res.status(401).json({ message: "Unauthorized" });
    }
};
