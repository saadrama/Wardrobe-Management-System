# WARDROBE MANAGEMENT SYSTEM

A wardrobe management system built with Vue 3 for the frontend and Laravel 11 for the backend. This system allows users to manage their clothing items, categorize them, filter them, and access a responsive UI for a seamless experience.

# FEATURES

User authentication (Login & Registration)

Clothing item management (Add, Edit, Delete)

Categorization & Filtering

Responsive UI

API built with Laravel 11

#  TECH STACK

Frontend: Vue 3, Vite, Pinia (State Management)

Backend: Laravel 11, Sanctum (Authentication)

Database: MySQL

Prerequisites

#    Ensure you have the following installed before proceeding:

Node.js & npm

PHP

Composer

MySQL

Git

#     INSTALLATION AND SETUP

1. Clone the Repository

git clone https://github.com/saadrama/wardrobe-management.git
cd wardrobe-management

2. Backend Setup (Laravel 11)

cd backend
composer install
cp .env.example .env
php artisan key:generate

Configure the .env file

Update your .env file with database credentials:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=wardrobe_db
DB_USERNAME=root
DB_PASSWORD=yourpassword

Run Migrations & Seed Database

php artisan migrate --seed

Serve the Backend API

php artisan serve

3. Frontend Setup (Vue 3)

cd ../frontend
npm install

Run the Development Server

npm run dev

This will start the Vue app at http://localhost:5173/

API Endpoints

Method

Endpoint

Description

POST

/api/register

#   USER REGESTRATION

# POST

/api/login

#  USER LOGIN

#  GET

/api/user

Fetch Authenticated User

#   POST

/api/logout

Logout User

#   GET

/api/clothes

Get Clothing Items

#  POST

/api/clothes

Add Clothing Item

#  PUT

/api/clothes/{id}

Update Clothing Item

# DELETE

/api/clothes/{id}

Delete Clothing Item

#  DEPLOYMENT 

To deploy the Laravel backend, use services like Heroku, Laravel Forge, or DigitalOcean.
For the Vue frontend, deploy using Vercel or Netlify.

## CONTRIBUTING

Feel free to fork the repository and submit a pull request.

#  LICENSE

This project is open-source and available under the MIT License.