import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/site/signup', {
                email, password, role
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            switch (role) {
                case 'admin':
                    navigate('/AdminDashboard');
                    break;
                case 'employee':
                    navigate('/EmployeeDashboard');
                    break;
                case 'user':
                    navigate('/UserDashboard');
                    break;
            }
            console.log(`Signed up as: ${email}`);
        } catch (e) {
            console.log(`Signin failed: ${e.message}`);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Signup to get started
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-800">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-800">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div class="max-w-sm mx-auto">
                            <label for="role" class="block mb-2 text-sm font-medium text-gray-800">Role</label>
                            <select 
                                id="role"
                                name="role"
                                required
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6">
                                <option value="">-- Select a role --</option> 
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <button onClick={() => navigate("/login")}
                        className="font-semibold text-gray-700">
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;