
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from './../../models/Category';


export default async function handle(req,res){

    const {method} = req;
    await mongooseConnect();


    if(method === 'GET'){
        res.json(await Category.find().populate('parent'));
    } 

    if(method === 'POST'){
        const {name,parentCategory} = req.body;

        if(parentCategory){// if parent category is selected
            const categoryDoc = await Category.create({name,parent:parentCategory});
            res.json(categoryDoc);

        }else{// if no parent category is selected
            const categoryDoc = await Category.create({name});
            res.json(categoryDoc);

        }

    };

    if(method === 'PUT'){
        const {name,parentCategory,_id} = req.body;
        console.log("**************parentCategory "+parentCategory);
        const categoryDoc = await Category.updateOne({_id},{name,parent:parentCategory});
        res.json(categoryDoc);
    };

    if(method === "DELETE"){

        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json(true);
        
    }

} 