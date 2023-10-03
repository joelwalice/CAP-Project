import React, {useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isAdmin = localStorage.getItem("role");
    if (isLoggedIn === "true") {
      router.push(`/home/${isAdmin}`);
    }
  }, [router]);

  return (
    <div>
      <title>Welcome Page</title>
      <div className='bg-gray-900 w-screen h-screen'>
        <div className='flex flex-col items-center justify-center h-full gap-5'>
          <h1 className='text-6xl text-white font-bold'>Hello Everyone !!</h1>
          <p className='text-white text-2xl'>Click to Enter the site</p>
          <Link href="/login">
            <button className='bg-white p-4 rounded-lg text-xl font-semibold text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 duration-500'>Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
