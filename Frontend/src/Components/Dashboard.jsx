import React , {useState} from "react"
import getUserProfileData from "../Api/getUsersProfile"

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  )
}


const Dashboard = () => {

    const [fullName , setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [Avatar , setAvatar]= useState('')
    const [coverImg , setCoverImg] = useState('')
  
    const data = async(e) =>{
      const profileData = await getUserProfileData();
    
      const {fullname , username , avatar , coverImage} = profileData
      setFullName(fullname)
      setUserName(username)
      setAvatar(avatar)
      setCoverImg(coverImage)
    }
    data()

  return (<main className="p-6 ">

    <div className="bg-white p-4 rounded-lg shadow flex flex-col  h-[27rem] mb-16 ">
      <div className="border-2 h-[17rem] w-full  rounded-3xl">
        <img className="h-full w-full rounded-3xl" src={coverImg} alt="" />
      </div>

      <div className="flex flex-shrink-0 h-[8rem] items-center ">
        <div className="flex-shrink-0 h-full ">
          <img
            className="h-full w-32 rounded-full"
            src={Avatar ? Avatar : 'https://res.cloudinary.com/dataghar/image/upload/v1737839048/icons8-account-50_l8bpfi.png'}
            alt={` logo`}
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">{fullName}</h1>
          <h3 className="text-md font-semibold">{userName}</h3>
          <p className="text-gray-500"> 100M subscribers . 10 videos</p>
          <p className="text-gray-700 mt-2"></p>
        </div>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Views" value="1.2M" />
      <StatCard title="Watch Time" value="45K hours" />
      <StatCard title="Subscribers" value="100K" />
      <StatCard title="Revenue" value="$5,230" />
    </div>

    <h2 className="text-xl font-semibold mt-8 mb-4">Recent Videos</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* <VideoCard title="How to Build a React App" views="15K" date="2 days ago" />
    <VideoCard title="JavaScript Tips and Tricks" views="22K" date="1 week ago" />
    <VideoCard title="CSS Flexbox Tutorial" views="18K" date="2 weeks ago" /> */}
    </div>


  </main>)
}

export default Dashboard