/**
 * Users Controller
 */
import sha1 from 'sha1';
import dbClient from '../utils/db';

const postNew = async ({ email, password }) => {
  const userExist = await dbClient.checkUser(email);
  if (userExist) {
    return { status: 400, message: 'Already exist' };
  }
  const hashed = sha1(password);
  const newUser = await dbClient.addUser(email, hashed);
  return { status: 201, id: newUser.insertedId.toString() };
};

export default postNew;
