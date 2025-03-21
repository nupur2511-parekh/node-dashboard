Node.js Dashboard with CSV Data Storage

📌 Project Overview

This is a user dashboard application built using Node.js, Express, and EJS, where users can:

Register and log in

Edit their profile information

Store and update user data directly in a CSV file

🚀 Features

User Authentication (Register, Login, Logout)

Edit Profile (Change Name, Email, Phone, City, Gender)

Dashboard UI with Bootstrap styling

CSV Data Storage (All user details are stored in a CSV file)

Responsive UI (Bootstrap-based design)

Installation & Setup

1️⃣ Clone the Repository

git clone  https://github.com/nupur2511-parekh/node-dashboard.git
cd node-dashboard

2️⃣ Install Dependencies

npm install

3️⃣ Start the Server

node server.js

Server runs on http://localhost:3000
📝 Usage

✅ Register a New User

Open http://localhost:3000/register

Enter your name, email, password, phone, city, and gender

Click Register (Data is saved in users.csv)

✅ Login

Open http://localhost:3000/login

Enter email & password to log in

Redirects to dashboard

✅ Edit Profile

Click Edit Profile on the dashboard

Update name, email, phone, city, or gender

Click Save Changes (Updates users.csv)

📚 Dependencies

Express (Web Framework)

EJS (Templating Engine)

Bootstrap (UI Styling)

fs (File System) (For CSV Handling)

CSV Parser (To Read & Write CSV Data)

📧 Need Help?

For any issues, open an issue or contact nkparekh2511@gmail.com
