/**
 * Mongo Db Utils
 * Contains class DBClient
 */
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config()

class DBClient {
  constructor() {
    this.HOST = process.env.DB_HOST || 'localhost';
    this.PORT = process.env.DB_PORT || '27017';
    this.DB = process.env.DB_DATABASE || 'files_manager';
    this.isConnect = false;
    this.url = `mongodb://${this.HOST}:${this.PORT}`;
    this.client = new MongoClient(this.url);
    this.client.connect()
      .then(() => {
        this.isConnect = true;
        this.db = this.client.db(this.DB);
      })
      .catch((err) => {
        this.isConnect = false;
        if (err) console.log(err.message || err.toString());
      });
  }

  isAlive() {
    return this.isConnect;
  }

  async nbUsers() {
    const userCollection = this.db.collection('users');
    return userCollection.count();
  }

  async nbFiles() {
    const fileCollection = this.db.collection('files');
    return fileCollection.count();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
