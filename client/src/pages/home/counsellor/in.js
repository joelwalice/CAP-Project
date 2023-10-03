import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Counsellor = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const router = useRouter();
  const [lastLogin, setLastLogin] = useState('');
  const [roles, setRoles] = useState([])
  const c = 'counsellor'
  
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated' || localStorage.getItem('loggedIn') === 'true') {
      const token = localStorage.getItem('token');
      const storedName = localStorage.getItem('name');
      localStorage.setItem('lname', session?.user?.name);
      const lname = localStorage.getItem('lname');
      if(lname){
        setName(lname)
      }
      setName(storedName);
      const loginTime = localStorage.getItem('loginTime');
      setLastLogin(loginTime);
      const role = localStorage.getItem('role')
      
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
    } else {
      localStorage.removeItem('loggedIn');
      window.location.href = '/login';
    }
  }, [session, status, router]);

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  const [n1, setN1] = useState(false);
  const [n2, setN2] = useState(false);
  const [n3, setN3] = useState(false);
  const [n4, setN4] = useState(false);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    router.push(`/home/${selectedRole}`);
  };

  return (
    <>
      <title>Counsellor Page</title>
      <div className="bg-gray-500 h-screen">
        <div className="flex items-center justify-between bg-gray-900 h-[80px] w-screen">
          <h1 className="text-4xl text-white cursor-pointer md:text-4xl lg:text-5xl font-semibold p-4">Counsellor View</h1>
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
            <h1 className='p-4 text-3xl'>Patient Information</h1>
          </div>
          <p className='hidden md:flex text-md p-4 font-semibold items-center text-white'>Last Login as <span className='p-2 text-green-300'> {name}</span> at <span className='p-2 text-cyan-300'>{lastLogin}</span></p>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/home/counsellor'><button className='bg-white border p-2 rounded-sm border-gray-200 hover:bg-green-400 hover:border-green-400'>Pre-Session</button></Link>
            <Link href='/home/counsellor/in'><button className='bg-green-400 border p-2 rounded-sm border-green-400 hover:bg-green-400 hover:border-green-400'>In-Session</button></Link>
            <Link href='/home/counsellor/post'><button className='bg-white border p-2 rounded-sm border-gray-200 hover:bg-green-400 hover:border-green-400'>Post-Session</button></Link>
          </div>
        </div>
        <div className='p-4'>
          <table className='w-full'>
            <thead>
              <tr>
                <th colSpan={4} className='md:p-2 border text-sm text-white bg-blue-500 items-center'>BASIC PATIENT PROFILE</th>
              </tr>
            </thead>
              <tbody>
                <tr>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>NAME</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>&lt;&lt;name&gt;&gt;</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>PHYSICIAN</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>&lt;&lt;Dr. Abc&gt;&gt;</th>
                </tr>
                <tr>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>COUNSELLOR</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'># SESSION</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>DOB</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>DISEASE TYPE</th>
                </tr>
                <tr>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>HEIGHT</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>WEIGHT</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>BP</th>
                <th className='md:p-2 border font-semibold text-sm text-white bg-gray-700 items-center'>PULSE</th>
                </tr>
              </tbody>
          </table>
        </div>
        <div className='p-4'>
        <div className='w-full bg-blue-500 flex items-center justify-center'>
            <h1 className='p-2 text-white'>TODAY&apos;S COUNSELLING INFORMATION</h1>
        </div>
        </div>
        <div className='p-4 grid sm:grid-cols-4 grid-cols-1 gap-4'>
            <div onClick={() => setN1(!n1)} className={`cursor-pointer ${n1 ? 'bg-blue-500' : 'bg-gray-700'} p-10 border border-white h-full flex items-center justify-center`}>
              <h1 className='text-xl text-white'>START COUNSELLING</h1>
            </div>
            <div onClick={() => setN2(!n2)} className={`cursor-pointer ${n2 ? 'bg-blue-500' : 'bg-gray-700'} p-10 border border-white h-full flex items-center justify-center`}>
              <h1 className='text-xl text-white'>RECORD ON/OFF</h1>
            </div>
            <div onClick={() => setN3(!n3)} className={`cursor-pointer ${n3 ? 'bg-blue-500' : 'bg-gray-700'} p-10 border border-white h-full flex items-center justify-center`}>
              <h1 className='text-xl text-white'>GENERATE REPORT SUMMARY</h1>
            </div>
            <div onClick={() => setN4(!n4)} className={`cursor-pointer ${n4 ? 'bg-blue-500' : 'bg-gray-700'} p-10 border border-white h-full flex items-center justify-center`}>
              <h1 className='text-xl text-white'>VIEW/EDIT REPORT</h1>
            </div>
        </div>
      </div>
    </>
  );
};

export default Counsellor;