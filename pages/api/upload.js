/*import multiparty from 'multiparty';
import { resolve } from 'styled-jsx/css';


export default async function handle(req,res){

    const form = new multiparty.Form();
    const {fields,files} = await new Promise( (resolve, reject) => {

        form.parse(req , (err,fields,files) => {
            if(err) reject(err);
            resolve({fields,files});
        });

    });

    console.log(files);


    res.json(':) uploaded');
}  

export const config = { api : {bodyParser:false},};

*/

import { storage } from '../path/to/firebase.js';

export default async function handle(req,res){

const uploadImage = async (file) => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(file.name);
  const snapshot = await fileRef.put(file);
  const downloadURL = await snapshot.ref.getDownloadURL();
  return downloadURL;
};


res.json(':) uploaded');
}
