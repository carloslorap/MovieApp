import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageService = async(file, setloading)=>{
    try {
        setloading(true)
        const {data } = await Axios.post("/upload",file);
        setloading(false);
        toast.success("File uploaded successfully");
        return data;
    } catch (error) {
        setloading(false);
        toast.error("Something went wrong")
    }
        
}

export{uploadImageService}