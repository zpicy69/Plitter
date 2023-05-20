import { NextApiRequest, NextApiResponse } from "next";
import bcypt from 'bcrypt';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST') return res.status(405).end();

    try{
        const { email, username, name, password } = req.body;

        const hashedPassword = await bcypt.hash(password, 14);
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        });

        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.status(400).end();
    }
}