
# Restaurant business and user review 
    User Authentication
    a. Implemented JWT authentication
    b. Created 3 user authorisation levels for role-based access(Business Owner,
       User & admin)

    Listing Management
    a. Create CRUD operations for business listings
    b. Business owners and Admin can create business listings 

    Review Management
    a. Implemented a review system where only logged-in users can reviews for
       businesses
    b. Allowing business owners to reply to reviews


Technologies used : `Node`, `MongoDB`

## Tech Stack



**Server:** Node, Express, Mongodb


## Run Locally

Clone the project

```bash
  git clone <https://link-to-project>
```

Go to the project directory

```bash
  cd <my-project>
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`  example : 5000 (Number)

`MongoURL` 

example : mongodb://localhost:27017 (Mongodb connection string)

`SaltRounds` example : 10 (Number) 

`AccessSecretKey` example : "grfuygweiiguieiie"(Random String)

`AccessTokenExpiry` 

example : '5000' (5 seconds), '60s' (60 seconds), '10m' ( 10 minutes), '24h' (24 hours), '7d' (7 days),
'1M' (1 month), '1y' (1 year)


`RefreshSecretKey` example : "grfuygweiiguieiie"(Random String)

`RefreshTokenExpiry` 

example : '5000' (5 seconds), '60s' (60 seconds), '10m' ( 10 minutes), '24h' (24 hours), '7d' (7 days),
'1M' (1 month), '1y' (1 year)

`Roles` 
value is fixed "User, Admin, Business Owner" and should not be changed

## API Reference

#### Register a user (any role)

```http
  POST /v1/api/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Email`      | `string` | **Required**.  |
| `Password`      | `string` | **Required**.  |
| `Role`      | `string` | **Required**. Default *User* |
| `Mobile`      | `Number` | *optional*. should be unique and 10 digits  |
| `UserName`      | `string` | *optional*. |
| `Email`      | `string` | **Required**. Id of item to fetch |


#### Login a user (any role)

```http
  POST /v1/api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Email` | `string` | **Required**.|
| `password` | `string` | **Required**.|

#### Create business

```http
  POST /v1/api/addBusiness
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `BusinessName`      | `string` | **Required**.  |
| `Address`      | `string` | **Required**. |
| `Mobile`      | `Number` | **Required**. should be unique and 10 digits  |
| `BusinessOwnerId`      | `string` | **Required** for Admin , *optional* for Business Owner |
| `Images`      | `strings array` | **Required**. image urls |


#### GET businesses

```http
  GET /v1/api/getBusiness

  get all businesses
```

#### Update business

```http
  POST /v1/api/updateBusiness
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `BusinessName`      | `string` | *optional*.  |
| `Address`      | `string` | *optional*. |
| `BusinessId`      | `string` | **Required**. |
| `Images`      | `strings array` | *optional*. image urls |

#### Delete business

```http
  GET /v1/api/deleteBusiness/:BusinessId

  delete business
```

#### Create review

```http
  POST /v1/api/addReview
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `BusinessId`      | `string` | **Required**.  |
| `UserReview`      | `string` | **Required**. |



#### GET Reviews

```http
  GET /v1/api/getReviews/:BusinessId

  get all reviews
```

#### Update business

```http
  POST /v1/api/updateBusiness
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `BusinessId`      | `string` | **Required**.  |
| `UserReview`      | `string` | **Required** for *User* |
| `RespondMsg`      | `string` | **Required** for *Business Owner* |

#### Delete review

```http
  POST /v1/api/deleteReview
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `BusinessId`      | `string` | **Required**.  |
| `ReviewId`      | `string` | **Required**. |

## Feedback

If you have any feedback, please reach out to me at social profile below

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/srinathchitha/)



