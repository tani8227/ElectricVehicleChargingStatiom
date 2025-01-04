import EVBunkSlot from "../../../modal/eVBunkSlot/evBunkSlot.js";
import User from "../../../modal/user.js";
import mongoose from "mongoose";

export const createEVBunkSlot = async (req, res) => {
  try {
    // Extract availableSlots from the request body
    const { availableSlots = [] } = req.body;

    // If availableSlots are provided, use them as the default for this EVBunk.
    // Otherwise, defaultVacancy remains empty, and we just store the availableSlots.
    const defaultVacancy = availableSlots.map((slot) => ({
      time: slot.time,
      vacancy: slot.vacancy, // Setting the vacancy from the availableSlots provided
    }));

    // Create the new EVBunk with availableSlots and defaultSlots
    const newEVBunk = await EVBunkSlot.create({
      ...req.body,
      defaultSlots: defaultVacancy,  // Set the defaultSlots to availableSlots
      availableSlots: availableSlots,  // Use provided availableSlots initially
    });
    console.log(newEVBunk)
    return res.status(200).json({
      message: "EV Bunk created successfully!",
      data: newEVBunk,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};



export const getEVBunkSlot = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("jjjjj", id)
    const evbunkslot = await EVBunkSlot.findOne({ evbunk_ref: id });
    if (evbunkslot) {
      return res.status(200).json(
        {
          data: evbunkslot,
          message: "got the evbunkslot"
        })
    } else {
      return res.status(201).json(
        {
          data: [],
          message: "not found the evbunkslot"
        })
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
}


export const bookEVBunkSlot = async (req, res) => {
  try {

    const { evbunkId, slotId } = req.body;
    console.log(evbunkId, slotId);
    const evbunk = await EVBunkSlot.findByIdAndUpdate(
      evbunkId,
      {
        $inc: {
          "availableSlots.$[slot].vacancy": -1, // Decrement the vacancy of the matched slot
        },
      },
      {
        new: true, // Return the updated document
        arrayFilters: [{ "slot._id": slotId }], // Match the slot with the given slotId
      }
    );



    if (evbunk) {
      const user = await User.findById(req.user);

      if (user) {
              
        user.slotbook.push(slotId);
        
        await user.save();

        return res.status(200).json(
          {
            data: evbunk,
            message: "slot booked !!!"
          })
      }

    } else {

      return res.status(201).json(
        {
          data: evbunk,
          message: "slot not booked !!!"
        })
    }


  } catch (error) {

    return res.status(500).json(
      {
        error: error,
        message: "error in booking slot !!!"
      })

  }
}


// Backend Controller (already provided by you)
export const getEVBunkWithSlot = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid ObjectId:", id);
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    // Find the EVBunkSlot based on the reference id
    const bunkwithslot = await EVBunkSlot.findOne({
      evbunk_ref: new mongoose.Types.ObjectId(id),
    }).populate('evbunk_ref'); // Populate if you want related data from EVBunk

    if (!bunkwithslot) {
      console.log("No slot found for the given EV Bunk ID.");
      return res.status(404).json({ error: "No slot found." });
    }

    console.log("Bunk with Slot Found:", bunkwithslot);

    return res.status(200).json({
      message: "Got the EV Bunk with Slot",
      data: bunkwithslot,
    });

  } catch (error) {
    console.error("Error fetching slot:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
