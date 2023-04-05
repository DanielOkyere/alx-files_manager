/**
 * Mongo Db Utils
 * Contains class DBClient
 */
import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.HOST = process.env.DB_HOST || 'localhost';
    this.PORT = process.env.DB_PORT || '27017';
    this.DB = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.HOST}:${this.PORT}/${this.DB}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.client.connect();
    this.userCollection = this.client.db(this.DB).collection('users');;
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.userCollection.countDocuments();
  }

  async nbFiles() {
    const fileCollection = this.client.db(this.DB).collection('files');
    return fileCollection.countDocuments();
  }

  async checkUser(email) {
    const user = await this.userCollection.findOne({ email });
    if (user) {
      if (user.email === email) return true;
    }
    return false
  }

  async addUser(email, password) {
    return this.userCollection.insertOne({ email, password });
  }


}

const dbClient = new DBClient();
module.exports = dbClient;
