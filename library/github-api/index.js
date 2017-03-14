var _ = require('underscore');
var request=require('request');
var githubApi="https://api.github.com/users/";

/* Fetch User repositories publically available on github */
/* Setting up proxy is optional . If your internet connection
connects through proxy , then you must specify the proxy */

exports.fetch=function (username,callback) {
	var proxy=process.env['HTTP_PROXY'] || process.env['http_proxy'];
	var options = {
	  headers: {
	    'User-Agent': 'KhirwalSumeet'
	  }
	};
	if(proxy)
		options.proxy = proxy;
	if(!_.isString(username)){
		var response={};
		response["message"]="Please send username along with the request data in form of urlencoded form data";
		response["status"]=491;
		callback(null,response);
		return;
	}
	request(githubApi+username+"/repos",options, function (error, response, body) {
		if(error) {
			callback(error, null);
			return;
		}
		body=JSON.parse(body);
		if (body.message == undefined) {
			getRepo(body, callback);
		} else {
			var noAccount={};
			noAccount["error"]=body.message;
			callback(null,noAccount);
		}
	});
};

/* Function to filter data fields required */

function getRepo(data, cb){
	var repo=[];
	data.forEach(function(row) {
		repo.push({
			name: row['name'],
			html_url: row['html_url'],
			stargazers_count: row['stargazers_count'],
			description: row['description'],
			homepage:row['homepage']
		})
	});
	cb(null, repo);
}

/* Fetch Public user profile */

exports.profile=function(username,callback) { 
	var proxy=process.env['HTTP_PROXY'] || process.env['http_proxy'];
	var options = {
	  headers: {
	    'User-Agent': 'KhirwalSumeet'
	  }
	};
	if(proxy)
		options.proxy = proxy;
	if(username == undefined){
		var response={};
		response["message"]="Please send username along with the request data in form of urlencoded form data";
		response["status"]=491;
		callback(null,response);
		return;
	}
	request(githubApi+username,options,function (error, response, body) {
		body=JSON.parse(body);
		if (!error && body.message == undefined) {
			userProfile=getprofile(body);
			callback(null,userProfile);
		}else if(!error && body.message!=undefined){
			var noAccount={};
			noAccount["error"]=body.message;
			callback(null,noAccount);
		}else{
			callback(error,null);
		}
	});
};

/* Filter required fields from user data */

function getprofile(data){
	var user={};
	user["Name"]=data["login"];
	user["Email"]=data["email"];
	user["Location"]=data["location"];
	user["Number of followers"]=data["followers"];
	return user;
}