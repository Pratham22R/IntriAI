"use client"

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect } from 'react'

function Provider({children}) {

    const {user} = useUser();
    useEffect(() => {
        user && verifyUser();
    }, [user])

    const verifyUser = async () => {
        try {
            const dataResult = await axios.post('/api/verify-user', { user: user }); 
            console.log(dataResult.data);
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    }

    return (
        <div>{children}</div>
    )
}

export default Provider