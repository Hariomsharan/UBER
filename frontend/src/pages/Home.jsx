import React from 'react'
import { Link } from 'react-router-dom'
// import ArrowRightLine from 'remixicon-react/ArrowRightLine';

const Home = () => {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1615929361868-2e41ea1befaf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col bg-red-400 w-full">
        <img className="w-14 ml-9" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                <Link to='/login' className='flex item-center justify-center bg-black text-white w-full py-3 rounded-xl mt-5 text-base'>
                Continue
                {/* <ArrowRightLine class="ri-arrow-right-line"></ArrowRightLine> */}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home