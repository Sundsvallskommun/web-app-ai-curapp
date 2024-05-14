import { exec } from 'child_process';
import path from 'path';
import fs from 'node:fs';

import { INTRIC_API_BASE_URL } from './config/index';

const PATH_TO_OUTPUT_DIR = path.resolve(process.cwd(), './src/data-contracts');

//Subscribed APIS as lowercased
const APIS = [
  {
    name: 'intric',
    version: '1.0',
  },
];

const stdout = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`Data-contract-generator: ${stdout}`);
};

const main = async () => {
  console.log('Downloading and generating api-docs..');
  APIS.forEach(async api => {
    if (!fs.existsSync(`${PATH_TO_OUTPUT_DIR}/${api.name}`)) {
      fs.mkdirSync(`${PATH_TO_OUTPUT_DIR}/${api.name}`, { recursive: true });
    }

    await exec(`curl -o ${PATH_TO_OUTPUT_DIR}/${api.name}/swagger.json ${INTRIC_API_BASE_URL}/openapi.json`, () =>
      console.log(`- ${api.name} ${api.version}`),
    );
    await exec(
      `npx swagger-typescript-api --modular -p ${PATH_TO_OUTPUT_DIR}/${api.name}/swagger.json -o ${PATH_TO_OUTPUT_DIR}/${api.name} --no-client --clean-output --extract-enums`,
      stdout,
    );
  });
};

main();
