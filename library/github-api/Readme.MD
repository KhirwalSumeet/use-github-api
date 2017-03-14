# Github Api for NodeJS

This library aims to fetch public user profile and repositories of a user having account on github.



### Install the library (once it is published on npm) 

```
npm install github-api
```
Note: Above command won't work now as the package isn't published on npm.

### Dependencies

- Request module
```
npm install request
```

### Usage

#### Fetch github profile of user

```
var githubApi = require('github-api');

githubApi.profile(username,function(err,data){
	console.log(data);
});

```

#### Fetch public github repositories of a user

```
githubApi.fetch(username,function(err,data){
	console.log(data);
});

```



### Errors
```
Code   :  Message
-------------------------
491    :  Please send username along with the request data in form of urlencoded form data
```
Note: Error Messages can be changed in data/messages.json but error codes are fixed.

### Testing

```
npm install -g mocha
```
##### Running Tests :
```
mocha test/test.js 
```

### File Structure
