# Github Api for NodeJS

This project aims to fetch public user profile and repositories of a user having account on github.
## Getting Started 

### Prerequisites

#### Install the stable or latest version of Node.js and npm 

```
sudo apt install nodejs npm

npm --version 
3.10.10

node --version 
v6.9.3
```

In some distributions Node.js and npm are a little bit outdated,<br />
you can use npm itself to update Node.js and npm to the latest versions.

```
sudo npm install -g npm

sudo npm install -g n
```
```
sudo n stable
or 
sudo n latest
```

### Setup

```
git clone https://gitlab.com/KhirwalSumeet/solution1.git 
cd solution1
npm install
```
#### For Production

```
npm install -g forever
```

##### Note: This npm package is used to restart server whenever it crashes. It is of utmost importance that server must stay up while in production mode.

### Dependencies

- Github api library


### Run

```
npm start
```

The server is now up at http://localhost:3000/ by default, see your terminal for details.

### Available Features

In the Postman, you can run:
```
POST: http://localhost:3000/api/user/profile
```
We have to send urlencoded form data with following fields :
- username

This api endpoint will return a json object as response containing user profile.
```
POST: http://localhost:3000/api/user/repo
```
We have to send urlencoded form data with following fields :
- username

This api endpoint will return a json object as response containing user repositories which are publically available.
```
POST: http://localhost:3000/api/user/repo/popular
```
We have to send urlencoded form data with following fields :
- username
- numberOfRepos : maximum number of repositories data you want to fetch
- stargazers: minimum stargazers that a repository must have.

Note: Either numberOfRepos or stargazers must be provided.You can also send both.

Note: Postman scripts are present in solution/postman folder.

Note: Basic layout was generated using yeoman express generator.

### Errors
```
Code   :  Message
-------------------------
200    :  Api Query Successful
492    :  Error as TCP connection refused
493    :  Stargazers Count/ Max number of repos were not sent. Either or both of them must be specified
494    :  Number of max repositories to be returned must be an integer
495    :  Please enter a valid range
496    :  Stargazers be an integer
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

### Snapshots

```
Snapshots of the above projects has been captured from Postman and pasted in snaps folder.
```
