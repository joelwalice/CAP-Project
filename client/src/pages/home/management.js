import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Link from 'next/link';

const Management = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const router = useRouter();
  const [lastLogin, setLastLogin] = useState('');
  const [roles, setRoles] = useState([])
  const c = 'management'

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated' || localStorage.getItem('loggedIn') === 'true') {
      const token = localStorage.getItem('token');
      const storedName = localStorage.getItem('name');
      const role = localStorage.getItem('role')
      if(session?.data){
        localStorage.storeItem('lname', session?.user?.name)
        const lname = localStorage.getItem('lname')
        setName(lname)
      }
      setName(storedName);
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

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    router.push(`/home/${selectedRole}`);
  };

  const options = {
    chart: {  
      type: 'pie',
      backgroundColor: '#6b7280',
    },
    title: {
      text: 'WEEKLY PATIENT ANALYSIS BY DISEASE',
      align: 'center',
      style: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    credits: {  // Add this block to disable credits
      enabled: false
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Depression',
            y: 61.41,
          },
          {
            name: 'Anxiety',
            y: 11.84,
          },
          {
            name: 'Stress',
            y: 10.85,
          },
          {
            name: 'Bipolar Disorder',
            y: 4.67,
          },
          {
            name: 'Schizophrenia',
            y: 4.18,
          },
        ],
      }
    ],
  };

  const bar = {
    chart: {
      type: 'column',
      backgroundColor: '#6b7280',
    },
    title: {
      text: 'WEEKLY PATIENT ANALYSIS BY DISEASE',
      align: 'center',
      style: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: ['Depression', 'Anxiety', 'Stress', 'Bipolar Disorder', 'Schizophrenia'],
      crosshair: true,
      labels: {
        style: {
          color: 'white',
          fontSize: '15px',
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Patients',
        style: {
          color: 'white',
          fontSize: '15px',
          fontWeight: 'bold',
        },
      },
      labels: {
        style: {
          color: 'white',
          fontSize: '15px',
          fontWeight: 'bold',
        },
      },
    },
    series:[
      {
        name: 'Patients',
        data: [61.41, 11.84, 10.85, 4.67, 4.18],
      }
    ]
  };

  return (
    <>
      <title>Management Page</title>
      <div className="bg-gray-500 h-screen">
        <div className="flex items-center justify-between bg-gray-900 h-[80px] w-screen">
          <h1 className="text-4xl text-white cursor-pointer md:text-4xl lg:text-5xl font-semibold p-4">Management View</h1>
          <div className="flex items-center gap-4">
          <select className='p-2 rounded-md' onChange={handleRoleChange}>
            {
              roles.map((role, index) => (
                  <option key={index} selected={c === role}>{role}</option>
              ))
            }
          </select>
          <h1 className="hidden md:flex text-2xl text-white font-semibold">{name}</h1>
            <button className="flex bg-red-500 p-2 text-white text-md md:text-xl font-semibold mr-4 rounded-lg" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex bg-gray-900 items-center justify-between">
          <div className='text-white font-semibold'>
            <h1 className='p-4 text-3xl'>Counselling Analysis</h1>
          </div>
          <p className='hidden md:flex text-md p-4 font-semibold items-center text-white'>Last Login as <span className='p-2 text-green-300'> {name}</span> at <span className='p-2 text-cyan-300'>{lastLogin}</span></p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div>
            <div className='relative p-4 w-full'>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
          </div>
          <div className='relative p-4 w-full'>
                <HighchartsReact highcharts={Highcharts} options={bar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Management;