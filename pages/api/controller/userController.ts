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

        const response = await createUserModel(name, email, username, password);

        return response;

    }
    catch(err) {
        return {message: 'Something went wrong'};
    }
}