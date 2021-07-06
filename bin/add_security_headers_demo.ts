#!/usr/bin/env node

import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {
    AddSecurityHeadersDemoStack
} from '../lib/add_security_headers_demo-stack';
const AWS = require('aws-sdk');
const fs = require('fs');

async function main() {
    const folder = './';
    const parentFileName = 'add-security-headers-without-cloudfront.yaml';
    const childFileName = 'add-security-headers.yaml';
    const bucketName = 'aws-cloudfront-extensions-cff';

    await downloadTemplate(bucketName, parentFileName, folder + parentFileName);
    await downloadTemplate(bucketName, childFileName, folder + childFileName);

    const app = new cdk.App();
    new AddSecurityHeadersDemoStack(app, 'AddSecurityHeadersDemoStack', {
        parentPath: folder + parentFileName,
        childPath: folder + childFileName,
    });

    app.synth();
}

async function downloadTemplate(bucket: string, key: string, filePath: string) {
    const s3 = new AWS.S3();

    return s3.getObject({
        Bucket: bucket,
        Key: key
    }).promise().then((data: any) => {
        fs.writeFileSync(filePath, data.Body);
    }).catch((err: any) => {
        throw err
    })
}

main();
