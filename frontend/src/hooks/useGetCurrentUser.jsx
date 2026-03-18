import React, { useEffect }  from 'react'
import axios from 'axios';
import { serverUrl } from '../App';

const useGetCurrentUser = () => {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
                console.log("Current User: ", res.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchUser();
    }, []);
}

export default useGetCurrentUser