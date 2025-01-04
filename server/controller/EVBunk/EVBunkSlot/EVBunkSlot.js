import EVBunkSlot from "../../../modal/eVBunkSlot/evBunkSlot.js";
import User from "../../../modal/user.js";

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
