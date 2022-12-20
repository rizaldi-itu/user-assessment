# User-Assessment

This application functions to store book and user data, the books contained in this application are books that are inputed by the user. Users are free to enter the books they write and enter their book data. In this application there are 2 entities namely users and books and there are several useful features for storing data, searching data, changing data and deleting data.

This application uses node.js technology with the express.js framework and the mongodb database using mongoose library. This application is a backend application, so there is no interface in this application. To interact with this application, a postman is needed to send requests and receive results.

in the section below I will explain some of the features contained in this application in detail, starting from sending requests and their contents and receiving results provided by the server to the client. The explanation will be sorted from the begining or installation until you get the last or final feature from this application

## Prerequisite

Before install this program you should install a few program to your computer

- Node Js
- MongoDB
- MongoDBCompass
- Postman

## Install

First download this application from this repository to your local folder

```bash
npm install
```

you can run this code in the command promt inside your local folder directory
that is for the express application

## Turn On

Before turn on the application you can open your mongoDBCompass and connect with the local server or localhost
After installation and mongoDB connection you can start the application using

```bash
npm start
```

Result will be like this

```bash
Server Run on Port 3000
Connected to the database!
```

# User

In this section i will explain about feature that used for maniplualtin data from user entity
this is a few feature for this section

- Sign Up
- Sign In
- Check Self User Data Detail
- Update User Data
- Check All User Data Available (Admin)
- Create User (Admin)
- Delete User (Admin)

## Sign Up

Feature Sign Up is used by User for registration or create accout for themself.
This is the URL for Sign Up

```bash
http://localhost:3000/signUp
```

Request body should contain this data
| Name | Type | Description |
|------|------|-------------|
| Username | String | Username User(required) |
| Password | String | Password User(required) |
| Password2 | String | Confirmation Password |
| Name | String | Name User |
| Email | String | Email User |
| ImageUrl | File Photo | Photo User |

If User Success to Sign Up the result will be like this

```bash
{
    "message": "Sign Up Success",
    "data": {
        "username": "user13",
        "password": "$2a$08$3Te/tB7s5n8Dk2lAR2gLaucrUC/4jNB8y/ssF7mILmixkW77qTBA6",
        "name": "user13",
        "email": "user13@gmail.com",
        "imageUrl": "images\\1671506380310-user2.jpg",
        "books": [],
        "_id": "63a129cd1240e92068874146",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMyIsInBhc3N3b3JkIjoidXNlcjEzIiwiaWF0IjoxNjcxNTA2MzgxfQ.IzHxviUylQlWK13q0gNI7YqFcXc2hCguSmKAty7xqZI",
        "role": "63a024624fcb6753f6d67cc5",
        "createdAt": "2022-12-20T03:19:41.303Z",
        "updatedAt": "2022-12-20T03:19:41.303Z",
        "__v": 0
    }
}
```

## Sign In

Feature Sign In is used by User for log In into the app and access things in the app.
This is the URL for Sign In

```bash
http://localhost:3000/signIn
```

Request body should contain this data
| Name | Type | Description |
|------|------|-------------|
| Username | String | Username User(required) |
| Password | String | Password User(required) |

Or If the User already Signed In Before, User can using token to Sign In that saved in User phone

Request header should contain this data
| Name | Type | Description |
|------|------|-------------|
| x-access-token | String | Token that saved in mongoDB |

If User Success to Sign In the result will be like this

```bash
{
    "message": "Login with username & password Success, Account username = user5",
    "user": {
        "_id": "63a02aa69605ed7288279fcf",
        "username": "user5",
        "password": "$2a$08$n6ZQKp96KfXYPTUb4hic0OjlglKSbi5k0L.XVMgg59HbnXdg9Fm4i",
        "name": "user5",
        "email": "user5@gmail.co.id",
        "imageUrl": "images\\1671441062801-book7.jpg",
        "books": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXI1IiwicGFzc3dvcmQiOiJ1c2VyNSIsImlhdCI6MTY3MTQ0MTA2Mn0.AWo5Yl9HCULumjDGrgcTHtR8l11U2qWXrZlRFmb7E80",
        "role": "63a024624fcb6753f6d67cc5",
        "createdAt": "2022-12-19T09:11:02.872Z",
        "updatedAt": "2022-12-19T09:11:02.872Z",
        "__v": 0
    }
}
```
