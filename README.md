# <p align="center">Anywhere Fitness API</p>

## <p align="center">https://ft-anywherefitness-7.herokuapp.com/</p>

## <p align="center">---------- REGISTER / LOGIN ----------</p>

## Dummy Login Info

<details>
<summary>Usernames/Passwords</summary>

```json
[
  {
    "user_id": 1,
    "username": "tom",
    "password": "password",
    "role_type": "instructor"
  },
  {
    "user_id": 2,
    "username": "jerry",
    "password": "password",
    "role_type": "instructor"
  },
  {
    "user_id": 3,
    "username": "garfield",
    "password": "password",
    "role_type": "client"
  },
  {
    "user_id": 4,
    "username": "odie",
    "password": "password",
    "role_type": "client"
  }
]
```

</details>

### [POST] /api/login

- Login
  - _username and password required_
  - _provides a newly created token_

_What you send:_

```json
{
  "username": "SampleUser",
  "password": "abc123"
}
```

_What you receive:_

```json
{
  "message": "welcome, SampleUser",
  "role": "instructor",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJpYXQiOjE2MjcyNjY4MDYsImV4cCI6MTYyNzM1MzIwNn0.J1dFd3ghUPYVTodsaAU3Bg2RRcmYM_1oOe-96nvLLUg"
}
```

##

### [GET] /api/users/

**_RESTRICTED ENDPOINT_**

- Get an array of users
  - _requires valid token in authorization header to access_

_What you receive:_

```json
[
    {
        "user_id": 1,
        "username": "tom",
        "role_type": "instructor"
    },
    {
        "user_id": 2,
        "username": "jerry",
        "role_type": "instructor"
    },
    {
        "user_id": 3,
        "username": "garfield",
        "role_type": "client"
    },
    {
        "user_id": 4,
        "username": "odie",
        "role_type": "client"
    }
]
```
