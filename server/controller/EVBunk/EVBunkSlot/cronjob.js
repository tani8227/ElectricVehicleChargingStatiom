import cron from 'node-cron';
import { resetVacancies } from './Resetvacancy.js';  // Path to your resetVacancies function

// Schedule the reset task to run at midnight every day
export default  cron.schedule('0 0 * * *', async () => {
  console.log('Running daily reset for EVBunk slots...');
  await resetVacancies();
});



