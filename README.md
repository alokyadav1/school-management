# Installation
Run the following command to clone the repository
```
git clone https://github.com/alokyadav1/school-management.git
```
Go to ```frontend``` and ```backend``` directory to install packages
```
cd frontend
npm install
```
```
cd backend
npm install
```
# Configuration
Create ```.env``` file inside ```backend``` directory and copy the following code

```
MONGO_DB_URL=your mongodb url
PORT=5000
JWT_SECRET=a random secret key eg.secretkey
FRONTEND_URL= your frontend URL eg http://localhost:5173

create account on cloudinary and obtain the following data

CLOUDINARY_CLOUD_NAME=enter cloud name
CLOUDINARY_API_KEY=enter key
CLOUDINARY_API_SECRET=enter API secret

GOOGLE_USERNAME=your gmail address
GOOGLE_PASSWORD=password created inside 'App Password' section under google accounts setting
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=Gmail

```
Create ```config.js``` file inside ```frontend``` directory and copy the following code
```
const API_URL='backend url'
export {API_URL}
```


# Run the App
Go to ```backend``` and ```frontend``` directory and start the server
```
cd backend
nodemon server
```
```
cd frontend
npm run dev
```
# Live Preview
Check live preview here [https://school-management123.web.app/](https://school-management123.web.app/)
