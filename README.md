# BackFeed

BackFeed is an application thats allows project managers, business owners, and developers to request feedback about projects via email to users.


## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose ORM
* Passport.js (with Google Strategy)
* Stripe

## Development
To start developing, simply clone this repository and:

```
$ cd backfeed-react-express
$ npm install
$ npm run dev
```


## Build for Production
Building BackFeed for production can be done several ways. The package.json includes a post install script for a Heroku deployment, which will automatically run once the application is deployed to a Heroku server. You can build the front end of the directory by running:

```
$ cd client
$ npm run build
```

## License
It's open source! 
