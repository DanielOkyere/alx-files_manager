/**
 * Mongo Db Utils
 * Contains class DBClient
 */
import { MongoClient } from 'mongodb';
//import * as dotenv from 'dotenv';

//dotenv.config()

class DBClient {
  constructor() {
    this.HOST = process.env.DB_HOST || 'localhost';
    this.PORT = process.env.DB_PORT || '27017';
    this.DB = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.HOST}:${this.PORT}/${this.DB}`;
    this.client = new MongoClient(this.url, {useUnifiedTopology: true});
    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();;
  }

  async nbUsers() {
    const userCollection = this.client.db(this.DB).collection('users');
    return userCollection.countDocuments();
  }

  async nbFiles() {
    const fileCollection = this.client.db(this.DB).collection('files');
    return fileCollection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
