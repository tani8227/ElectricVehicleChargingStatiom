import mongoose from "mongoose";
import User from "../user.js";
import EVBunk from "../evBunkLocation/evBunkLocation.js";

const EVBunkSlotSchema = new mongoose.Schema(
    {
        evbunkname:
        {
            type: String,
            required: true,
        },
        admin_ref:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        evbunk_ref:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EVBunk'
        },
        availableSlots: 
        [{
                time: { type: String, required: true },
                vacancy: { type: Number, required: true },
        }],
        defaultSlots: [
            {
                time: { type: String, required: true },
                vacancy: { type: Number, required: true },
            },
        ],
        lastReset: {
            type: Date,
            default: new Date(),
        },


    })




const EVBunkSlot = mongoose.model('EVBunkSlot', EVBunkSlotSchema);
export default EVBunkSlot;