var githubApi=require('../library/github-api');

/* Load error code */

var fs = require('fs');
var jsonPath = './data/messages.json';
fs.readFile(jsonPath, 'utf8', function (err, data) {
	if (err){
		throw err;
  	}
	messages = JSON.parse(data);
});

exports.fetch=function (req, res, next) { 
	username=req.body.username;
    githubApi.profile(username,function(err,data){
    	var response={};
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