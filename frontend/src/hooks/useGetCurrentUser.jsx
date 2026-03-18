import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';

const useGetCurrentUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
                console.log("Current User: ", res.data);
                setUser(res.data.user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}

export default useGetCurrentUser;