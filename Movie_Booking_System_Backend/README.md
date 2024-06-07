# Backend for movie management system Admin Panel

This project is a robust backend for an admin panel, built using Node.js, Express, and several other essential libraries. It includes password hashing, request validation, error handling, response handling, and integrates with Razorpay for payment processing.

## Features

- **bcrypt**: Used bcrypt for password hashing for securing user account.
  
- **CORS**: Cross-Origin Resource Sharing (CORS)
  
- Environment variables management with dotenv.
  
-**express validator**: checked request Validations for proper handling.

-**helmet**: for preventing from XSS attacks.

- **JWT**:JSON Web Token (JWT) for authentication.
- 
- **nodemailer**:for email services ie booking confirmation.
- **razorpay**:Payment Processing gateway for handling Payments.

- custom error handler and response handler middlewares for professionaly handling errors and responses.

  Inculded authentication and authorization for user and Admin if admin then full access to adding movies etc is given.
  user can only book the tickets only. 