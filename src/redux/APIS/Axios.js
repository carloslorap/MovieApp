import axios from 'axios';

const Axios =axios.create({
    baseURL:"https://movieserver-km41.onrender.com/api"
})

export default Axios