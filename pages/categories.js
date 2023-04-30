import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';


 

function Categories({swal}){
    

    const [editedCategory,setEditedCategory] = useState(null);
    const [name,setName] = useState('');
    const [categories,setCategories] = useState('');
    const [parentCategory,setParentCategory] = useState('');

    useEffect(()=>{
        fetchCategories();
    },[]);


    function fetchCategories(){
        axios.get('/api/categories').then(result =>{setCategories(result.data);} )
    }

    async function saveCategory(e){

        e.preventDefault();
        const data = {name,parentCategory};

        if(editedCategory){
            data._id = editedCategory._id;
            await axios.put('/api/categories',data);
            setEditedCategory(null);
        }else{
            await axios.post('/api/categories',data);
        }

        
        setName('');
        fetchCategories();
    }

    function editCategory(category){

        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
 
    }

    function deleteCategory(category){
    
        swal.fire({
            title: 'Are you sure ?',
            text: `Do you want to delete ${category.name} ?`,
            showCancelButton:true,
            cancelButtonText:'Cancel',
            confirmButtonText:'Yes, Delete!',
            confirmButtonColor:'#d55',
            reverseButton:true,
            
        }).then(async result => {
            // when confirmed and promise resolved...
           
            if( result.isConfirmed){
                const {_id}= category;
              await axios.delete('/api/categories?_id='+_id);
              fetchCategories();
            }
    
        });
    }



    return(
        <Layout>

        <h1>Categories</h1>
        <label >{editedCategory ? `Edit Category ${editedCategory.name}` : 'Create New Category'} </label>
        
        <form onSubmit={saveCategory} className="flex gap-1">
        <input  onChange={e => setName(e.target.value)} value={name}  type="text " className="mb-0" placeholder={"Category Name"} />
        
        <select onChange={e => { setParentCategory(e.target.value) }} value={parentCategory} className="mb-0">
            <option value="" >No parent category</option>
            {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                )) }
        </select>
        
        <button type="submit" className="btn-primary py-1" >Save</button>
        </form>

        <table className="basic mt-4 ">
            <thead>
                <tr>
                    <td>Category name</td>
                    <td>Parent Category</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 && categories.map(category => (
                    <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button className="btn-primary mr-1"
                            onClick={()=>{editCategory(category)}}
                            >Edit</button>
                            <button 
                            onClick={() => deleteCategory(category)}
                            className="btn-primary">Delete</button>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>

        </Layout>

    )

}

export default withSwal(({ swal }, ref) => (
    <Categories swal={ swal }/>
));