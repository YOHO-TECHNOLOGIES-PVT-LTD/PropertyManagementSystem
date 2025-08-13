import { useEffect, useState } from 'react'
import { COLORS, FONTS } from '../../constants/ui constants'
import Download from '../../assets/Reports/Download.png'
import Buildings from '../../assets/Reports/buildings.png'
import GrayBuilding from '../../assets/Reports/building_gray.png'
import Frame_1 from '../../assets/Bg_Frames/Frame_1.png'
import Frame_2 from '../../assets/Bg_Frames/Frame_2.png'
import Purple_Building from '../../assets/Reports/purple_building.png'
import TenantReport from '../../components/Reports/TenantReport'
import FinancialReport from '../../components/Reports/FinancialReport'
import MaintenanceReport from '../../components/Reports/MaintenanceReport'
import OccupancyReport from '../../components/Reports/OccupancyReport'
import { useDispatch, useSelector } from 'react-redux'
import { selectDashboardData } from '../../features/Dashboard/Reducer/Selector'
import { DashboardThunks } from '../../features/Dashboard/Reducer/DashboardThunk'


function Reports() {

  const [activeBtn, setActiveBtn] = useState("financial");

  const activeStyle = "bg-[#15A0C60D] text-[#15A0C6]";
  const inactiveStyle = "shadow-[0px_0px_15px_0px_#0000001A] text-[#7D7D7D]";


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Last 30 Days');

  const ReportsData = useSelector(selectDashboardData);
  const dispatch = useDispatch<any>();

  console.log("ReportsData", ReportsData);

  useEffect(() => {
    dispatch(DashboardThunks());
  }, [dispatch]);

  const options = [
    'Last 30 Days',
    'Last 3 Month',
    'Last 6 Month',
    'Last 12 Month'
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const formatIndianNumber = (num: any) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(2)} Lakh`;
    }
    return num.toString();
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <section>
          <h1 style={{ ...FONTS.headers }}>Financial Reports & Analytics</h1>
          <p style={{ ...FONTS.headers_description }} className='text-[#7D7D7D]'>Comprehensive insights into your property portfolio</p>
        </section>

        <section className='flex justify-center items-center gap-4'>
          <button className='flex justify-between items-center text-[#FFFFFF] px-3 py-2 rounded-lg gap-2' style={{ ...FONTS.button_Text, background: COLORS.primary_purple }}> <img src={Download} alt="Download" className='w-5 h-5' /> Export PDF</button>
          <button className='flex justify-between items-center text-[#FFFFFF] px-3 py-2 rounded-lg gap-2' style={{ ...FONTS.button_Text, background: COLORS.button_dark_green }}> <img src={Download} alt="Download" className='w-5 h-5' /> Export Excel</button>
        </section>
      </div>


      <div className='bg-[#13A5A50D] flex items-center gap-2 my-6 rounded-lg border py-3 border-[#13A5A5]'>
        <img src={Buildings} alt="building" className='h-[70px] w-[70px]' />
        <div>
          <h1 style={{ ...FONTS.headers }} className='text-[#139B9B]'>Owner Access - Complete Financial Reports</h1>
          <p style={{ ...FONTS.headers_description }} className='text-[#7D7D7D]'>Access to all financial data, revenue reports, expense breakdowns, and profit analysis.</p>
        </div>
      </div>

      <div className='flex justify-between items-center'>

        <div>
          <h1 style={{ ...FONTS.large_card_header }} className='mb-5'>Report Type</h1>
          <section className="flex  gap-3">
            <button
              onClick={() => setActiveBtn("financial")}
              className={`px-3 rounded-lg flex items-center justify-between pr-5 ${activeBtn === "financial" ? activeStyle : inactiveStyle
                }`}
              style={activeBtn === "financial" ? FONTS.card_headers : FONTS.report_btn}
            >
              <img
                src={activeBtn === "financial" ? Buildings : GrayBuilding}
                alt="btn"
                className="h-[50px] w-[50px]"
              />
              <p>Financial Report</p>
            </button>

            <button
              onClick={() => setActiveBtn("occupancy")}
              className={`px-3 rounded-lg flex items-center justify-between pr-5 ${activeBtn === "occupancy" ? activeStyle : inactiveStyle
                }`}
              style={activeBtn === "occupancy" ? FONTS.card_headers : FONTS.report_btn}
            >
              <img
                src={activeBtn === "occupancy" ? Buildings : GrayBuilding}
                alt="btn"
                className="h-[50px] w-[50px]"
              />
              <p>Occupancy Report</p>
            </button>

            <button
              onClick={() => setActiveBtn("tenant")}
              className={`px-3 rounded-lg flex items-center justify-between pr-5 ${activeBtn === "tenant" ? activeStyle : inactiveStyle
                }`}
              style={activeBtn === "tenant" ? FONTS.card_headers : FONTS.report_btn}
            >
              <img
                src={activeBtn === "tenant" ? Buildings : GrayBuilding}
                alt="btn"
                className="h-[50px] w-[50px]"
              />
              <p>Tenant Report</p>
            </button>

            <button
              onClick={() => setActiveBtn("maintenance")}
              className={`px-3 rounded-lg flex items-center justify-between pr-5 ${activeBtn === "maintenance" ? activeStyle : inactiveStyle
                }`}
              style={activeBtn === "maintenance" ? { ...FONTS.card_headers } : { ...FONTS.report_btn }}
            >
              <img
                src={activeBtn === "maintenance" ? Buildings : GrayBuilding}
                alt="btn"
                className="h-[50px] w-[50px]"
              />
              <p>Maintenance Report</p>
            </button>
          </section>
        </div>

        <div>
          <h1 style={{ ...FONTS.large_card_header }} className='mb-5'>Date Range</h1>
          <div className="relative">
            <button
              className="bg-[#B200FF1A] px-4 py-2 rounded-md flex items-center justify-between text-[#B200FF]"
              style={{ ...FONTS.button_Text }}
              onClick={toggleDropdown}
            >
              {selectedOption}
              <svg
                className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-[140px] p-2 bg-white rounded-md shadow-[0px_0px_15px_0px_#0000001A] grid gap-2 top-[42px] right-0">
                {options.map((option) => (
                  <div
                    key={option}
                    style={{ ...FONTS.headers_description }}
                    className={`px-4 py-2 hover:bg-[#B200FF1A] border rounded-md cursor-pointer ${selectedOption === option ? 'bg-[#B200FF1A]' : ''
                      }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>




      {activeBtn === "occupancy" && <div className='my-8 flex gap-4'>
        <section
          className="w-[350px] shadow-[0px_0px_40px_0px_#9739E91A] rounded-xl  py-1"
          style={{
            backgroundImage: `url(${Frame_1})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='flex items-center'>
            <img src={Purple_Building} alt="Purp_build" className='w-[90px] h-[90px]' />
            <p style={{ ...FONTS.card_headers }} className='text-[#7D7D7D]'>Total Revenue</p>
          </div>
          <h1 style={{ ...FONTS.headers }} className="px-6">
            {formatIndianNumber(600000)}
          </h1>

        </section>

        <section
          className="w-[350px] shadow-[0px_0px_40px_0px_#9739E91A] rounded-xl  py-1"
          style={{
            backgroundImage: `url(${Frame_2})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='flex items-center'>
            <img src={Purple_Building} alt="Purp_build" className='w-[90px] h-[90px]' />
            <p style={{ ...FONTS.card_headers }} className='text-[#7D7D7D]'>Total Expenses</p>
          </div>
          <h1 style={{ ...FONTS.headers }} className="px-6">
            6000000
          </h1>
        </section>
      </div>}



      {activeBtn === "financial" && <FinancialReport />}
      {activeBtn === "occupancy" && <OccupancyReport />}
      {activeBtn === "tenant" && <TenantReport />}
      {activeBtn === "maintenance" && <MaintenanceReport />}

    </div>
  )
}

export default Reports