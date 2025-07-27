# 🌍 Wanderlust – Full Stack Travel Listing Platform deployed on Render.

Wanderlust is a full-fledged MERN stack web application that lets users explore, create, and review travel listings, featuring secure authentication, dynamic routing, cloud image handling, and interactive location maps via Microsoft Azure.

## Features

- 🔐 **Authentication & Authorization**
  - Sign Up, Login, Logout
  - Only authenticated users can create listings and reviews
  - Users can delete only their own listings/reviews

- 🧭 **Listing Functionality**
  - View all listings on the homepage
  - Click any listing to view its detailed page with images, description, location, and reviews
  - Add and delete your own reviews or listings

- 🗺️ **Interactive Location Mapping**
  - Uses **Microsoft Azure API** to display precise geolocation of each listing on a map

- ☁️ **Image Upload & Management**
  - Upload listing images via a form
  - Images are processed using **Cloudinary** in the backend
  - Only the image URLs are saved in the MongoDB database

- 🔍 **Search Functionality**
  - Search bar in navbar to find listings by title

- 🧱 **Architecture & Design**
  - Built using **MVC architecture**
  - Clean routing structure with protected routes and middleware
  - Robust error handling with `wrapAsync`, `Joi`, and custom Express error handlers

- 💻 **Technologies Used**
  - **MongoDB + Mongoose**
  - **Express.js**
  - **Node.js**
  - **Cloudinary**
  - **Microsoft Azure Maps API**
  - **Joi** for input validation
  - **Bootstrap** 


## Deployed URL: 
# Wanderlust
**Live Site 👉** [Visit Here](https://wanderlust-hcp4.onrender.com)



