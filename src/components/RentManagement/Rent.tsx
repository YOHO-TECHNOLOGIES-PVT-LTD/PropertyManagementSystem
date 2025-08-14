import React, { useState, useMemo, useRef, useEffect } from "react";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import Card2 from "./Card";
import frame1 from "../../assets/Bg_Frames/Frame_1.png";
import frame2 from "../../assets/Bg_Frames/Frame_2.png";
import frame3 from "../../assets/Bg_Frames/Frame_3.png";
import { BiSolidBuildings } from "react-icons/bi";
import { FONTS } from "../../constants/ui constants";
import { useDispatch, useSelector } from "react-redux";
import { getRent } from "../../features/Rent/selector";
import { fetchRentThunk } from "../../features/Rent/thunks";
import { downloadRent, updateRent } from "../../features/Rent/service";
import toast from "react-hot-toast";


interface PersonalInformation {
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

interface Tenant {
  personal_information: PersonalInformation;
  rent: string;
  unit_number: number;
  security_deposit: string;
  lease_start_date: string;
  lease_end_date: string;
  emergency_contact: string;
}

interface RentItem {
  uuid: string;
  tenantId: Tenant;
  paymentDueDay: string;
  status: string;
  bankDetails: string;
}

interface RentState {
  rents: RentItem[];
  loading: boolean;
  error: string | null;
}

const Rent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [monthFilter, setMonthFilter] = useState("All Months");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState<boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRent, setSelectedRent] = useState<RentItem | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  const badgeRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const statusOptions = ["paid", "pending", "overdue"];
    const filterStatusOptions = ["All Status","paid", "pending", "overdue"];
  const rowsPerPageOptions = [5, 10, 15, 20];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-[#1CAF191A] border-[#1CAF19] text-[#1CAF19]";
      case "Pending":
        return "bg-[#FFC3001A] border-[#FFC300] text-[#FFC300]";
      case "Overdue":
        return "bg-[#E212691A] border-[#E21269] text-[#E21269]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (!openDropdownId) return;
      const target = e.target as Node;
      if (
        badgeRef.current &&
        dropdownRef.current &&
        !badgeRef.current.contains(target) &&
        !dropdownRef.current.contains(target)
      ) {
        setOpenDropdownId(null);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdownId(null);
    };

    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openDropdownId]);

  const dispatch = useDispatch<any>();
  const rents = useSelector(getRent);

  useEffect(() => {
    const fetchRentData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = {
          month: "8",
          year: "2025"
        };
        await dispatch(fetchRentThunk(params));
      } catch (err) {
        setError("Failed to fetch rent data. Please try again.");
        console.error("Error fetching rent data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentData();
  }, [dispatch]);

  const handleDownload = async (uuid: string) => {
    try {
      setDownloadingId(uuid);
      const response = await downloadRent(uuid);

      const url = window.URL.createObjectURL(response?.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `rent_receipt_${uuid}_${new Date().toISOString().slice(0, 10)}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
     
    } finally {
      setDownloadingId(null);
    }
  };

  const handleStatusChange = async (uuid: string, newStatus: string) => {
  try {
    setUpdatingId(uuid);
    const params = {
      uuid: uuid,
      status: newStatus
    };
    
    await updateRent(params);
    toast.success('Status updated successfully!');
    
    const fetchParams = {
      month: "8",
      year: "2025"
    };
    await dispatch(fetchRentThunk(fetchParams));
  } catch (error) {
    console.error('Status update failed:', error);
    toast.error('Failed to update status. Please try again.');
  } finally {
    setUpdatingId(null);
  }
  setOpenDropdownId(null);
};

  const filteredData = useMemo(() => {
    if (!rents?.rents) return [];
    return rents.rents.filter((item: RentItem) => {
      const matchesSearch = item.tenantId?.personal_information?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" ? true : item.status === statusFilter;
      const matchesMonth =
        monthFilter === "All Months"
          ? true
          : months[new Date(item.paymentDueDay).getMonth() + 1] === monthFilter;
      return matchesSearch && matchesStatus && matchesMonth;
    });
  }, [searchTerm, statusFilter, monthFilter, rents?.rents]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, monthFilter, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const totalDue = rents?.rents?.reduce(
    (sum: number, item: RentItem) => sum + (Number(item.tenantId?.rent) || 0),
    0
  ) || 0;

  const totalPaid = rents?.rents
    ?.filter((item: RentItem) => item.status === "Paid")
    ?.reduce((sum: number, item: RentItem) => sum + (Number(item.tenantId?.rent) || 0), 0) || 0;

  const totalPending = rents?.rents
    ?.filter((item: RentItem) => item.status === "Pending")
    ?.reduce((sum: number, item: RentItem) => sum + (Number(item.tenantId?.rent) || 0), 0) || 0;


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold">
          <span className="text-3xl"> Rent Management </span>
          <br />
          <span className="text-md font-normal text-gray-600">
            Track and Manage Rent Payments
          </span>
        </div>
      </div>

      <div className="flex mb-6 gap-6">
        <Card2
          bgImage={frame1}
          icon={<Building2 />}
          title="Total Due"
          subText="This Month"
          value={`₹${totalDue.toLocaleString()}`}
          iconBg="bg-pink-200"
          iconTextColor="text-pink-600"
        />
        <Card2
          bgImage={frame2}
          icon={<Building2 />}
          title="Collected"
          subText="This Month"
          value={`₹${totalPaid.toLocaleString()}`}
          iconBg="bg-green-200"
          iconTextColor="text-green-600"
        />
        <Card2
          bgImage={frame3}
          icon={<Building2 />}
          title="Pending"
          subText="This Month"
          value={`₹${totalPending.toLocaleString()}`}
          iconBg="bg-yellow-200"
          iconTextColor="text-yellow-600"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative w-28 ml-auto ">
          <div
            className="border border-gray-300 rounded-lg px-3 py-2 w-full cursor-pointer flex items-center justify-between bg-[#B200FF1A]"
            onClick={() => {
              setIsStatusDropdownOpen((prev) => !prev);
              setStatusFilter((prev) =>
                prev === "All Status" ? "All Status" : prev
              );
            }}
          >
            <span className="text-[#B200FF]">{statusFilter}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isStatusDropdownOpen && (
            <div className="absolute w-full bg-white text-[#7D7D7D] shadow-xl mt-1 rounded-lg border border-gray-300 z-10 overflow-y-auto p-2 space-y-2">
              {filterStatusOptions.map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsStatusDropdownOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md active:bg-[#B200FF] active:text-white cursor-pointer border transition-colors ${
                    statusFilter === status ? "bg-[#B200FF] text-white" : ""
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-28 ">
          <div
            className="border border-gray-300 rounded-lg px-3 py-2 w-full cursor-pointer flex items-center justify-between bg-[#B200FF1A]"
            onClick={() => {
              setIsMonthDropdownOpen((prev) => !prev);
              setMonthFilter((prev) =>
                prev === "All Months" ? "All Months" : prev
              );
            }}
          >
            <span className="text-[#B200FF]">{monthFilter}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isMonthDropdownOpen && (
            <div className="absolute w-full text-[#7D7D7D] bg-white shadow-xl rounded-lg mt-1 border border-gray-300 z-10 overflow-y-auto p-2 space-y-2">
              {months.map((month) => (
                <div
                  key={month}
                  onClick={() => {
                    setMonthFilter(month);
                    setIsMonthDropdownOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md active:bg-[#B200FF] active:text-white cursor-pointer border transition-colors ${
                    monthFilter === month ? "bg-[#B200FF] text-white" : ""
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 shadow overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-6">
          <thead className="bg-gray-100" style={{ ...FONTS.Table_Header }}>
            <tr>
              <th className="px-6 py-4 rounded-l-lg">Company Name</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody style={{ ...FONTS.Table_Body }}>
            {paginatedData.length > 0 ? (
              paginatedData.map((item: RentItem) => (
                <tr
                  key={item.uuid}
                  className="shadow-sm text-[#7D7D7D] hover:shadow-md transition-shadow"
                >
                  <td className="px-6 py-4 flex rounded-l-lg text-lg border-l border-t border-b border-gray-200">
                    <span
                      className={`rounded p-2 flex items-center justify-center ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      <BiSolidBuildings className="text-2xl" />
                    </span>
                    <div className="grid ml-3">
                      <span className="font-bold text-black">
                        {item.tenantId?.personal_information?.full_name || "N/A"}
                      </span>
                      <span className="text-sm">{item.tenantId?.unit.unit_name || "N/A"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 border-t border-b border-gray-200">
                    ₹{item.tenantId?.rent || "0"}
                  </td>

                  <td className="px-6 py-4 border-t border-b border-gray-200">
                    {item.paymentDueDay || "N/A"}
                  </td>

                  <td className="px-6 py-4 border-t border-b border-gray-200 relative">
                    <div
                      ref={(el) => {
                        if (openDropdownId === item.uuid && el)
                          badgeRef.current = el;
                      }}
                      onClick={(e) => {
                        badgeRef.current = e.currentTarget as HTMLDivElement;
                        setOpenDropdownId((prev) =>
                          prev === item.uuid ? null : item.uuid
                        );
                      }}
                      className={`inline-flex items-center justify-between cursor-pointer h-10 px-3 py-1 rounded-md border text-sm font-medium ${getStatusStyle(
                        item.status
                      )} min-w-[100px] ${updatingId === item.uuid ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{updatingId === item.uuid ? 'Updating...' : item.status || "N/A"}</span>
                      </span>

                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
                          openDropdownId === item.uuid ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {openDropdownId === item.uuid && (
                      <div
                        ref={dropdownRef}
                        style={{
                          minWidth: badgeRef.current
                            ? `${badgeRef.current.offsetWidth}px`
                            : undefined,
                        }}
                        className="absolute left-0 mt-1 bg-white shadow-xl rounded-lg border border-gray-300 z-10 overflow-y-auto p-2 space-y-2"
                      >
                        {statusOptions.map((s) => (
                          <div
                            key={s}
                            onClick={() => handleStatusChange(item.uuid, s)}
                            className={`flex items-center px-3 text-[#7D7D7D] py-2 rounded-md cursor-pointer border hover:bg-blue-50 transition-colors ${
                              item.status === s
                                ? "bg-blue-100 text-blue-600"
                                : ""
                            }`}
                          >
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 rounded-r-lg border-r border-t border-b border-gray-200">
                    <div className="flex gap-2">
                      <button
                        className="bg-[#B200FF] text-white px-3 h-10 py-1 rounded-lg transition-colors hover:bg-[#9800cc]"
                        onClick={() => {
  setSelectedRent(item);
  setIsModalOpen(true);
}}
                      >
                        View
                      </button>
                      <button 
                        className={`bg-[#B200FF] text-white px-3 py-1 rounded-lg transition-colors hover:bg-[#9800cc] ${
                          downloadingId === item.uuid ? 'opacity-50 pointer-events-none' : ''
                        }`}
                        onClick={() => handleDownload(item.uuid)}
                        disabled={downloadingId === item.uuid}
                      >
                        {downloadingId === item.uuid ? 'Downloading...' : 'Download'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No rent data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-200 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          page === currentPage
                            ? "bg-[#B200FF] text-white border-[#B200FF]"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && selectedRent && (
  <div className="fixed inset-0 bg-black text-[#7D7D7D] bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Rent Details</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex  items-start gap-4 mb-6">
          <div className={`rounded-lg p-3 ${getStatusStyle(selectedRent.status)}`}>
            <BiSolidBuildings className="text-3xl" />
          </div>
          <div>
            <h3 className="text-2xl text-black font-bold">
              {selectedRent.tenantId?.personal_information?.full_name || "N/A"}
            </h3>
            <p className="text-gray-600">{selectedRent.tenantId?.unit.unit_name || "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-2xl border-b mb-2">Tenant Information</h4>
              <div className="space-y-2">
                <p><span className="text-xl">Email:</span> {selectedRent.tenantId?.personal_information?.email || "N/A"}</p>
                <p><span className="text-xl">Phone:</span> {selectedRent.tenantId?.personal_information?.phone || "N/A"}</p>
                <p><span className="text-xl">Address:</span> {selectedRent.tenantId?.personal_information?.address || "N/A"}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-2xl border-b mb-2">Lease Information</h4>
              <div className="space-y-2">
                <p><span className="text-xl">Start Date:</span> {selectedRent.tenantId?.lease_duration.start_date || "N/A"}</p>
                <p><span className="text-xl">End Date:</span> {selectedRent.tenantId?.lease_duration.end_date || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-2xl border-b mb-2">Payment Details</h4>
              <div className="space-y-2">
                <p><span className="text-xl">Amount:</span> ₹{selectedRent.tenantId?.rent || "0"}</p>
                <p><span className="text-xl">Due Date:</span> {selectedRent.paymentDueDay || "N/A"}</p>
                <p>
                  <span className="text-xl">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-md text-sm ${getStatusStyle(selectedRent.status)}`}>
                    {selectedRent.status || "N/A"}
                  </span>
                </p>
                <p><span className="text-xl">Security Deposit:</span> ₹{selectedRent.tenantId?.security_deposit || "0"}</p>
              </div>
            </div> 

            <div>
              <h4 className="font-semibold text-2xl border-b mb-2">Emergency Contact</h4>
              <p>
                Relation : {typeof selectedRent.tenantId?.emergency_contact === 'object' 
                  ? `${selectedRent.tenantId.emergency_contact.relation || 'N/A'} `
                  : selectedRent.tenantId?.emergency_contact || "N/A"}
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-end p-4 border-t gap-3">
        {/* <button
          className="bg-[#B200FF] text-white px-4 py-2 rounded-lg hover:bg-[#9800cc] transition-colors"
          onClick={() => {
            handleDownload(selectedRent.uuid);
            setIsModalOpen(false);
          }}
        >
          Download Receipt
        </button> */}
        <button
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    
    </div>
  );
};

export default Rent;