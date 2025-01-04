import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 



async function getcordinates(address) {
    const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API}&query=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.data.length > 0) {
            const { latitude, longitude } = response.data.data[0];
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            return [longitude, latitude]; // return coordinates
        } else {
            console.log('No results found for this address');
            return []; 
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message || error);
        return []; 
    }
}

export default getcordinates;





