import React ,{useEffect , useState} from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const searchQuery= query.get('q');
  const whatToSearch = query.get('whatToSearch');
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (whatToSearch === '0') {
          response = await axios.post('http://localhost:4000/api/v1/users/search-channel', { searchQuery });
          
          
        } else if (whatToSearch === '1') {
          response = await axios.post('http://localhost:4000/api/v1/videos/search-video', { searchQuery });
        }
        setData([response.data.user]);
        console.log(response.data.user);
        
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchQuery, whatToSearch]);

  
  return (
    <div className=' w-full h-full bg-[#f5f5f5] overflow-scroll'>
      <div className="flex flex-col gap-4 pt-8  pl-4  ">
      {
        Data.map((data) => {
          return (
            <div className="border-2 border-black h-[15rem] rounded-3xl flex flex-row items-center justify-between p-4">
              <div key={data._id} className='flex flex-row gap-4 h-full w-[20%]'>
              <img src={data.avatar?data.avatar:""} alt="channel" className='w-full h-full rounded-full'/>
            </div>

            <div key={data.id} className="h-full w-[70%] flex flex-col gap-2 justify-center pl-6">
              <h1 className='text-3xl font-serif font-bold'>{data.channelName}</h1>
              <h3 className='text-xl font-serif font-bold text-gray-700'>{data.username}</h3>
              {/* <p>{data.channelDescription}</p> */}
            </div>
            <div className="">
              <button className='bg-[#f5f5f5] border border-black rounded-lg py-3 px-8 font-bold font-serif text-xl hover:bg-[#b2b2b2]'>Subscribe</button>
            </div>
            </div>
        );
      }
      )}
      </div>
    </div>
  );
};

export default SearchPage;