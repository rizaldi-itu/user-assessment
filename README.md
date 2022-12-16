# User-Assessment

This application functions to store book and user data, the books contained in this application are books that are inputed by the user. Users are free to enter the books they write and enter their book data. In this application there are 2 entities namely users and books and there are several useful features for storing data, searching data, changing data and deleting data.

This application uses node.js technology with the express.js framework and the mongodb database using mongoose library. This application is a backend application, so there is no interface in this application. To interact with this application, a postman is needed to send requests and receive results.

in the section below I will explain some of the features contained in this application in detail, starting from sending requests and their contents and receiving results provided by the server to the client. The explanation will be sorted from the begining or installation until you get the last or final feature from this application 

## Prerequisite
Before install this program you should install a few program to your computer
* Node Js
* MongoDB
* MongoDBCompass
* Postman

## Install
First download this application from this repository to your local folder
```bash
npm install 
````
you can run this code in the command promt inside your local folder directory
that is for the express aplication

## Turn On
Before turn on the application you can open your mongoDBCompass and connect with the local server or localhost 
After installation and mongoDB connection you can start the application using 
```bash
npm start 
````
Result will be like this
```bash
Server Run on Port 3000
Connected to the database!
````
