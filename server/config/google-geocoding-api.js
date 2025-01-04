import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 


// Replace 'YOUR_API_KEY' with the API key you got from PositionStack


async function getcordinates(address) {
    const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.PositionStack_api}&query=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.data.length > 0) {
            const { latitude, longitude } = response.data.data[0];
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            return [longitude, latitude]; // return coordinates
        } else {
            console.log('No results found for this address');
            return []; // No results found
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message || error);
        return []; // Return empty array in case of error
    }
}

export default getcordinates;





