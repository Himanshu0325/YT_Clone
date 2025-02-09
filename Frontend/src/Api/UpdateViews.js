import axios from "axios";

const updateViews = async (vid) => {
    await axios({
      method: 'post',
      url: 'http://localhost:4000/api/v1/video/update-views',
      data:{vid}
    })
      
  }

export default updateViews