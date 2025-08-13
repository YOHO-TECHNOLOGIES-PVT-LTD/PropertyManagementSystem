import { FONTS } from "../../constants/ui constants"
import { TbLockPassword } from "react-icons/tb";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function SecuritySettings() {
     const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="">
      
      {/* Change Password */}
      <div className="mb-8">
        <h2 className="text-[24px] font-semibold mb-4 flex items-center gap-2">
         <TbLockPassword size={22} className="text-blue-600"/> Change Password
        </h2>
         <div className="border-[0.5px] mb-5 text-[#EBEFF3]"></div>
        <div className="space-y-4">
              <div>
      <label className="block text-[18px] font-medium text-[#7D7D7D] mb-1">
        Current Password
      </label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className="w-full border rounded px-3 py-2 pr-10" // pr-10 gives space for icon
          placeholder="Enter current password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </button>
      </div>
    </div>

          <div>
            <label className="block text-[18px] text-[#7D7D7D] font-medium mb-1">
              New Password
            </label>
            <Input
              type="password"
              className="w-full border rounded px-3 py-2 text-[14px]"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-[18px] text-[#7D7D7D] font-medium mb-1">
              Confirm New Password
            </label>
            <Input
              type="password"
              className="w-full border rounded px-3 py-2 text-[14px]"
              placeholder="Confirm new password"
            />
          </div>
        </div>
       <div className="flex justify-end">
         <Button className="mt-4 bg-[#B200FF] text-white px-6 py-2 rounded-md hover:opacity-90"style={FONTS.button_Text}>
          Update Password
        </Button>
       </div>
      </div>

      

      
    </div>
  );
}
