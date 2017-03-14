var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);
var time = 5000; // required if code is executed on localhost due to poor connectivity

describe("Checking library api : /api/user/profile",function(done){
	it("Fetching public profile of user KhirwalSumeet using /api/user/profile", function(done) {
	// As it takes time to fetch from github api
		this.slow(time);
		this.timeout(time);
		chai.request(server)
		.post('/api/user/profile')
		.send({"username":"KhirwalSumeet"})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
		});
	});
	it("Returns status 491 if username is not sent", function(done) {
		chai.request(server)
		.post('/api/user/profile')
		.end(function(err, res){
			res.body.should.have.status(491);
			done();
		});
	});
});

describe("Checking library api : /api/user/repo",function(done){
	it("Fetching public repositories of user KhirwalSumeet using /api/user/profile", function(done) {
	// As it takes time to fetch from github api
		this.slow(time);
		this.timeout(time);
		chai.request(server)
		.post('/api/user/repo')
		.send({"username":"KhirwalSumeet"})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
		});
	});
	it("Returns status 491 if username is not sent", function(done) {
		chai.request(server)
		.post('/api/user/repo')
		.end(function(err, res){
			res.body.should.have.status(491);
			done();
		});
	});
});

describe("Checking library api : /api/user/repo/popular [ BONUS ]",function(done){
	it("Fetching public repositories of user KhirwalSumeet using /api/user/profile", function(done) {
	// As it takes time to fetch from github api
		this.slow(time);
		this.timeout(time);
		chai.request(server)
		.post('/api/user/repo/popular')
		.send({"username":"KhirwalSumeet","numberOfRepos":"10"})
		.end(function(err, res){
			res.body.should.have.status(200);
			done();
		});
	});
	it("Returns status 493 if numberOfRepos/stargazers is not sent", function(done) {
		chai.request(server)
		.post('/api/user/repo/popular')
		.send({"username":"KhirwalSumeet"})
		.end(function(err, res){
			res.body.should.have.status(493);
			done();
		});
	});
	it("Returns status 494 if numberOfRepos is not valid", function(done) {
		chai.request(server)
		.post('/api/user/repo/popular')
		.send({"username":"KhirwalSumeet","numberOfRepos":"sat"})
		.end(function(err, res){
			res.body.should.have.status(494);
			done();
		});
	});
	it("Returns status 495 if stargazers is not valid", function(done) {
		chai.request(server)
		.post('/api/user/repo/popular')
		.send({"username":"KhirwalSumeet","stargazers":"sat"})
		.end(function(err, res){
			res.body.should.have.status(495);
			done();
		});
	});
});
