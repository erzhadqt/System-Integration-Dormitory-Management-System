import React from 'react'
import { Bed } from "lucide-react"
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full h-screen flex flex-col gap-2 justify-center items-center font-bold text-4xl'>
      <Bed className='animate-bounce' size={100}/>
      404NotFound

      <button onClick={() => navigate(-1)} className='bg-zinc-300 p-2 rounded-md text-xl mt-3'>
        Go Back
      </button>
    </div>
  )
}

export default NotFound