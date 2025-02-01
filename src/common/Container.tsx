import React from 'react'

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-[90%] mx-auto px-5'>
      {children}
    </div>
  )
}

export default Container