import SideNavbar from "./sideNavbar";
import UserOptions from "./userOptions.jsx";

export default function Hero (props){

  const isUserOpen = props.isUserOpen
  
  

  return(
    <>
    <div className={`w-full h-full bg-[#e98c2f] grid grid-cols-4 grid-rows-2 `} >
      <h1 className="text-white">Hero</h1>
    </div>
    </>
  )
}