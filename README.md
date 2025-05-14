# 🎬 Movie Booking System

## 📖 Overview

This is a full-stack movie seat booking system created for the **Zentosys Assignment**.  
The system allows users to register, login, and book seats for available movies. An admin panel provides functionality to manage movies and unbook seats for specific users.

---

## 🧰 Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT) for authentication

---

## 🔄 Flow of the Application

1. **User Registration**
   - A new user registers using their credentials.

2. **User Login**
   - On successful login, a JWT token is stored in local storage.
   - This token is sent in headers for protected backend routes.

3. **Seat Booking**
   - The user can view a list of movies.
   - Upon selecting a movie, the seating layout is displayed.
   - Users can select available seats and confirm booking.

4. **Booking Display**
   - Booked seats are shown with the respective usernames.
   - Users can see which seats are booked and by whom.

---

## 🛠️ Admin Panel

- Admin can **add a new movie** to the system.
- Admin can **delete seats** booked by specific users for a movie (unbooking functionality).

# Screenshots

![Screenshot 2025-05-14 221210](https://github.com/user-attachments/assets/ab09a1dc-224e-4cf7-a215-c9916650ec13)
#
![Screenshot 2025-05-14 221223](https://github.com/user-attachments/assets/71f75797-2c92-4ed8-9898-61e6399a1f5b)
#
![Screenshot 2025-05-14 221245](https://github.com/user-attachments/assets/c2fca45b-eeef-4a6b-bdee-732dfae3ce95)
#
![Screenshot 2025-05-14 221300](https://github.com/user-attachments/assets/033573d3-94ea-4db0-839b-1f7878167374)
#
### Admin Panel
![Screenshot 2025-05-14 221330](https://github.com/user-attachments/assets/8a60349b-5dc7-4964-bc6e-89ddafb44e95)
#
![Screenshot 2025-05-14 221347](https://github.com/user-attachments/assets/2e487db6-1c3f-40cd-8b69-50963f952b79)
#
![Screenshot 2025-05-14 221407](https://github.com/user-attachments/assets/84dff024-577f-44a0-8f0e-25d39bfae7fe)
#
### Delete Particular Booking
![Screenshot 2025-05-14 221420](https://github.com/user-attachments/assets/de738018-c899-4349-afa7-6e0b98657133)








