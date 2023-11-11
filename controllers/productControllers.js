import axios from 'axios';
export const fetchMobileProducts = async(req, res) => {
    try {
        const res = await axios.get("https://www.flipkart.com/search?q=mobile");
        const data = JSON.stringify(res.data)
        console.log(data);
        res.send({success:true, data})
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}