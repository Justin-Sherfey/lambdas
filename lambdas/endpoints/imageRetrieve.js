import Responses from '../common/API_Responses';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

exports.handler = async event => {
	if(!event.pathParameters.ID) {
		return Responses._400({ message: 'missing the ID from the path'});
	}

	let ID = event.pathParameters.ID;

	const image = await s3.getObject({
		Key: ID,
		Bucket: process.env.imageUploadBucket,
        ACL: 'public-read',
	}).promise().catch(err => {
		console.log('error in retrieval', err);
		return null;
	});

	return Responses._200({ image });
}