import React from 'react'
import Empty_Report from '../../assets/Reports/Empty_Report.png'
import { FONTS } from '../../constants/ui constants'

const TenantReport = () => {
  return (
    <div>
        
        <div className='w-full text-center mt-15 mb-20'>
            <img src={Empty_Report} alt="EmptyImg" className='w-[280px] m-auto'/>
            <h1 style={{...FONTS.large_card_subHeader}}>Tenent report</h1>
            <p style={{...FONTS.large_card_description3}}>Detailed tenant analytics and insights coming soon.</p>
        </div>

    </div>
  )
}

export default TenantReport