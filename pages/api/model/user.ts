import {prisma} from "@/db";

//Criar usuario
export async function createUserModel(_name:string , _email:string , _username:string , _password:string) {
    const user = await prisma.user.create({
        data: {
            name : _name,
            email : _email,
            username : _username,
            password : _password
        }
    });

    return user
}

//Procurar por email
export async function findUserByEmail(_email:string){
    const user = await prisma.user.findUnique({
        where: {
            email: _email
        }
    })

    return user;
}

//Procurar por username
export async function findUserByUsername(_username:string){
    const user = await prisma.user.findUnique({
        where: {
            username: _username
        }
    });

    return user
}

// Funções para login, por email e username
export async function findUserLoginByEmail(_email:string , _password:string){
    const user = await prisma.user.findUnique({
        where:{
            email: _email,
            password: _password
        }
    })

    return user;
}

export async function findUserLoginByUsername(_username:string , _password:string){
    const user = await prisma.user.findUnique({
        where:{
            username: _username,
            password: _password
        }
    })

    return user;
}