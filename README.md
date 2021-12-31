# Payment Calculation App
This is a simple application for calculating payments for customer orders. 
The application consists of three components: 
1. A database containing customer and item information. 
2. A backend service for payment calculation. 
3. A single-page web application to take customer inputs and display payments.

## Configuration
In order to use the TaxJar APIs, the app needs an API key which can be set manually in the `docker-compose.yml` file as an environment variable.

## Deployment
The whole app can be deployed by running the docker compose file located at the parent directory by running

`(sudo) docker-compose up`

Afterwards, the frontend can be access at http://localhost:3000 while backend APIs can be accessed at http://localhost:8080.

## APIs
There are 3 different APIs currently supported by the backend:
- **/customers**: this will support GET requests and will return all the customers (which have been inserted by the backend when the service starts up).
- **/products**: the same as **/customers**, except for products
- **/calculation**: this only supports POST request which contain the customer id and details about each item. A Sample request can be found as a comment in `backend/routes/calculate.js`
