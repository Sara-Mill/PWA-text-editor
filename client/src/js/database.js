import { request } from 'express';
import { openDB } from 'idb';

const initdb = async () =>
//We are creating a new database named 'jate' which will be using version 1 of the database
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //Create a nw object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async(content) => {
    console.log('PUT to the database');
    //create a connection to the database and version we want to use
    const contactDb = await openDB('jate', 1);

    //create a new transaction and specify the database and data priveleges.
    const tx = contactDb.transaction('jate', 'readwrite');

    //open up the desired object store.
    const store = tx.objectStore('jate');

    //Use the .add() method on the store and pass in the content.
    const request = store.put({id:1, value: content });

    //Get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  };
  export const getDb = async () => {
    console.log('GET from the database');

    //Create a connection to the database and version we want to use.
    const contactDb = await openDB('jate', 1);

    //Create a new transaction and specify the database and data privileges.
    const tx = contactDb.transaction('jate', 'readonly');

    //Open up the desired object store.
    const store = tx.objectStore('jate');

    //Use the .getAll() method to get all data in the database.
    const request = store.getAll();

    //Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };

//Start the database
initdb();
