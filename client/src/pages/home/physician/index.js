import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LineChart from '@/lib/Line';
import Link from 'next/link';

const Physician = () => {
  const { data: session, status } = useSession('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [lastLogin, setLastLogin] = useState([]);
  const c = 'physician';
  const [roles, setRoles] = useState([])
  
  
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated' || localStorage.getItem('loggedIn') === "true") {
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

  const chartData = [
    {
      values: [
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 8 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
      ],
      color: 'blue'
    },
    {
      values: [
        { x: 1, y: 4 },
        { x: 2, y: 6 },
        { x: 3, y: 7 },
        { x: 4, y: 2 },
        { x: 5, y: 9 }
      ],
      color: 'red',
    },
    {
      values: [
        { x: 1, y: 6 },
        { x: 2, y: 2 },
        { x: 3, y: 5 },
        { x: 4, y: 7 },
        { x: 5, y: 1 }
      ],
      color:'light green'
    }
  ] 
  
  
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    router.push(`/home/${selectedRole}`);
  };

  return (
    <div>
      <title>Physician Page</title>
      <div className="bg-gray-500 min-w-screen min-h-screen">
        <div className="flex items-center justify-between bg-gray-900 h-[80px] w-screen">
        <h1 className="text-3xl text-white cursor-pointer md:text-4xl lg:text-5xl font-semibold p-4">Physician View</h1>
          <div className="flex items-center gap-4">
          <select className='p-2 rounded-md' onChange={handleRoleChange}>
            {
              roles.map((role, index) => (
                  <option key={index} selected={c === role}>{role}</option>
              ))
            }
          </select>
            <h1 className="hidden md:flex text-2xl text-white font-semibold">{name}</h1>
            <button className="flex bg-red-500 p-2 text-white md:text-xl font-semibold mr-4 rounded-lg" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex bg-gray-900 items-center justify-between">
          <div className='text-white font-semibold'>
            <h1 className='p-4 text-3xl'>Patient Information</h1>
          </div>
          <p className='hidden md:flex text-md p-4 font-semibold items-center text-white'>Last Login as <span className='p-2 text-green-300'> {name}</span> at <span className='p-2 text-cyan-300'>{lastLogin}</span></p>
        </div>
        <div className='p-4 mt-10'>
        <table className='w-full'>
          <thead>
          <tr>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>#</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Patient Name</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Session #</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Disease Type</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Last Session</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Counsellor</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Physician</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Assigned to</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Report Status</th>
          <th className='md:p-2 border text-sm text-white bg-blue-500 items-center'>Overall Status</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>
              <Link href='/home/physician/:id'> link </Link>
            </td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
          </tr>
          <tr>
          <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
          </tr>
          <tr>
          <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
            <td className='md:p-2 border text-sm text-white bg-gray-700 items-center'>-</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Physician;
