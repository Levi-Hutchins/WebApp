import { useState } from 'react';
import axios from 'axios';

const useFindItem = () => {
    const [error, setError] = useState(false);

    const findItemByID = (id) =>{
        setError(null);
        try{
            const item = axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/Product/find-one?", {
                headers:{
                    "xc-token": process.env.REACT_APP_APIKEY,
                }, params:{
                    where: `(ID,eq,${id})`
                }
            })
            console.log(item.data)
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