import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LineChart from '../../../lib/Line';

const Counselee = () => {
  const { data: session, status } = useSession('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [lastLogin, setLastLogin] = useState([]);
  const [roles, setRoles] = useState([]);
  const c = 'counselee';
  
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
  }

  return (
    <div>
      <title>Counselee Page</title>
      <div className="bg-gray-500 w-screen min-h-screen">
        <div className="flex items-center justify-between bg-gray-900 h-[80px] w-screen">
        <h1 className="text-3xl text-white cursor-pointer md:text-4xl lg:text-5xl font-semibold p-4">Counselee View</h1>
          <div className="hidden md:flex items-center gap-4">
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
            <h1 className='p-4 text-3xl'>My DashBoard</h1>
          </div>
          <p className='hidden md:flex text-md p-4 font-semibold items-center text-white'>Last Login as <span className='p-2 text-green-300'> {name}</span> at <span className='p-2 text-cyan-300'>{lastLogin}</span></p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link target='_self' href='/home/counselee'><button className='bg-green-500 border p-2 rounded-sm border-green-500 hover:bg-green-400 hover:border-green-400'>My Dashboard</button></Link>
            <Link target='_self' href='/home/counselee/reports'><button className='bg-white border p-2 rounded-sm border-gray-200 hover:bg-green-400 hover:border-green-400'>Reports</button></Link>
            <Link target='_self' href='/home/counselee/followup'><button className='bg-white border p-2 rounded-sm border-gray-200 hover:bg-green-400 hover:border-green-400'>Follow-ups</button></Link>
          </div>
      </div>
      <div className='grid grid-cols-1 flex sm:grid-cols-2'>
        <div className='font-semibold flex flex-col items-center justify-center'>
          <div className="text-red-200 mt-4 border border-2 border-green-400">
          <h1 className='p-2 md:p-4 text-md'>Next Review Date : {lastLogin}</h1>
          </div>
          <div className='mt-2'><LineChart data={chartData} /></div>
        </div>
        <div className='flex flex-col gap-1 md:gap-4 items-center'>
            <div className='flex items-center justify-center'>
            <table className=''>
                <thead></thead>
                <tbody>
                  <tr>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>DATE</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>SESSION</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>COUNSELLOR</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>PHYSICIAN</th>
                  <th className='md:p-2 border text-sm text-white bg-blue-500'>REPORT</th>
                </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S1</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C1</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>LINK</td>
                  </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S2</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C2</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>LINK</td>
                  </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S3</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C3</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>LINK</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex items-center justify-center'>
            <table className=''>
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
                    <div className='bg-green-600 border border-black flex justify-center w-full rounded-md'>
                        <h1 className='text-green-600 select-none'>r</h1>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S2</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C2</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>
                    <div className='bg-red-500 border border-black flex justify-center w-full rounded-md'>
                        <h1 className='text-red-500 select-none'>r</h1>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DD/MM/YY</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>S3</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>C3</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>DR. ARUN</td>
                    <td className='md:p-2 border text-sm text-white bg-gray-700'>
                    <div className='bg-yellow-300 border border-black flex justify-center w-full rounded-md'>
                        <h1 className='text-yellow-300 select-none'>r</h1>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Counselee;
