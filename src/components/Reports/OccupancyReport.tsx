import { FONTS } from "../../constants/ui constants"

const OccupancyReport = () => {
        const tableHeaders = Array.from({ length: 5 });

  return (
    <div>
        <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid gap-6'>
                        <h1 style={{ ...FONTS.chart_Header }}>Property Performance</h1>
        
                        <div style={{ ...FONTS.Table_Header }} className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid grid-cols-4'>
                            <p>Property</p>
                            <p>Units</p>
                            <p>Revenue</p>
                            <p>Occupancy</p>
                        </div>
        
                        {tableHeaders.map((_, index) => (
                            <div className='shadow-[0px_0px_15px_0px_#0000001A] rounded-lg p-3 grid grid-cols-4'>
                                <p style={{ ...FONTS.Table_Header }}>Property</p>
                                <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>24</p>
                                <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>240k</p>
                                <p style={{ ...FONTS.Table_Body_2 }} className='text-[#7D7D7D]'>95%</p>
                            </div>))}
        
                    </div>
    </div>
  )
}

export default OccupancyReport