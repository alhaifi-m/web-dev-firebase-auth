'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';


const useAuth = () => {
    const [user, loading] = useAuthState(auth);

    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        if(typeof window !== 'undefined'){
            const storedSession = sessionStorage.getItem('user');
            setSession(storedSession)
        }
    }, [])

    useEffect(()=>{
        if(!loading && !user && !session){
            router.push('sign-in')
        }
    },[user, loading, session, router])

    return { user, loading, session }
}

export default useAuth;