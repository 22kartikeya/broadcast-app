import { useState } from "react";
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
    const [broadcast, setBroadcast] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const res = await axios.get('http://localhost:3000/send/broadcast',
                    {
                        headers: { token }
                    }
                );
                if (res.status == 200) {
                    setBroadcast(res.data.giveBroadcast || []);
                    setIsDisabled(res.data.isBroadcastDisabled || false)
                }
            } catch (e) {
                console.error("Broadcast Fetch failed:", e);
            }
        }
        fetchMessages();
    }, []);

    async function handleDisable() {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('http://localhost:3000/send/disable-broadcast', {},
                {
                    headers: { token }
                });
            setBroadcast([]);
            setIsDisabled(true);
        } catch (e) {
            console.error('Failed to disabel broadcast:', e);
        }
    }

    async function handleEnable() {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await axios.post('http://localhost:3000/send/enable-broadcast', {},
                {
                    headers: { token }
                });
            const res = await axios.get('http://localhost:3000/send/broadcast', {
                headers: { token }
            });
            if (res.status == 200) {
                setBroadcast(res.data.giveBroadcast || []);
                setIsDisabled(false);
            }
        } catch (e) {
            console.error('Failed to enable broadcast:', e);
        }
    }

    function handleBroadcast(index) {
        setBroadcast((prev) =>
            prev.filter((_, i) => i != index)
        )
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

    return (<>
        {broadcast.map((msg, index) => (
            <div key={msg.createdAt} className="relative isolate flex items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5 sm:before:flex-1" >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="font-semibold text-sm/6 text-white">
                        {msg.message}
                    </p>
                </div>
                <div className="flex flex-1 justify-end">
                    <button
                        type="button"
                        className="-m-3 p-3 focus-visible:-outline-offset-4"
                        onClick={() => handleBroadcast(index)}
                    >
                        <XMarkIcon aria-hidden="true" className="size-5 text-gray-200" />
                    </button>
                </div>
            </div>
        ))}
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-10">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Employee Dashboard</h2>
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <button
                    className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={isDisabled ? handleEnable : handleDisable}
                >
                    {isDisabled ? 'Enable Message' : 'Disable Message'}
                </button>
            </div>
        </div>
    </>
    )
};

export default EmployeeDashboard;