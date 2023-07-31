const admin = require('firebase-admin')

const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

const serviceAccount = require('./ignore/cafe-app-d03b5-firebase-adminsdk-lcigv-c9633c258d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cafe-app-d03b5-default-rtdb.firebaseio.com',
}); 



class Repository {
  constructor(collectionName) {
    if (!collectionName) {
      throw new Error('Creating a repository requires a collection name');
    }
    this.collectionName = collectionName;
    this.collectionRef = admin.database().ref(collectionName);
  }
  async create(attrs) {
    const newRecordRef = this.collectionRef.push(attrs);
    const newRecordSnapshot = await newRecordRef.once('value');
    return newRecordSnapshot.val();
  }
  

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  } 

  async getAll() {
    const recordsSnapshot = await this.collectionRef.once('value');
    const records = recordsSnapshot.val();
    return Object.values(records || {});
  }
    
  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async getOneTitle(title) {
    const records = await this.getAll();
    let array = []    
      array = records.filter(record => record.title.toLowerCase().includes(title.toLowerCase()))
    return array
  }
  
  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;
      
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }
    }
  }

  async delete(id) {
    records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id); 
    await this.collectionRef.set(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    Object.assign(record, attrs);
    await this.collectionRef.set(records);
  }
}

module.exports = Repository;
