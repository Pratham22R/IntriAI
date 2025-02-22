"use client"

import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from './_context/UserDetailContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Provider({ children }) {

    const { user } = useUser();
    const [userDetail, setUserDetail] = useState([]);
    useEffect(() => {   
        user && verifyUser();
    }, [user])

    const verifyUser = async () => {
        try {
            const dataResult = await axios.post('/api/verify-user', { user: user });
            setUserDetail(dataResult.data.result);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    )
}

export default Provider