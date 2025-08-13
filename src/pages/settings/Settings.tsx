import React from 'react'
import { FONTS } from '../../constants/ui constants'
import { CgProfile } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { BiTimer } from "react-icons/bi";


function Settings() {
  return (
    <>
    <h1 className='font-bold text-[24px]'>Settings</h1>
    <h2 className='text-[#7D7D7D]'>Manage Your Account Settings and Preferences</h2>
    <div>
      <div><CgProfile />Account</div>
      <div><MdOutlineSecurity />Security</div>
      <div><BiTimer />Timeline</div>
      </div>

    </>
  )
}

export default Settings