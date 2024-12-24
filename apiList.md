# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout


## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password


## connectionrequestRouter
- POST /request/send/:status/:userId
- POST /request/receive/:status/:requestId


## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed   => Gets you the profiles of other users on platform


Status:  ignored, interested, accepted, rejected