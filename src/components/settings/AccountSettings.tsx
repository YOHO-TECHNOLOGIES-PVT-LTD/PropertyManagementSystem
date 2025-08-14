import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { BsCloudUpload } from "react-icons/bs";
import profilePlaceholder from "../../assets/profileicon.png";
import { FONTS } from "../../constants/ui constants";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk } from "../../features/settings/reducers/thunks";
import { selectProfile } from "../../features/settings/reducers/selectors";

export default function AccountSettings() {
  const dispatch = useDispatch<any>();
  const profileData = useSelector(selectProfile);
 console.log("profile", profileData)
  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    if (profileData?.data?.image) {
      setProfileImage(profileData?.image);
    }
  }, [profileData]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid image file (JPG or PNG).");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <h2 className="flex items-center gap-2 font-semibold text-[24px] mb-4">
        <CgProfile size={22} className="text-blue-600" /> Profile Information
      </h2>
      <div className="border-[0.5px] mb-5 text-[#EBEFF3]"></div>

      {/* Profile Picture Upload */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileImage || profilePlaceholder}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <p className="text-[16px] text-[#716F6F] font-semibold">
            JPG, PNG, up to 5 MB
          </p>
          <div
            className="flex items-center gap-3 bg-[#13A5A5] px-4 py-2 rounded-md text-white cursor-pointer mt-2"
            onClick={handleUploadClick}
          >
            <BsCloudUpload size={18} />
            <span>Upload Photo</span>
          </div>
          <Input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Account Form */}
      <form className="grid grid-cols-2 gap-4 text-[#7D7D7D]">
        <div>
          <label className="block text-[18px] font-medium mb-1">
            Full Name
          </label>
          <Input
            type="text"
            defaultValue={
              `${profileData?.first_name || ""} ${profileData?.last_name || ""}`.trim()
            }
          />
        </div>
        <div>
          <label className="block text-[18px] font-medium mb-1">Role</label>
          <Input type="text" defaultValue={profileData?.role || ""} />
        </div>
        <div>
          <label className="block text-[18px] font-medium mb-1">
            Email Address
          </label>
          <Input type="email" defaultValue={profileData?.email || ""} />
        </div>
        <div>
          <label className="block text-[18px] font-medium mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            defaultValue={profileData?.phone_number || ""}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[18px] font-medium mb-1">Address</label>
          <Input type="text" defaultValue={profileData?.address || ""} />
        </div>
      </form>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button
          className="bg-[#B200FF] text-white px-6 py-2 rounded-md hover:opacity-90"
          style={FONTS.button_Text}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}