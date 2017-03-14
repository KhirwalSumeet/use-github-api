var express = require('express');
var router = express.Router();
var async=require('async');
var repo=require('../helpers/repo');
var profile=require('../helpers/profile');

/* To fetch public repositories of a user */

router.post('/user/repo',repo.fetch);

/* To fetch public profile of a user */

router.post('/user/profile',profile.fetch);

/* To fetch the most popular repos */

router.post('/user/repo/popular',repo.popular);

module.exports = router;
