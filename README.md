# Budget App
Live  can be viewed at https://your-budgett.herokuapp.com/

A budget manager website made using Django Rest Framework and React.
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple budget manager, which allows you to store transactions from different accounts. Features:
* Register and Login
  * Token Authentication to connect DRF and React
  * Can login with username or email
* Accounts
  * View Accounts
  * Add Account 
  * Edit Account
  * Delete Account
* Transactions:
  * View Accounts
  * Add Account 
  * Edit Account
  * Delete Account
	
## Technologies
Project is created with:
* Django(Django Rest Framework)
* Pytest
* React(Redux, React Router)
* Bootstrap
* Docker

## Setup
To run this project:
1. Install Docker, NPM.
2. Clone repository. 
```
$ git clone https://github.com/rdubowski/bookstore/ 
```
3. Install frontend dependencies.
``` 
$ cd backend/
$ cd frontend/
$ npm install
$ cd ..
```
4. Build image with docker-compose
``` 
$ docker-compose build
```
5. Run image.
``` 
$ docker-compose up
``` 
