
import Sidebar from '../../components/dashboard/sidebar/Sidebar'
import React from 'react'
interface LayoutProp{
    children:React.ReactNode
}

const BackLayout = ({children}:LayoutProp) => {
  return (
    <div className='flex'>
   <Sidebar/>
    <main className='w-full bg-slate-100 min-h-screen'>
 
      {children}
   
    </main>
    </div>
  )
}

export default BackLayout