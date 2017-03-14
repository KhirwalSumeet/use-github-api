var githubApi=require('../library/github-api');
var response={};
/* Load error codes from message.json */

var fs = require('fs');
var jsonPath = './data/messages.json';
fs.readFile(jsonPath, 'utf8', function (err, data) {
	if (err){
		throw err;
  	}
	messages = JSON.parse(data);
});

/* To fetch the public repositories of a user */

exports.fetch=function (req, res, next) { 
	username=req.body.username;
    githubApi.fetch(username,function(err,data){

	    if(data){
	    	if(data.message){
				response["data"]=[];
		    	response["message"]=data["message"];
		    	response["status"]=data["status"];
		    	res.send(response);
	    	}else{
		    	response["data"]=data;
		    	response["message"]=messages["200"];
		    	response["status"]=200;
		    	res.send(response);
	    	}
	    }else{
	    	response["data"]=[];
	    	response["message"]=messages["492"];
	    	response["status"]=492;
	    	res.send(response);
	    }
    });
        
}

/* Returns most popular repos by stargazers coount */

exports.popular=function (req, res, next) { 
	username=req.body.username;
	repoCount=req.body.numberOfRepos;
	stargazers=req.body.stargazers;
	/* Return error if both stargazers and max repos are not sent */
	if(repoCount== undefined && stargazers == undefined){
	    	response["data"]=[];
	    	response["message"]=messages["493"];
	    	response["status"]=493;
	    	res.send(response);
	    	return;
	}
	/* Max number of repositories must be an integer */
	if(!validData(repoCount,"494")){
		res.send(response);
		return;
	}
	/* Stargazers count must be an integer */
	if(!validData(stargazers,"495")){
		res.send(response);
		return;
	}
	/* Now fetch all the repos of a user */
    githubApi.fetch(username,function(err,data){
	    if(data){
	    	if(data.message){
				response["data"]=[];
		    	response["message"]=data["message"];
		    	response["status"]=data["status"];
		    	res.send(response);
	    	}else{
		    	popRepos=popularRepo(data,parseInt(repoCount),parseInt(stargazers));
		    	response["data"]=popRepos;
		    	response["message"]=messages["200"];
		    	response["status"]=200;
		    	res.send(response);
	    	}
	    }else{
	    	response["data"]=[];
	    	response["message"]=messages["492"];
	    	response["status"]=492;
	    	res.send(response);
	    }

    });
        
}

/* Function to validate data ! Data must be an integer */

function validData(data,errorCode){
	if(data!= undefined && (isNaN(parseFloat(data)) || parseInt(data)<0 || ((parseFloat(data) -parseInt(data))!=0))){
    	response["data"]=[];
    	response["message"]=messages[errorCode];
    	response["status"]=errorCode;
    	return false;
	}
	return true;
}

/* Function to sort repo by stargazers count */

function popularRepo(repoList,maxRepo,minStar){
	/* Enter code to sort repos */
	repoList=sortRepo(repoList);
	if(!isNaN(maxRepo) && maxRepo<repoList.length)
		repoList=repoList.slice(0,maxRepo);
	if(!isNaN(minStar )){
		var slicePos=getPosMinStar(repoList,minStar);
		repoList=repoList.slice(0,slicePos);
	}
	return repoList;
} 

/* Sort repo by stargazers (Bubble Sort) */
/* Need to improvise : Merge Sort O(nlogn) time complexity */

function sortRepo(repoList){
	for(i=0;i<repoList.length;i++){
		for(j=i+1;j<repoList.length;j++){
			if(repoList[i]["stargazers_count"]<repoList[j]["stargazers_count"]){
				temp=repoList[i]["stargazers_count"];
				repoList[i]["stargazers_count"]=repoList[j]["stargazers_count"];
				repoList[j]["stargazers_count"]=temp;
			}
		}
	}
	return repoList;
}

/* Get position where minimum stargazers is less than stargazers owned by github users */

function getPosMinStar(repoList,minStar){
	var startIndex = 0,
		stopIndex = repoList.length - 1,
		middle;
	while (startIndex < stopIndex+1) {
		middle = Math.floor(((stopIndex + startIndex) / 2));
		// adjust search area
		if (minStar > repoList[middle]["stargazers_count"]) {
			stopIndex = middle - 1;
		} else if (minStar < repoList[middle]["stargazers_count"]) {
			startIndex = middle + 1;
		}

	}
	return startIndex;
}