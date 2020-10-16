# affluent-server
affluent's project backend code

## Introduction

This project shows some external data which is previously got and saved in our DB. There are two routes that retrieve that data making queries to our DB.

## Flow

  1) The project is developed assuming that all data is refreshed everyday so it includes a cron which everyday looks for that data and saves it in our DB. On one hand, user data is fetched via API and ob the other hand, date data is fetched by web scrapping
  2) It exposes two routes which make a "select *" to both data tables

## Components

- Cron: It runs everyday and executes all scripts
- Routes + Controllers: They return to the user list of dates and list of users by making queries to our DB
- Scripts:
  - Users: It consumes https://reqres.in/ by making a request and gets users' list. That routes handle a pagination logic, so for performance purposes the project make two groups of request: firstone, to get the first page data and to get how many pages are, and second to make all request in a parallel way
  - Dates: For fetching this data, the project logs in https://develop.pub.afflu.net first and after that it returns the list of dates data between 30-04-2019 and 01-04-2020

## Some Coments

This project is coded for development purpose, so the queries are coded to handle sql injection. Also, it only makes a simple console.log to handle error

## How to run it ?

  1) npm i
  2) PUPPETEER_PRODUCT=firefox npm i
  3) npm start