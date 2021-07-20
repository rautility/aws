// Params
var customUserAgent = 'your-custom-user-agent-text';
var bucketName = 'your-bucket-name'

// Create AWS object
var AWS = require("aws-sdk");

// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01', customUserAgent: customUserAgent});

// Bucket Params
var bucketParams = {
  Bucket : bucketName
};

// call S3 to create the bucket
s3.createBucket(bucketParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});