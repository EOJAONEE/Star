import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "../../controller/userController";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') {
        return res.status(403).json({message:'Method not allowed'});
    }

    const {name, email, username, password, confirmpassword} = req.body;

    const response = await createUser(name, email, username, password , confirmpassword);

    if(response.message != undefined ) {
        return res.status(403).json(response);
    }
    else{
        return res.status(201).json(response);
    }
}