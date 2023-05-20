import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST' && req.method !== 'GET') return res.status(405).end();

    try{
        if(req.method === 'POST'){
            const { currentUser } = await serverAuth(req, res);
            const { body } = req.body;

            const post = await prismadb.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            });

            return res.status(200).json(post);
        }

        if(req.method === 'GET'){
            const { userId } = req.query;

            let posts;
            if(userId && typeof userId === 'string'){
                posts = await prismadb.post.findMany({
                    where: {
                        userId
                    },
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }else{
                posts = await prismadb.post.findMany({
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }

            return res.status(200).json(posts);
        }
    }catch(err){
        console.log(err);
        return res.status(400).end();
    }
    
}