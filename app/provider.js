"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "./_context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// import { useUser } from '@clerk/nextjs';
// import { UserDetailContext } from './_context/UserDetailContext';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function Provider({ children }) {
//     const { user } = useUser();
//     const [userDetail, setUserDetail] = useState({});

//     useEffect(() => {
//         console.log("User object:", user); // Log the user object
//         if (user) verifyUser();
//     }, [user]);

//     const verifyUser = async () => {
//         try {
//             console.log("Sending user data to API:", user); // Log the data being sent to the API
//             const dataResult = await axios.post('/api/verify-user', { user: user });
//             console.log("API Response:", dataResult); // Log the API response

//             if (dataResult?.data?.result) {
//                 setUserDetail(dataResult.data.result);
//             } else {
//                 console.error("No result in API response:", dataResult?.data);
//             }
//         } catch (error) {
//             console.error('Error verifying user:', error);
//             alert('Error verifying user: ' + error.message); // Display error to the user
//         }
//     };

//     return (
//         <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
//             <div>{children}</div>
//         </UserDetailContext.Provider>
//     );
// }

// export default Provider;

function Provider({ children }) {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState({});
    useEffect(() => {
        user && verifyUser();
    }, [user]);
    const verifyUser = async () => {
        const dataResult = await axios.post('/api/verify-user', { user: user });
        setUserDetail(dataResult.data.result);
        console.log(dataResult.data)
    }
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                <div>
                    {children}
                </div>
            </PayPalScriptProvider>
        </UserDetailContext.Provider>
    )

}
export default Provider;
