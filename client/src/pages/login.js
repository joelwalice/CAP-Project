import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'none',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const loggedIn = localStorage.getItem("loggedIn");
        const role = localStorage.getItem("role");
        if (loggedIn === "true") {
            window.location.href = `/home/${role}`;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password, role } = this.state;
    
        if (role === 'none') {
            alert('Please select a role.');
            return;
        }
    
        axios.post('https://cap-two.vercel.app/admin/login', {
            email,
            password,
            role
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const { data } = response;
            console.log("Response Data: ", data);
            if (data.status === 'Success') {
                const roles = Array.isArray(data.data.role) ? data.data.role : [];
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('name', data.data.name);
                if (roles.includes(role)) {
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('role', role);
                    localStorage.setItem('roles', roles);
                    const loginTime = new Date().toLocaleString();
                    localStorage.setItem('loginTime', loginTime);
                    alert('Login Successful')
                    window.location.assign(`/home/${role}`);
                } else {
                    alert('Role mismatch or role not allowed');
                }
            } else {
                alert('Invalid Credentials');
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert('Check the Role and Password.');
        });
    }
        render () {
            return (
                <>
                    <title>Admin Login</title>
                    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-900'>
                        <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-gray-200 rounded-3xl p-4 mx-auto my-auto'>
                            <div className={'w-full flex flex-col justify-center'}>
                                <h1 className='text-4xl md:text-5xl flex items-center justify-center lg:text-5xl font-semibold px-4 lg:mr-4 pt-2'>Admin Login</h1>
                                <form action="" className='flex flex-col justify-center p-4 pt-6 mt-5 gap-5'>
                                    <div className=' flex flex-col justify-center gap-5'>
                                        <input className='p-2 outline outline-1 rounded outline-black' type="email" name='email' placeholder='Email'  onChange={(e) => this.setState({email:e.target.value})}/>
                                        <input className='p-2 outline outline-1 rounded outline-black' type="password" name='password' placeholder='Password' onChange={(e) => this.setState({password:e.target.value})}/>
                                        <select className='p-2 rounded-lg' onChange={e => this.setState({role: e.target.value})}>
                                            <option value="none">-NONE-</option>
                                            <option value="management">Management</option>
                                            <option value="counsellor">Counsellor</option>
                                            <option value="counselee">Counselee</option>
                                            <option value="physician">Physician</option>
                                        </select>
                                    </div>
                                    <button onClick={this.handleSubmit}
                                            className=' p-4 flex flex-col items-center bg-cyan-600 text-xl text-white border border-cyan-600 rounded-xl pt-auto'>Login
                                    </button>
                                    <div className='flex justify-center items-center gap-2 md:text-xl lg:text-xl'><p
                                        className='text-gray-500'>--------</p>
                                        <h3 className='text-center text-gray-500'>OR</h3>
                                        <p className='text-gray-500'> --------</p>
                                    </div>

                                </form>
                                <div className='flex justify-center items-center gap-4'>
                                    <button onClick={() => {
                                        window.location.assign('register')
                                    }} className='bg-red-600 text-white text-xl border-red-600 rounded-md p-4'>Register
                                        Yourself
                                    </button>
                                    <div className="flex items-center justify-center">
                                        <button type="button" onClick={this.handleSub} className={'rounded-xl border-0 font-semibold flex items-center gap-2 p-4 bg-white text-xl shadow-md hover:shadow-lg'}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                                        </div>
                                        Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
}
