One-line summary

Every day, countless meals go uneaten while millions sleep hungry. Through our platform, restaurants share their surplus food, volunteers deliver it with compassion, and NGOs transform it into nourishment for those who need it most — creating a beautiful chain of giving that turns waste into hope.



About

This project is a full-stack platform to reduce food waste and feed those in need. Restaurants can post surplus food, volunteers can pick up and deliver, and partner NGOs can claim donations. The platform focuses on minimizing food waste, shortening the time between donation and delivery, and providing transparency for donors and receivers.

Features

Restaurant / Donor onboarding and authentication

Create and manage donation posts (amount, expiry, pick-up time, location)

Volunteer registration & delivery assignment (accept/decline deliveries)

NGO dashboard to accept/track donations and beneficiaries

Real-time status updates for each donation (Available → Reserved → Picked up → Delivered)

Location-based matching (nearby volunteers / NGOs)

Simple analytics: meals saved, donors registered, active volunteers

Tech stack


Frontend

React ( Vite)

React Router, Context for state

Tailwind CSS for styling

Backend

Node.js + Express 

RESTful API

Database

MySQL

Other

JWT for authentication

Getting Started (Local Setup)

The commands below assume a monorepo with /frontend and /server (backend). Adapt to your structure.

Prerequisites

Node.js (16+) and npm / yarn

MySQL (local)


Run locally (development)

Clone the repo

git clone git@github.com:Sarowar07/food_donation.git
cd food_donation


Backend

cd server
npm install
npm start           


Frontend

cd ../frontend
npm install
npm run dev           


Open browser:

Frontend: http://localhost:5173 (or port defined by Vite/CRA)

Backend API: http://localhost:8000/api (or the PORT in .env)
