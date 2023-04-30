import multiparty from 'multiparty';
import { resolve } from 'styled-jsx/css';


import { uploadFile } from "../../lib/upload";
import { mongooseConnect } from '@/lib/mongoose';


export default async function handle(req,res){

  await mongooseConnect();
  await isAdminRequest(req,res);


    const form = new multiparty.Form();
    const {fields,files} = await new Promise( (resolve, reject) => {

        form.parse(req , (err,fields,files) => {
            if(err) reject(err);
            resolve({fields,files});
        });

    });

    console.log(files);

/*

    const handleFileUpload = async (files) => {

        if (!files) {
            console.error('File object is undefined or null');
            return;
          }
          
        const file = files[0]; // Assumes only one file is uploaded
        console.log('File object:', file);
        
        try {
          const url = await uploadFile(file);
          console.log("File uploaded successfully. Download URL:", url);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };



// Call the handleFileUpload function with the files data
handleFileUpload(files.file);
*/

    res.json(':) uploaded');
};  

export const config = { api : {bodyParser:false},};

