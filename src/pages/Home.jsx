import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/contexts/AuthContext';
import { useEffect } from 'react';

const Home = () => {

    const { isAuthenticated } = useAuthContext()
    const navigate = useNavigate()
    
    useEffect(() => {   
        (async () => {
            const [ token, activeUser ] = await isAuthenticated();
            if (!token) {
                navigate('/login')
            } else if (activeUser?.role === 'admin') {
                navigate('/dashboard')
            } else if (activeUser?.role === 'crew') {
                navigate('/crewhome')
            }
        })();
    }, []);

    // useEffect(() => {   
    //     const [ token, activeUser ] = isAuthenticated()

    //     if (!token) {
    //         navigate('/login')
    //     } else if (activeUser?.role === 'admin') {
    //         navigate('/dashboard')
    //     } else if (activeUser?.role === 'crew') {
    //         navigate('/crewhome')
    //     }
    // }, []);

    return null
}

export default Home