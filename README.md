Overview -->
The EV Admin project is designed to streamline the management and usage of EV charging infrastructure.
It provides separate functionalities for administrators and users to ensure smooth operations and user convenience.

Features -->
Admin->
Login & Register: Secure access for administrators.
Create EV Bunk Location Details: Add new EV bunk locations to the system.
Manage Bunk Details: Update or delete bunk information.
Manage Recharge Slots: Set and modify slot availability for charging.
User->
Login & Register: Secure access for users.
Search Nearby EV Bunk: Locate EV charging stations near the user's location.
View Bunk Details: Access detailed information such as:
Address
Mobile Number
Google Map Location
View Slot Vacancy: Check the availability of charging slots.

Memory updated
Here’s a README file tailored for your "EV Admin" project:
EV Admin
Overview
The EV Admin project is designed to streamline the management and usage of EV charging infrastructure. It provides separate functionalities for administrators and users to ensure smooth operations and user convenience.

Features
Admin 
Login & Register: Secure access for administrators.
Create EV Bunk Location Details: Add new EV bunk locations to the system.
Manage Bunk Details: Update or delete bunk information.
Manage Recharge Slots: Set and modify slot availability for charging.

User
Login & Register: Secure access for users.
Search Nearby EV Bunk: Locate EV charging stations near the user's location.
View Bunk Details: Access detailed information such as:
Address
Mobile Number
Google Map Location
View Slot Vacancy: Check the availability of charging slots.

Project Evaluation Metrics-->
Scalability: Assess the system's ability to handle an increasing number of users and charging stations.
Performance: Evaluate response times for user actions like searching and booking slots.
User Experience: Measure ease of use and satisfaction for both admin and users.
Reliability: Ensure system uptime and data consistency.

Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Mapping: mapbox API, PositionStack API

Installation
Prerequisites
Node.js installed on your machine.
MongoDB running locally or in the cloud.
mapbox API key.

Install Dependencies:
For the server:

bash
Copy code
cd server  
npm install  
For the client:

bash
Copy code
cd client  
npm install

Set Up Environment Variables:
Create a .env file in the server folder with the following keys:

env
Copy code
MONGO_URI=your_mongodb_connection_string  
MAPBOX_MAPS_API_KEY=your_google_maps_api_key  
PORT=your_preferred_server_port  

Start the backend server:

bash
Copy code
npm start  
Start the frontend client:

bash
Copy code
cd client  
npm start  

