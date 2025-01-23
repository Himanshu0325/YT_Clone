import axios from "axios";
import { Cookies } from "react-cookie";
import togglesetLoginButton from "../App.jsx";

const getUserProfileData = async (e) => {
  // e.preventDefault();

  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:4000/api/v1/users/profile',
      data: {
        accessToken: accessToken,
      },
    });
    const res = response.data
    const {username, fullname , avatar } = res
    console.log(res,username,fullname);
    console.log("getuserdata per hu");
    
    return {username , fullname , avatar};
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    throw error;
  }
}
export default getUserProfileData