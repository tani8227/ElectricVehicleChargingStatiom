import EVBunkSlot from "../../../modal/eVBunkSlot/evBunkSlot.js";

// Function to reset vacancies to default values
export const resetVacancies = async () => {
  try {
    // Reset vacancies to the corresponding defaultSlots if they exist
    const result = await EVBunkSlot.updateMany(
      // { lastReset: { $lt: new Date().setHours(0, 0, 0, 0) } }, // Find records that haven't been reset today
      {},
      [
        { $set: { availableSlots: '$defaultSlots', lastReset: new Date() } }  // Use aggregation pipeline to set availableSlots to defaultSlots
      ]
    );

    console.log('Vacancies reset successfully!', result);
  } catch (error) {
    console.error('Error resetting vacancies:', error);
  }
};