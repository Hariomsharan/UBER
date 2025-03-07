import  { React, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/captainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token');

        const { captain, setCaptain } = useContext(CaptainDataContext);
        const [isLoading, setIsLoading] = useContext(true);
        const navigate = useNavigate();
    
        useEffect(() => {
            if(!token){
                navigate('/captain-login');
            }
        }, [token])

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status === 200){
                const data = response.data;
                setCaptain(data.captain);
                setIsLoading(false);
            }
        }).catch((error) => {
            navigate('/captain-login');
        });

        if(isLoading){
            return <div>Loading...</div>
        }


  return (
    <div>{children}</div>
  )
}

export default CaptainProtectWrapper