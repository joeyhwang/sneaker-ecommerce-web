# Sneaker-Ecommerce-Web

# Live Website (Deployed on Heroku)
Live: https://warm-plains-75848.herokuapp.com/

## Video Walkthrough
https://www.youtube.com/watch?v=qgrryEHVzv4

## Website Description
- Customers can log in through Google and Facebook OAuth using PassportJS and customers can add/remove sneakers to cart to checkout. 
- Sneakers are checked out using Stripe API and orders are logged in the account tab.
- To simulate checkout, you must be logged in and use Stripe's credit card number: 4242 4242 4242 4242, expiration: 4/24, cvv: 424  
- Sneakers can be sorted by categories, brand, price, size.
- The frontend and backend are deployed on Heroku.

## How to run project on localhost
- git clone https://github.com/joeyhwang/sneaker-ecommerce-web.git
- In sneaker-ecommerce-web directory, open terminal and use "npm i" to install dependencies
- cd to frontend directory and use "npm i" to install dependencies
- Create .env files in sneaker-ecommerce-web directory and frontend folder, directions are listed below
- Follow all steps below to run the project correctly.

## Below is an image of where the two .env files should be.
![image](https://user-images.githubusercontent.com/19678167/132264134-b2c44a9d-944c-464d-9efd-ab1bee067fbf.png)


## sneaker-ecommerce-web/ directory .env file (these are mandatory in order to run the project.)
The left side are the env variable names, which must be exactly this. The right side is static unless it states YOUR___, which means you must use your api keys (Google, Stripe, Facebook) and MONGODB connection url.

- PORT = 5000
- MONGO_URI = YOUR_MONGO_DB_CONNECTION
- GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET = YOUR_GOOGLE_CLIENT_SECRET
- FACEBOOK_APP_ID = YOUR_FACEBOOK_APP_ID (Note: facebook login will not work on localhost since facebook login requires https)
- FACEBOOK_APP_SECRET = YOUR_FACEBOOK_APP_SECRET
- SECRET = ANYTHING
- STRIPE_API = YOUR_STRIPE_sk_test
- STRIPE_ENDPOINT_SECRET = YOUR_STRIPE_whsec
- FRONTEND_URL = http://localhost:3000/
- NODE_ENV = development

## frontend/ directory .env variables (these are mandatory in order to run the project.)
- REACT_APP_PUBLISHABLE_KEY = YOUR_STRIPE_pk_test
- REACT_APP_SERVER_URL = http://localhost:5000

## Change Google and Facebook form action in frontend/src/components/Auth/Auth.js (this will redirect to the correct google callback to login)
- Change the form action of Google and Facebook to http://localhost:5000/auth/google and http://localhost:5000/auth/facebook respectively. The image below is what it should look like now.
![image](https://user-images.githubusercontent.com/19678167/132263243-9aa31711-76ce-467b-a303-1be5052906b6.png)


Created with React, Redux, Express, Node, MongoDB, and Stripe API
