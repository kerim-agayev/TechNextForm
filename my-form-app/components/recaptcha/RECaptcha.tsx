"use client"
import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
interface RECaptchaProps{
    children:React.ReactNode
}
const RECaptchaProvider: React.FC<RECaptchaProps> = ({children}) => {
  return (
    <div>
         <GoogleReCaptchaProvider
         reCaptchaKey={process.env.NEXT_PUBLIC_CITE_KEY!}
         >
             {children}
        </GoogleReCaptchaProvider>
    </div>
  )
}

export default RECaptchaProvider