import EVBunk from "../../modal/evBunkLocation/evBunkLocation.js";
import getcordinates from "../../config/google-geocoding-api.js";

export const createEVBunk = async (req, res) => {

    const { address } = req.body;

    try {
        // Geocode the address
        const geoCode = await getcordinates(address);
        console.log('geoCode:', geoCode); // Check geocode

        if (geoCode && Array.isArray(geoCode) && geoCode.length > 0) {
            console.log('Valid coordinates:', geoCode);
            req.body.location = {
                type: "Point",          // GeoJSON type
                coordinates: geoCode    // Coordinates as [longitude, latitude]
            };

            // Log the request body before creating the EVBunk
            console.log('Request body before creating EVBunk:', req.body);

            // Create the new EV Bunk
            const newEVbunk = await EVBunk.create(req.body);

            if (newEVbunk) {
                return res.status(200).json({
                    message: 'EV Bunk created !!!',
                    data: req.body.coordinates
                });
            } else {
                return res.status(400).json({
                    message: 'EV Bunk Not created !!!',
                    data: req.body.coordinates
                });
            }
        } else {
            console.log('Invalid geocode:', geoCode);
            return res.status(400).json({ message: 'Invalid address or geocoding failed.' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
};

export const getBunkList = async (req, res) => {

    try {
        const bunkList = await EVBunk.find({});

        if (bunkList) {

            return res.status(200).json({
                message: 'got the Bunk List !!!',
                data: bunkList,
            });
        } else {
            return res.status(400).json({
                message: 'EV Bunk Not Found!!!',
                data: bunkList,
            });

        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
};

export const deleteEVBunk = async (req, res) => {

    try {
        const { id } = req.params;
       
        
        const admin = await EVBunk.findOne({admin_ref: req.user._id });
        if (admin) {
            
            console.log(id)
            const deleteEV = await EVBunk.findByIdAndDelete(id);
            if (deleteEV) {
                console.log("eleteEV");
                const list= await EVBunk.find({});
                if(list)
                    {

                        return res.status(200).json({
                            message: 'got the Bunk List !!!',
                            data: list,
                        });
                    }else
                    {
                        return res.status(201).json({
                            message: 'Not got the Bunk List !!!',
                            data: list,
                        });  
                    }
            }

        } else {
            return res.status(401).json({
                message: 'EV Bunk Not Found!!!',
                
            });
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
};


export const getEVBunk = async (req, res) => {

    try {
        const { id } = req.params;
       
            const Bunk = await EVBunk.findById(id);
            if (Bunk) {
                console.log("eleteEV");
               

                        return res.status(200).json({
                            message: 'got the Bunk List !!!',
                            data: Bunk,
                        });
                   
            }else
            {
                return res.status(401).json({
                    message: 'got the Bunk List !!!',
                    
                }); 
            }

       
        

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
};




export const getNearByBunkList = async (req, res) => {
    try {
        console.log(req.query);

        const { lat, lng } = req.query;

        // Ensure lat and lng are parsed as floats
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: 'Invalid coordinates provided.' });
        }

        // Query for nearby EV Bunks
        const evbunk = await EVBunk.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude], // [lng, lat] for GeoJSON format
                    },
                    $maxDistance: 1000000000000000, // 5000 meters = 5 kilometers
                },
            },
        });

        console.log(evbunk);

        // Return the EV Bunk data to the client
        return res.status(200).json({
            message: 'Nearby EV Bunks fetched successfully!',
            data: evbunk,
        });
    } catch (error) {
        console.error('Error fetching nearby EV Bunks:', error);
        return res.status(500).json({ message: 'Something went wrong while fetching nearby EV Bunks.' });
    }
};




