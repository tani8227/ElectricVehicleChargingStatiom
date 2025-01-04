import axios from 'axios';

export default async function getAddressFromCoordinates(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.address) {
            const address = response.data.display_name;
            console.log("Address:", address);
            return address;
        } else {
            return 'No address found';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Error fetching address';
    }
}



