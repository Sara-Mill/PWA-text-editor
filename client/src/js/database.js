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

// Export a function we will use to POST to the databasr.
export const postDB = async (name, home, cell, email) => {
  console.log('Post to the database');

  //Create a connection to the database and version we want to use.
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');

  //Open up the desired oject store.
  const store = tx.objectStore('jate');

  //Use the .add() method on the store and pass in the content.
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });

  //Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
;
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { console.error('putDb not implemented');
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  console.log('GET from the database');

  //Create a connection to the database nd version we want to use.
  const jateDb = await openDB('jate', 1);

  //Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  //Open up the desired object store.
  const store = tx.objectStore('jate');

  //Use the .getAll() method to get all data in the database.
  const result = await request;
  console.log('result.value', result);
  return result;
};

//Start the database
initdb();
