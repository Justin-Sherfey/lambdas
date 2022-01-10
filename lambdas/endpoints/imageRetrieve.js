import Responses from '../common/API_Responses';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

exports.handler = async event => {
	if(!event.body.key) {
		return Responses._400({ message: 'missing the ID from the path'});
	}

	var params = {
		Bucket: process.env.imageUploadBucket,
		Key: event.body.key,
	};
	
	const image = await s3.getObject(params).promise();

	const response = {
		statusCode: 200,
		body: JSON.stringify(image)
	};
	return response;
}