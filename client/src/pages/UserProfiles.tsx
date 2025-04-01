import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import { useEffect, useState } from "react";
import axios from "axios";
// import UserAddressCard from "../components/UserProfile/UserAddressCard";
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  // Add other properties returned from your API if needed.
}
export default function UserProfiles() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      
      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Prefix the token with 'Bearer '
        },
      });
      // console.log(response.data); // User details
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    useEffect(() => {
      fetchUser();
    }, [])
   


  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={userData}/>
          <UserInfoCard user={userData}/>
          {/* <UserAddressCard /> */}
        </div>
      </div>
    </>
  );
}
