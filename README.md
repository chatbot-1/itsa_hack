# Patient-Doctor Appointment Application

This is a Patient-Doctor Appointment application that allows patients to book appointments with doctors easily. The app features user authentication, appointment scheduling, and an intuitive user interface.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication for patients and doctors
- Appointment booking and management
- Calendar view for selecting available days
- Responsive design using Tailwind CSS
- Email notifications using SendGrid

## Technologies Used
### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: A superset of JavaScript that adds static typing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Firebase**: Backend-as-a-Service for user authentication

### Backend
- **Node.js**: JavaScript runtime for server-side programming
- **Express**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing user and appointment data
- **SendGrid**: Email delivery service for sending notifications

## Getting Started
To get a local copy of this project up and running, follow these steps:

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (for local setup or use MongoDB Atlas)

### Frontend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/patient-doctor-appointment-app.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd patient-doctor-appointment-app/frontend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the frontend directory and add your Firebase configuration:
    ```plaintext
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```
5. Start the development server:
    ```bash
    npm start
    ```

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd patient-doctor-appointment-app/backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the backend directory and add your MongoDB and SendGrid configuration:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    SENDGRID_API_KEY=your_sendgrid_api_key
    ```
4. Start the server:
    ```bash
    npm run start
    ```

## API Endpoints
Here are some of the key API endpoints used in the application:
- **GET /api/doctors/doctor-profile/:id**: Fetch doctor profile details
- **GET /api/appointment/appointment/:doctorId**: Fetch available appointment times for a doctor
- **POST /api/appointment/appointment**: Book an appointment

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.
1. Fork the repository
2. Create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some amazing feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
