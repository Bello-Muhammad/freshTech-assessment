# All existing routes runs on : localhost:3001/api/v1
    - Auth
        >POST: /auth/register
        >POST: /auth/login
    - User
        >GET: /user/profile
        >PATCH: /user/change-password
    -Transaction
        >POST: /transaction
        >GET: /transaction/all/transactions
        >GET: transaction/:transactionId

## The project is build on;
    - node 18.x
    - npm 10.x
    - and mongodb as the database used

# Project Structure
    src|_
         database
         domains|_
                  transaction|_
                                controllers
                                models
                                router
                                services
                  user|_
                        controllers
                        models
                        router
                        services
         middleware   
