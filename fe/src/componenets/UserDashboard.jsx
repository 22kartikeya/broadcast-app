import { useState } from "react";
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect } from "react";

const UserDashboard = () => {
    const [broadcast, setBroadcast] = useState([]);
    useEffect(() => {
        const fetchMessages =  async () => {
            try{
                const token = localStorage.getItem("token");
                if(!token) return;
                const res = await axios.get('http://localhost:3000/send/broadcast',
                    {
                        headers: { token }
                    }
                );
                if(res.status == 200) setBroadcast(res.data.giveBroadcast || []);
            }catch(e){
                console.error("Broadcast Fetch failed:", e);
            }
        }
        fetchMessages();
    }, []);

    async function handleDisable (){
        const token = localStorage.getItem('token');
        if(!token) return;
        try{
            await axios.post('http://localhost:3000/send/disable-broadcast', {}, 
                {headers: {token}
            });
            setBroadcast([]);
        }catch(e){
            console.error('Failed to disabel broadcast:', e);
        }
    }

    return (<>
        {broadcast.map((msg, index) => (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-577/310 w-144.25 bg-linear-to-r from-[#181818] to-[#747474] opacity-30"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                        }}
                        className="aspect-577/310 w-144.25 bg-linear-to-r from-[#272727] to-[#3b3b3b] opacity-30"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="text-sm/6 text-gray-900">
                        {msg.message}
                    </p>
                    <button
                        className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        onClick={handleDisable}
                    >
                        Disable <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
                <div className="flex flex-1 justify-end">
                    <button 
                        type="button" 
                        className="-m-3 p-3 focus-visible:-outline-offset-4"
                        onClick={() => setBroadcast((prev) => 
                            prev.filter((_, i) => i != index)
                        )}
                    >
                        <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" />
                    </button>
                </div>
         </div>
        ))}
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">User Dashboard</h2>
            </div>
        </div>
    </>
    )
};

export default UserDashboard;