import React from 'react'

const ChangeDisplay = () => {
  return (
    <div className='bg-coal-950 w-full min-h-screen max-h-full flex flex-row justify-center items-center'>
     <div className='flex flex-col justify-evenly items-center gap-5 w-[400px] h-[200px] bg-coal-900 text-red-500 text-center py-5'>
        Sorry for the inconvenience, but you will certainly NOT enjoy using our application on your current screen size, to use this web app, please reload the page on a device
        with a larger screen width (minimum of width of 1280px);
     </div>
    </div>
  )
}

export default ChangeDisplay