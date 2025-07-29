'use client'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase/config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function Home() {
  const [ user ] = useAuthState(auth)
  const router = useRouter()
  const [userSession, setUserSession] = useState(false)
  const [isSessionLoaded, setIsSessionLoaded] = useState(false)

  useEffect(()=>{
    if(typeof window !== "undefined"){
      const session = sessionStorage.getItem("user")
      setUserSession(session)
      setIsSessionLoaded(true)
    }
  },[])

  useEffect(()=>{
    if(isSessionLoaded && !user && !userSession){
      router.push("/sign-in")
    }
  },[isSessionLoaded, user, userSession, router])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-white">Welcome to My App</h1>
        {user && (
          <p className="text-lg text-gray-900 mt-4">
            Hello, {user.email}!
          </p>
        )}
      </main>

    </div>
  )
}
