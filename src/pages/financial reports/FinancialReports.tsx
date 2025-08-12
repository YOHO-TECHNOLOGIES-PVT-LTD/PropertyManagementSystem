import React from 'react'
import { FONTS } from '../../constants/ui constants'

function FinancialReports() {
  return (
    <div>
      <div className='bg-amber-200 flex justify-between p-2'>
        <section>
          <h1 style={{...FONTS.headers}}>Financial Reports & Analytics</h1>
          <p>Comprehensive insights into your property portfolio</p>
        </section>

        <section>
          <button>Export PDF</button>
          <button>Export Excel</button>
        </section>
      </div>
    </div>
  )
}

export default FinancialReports