Assignment 1
- Create a repository
- Initialize the repository
- node_modules, paackage.json, package-lock.json
- Install express
- Create a server
- Listen on port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependecies
- What is the use of "-g" while npm install
- Deffirence between caret and tilde (^ vs ~)
    - ^ and ~ are version range specifiers used in dependencies to indicate which versions of a package are acceptable
    - ^ : Acceptable versions: 1.x.x, where x is any version greater than or equal to
    - ~ : Acceptable versions: 1.2.x, where x is any version greater than or equal to 


Assignment 2
- Intialize GIT
- .gitignore
- Create a remote repo on Github
- Push all code to remote origin
- Play with routes androute extensions E.X. /hello, /hello/2, /xyz
-  Order of routes matters a lot
- Instakk Postman app and make a workspace/collection > test API call
- Write logic to handle GET, POST, PUT, PATCH, DELETE API calls and test them on Postman
- Explore routing and use of ?, +, * in routes
- Use of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes


Assignment 3
- Multiple route handlers - Play with the code
- next();
- next function and errors along with res.send();
- app.use("/route", rh1, [rh2, rh3], rh4, rh5);
- What is middleware and why do we need this
- How expressJS basically handles request behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except user/login
- Error handling with middleware



- Create a free clusteron mongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect application to database
- Call connectDB function and connect to database before starting application on 7777
- Create a User Schema and User Model
- Create POST /signup  API to add some data to databse
- Push some documents using API calls from postman


- JS Object and JSON (Difference)
- Add express.json() middleware
- Make /signup api dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object will be returned?
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- API - Delete a user
- Difference between PUT and PATCH
- API - Update a user
- Explore mongoose documentation for Model methods
- What are options in Modal.findOneAndUpdate method
- API - Update the user with emailId  


- Explore schematype options from the documentation
- Add required, unique, lowercase, min, max, minLength, maxLength, trim, etc
- Add default
- Create a custom validation function
- Improve the DB schema - Put all required validations on each field in schema
- Add timestamps to the schema


- API level validations on Patch request & Signup post api
- Add API validation for each field 
- Install Validator npm package
- Explore Validator library functions
- Use Validator functions for password, photoUrl and email
- Never trust req.body

- Validate data in signup API
- Install bcrypt npm package
- Create PasswordHash using bcrypt.hash and save the user with encryoted password
- Create login API
- Validate the data and compare password and throw error if email or passowrd is incorrect

- Install cookie-parser
- Send dummy cookie to user
- Create GET profile API and check if you get the cookie back
- Install jsonwebtoken
- In Login API, after email and password validation, create a jwt token and sent it back to user in cookie
- Read the cookie inside your profile API and logged in user
- Create userAuth middleware, add in profile and sendConnectionRequest API
- Set expiry of JWT token and cookies
- Create userSchema method to getJWT
- Create userSchema method to validate password

- Explore Tinder APIs
- Create a list of all APIs for DevTinder
- Group multuple routes under respective router
- Explore / read documentatiuon of express router
- Create Routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create /logout API
- Create PATCH /profile/edit API
- Create PATCH /profile/password API
- Make sure to validate all data in POST, PATCH apis

- Create connectionrequest schema
- Send connection request API
- Proper validation of data
- Think about all corner cases
- Read about complex/logical queries such as $or, $and, etc
- Schema.pre function
- Read more about indexes
- Why do we need indexes
- What is the advantages and disadvantages of creating indexes
- Read about compand index on mongo official website


- Implement /receive/:status/:requestId API with proper validations
- Read about ref and populate in mongoose
- Create /user/request/received API with all checks
- Create/user/request/connection API with all checks
- Implement /user/feed API
- Explore $nin, $ne, etc (Comparison queries)
