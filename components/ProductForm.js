import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { storage } from './../lib/firebase';

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images,
}){
    const [title,setTitle] = useState( existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');

    const [goToProduct,setgoToProduct]  = useState(false);
    const router = useRouter();

    async function saveProduct(e){

        e.preventDefault();
        const data = {title,description,price};

        if(_id){
            //update
            await axios.put('/api/products',{...data,_id});
            setgoToProduct(true);
            
        }
        else{
            //create
            
            await axios.post('/api/products',data);
            setgoToProduct(true);
        }
       

    }

    if(goToProduct){
        router.push('/products');
    }


    const upload = async (file) => {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        const snapshot = await fileRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
    }

    const uploadImages = async (e) => {
        const file = e.target.files[0];
        const downloadURL = await upload(file);
        console.log(downloadURL);
      
      
        
        /*

        const files = e.target?.files;
        if(files?.length > 0){
            const data = new FormData();
            for( const file of files){data.append('file',file);}

            const res =  await axios.post('/api/upload',data);

              // console.log(res.data);
           
        }
        */
    };
    

return(
 
    <form onSubmit={saveProduct}>

        
        <label>Product name</label>
        <input type="text" placeholder="product name" value={title}
         onChange={e => { setTitle(e.target.value);}}/>

        <label>Photos</label>
        <div className="mb-2">

            <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>

            <div>Upload</div>
             
             <input type="file" onChange={uploadImages} className="hidden"/>
            </label>

            {!images?.length && ( <div>No Photos in this Product</div> )}
        </div>

        <label>Description</label>
        <textarea placeholder="description " value={description}
         onChange={e => setDescription(e.target.value)}/>

        <label>Price (in USD)</label>
        <input type="number" placeholder="price" value={price}
         onChange={e => setPrice(e.target.value)}/>

        <button type="submit" className="btn-primary">Save</button>
        
    </form>

       

);
}