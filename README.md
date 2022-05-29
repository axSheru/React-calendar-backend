# About...

In this project we created endpoints for authentication and calendar events managements for React Calendar App. We are using the MERN stack to create the whole project.


# Instructions.

Before everything you need to create a copy of ```.env.example``` file and call it ```.env``` at the same level. 

You need to define your port, create a MongoDB instance and add the connection string. You can create your own **Mongo DB** instance in [here](https://www.mongodb.com/es/cloud/atlas/efficiency). Once you have created it you could use the web site or download **Mongo Compass** to administrate your DB locally.

Finally define an string that JWT is going to use as a base.

## Heroku

If you use Heroku to deploy this project, you need to set the **environment variables** using this commands.

```heroku config:set VARIABLE_NAME=VARIABLE_VALUE```

or you can do it directly in the [dashboard](https://dashboard.heroku.com/) in the **settings** section.

To see the the logs, you must run in your terminal

```heroku logs -n 1000 --tail```

To run this project execute:   
    ```npm run dev```