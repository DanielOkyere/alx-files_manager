/**
 * Auth Utils
 */
import sha1 from 'sha1';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';

export const getUserFromAuthHeader = async (req) => {
  const authorization = req.headers.authorization || null;
  if (!authorization) return null;
  const splitAuth = authorization.split(' ');
  if (splitAuth.length !== 2 || splitAuth[0] !== 'Basic') return null;

  const token = Buffer.from(splitAuth[1], 'base64').toString();
  const sap = token.indexOf(':');
  const email = token.substring(0, sap);
  const password = token.substring(sap + 1);
  const user = await (await dbClient.userCollection.findOne({ email }));

  if (!user || sha1(password) !== user.password) return null;
  return user;
};

export const getUserFromXToken = async (req) => {
  const token = req.headers['x-token'];
  if (!token) return null;
  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) return null;
  const user = await (await dbClient.userCollection.findOne({
    _id: new mongoDBCore.BSON.ObjectId(userId),
  }));
  return user || null;
};
