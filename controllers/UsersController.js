/**
 * Users Controller
 */
import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400);
      res.json({ error: 'Missing email' });
    }
    if (!password) {
      res.status(400);
      res.json({ error: 'Missing password' });
    }
    const userExist = await dbClient.checkUser(email);
    if (userExist) {
      res.status(400).json({ error: 'Already exist' });
    } else {
      const hashed = sha1(password);
      const newUser = await dbClient.addUser(email, hashed);
      res.status(201).json({ email, id: newUser.insertedId.toString() });
    }
  }

  static async getMe(req, res) {
    const { user } = req;
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
