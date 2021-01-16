# Bender

## What is?

Bender is the Back-end server for FLanders.

### env

For work properly you must fullfill **.env-TEMPLATE** with your settings and **rename to it .env**

You must have [Sendgrid](https://sendgrid.com/), [Amadeus](https://developers.amadeus.com/) and [GeoDB cities](https://rapidapi.com/wirefreethought/api/geodb-cities) users to work properly.



## Installation

Please run the db.sql provided in the top level folder of the repo /db/booking.sql on your MySQL database to start.

```
npm install
```

### Dev for run development server

```
npm run dev
```

### Postman collection && Newman runner

Check postman collection [here](https://documenter.getpostman.com/view/12243544/TVzRGdp5) or in **/back/docs**

If you want to tun automated testing you must add a postman env.
You can just use the one supplied in bender-dev.environement-TEMPLATE.json at **/back/docs**



## TESTS

#### Initial test

```
npm run test-init
```

This will try all the valid routes with valid data.

#### Error tests

```
npm run test-error
```

This will try all the routes with invalid data and weird requests.
