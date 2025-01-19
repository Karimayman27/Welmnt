# Welmnt
# Payload CMS Backend & React Frontend

## Overview

This project is a comprehensive web application featuring a backend powered by Payload CMS and a frontend built with React. Key features include:

- **TailwindCSS Integration**: Ensuring a responsive and mobile-friendly design.
- **Authentication**: Admin panel secured with authentication to manage content.
- **Dynamic Frontend**: Sleek UI with interactive cards displaying post and author details.
- **CORS Configuration**: Backend configured to allow only requests from port 3001 for enhanced security.
- **Secure and Fast API**: Ensuring optimal performance and secure data handling.

---

## Key Features

### Backend Features

- **Powered by Payload CMS**:
  - Manage CRUD operations for collections such as `Posts`, `Authors`, `Media`, and `Users`.
  - Admin interface available at `http://localhost:3000/admin`.
- **Secure Authentication**:
  - Use preconfigured admin credentials or create your own admin account.
- **Database**: Integrated with MongoDB for robust data handling.

### Frontend Features

- **Responsive Design**:
  - TailwindCSS ensures the app looks great on all devices.
- **Dynamic Cards**:
  - Interactive UI elements displaying post and author information.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Steps to Run the Project

#### Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   cd internship
   ```
2. Create an `.env` file in the `internship` folder with the following content:
   ```env
   # Added by Payload
   DATABASE_URI=mongodb+srv://karimayman050:KQypWF99sONa5REP@cluster0.i0wp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PAYLOAD_SECRET=b5c63cae6486d7a87fef7aaa
   PORT=3000
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```
   Access the backend admin panel at `http://localhost:3000/admin`.

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create an `.env` file with the following content:
   ```env
   PORT=3001
   ```
3. Ensure the `package.json` file contains the following start script:
   ```json
   "start": "set PORT=3001 && react-scripts start"
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the frontend:
   ```bash
   npm start
   ```

---

## Admin Credentials

Use the following credentials to access the admin panel, or create your own admin account:

- **Email**: [karimayman050@gmail.com](mailto:karimayman050@gmail.com)
- **Password**: Kiko2772003

---

## Collections

The following collections can be managed via the admin panel:

- **Posts**: Create, read, update, and delete blog posts.
- **Authors**: Manage author profiles.
- **Media**: Upload and manage media files.
- **Users**: Administer user accounts.

---

## Frontend Features

- **Dynamic Cards**:
  - Clickable cards displaying post details with author descriptions.
  - Provides an intuitive and interactive user experience.

---

## URLs

- **Frontend**: `http://localhost:3001`
- **Backend Admin Panel**: `http://localhost:3000/admin`

---

## Notes

- Ensure MongoDB is properly configured and accessible via the provided connection string.
- The backend and frontend must be run concurrently to ensure seamless integration.

---

Enjoy building with Payload CMS and React!

