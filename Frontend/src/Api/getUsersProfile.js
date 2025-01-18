export default async function getUserProfile  () {
  // await axios.get('http://localhost:4000/api/v1/users/profile')
  // .then((res)=>{
  //  const response = res.data
  //   console.log(res.data);
  //   if (response.code === 420) {
  //     setLoginButton(!loginButton)
  //   }else{
  //     setLoginButton(loginButton)
  //   }
  //   console.log(loginButton);
    
  // })
  const token = cookies.get('accessToken')
  console.log("token:",!token);
  
  if (!token) {
    setLoginButton(!loginButton)
  } else {
    setLoginButton(loginButton)
  }
  console.log(loginButton);
}