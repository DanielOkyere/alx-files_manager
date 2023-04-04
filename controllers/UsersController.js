/**
 * Users Controller
 */
import dbClient from '../utils/db';
import crypto from 'crypto';


export const authUser = async ({ email, password }) => {
    const userExist = await dbClient.checkUser(email);
    if (userExist) {
        return { status: 400, message: 'Already exist' }
    } else {
        const hashed = crypto.createHash('sha1').update(password).digest('hex');
        const newUser = await dbClient.addUser(email, hashed);
        return { status: 201, message: 'User Added' };
    }
}