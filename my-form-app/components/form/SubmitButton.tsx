import { Button, Spin } from 'antd'
import React from 'react'
interface ButtonProps{
    isLoading:boolean
}
const SubmitButton = ({isLoading}:ButtonProps) => {
  return (
    <div>
        <div className="flex justify-center items-center">
          <Button
        disabled={isLoading}
         htmlType="submit"
            className="w-1/3 my-3  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? <Spin/> : "Göndər"}
          </Button>
        </div>
    </div>
  )
}

export default SubmitButton

