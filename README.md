# Bank-server App

An application simulates the back-end of a bank server :moneybag: , as well as a basic
front-end application that makes calls to this server and displays the return values :bow_and_arrow:.

## Background:

#### This is the first server I built myself! :muscle:

Both the server and the front-end app are stored in a single repository, which is
hosted in Hiroko - [link](https://ofer-bank-app.herokuapp.com)

At this point the application still does not use a database, and all data is stored in 2 JSON documents in the repository.
You can use the front-end app to send various API requests, or send requests directly yourself.

Note - one of the goals of the exercise was to experiment with different API requests, and to transfer different data on top of the request (in the body of the request, in parameters, etc.). This causes some of the requests to be of a type you would not expect, for example a PUT request for data retrieval.

#### Pay close attention to the details of the routes

## Routs

| Name            | Method           | path           | Body params                                  | Query params                 |
| --------------- | ---------------- | -------------- | -------------------------------------------- | ---------------------------- |
| Create new user | post             | /new_user      | id- string, cash- number, name- string       | -                            |
| Get all users   | get              | /all_users     | -                                            | -                            |
| Get user        | put :point_left: | /user          | user- string                                 | -                            |
| Open account    | put :point_left: | /new_account   | user- string                                 | cash- number, credit- number |
| Deposit         | put              | /deposit       | accountId- string                            | amount- number               |
| Update credit   | put              | /update_credit | accountId- string, credit- number            | amount- number               |
| Withdraw        | put              | /withdraw      | accountId- string, amount- number            | amount- number               |
| Transfer        | put              | /transfer      | payer- string, payee- string, amount- number | amount- number               |
| Account details | put :point_left: | /accaount      | accountId- string                            | -                            |
| User details    | put :point_left: | /user          | user - string                                | -                            |

### Technologies used by the application:

- Express
- Node.JS
- React

## Challenges along the way

The project included a large number of challenges that I faced for the first time:
Create a server
Complex API calls using Axios
Creating a reusable component that sends all of the above calls
Running 2 applications simultaneously, both as 2 separate processes and as a single process
Heroku Deployment

## Let's get in touch!

You are very welcome to contact me about the project - suggestions, questions, tips,
requests, and of course - information about job offers

- My mail: [ofertauber@gmail.com](mailto:ofertauber@gmail.com)
- My LinkedIn profile [https://www.linkedin.com/in/ofertauber/](https://www.linkedin.com/in/ofertauber/)

## Thanks

Special thanks to

- [Shir Toledano](https://www.linkedin.com/in/shir-toledano-843a2116a/)
- [Daniel Toledano](https://www.linkedin.com/in/daniel-toledano-712314146/)

Who helped me a lot!

## Demo

[Ofer-bank-API-app](https://ofer-bank-app.herokuapp.com)
