import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Counselee = () => {
  const { data: session, status } = useSession('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [lastLogin, setLastLogin] = useState([]);
  const [roles, setRoles] = useState([]);
  const c = 'counselee'
  
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated' || localStorage.getItem('loggedIn') === 'true') {
      localStorage.setItem('lname', session?.user?.name);
      const lname = localStorage.getItem('lname');
      const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    if(lname){
      setName(lname);
    }
    setName(storedName);
    const role = localStorage.getItem('role')
    const loginTime = localStorage.getItem('loginTime');
    setLastLogin(loginTime);
    
    const storedRoles = localStorage.getItem('roles');
    const userRoles = storedRoles.split(',');
    setRoles(userRoles);
    if (!userRoles.includes(c)) {
      router.push(`/home/${role}`);
      return;
    }
    
    
    if (!token) {
      router.push('/login');
    }
      return;
    }
    
  }, [session, status, router]);
  
  
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    router.push(`/home/${selectedRole}`);
  }

  return (
    <div>
      <title>Counselee Page</title>
      <div className="bg-gray-500 h-screen">
        <div className="flex items-center justify-between bg-gray-900 h-[80px] w-screen">
        <h1 className="text-4xl text-white cursor-pointer md:text-4xl lg:text-5xl font-semibold p-4">Counselee View</h1>
          <div className="flex items-center gap-4">
            <select className='p-2 rounded-md' onChange={handleRoleChange}>
            {
              roles.map((role, index) => (
                  <option key={index} selected={c === role}>{role}</option>
              ))
            }
          </select>
            <h1 className="hidden md:flex text-2xl text-white font-semibold">{name}</h1>
            <button className="flex bg-red-500 p-2 text-white text-xl font-semibold mr-4 rounded-lg" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex bg-gray-900 items-center justify-between">
          <div className='text-white font-semibold'>
            <h1 className='p-4 text-3xl'>My followups</h1>
          </div>
          <p className='hidden md:flex text-md p-4 font-semibold items-center text-white'>Last Login as <span className='p-2 text-green-300'> {name}</span> at <span className='p-2 text-cyan-300'>{lastLogin}</span></p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/home/counselee'><button className='bg-white border p-2 rounded-sm border-gray-200 hover:bg-green-400 hover:border-green-400'>My Dashboard</button></Link>
            <Link href='/home/counselee/reports'><button className='bg-white border p-2 rounded-sm border-gray-200 hover:bg-green-400 hover:border-green-400'>Reports</button></Link>
            <Link href='/home/counselee/followup'><button className='bg-green-500 border p-2 rounded-sm border-green-500 hover:bg-green-400 hover:border-green-400'>Follow-ups</button></Link>
          </div>
      </div>
      <div className='flex items-center justify-center w-screen'>
            <table className='w-full m-4'>
                <thead></thead>
                <tbody>
                  <tr>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>DATE</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>SESSION</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>COUNSELLOR</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>ACTIVITIES</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>STATUS</th>
                </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S1</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C1</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>
                    <a href=''>[SELECT]</a>
                    </td>
                  </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S2</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C2</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>
                    <a href=''>[SELECT]</a>
                    </td>
                  </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S3</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C3</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>
                      <a href=''>[SELECT]</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
    </div>
  </div>
  );
};

export default Counselee;
