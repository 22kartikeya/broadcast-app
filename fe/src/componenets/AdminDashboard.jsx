import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [targetRole, setTargetRole] = useState('');
    const [message, setMessage] = useState('');
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/send/broadcast', {
                role: targetRole, message
            },{
                headers: {
                    token: token
                }
            }
        );
        setToast(true);
        setToastMessage('Message sent successfully');
        setTargetRole('');
        setMessage('');
        setTimeout(() => {
            setToast(false)
            setToastMessage('')
        }, 3000);
        }catch(e){
            console.error("Broadcast error:", e);
            setToast(true);
            setToastMessage('Failed to send message');
            setTimeout(() => {
                setToast(false)
                setToastMessage('')
            }, 3000);
        }
    }
    async function handleLogout() {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            await axios.get('http://localhost:3000/site/logout', {
                headers: { token }
            });
            localStorage.removeItem('token');
            navigate('/');
        } catch (e) {
            console.error('Logout failed:', e);
        }
    }

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="flex justify-center">
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Admin Dashboard</h2>
                <p className="mt-2 text-lg/8 text-gray-500">Broadcast Your Message</p>
            </div>
            <form onSubmit={ handleSubmit } className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="role" className="block text-sm/6 font-semibold text-gray-900">
                            Role
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="role"
                                name="role"
                                type="text"
                                value={targetRole}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800"
                                onChange={(e) => setTargetRole(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                            Message
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={message}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-800"
                    >
                        Send
                    </button>
                </div>
            </form>
            {toast && (
                <div
                    id="toast-simple"
                    className="mb-4 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-white bg-black rounded-lg shadow-sm"
                    role="alert"
                >
                    <svg
                        className="w-5 h-5 text-white rotate-45"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                        />
                    </svg>
                    <div className="ps-4 text-sm font-normal">{toastMessage}</div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard;