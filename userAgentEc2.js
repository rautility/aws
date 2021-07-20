// Params
var customUserAgent = 'your-custom-user-agent-text';
var keyPairName = 'your-key-pair';
var amiId = 'your-ami-id';

// Create AWS Object
var AWS = require("aws-sdk");

// Set the region 
AWS.config.update({region: 'us-east-1'});

var instanceParams = {
    ImageId: amiId, 
    InstanceType: 't2.micro',
    KeyName: keyPairName,
    MinCount: 1,
    MaxCount: 1
 };
 
 // Create a promise on an EC2 service object
 var instancePromise = new AWS.EC2({apiVersion: '2016-11-15', customUserAgent: customUserAgent}).runInstances(instanceParams).promise();
 
 // Handle promise's fulfilled/rejected states
 instancePromise.then(
   function(data) {
     console.log(data);
     var instanceId = data.Instances[0].InstanceId;
     console.log("Created instance", instanceId);
     // Add tags to the instance
     tagParams = {Resources: [instanceId], Tags: [
        {
           Key: 'Name',
           Value: 'SDK Sample'
        }
     ]};
     // Create a promise on an EC2 service object
     var tagPromise = new AWS.EC2({apiVersion: '2016-11-15', customUserAgent: customUserAgent}).createTags(tagParams).promise();
     // Handle promise's fulfilled/rejected states
     tagPromise.then(
       function(data) {
         console.log("Instance tagged");
       }).catch(
         function(err) {
         console.error(err, err.stack);
       });
   }).catch(
     function(err) {
     console.error(err, err.stack);
   });
