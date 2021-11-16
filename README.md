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
