import { useEffect, useState } from "react";
import { editProfile, getProfile } from "../services/endpoints/users";
import { Input, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const ProfileDetails = ({isEdit, confirmEdit}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>  {
    const handleEditProfile = async() => {
      try{
        await editProfile(userInfo);
        navigate("/profile");
      }catch(error){
        console.error(error);
      }
    }
    if(confirmEdit){
      handleEditProfile();
    }
  },[confirmEdit])
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUserInfo((prev) => ({ ...prev, username: response.profile.username }));
        setUserInfo((prev) => ({ ...prev, email: response.profile.email }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
    setIsLoading(false);
  }, []);
  const handleInputChange = (key, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: value,
    }));
  };
  if (isLoading)
    return (
      <div className="w-full flex flex-col mt-20 items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="w-full flex flex-col mt-7 gap-5">
      {Object.entries(userInfo).map(([key, value],index) => (
        isEdit ? 
        (
         <Input variant="static" className="py-5 font-semibold" placeholder={value} 
         onChange={(e)=> handleInputChange(key, e.target.value)
        } />
        )
        :
        <div className="relative   w-full bg-blue-gray-50 h-14 rounded-lg items-center p-5" key={index}>
          <div>
            <span className="font-bold"> {key} : </span>
            <span>{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
