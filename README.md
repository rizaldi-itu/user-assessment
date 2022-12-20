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

In this section i will explain about feature that used for manipulating data from user entity
this is a few feature for this section

- Sign Up
- Sign In
- Check Self User Data Detail
- Update User Data
- Check All User Data Available (Admin)
- Create User (Admin)
- Delete User (Admin)

## Create User

Feature Create User is used by Admin for registration or create accout for other User.
This is the URL for Create User

POST METHOD

```bash
http://localhost:3000/createUser
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

and

Request query(params) should contain this data
| Name | Type | Description |
|------|------|-------------|
| id | String | Username User(required) |

If User Success to Created the result will be like this

```bash
{
    "message": "Sign Up Success",
    "data": {
        "username": "user99",
        "password": "$2a$08$088ijTmdYJ5m.2zwI2f8Oe/EORMJX56pn4DnByDm8BPVMynlYW9S2",
        "name": "user99",
        "email": "user99@gmail.co.id",
        "imageUrl": "images\\1671512318328-book7.jpg",
        "books": [],
        "_id": "63a140fef5bb877afed4d432",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXI5OSIsInBhc3N3b3JkIjoidXNlcjk5IiwiaWF0IjoxNjcxNTEyMzE4fQ.7hZjXaNCgm-2MBDiQjNkiLmHnKMVsO9938WDpmQ4lbY",
        "role": "63a024624fcb6753f6d67cc5",
        "createdAt": "2022-12-20T04:58:38.418Z",
        "updatedAt": "2022-12-20T04:58:38.418Z",
        "__v": 0
    }
}
```

## Sign Up

Feature Sign Up is used by User for registration or create accout for themself.
This is the URL for Sign Up

POST METHOD

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

GET METHOD

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

## Check User Self & Check All User

Feature Check User Self is used by User for Check User Data Profile that saved in MongoDB.
This is the URL for Check User Self

GET METHOD

```bash
http://localhost:3000/checkUser
```

Request query(params) should contain this data
| Name | Type | Description |
|------|------|-------------|
| id | String | id User(required) |
| page | String | Pagination for Admin role check All User(required) |

If the User have admin role, the result will show all data User, but if the User's role only a user, the result will show user's data only.

If User role user Success to Check the result will be like this

```bash
{
    "message": "Check My Profile Success",
    "data": {
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

If User role admin Success to Check the result will be like this

```bash
{
    "message": "Check All User Success",
    "data_admin": {
        "_id": "63a029b8b1aff3a37e9c99c1",
        "username": "user11",
        "password": "$2a$08$2NuoUfZtdOfBv16xWY3N.u7qrV3M7M9l2j7mCNj3qnU8dK.m0lI8G",
        "name": "user11",
        "email": "user11@gmail.com",
        "imageUrl": "images\\1671440822930-user4.jpg",
        "books": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMSIsInBhc3N3b3JkIjoidXNlcjExIiwiaWF0IjoxNjcxNDQwODI0fQ.uIL5RLCwmtAoHDjm1y1AlwUvE4kxMRxk6BevbF4QZtw",
        "role": {
            "_id": "63a024844fcb6753f6d67cc6",
            "name": "admin"
        },
        "createdAt": "2022-12-19T09:07:04.072Z",
        "updatedAt": "2022-12-19T09:07:04.072Z",
        "__v": 0
    },
    "data_user": [
        {
            "books": [],
            "_id": "639973ad38d5200133254778",
            "username": "deni",
            "password": "$2a$08$As7L5vVREGKin9rifs6TveRnyNSVlt5xUrEn5kdQICyHlI9.3nzeq",
            "name": "Deni",
            "email": "deni.akang@gmail.co.id",
            "createdAt": "2022-12-14T06:56:45.225Z",
            "updatedAt": "2022-12-14T06:56:45.225Z",
            "__v": 0
        },
        {
            "_id": "6399836425d1c33a34b7c93e",
            "username": "alrizaldi123",
            "password": "$2a$08$Dlb.5KzLBb7skNCpCv4/lOWPtwXDekaqE4JhdQfBhrpAZ2EhZgiZW",
            "name": "alrizaldi123",
            "email": "alrizaldi123@gmail.co.id",
            "createdAt": "2022-12-14T08:03:48.084Z",
            "updatedAt": "2022-12-19T06:23:20.335Z",
            "__v": 0,
            "books": [
                "639fe0e97ff4611ff257e5c3",
                "639fedbe63545db7f9b974d7",
                "639fedeefb0f37db5b0cd100",
                "63a0026b5aa1356e87762b23",
                "63a00301c912efc0619ea5ec",
                "63a00320f6d5791957d01315",
                "63a003582a00be2f53e35167"
            ],
            "imageUrl": "images\\1671172915926-book6.jpg"
        },
        {
            "books": [],
            "_id": "639a7a4f6ed017ff315f29cb",
            "username": "user3",
            "password": "$2a$08$06bnDXCZTnwvzLj/IY3KL.mInykIxjrRTDOZuOl6bA8IlPZXbMAHW",
            "name": "user3",
            "email": "user3@gmail.co.id",
            "createdAt": "2022-12-15T01:37:19.351Z",
            "updatedAt": "2022-12-15T01:37:19.351Z",
            "__v": 0
        }
    ]
}
```

## Update User

Feature Update User is used by User for Update User.
This is the URL for Update User

PUT METHOD

```bash
http://localhost:3000/updateUser
```

Request body should contain this data
| Name | Type | Description |
|------|------|-------------|
| Username | String | Username User(required) |
| Name | String | Name User |
| Email | String | Email User |
| ImageUrl | File Photo | Photo User |

Request query(params) should contain this data
| Name | Type | Description |
|------|------|-------------|
| id | String | Id User(required) |

If User Success to Update the result will be like this

```bash
{
    "message": "Success update data in database with id = 639fcc6bcb69c28af93218b8",
    "data": {
        "_id": "639fcc6bcb69c28af93218b8",
        "username": "user00",
        "password": "$2a$08$CnaB2Gq441Ds8Es9FeN8LezVkoTzATJxw800xBRtZGm/vZpxUPF5S",
        "name": "user00",
        "email": "user00@gmail.co.id",
        "imageUrl": "images\\1671511221731-user2.jpg",
        "books": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyMyIsInBhc3N3b3JkIjoidXNlcjIzIiwiaWF0IjoxNjcxNDE2OTM5fQ.xD4vzZAC4buFRo1WmYEDiGAdgerE7tBHDCFk4s_yYy8",
        "createdAt": "2022-12-19T02:28:59.548Z",
        "updatedAt": "2022-12-20T04:40:21.752Z",
        "__v": 0
    }
}
```

## Delete User

Feature Delete User is used by Admin for delete User's account.
This is the URL for Delete User

DELETE METHOD

```bash
http://localhost:3000/deleteUser
```

Request body should contain this data
| Name | Type | Description |
|------|------|-------------|
| Username | String | Username User(required) |
| Name | String | Name User |
| Email | String | Email User |
| ImageUrl | File Photo | Photo User |

Request query(params) should contain this data
| Name | Type | Description |
|------|------|-------------|
| id | String | Id User(required) |

If User Success to Update the result will be like this

```bash
{
    "message": "Success update data in database with id = 639fcc6bcb69c28af93218b8",
    "data": {
        "_id": "639fcc6bcb69c28af93218b8",
        "username": "user00",
        "password": "$2a$08$CnaB2Gq441Ds8Es9FeN8LezVkoTzATJxw800xBRtZGm/vZpxUPF5S",
        "name": "user00",
        "email": "user00@gmail.co.id",
        "imageUrl": "images\\1671511221731-user2.jpg",
        "books": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyMyIsInBhc3N3b3JkIjoidXNlcjIzIiwiaWF0IjoxNjcxNDE2OTM5fQ.xD4vzZAC4buFRo1WmYEDiGAdgerE7tBHDCFk4s_yYy8",
        "createdAt": "2022-12-19T02:28:59.548Z",
        "updatedAt": "2022-12-20T04:40:21.752Z",
        "__v": 0
    }
}
```

# Book

In this section i will explain about feature that used for manipulating data from book entity
this is a few feature for this section

- Input New Book
- Check All Book
- Check Book Detail
- Update Book Detail
- Search Book Detail With Regex

## Insert New Book

Feature Insert New Book is used by User for Insert New Book of User's account.
This is the URL for Insert New Book

DELETE METHOD

```bash
http://localhost:3000/deleteUser
```

Request body should contain this data
| Name | Type | Description |
|------|------|-------------|
| Username | String | Username User(required) |
| Name | String | Name User |
| Email | String | Email User |
| ImageUrl | File Photo | Photo User |

Request query(params) should contain this data
| Name | Type | Description |
|------|------|-------------|
| id | String | Id User(required) |

If User Success to Update the result will be like this

```bash
{
    "message": "Success update data in database with id = 639fcc6bcb69c28af93218b8",
    "data": {
        "_id": "639fcc6bcb69c28af93218b8",
        "username": "user00",
        "password": "$2a$08$CnaB2Gq441Ds8Es9FeN8LezVkoTzATJxw800xBRtZGm/vZpxUPF5S",
        "name": "user00",
        "email": "user00@gmail.co.id",
        "imageUrl": "images\\1671511221731-user2.jpg",
        "books": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyMyIsInBhc3N3b3JkIjoidXNlcjIzIiwiaWF0IjoxNjcxNDE2OTM5fQ.xD4vzZAC4buFRo1WmYEDiGAdgerE7tBHDCFk4s_yYy8",
        "createdAt": "2022-12-19T02:28:59.548Z",
        "updatedAt": "2022-12-20T04:40:21.752Z",
        "__v": 0
    }
}
```
