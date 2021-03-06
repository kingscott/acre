Acre - Waterloo Hacks '16 
==========================
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Authors: Scott King, Vaughan Hilts

An application that can help you find a place to live given some constraints about your career, where you would want to live, prospective
salary, and more variables. For more information, check out [Devpost](http://devpost.com/software/acre).

### install

Clone the repo and run `npm install` in the root of the folder. Next, `cd` into `server` and run `node server.js`.

If this is the first time you are using this software, follow these steps:

```bash
➜  sudo mongod --dbpath /var/lib/mongodb
➜  cd acre
➜  mongorestore --db city data/city/cities.bson
```

*Note*: Make sure you have a MongoDB instance running: `sudo mongod --dbpath /var/lib/mongodb/` if you have MongoDB installed.

#### publicity

Check it out Wilfrid Laurier University's [site](http://wlu.ca/spotlights/winter-2016/laurier-computer-science-students-victorious-at-waterloo-hacks.html). Also check it out on the Thomson Reuters [blog](https://blogs.thomsonreuters.com/answerson/thats-waterloohacks/).
