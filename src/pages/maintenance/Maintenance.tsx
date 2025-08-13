
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FONTS } from "../../constants/ui constants";
import { FaUser, FaPlus } from "react-icons/fa";
import Background_Image_1 from "../../assets/Bg_Frames/Frame_1.png";
import Background_Image_2 from "../../assets/Bg_Frames/Frame_3.png";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { CreatMaintenanceThunks, GetallMaintenanceThunks } from "../../features/maintenance/reducers/thunks.ts"
import { cn } from '../../lib/utils';

const Maintenance = () => {
    const [categoryFilter, setCategoryFilter] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [Openrequest, setOpenrequest] = useState(Boolean)
    const dispatch = useDispatch<any>();
    const [maintenanceList, setMaintenanceList] = useState<any[]>([]);
    const [creatmaintenances, setcreatmaintenances] = useState<any[]>([]);


    useEffect(() => {
        (async () => {
            const maintenancedata = await dispatch(GetallMaintenanceThunks({}));
            console.log("Maintenance Data directly from thunk:", maintenancedata);
            setMaintenanceList(maintenancedata);
        })();
    }, [dispatch]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        full_name: "",
        unitId: "",
        category: "",
        createdAt: "",
        scheduled: "",
        estmate_cost: ""
    });

    useEffect(() => {

        dispatch(GetallMaintenanceThunks({}));
        dispatch(CreatMaintenanceThunks(formData)).then((res: any) => {
            console.log("Created maintenance:", res);
            setcreatmaintenances(res);
        });
    }, [dispatch]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(CreatMaintenanceThunks(formData)).then((res: any) => {
            console.log("Created maintenance:", res);
            setOpenrequest(false);
            dispatch(GetallMaintenanceThunks({}));
            setFormData({
                title: "",
                description: "",
                full_name: "",
                unitId: "",
                category: "",
                createdAt: "",
                scheduled: "",
                estmate_cost: ""
            });
        });
    };

    const totalCount = maintenanceList.length;
    const totalCost = maintenanceList.reduce((sum, item) => {
        const numericCost = parseInt(String(item.estmate_cost).replace(/[^0-9]/g, ""), 10);
        return sum + (isNaN(numericCost) ? 0 : numericCost);
    }, 0);

    const card = [
        { id: 1, icon: <FaUser />, title: "Total", number: totalCount, bg: Background_Image_1 },
        { id: 2, icon: <FaUser />, title: "Total Estimated Cost", number: `₹.${totalCost.toLocaleString()}`, bg: Background_Image_2 },
    ];

    const
        filteredData = maintenanceList
            .filter(item => categoryFilter === "All" || item.category === categoryFilter)
            .filter(item =>
                item.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
            );

    console.log(filteredData, "filtered data")


    return (
        <div>

            <div className="flex justify-between items-center gap-4 mt-4">
                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                            <FiSearch size={14} />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="SearchBy...name,unit_no,"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                </div>
                <div>
                    <Button
                        onClick={() => { setOpenrequest(!Openrequest) }}
                        className="flex items-center gap-2 bg-[#B200FF]  text-white px-4 py-2 rounded-lg shadow">
                        <FaPlus />
                        <span>New Request</span>
                    </Button>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-4   rounded-2xl ">
                {card.map((item) => (
                    <div
                        key={item.id}
                        className="shadow-lg rounded-lg border-2 p-4 flex flex-col items-start relative overflow-hidden"
                    >
                        {/* Background image layer with opacity */}
                        <div
                            style={{
                                backgroundImage: `url(${item.bg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="absolute inset-0"
                        ></div>

                        {/* Foreground content */}
                        <div className=" z-10">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                                <span>{item.icon}</span>
                                <span>{item.title}</span>
                            </div>
                            <div className="mt-2 text-2xl font-bold">{item.number}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Maintenance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {filteredData?.length > 0 ? (
                    filteredData.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white text-white  rounded-xl shadow-xl overflow-hidden border"
                        >
                            {/* Header */}
                            <div className="p-4 flex items-start justify-between bg-[#B200FF]">
                                <div className="flex gap-4">
                                    <div className="py-2">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwiVqpNd0zv349lznWpZI0-KKoEyp-sFiA_g&s"
                                            alt={item.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2
                                            style={FONTS.card_headers}
                                            className="text-lg font-bold">{item.title || "no data available"}</h2>
                                        <p
                                            style={FONTS.chart_legend}
                                            className="text-sm"
                                        >
                                            {item.full_name || "no data available"} •
                                            {typeof item.unitId === "string"
                                                ? item.unitId
                                                : item.unitId?.unit_name || "no unit"}
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <p className="px-4 text-gray-600 text-sm py-3"
                                style={FONTS.card_subDescripription}>{item.description || "no data available"}</p>

                            {/* Details */}
                            <div className="p-4 space-y-2">
                                <p className="text-sm flex justify-between">
                                    <span className="text-gray-500">Category:</span>
                                    <span className="text-black">{item.category ? item.category : "no data"}</span>
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span className="text-gray-500" style={FONTS.headers_description}>Created:</span>
                                    <span className="text-black">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "no data"}
                                    </span>
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span className="text-gray-500" style={FONTS.headers_description}>Scheduled:</span>
                                    <span className="text-black">
                                        {item.scheduled ? new Date(item.scheduled).toLocaleDateString() : "no data"}


                                    </span>
                                </p>
                                <div className="bg-gray-50 rounded-lg flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Estimated Cost:</span>
                                    <span className="text-black font-bold" style={FONTS.headers_description}>
                                        {item.
                                            estmate_cost ? item.
                                            estmate_cost : "no data"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 w-[30%]">
                                <div className="w-full p-4 bg-green-500 text-white font-medium py-2 rounded-lg text-center">
                                    Completed
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 italic px-4 py-2"
                                style={FONTS.card_subDescripription}>Note: {item.description || "no data available"}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border flex flex-col items-center justify-center p-8 col-span-full">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnA_as1eyesoBzfyUV8tUbry5AdH0d8mabBA&s"
                            alt="No Data"
                            className="w-20 h-20 mb-4"
                        />
                        <h2 className="text-lg font-bold text-gray-700">No Data Found</h2>
                        <p className="text-gray-500 text-sm">Try adjusting your filters or add new records.</p>
                    </div>
                )}
            </div>



            {Openrequest && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <form
                        onSubmit={handleCreate}
                        className="bg-white shadow rounded-lg p-4 w-full max-w-lg"
                    >

                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800" style={FONTS.headers}>
                                Maintenance details
                            </h3>
                            <button
                                type="button"
                                onClick={() => setOpenrequest(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
                            >
                                ✕
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2" style={FONTS.Table_Header}>
                            Personal Information
                        </h3>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <Input
                                name="title"
                                type="text"
                                value={formData.title}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your need"
                                onChange={handleInputChange}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <Input
                                name="description"
                                type="text"
                                value={formData.description}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your need"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <Input
                                    name="full_name"
                                    type="text"
                                    value={formData.full_name}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Tpye</label>
                                <select className={cn(
                                    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]',
                                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',

                                )}>
                                    <option value="" >Select property type</option>
                                    <option value="villa">Villa</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="business">Business</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                                <select
                                    name="propertyId"
                                    value={formData.propertyId}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" >Select property</option>
                                    <option value="villa">Villa</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="business">Business</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                <select
                                    name="unitId"
                                    value={formData.unitId}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Unit</option>
                                    {maintenanceList.map((item: any) => (
                                        <option key={item.id} value={item.unitId}>
                                            {item.unitId.unit_name}
                                        </option>
                                    ))}
                                </select>


                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <Input
                                    name="category"
                                    type="text"
                                    value={formData.category}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Category"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                                <Input
                                    name="createdAt"
                                    type="text"
                                    // value={formData.createdAt}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Created Date"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                                <Input
                                    name="scheduled"
                                    type="text"
                                    value={formData.scheduled}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Scheduled date"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost</label>
                                <Input
                                    name="estmate_cost"
                                    type="text"
                                    value={formData.estmate_cost}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Estimated Cost"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                type="submit"
                                className="bg-[#B200FF] text-white px-4 py-2 rounded-lg"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>

            )}
        </div>
    );
};

export default Maintenance;
