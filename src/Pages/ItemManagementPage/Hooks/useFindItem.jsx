import { useState } from 'react';
import axios from 'axios';

const useFindItem =() => {
    const [error, setError] = useState(false);

    const findItemByID = async (id) =>{
        setError(null);
        console.log(id)
        try{
            const item = await axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/Product/find-one?", {
                headers:{
                    "xc-token": process.env.REACT_APP_APIKEY,
                }, params:{
                    where: `(ID,eq,${id})`
                }
            })
            console.log(item)
            return item.data;
        } catch(err){
            setError(true)
            console.log(err)
        }



    }
    const findItemByName= (name) =>{
        
    }    
    const findItemByAuthor = (author) =>{
        
    }
    return {findItemByID, error}
}

export default useFindItem;