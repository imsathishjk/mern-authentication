import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AppContext = createContext();
export const AppContextProvider = ({ children }) => {


    const [currState, setCurrState] = useState('Sign Up');
    const [showLogin, setShowLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false)
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACK_END_URL;

    const navigate = useNavigate()
    const location = useLocation();

    const getAuthState = async () => {
        axios.defaults.withCredentials = true;
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { withCredentials: true });
            if (data.success) {
                setLoggedIn(true);
                navigate('/');
                getUserData()
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getUserData = async () => {
        axios.defaults.withCredentials = true;
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/data', { withCredentials: true });
            if (data.success) {
                setUser(data.data)
            } else {
                toast(data.message)
            }

        } catch (error) {
            console.log(error.message)
        }
    }



    const value = {
        currState, setCurrState,
        showLogin, setShowLogin,
        navigate, backendUrl,
        user,
        loggedIn, setLoggedIn,
        verifyEmail, setVerifyEmail, getUserData,
        setLoading, loading

    }


    const handleLocation = () => {
        if (location.pathname.split('/').pop() === 'login') {
            setShowLogin(false);
        } else {
            setShowLogin(true);
        }
        if (location.pathname.split('/').pop() === 'verify-email') {
            setVerifyEmail(true);
        } else {
            setVerifyEmail(false);
        }
    }

    useEffect(() => {
        handleLocation()
    }, [location]);


    useEffect(() => {
        getAuthState()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
