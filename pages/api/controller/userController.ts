import { createUserModel, findUserByEmail, findUserByUsername, findUserLoginByEmail, findUserLoginByUsername } from "../model/user";
import { generateToken, checktoken } from '@/services/tokenConfig';

//Criar conta
export async function createUser(name: string, email: string, username: string, password: string, confirmPassword: string) {
    try {
        if (password != confirmPassword) {
            return {message: 'Password dont match'};
         }

        const UserByEmail = await findUserByEmail(email);

        if (UserByEmail != undefined) {
            return {message: 'Username already registered'};
        }

        const userByUsername = await findUserByUsername(username);

        if (userByUsername != undefined) {
            return {message: 'Username already registered'};
        }

        const response = await createUserModel(name, email, username, password);

        return response;

    }
    catch(err) {
        return {message: 'Something went wrong'};
    }
}

//Fazer login
export async function signIn(login: string, password : string) {
    try{
        const UserByEmail = await findUserLoginByEmail(login, password);
        const userByUsername = await findUserLoginByUsername(login, password);
        var email;

        if(UserByEmail == undefined && userByUsername == undefined) {
            return {message: 'Invalid Login or Password'};
        }

        if (UserByEmail != undefined) {
            email = UserByEmail.email;
        } else{
            email = userByUsername?.email;
        }
        const _token = generateToken(email);

        return {token : _token};
    }
    catch {
        return {message: 'Something went wrong'};
    }
}