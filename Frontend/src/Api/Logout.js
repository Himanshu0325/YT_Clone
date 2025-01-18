import {Cookies , useCookies} from "react-cookie"

export default function logoutUser(removeCookie) {
  // const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  removeCookie('accessToken')
  removeCookie('refreshToken')
  window.location.href = "/"
}