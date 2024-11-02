import { useState } from 'react';
import axios from 'axios';

const useUpdateEmployee = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const transformRowsToData = (rows) => {
        return rows.reduce((acc, row) => {
            acc[row.accountValue.replace(/\s+/g, '')] = row.value;
            return acc;
        }, {});
    };

    const updateEmployeeDetails = async (updatedData, previousID) => {
        setLoading(true);
        setError(null);
        const transformedData = transformRowsToData(updatedData);
        
        const newData = {
            Email: transformedData.EmailAddress,
            Name: transformedData.FullName,
            UserName: transformedData.UserName, 
        };

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${previousID}`, 
                newData,
                {
                    headers: {
                        "xc-token": process.env.REACT_APP_APIKEY,
                    },
                }
            );
            return response.data;
        } catch (err) {
            setError('Error updating employee details');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateEmployeeDetails, loading, error };
};

export default useUpdateEmployee;
