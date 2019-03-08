Sequelize Seeder Commands
=========================

The `password` part of the following commands has to be replaced with your password.

Run seeds
---------
```
sequelize db:seed:all --url "mysql://root:password@localhost/dogs_day_out"
```
The tables have to exist for this to run correctly. If they don't, close and re-run the server. Or, if you're in Heroku use `More > Restart All Dynos` where the `More` button is in the top-right corner.

Create a database
-----------------
```
sequelize db:create --url "mysql://root:password@localhost/dogs_day_out"
```

Drop a database
---------------
```
sequelize db:drop --url "mysql://root:password@localhost/dogs_day_out"
```

Deployment
----------

If you want to run a command for heroku, you use the same commands. But you replace the url with the `JAWSDB_URL` in your heroku config variables.

For example:
```
sequelize db:create --url "mysql://xxmfeoworztmzcs6:d5af6vg5scgyauux@q68u8b2buodpme2n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/uqt6krhdalf5387p"
```