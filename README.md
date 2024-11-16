# Mills & PKS Management - Frontend

## Overview

This application allows users to interact with a map to visualize mills and Palm Kernel Shell (PKS) dumpsites, view detailed information about mills, and add new dumpsites.

### **System Architecture**

1. **Frontend**:
   - Developed with React and TypeScript.
   - Integrates with the backend using Axios for data retrieval and updates.
   - Uses **React-Leaflet** to render the map and display markers.
   - Form handling is implemented using **React Hook Form** for validation and submission.

2. **Backend**:
   - A Node.js and Express REST API provides data and manages dumpsite markers.


3. **Database**:
   - MongoDB stores dumpsite data, and initial mill data is seeded from a JSON file.

---

## Setup Instructions

### **Prerequisites**

- **Node.js**: Ensure Node.js is installed on your machine.
- **Backend**: The backend service must be set up and running to serve data and accept updates. Refer to the backend README for setup instructions.
- **Environment Variables**:
  - Create a `.env` file in the root directory with the following:
    ```
    VITE_APP_API_URL=http://localhost:5000/api
    ```

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Eshy10/mills-frontend  
   cd mills-frontend

2. Install dependencies:
   ```bash
   npm install

3. Run the development server:
   ```bash
   npm start

## Assumptions 

1. **Data Validation**:
   - Latitude and longitude must follow geographic coordinate limits: ~ Latitude: -90 to 90,  Longitude: -180 to 180
   - Capacity must be a positive number.
   -  Status must be either active or inactive.  

2. **Marker Data**:
   - Default Position is set to Uyo (the latitude and longitude)
   - Blue  pin-like icons represent active dumpsite ang grey pin-icons represent inactive dumsites.
   - Blue map icon represent mill markers

## Tech Stacks 
   - React with Vite
  -  React leaflet
  - React Hook Form
  - Typescript
  - Tailwind