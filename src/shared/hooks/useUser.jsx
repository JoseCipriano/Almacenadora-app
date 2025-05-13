import {useState , useEffect , useCallback} from 'react';
import toast from 'react-hot-toast'
import { getUsers as getUsersRequest } from '../../services';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [ isFetching , setIsFetching ] = useState(false);

    const getUsers = useCallback(async () => {
        setIsFetching(true);
        const usersData = await getUsersRequest();

        if(usersData.error){
            toast.error(usersData.e?.response?.data || "Error al obtener los usuarios")
            return;
        }

        setUsers(usersData.data.users);
        setIsFetching(false); 
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return{
        users,
        isFetching,
        getUsers
    };

}