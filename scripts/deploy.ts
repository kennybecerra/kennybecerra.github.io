import fs from 'fs';
import path from 'path';
import Client from 'ssh2-sftp-client';

const {
  WEBSITE_HOST,
  WEBSITE_REMOTE_DIRECTORY,
  WEBSITE_RSA_LOCATION,
  WEBSITE_USERNAME,
} = process.env;

const sftp = new Client();

const config = {
  host: WEBSITE_HOST,
  username: WEBSITE_USERNAME,
  privateKey: fs.readFileSync(WEBSITE_RSA_LOCATION as string, 'utf-8'),
};

const siteDir = WEBSITE_REMOTE_DIRECTORY as string;
const fileToBeDeleted = new RegExp('\\.(js|map|ico|css|html|gif)$');
const dirToBeDeleted = new RegExp('(assets|js|css)');

const deployCode = async () => {
  try {
    await sftp.connect(config);

    const list = await sftp
      .list(siteDir)
      .then((res) => res.filter(({ name }) => !name?.startsWith('.')));


    const result = await Promise.allSettled(
      list.map(({ type, name }) => {
        switch (type) {
          case '-':
            if (fileToBeDeleted.test(name)) {
              console.log(`file ${name} is set for deletion`);
              return sftp.delete(`${siteDir}/${name}`);
            }

            return Promise.reject(`${name} will not be deleted`);
          case 'd':
            if (dirToBeDeleted.test(name)) {
              console.log(`directory ${name} is set for deletion`);
              return sftp.rmdir(`${siteDir}/${name}`, true);
            }

            return Promise.reject(`${name} will not be deleted`);
        }
      })
    );

    await sftp.uploadDir(
      path.join(__dirname, '..', 'dist'),
      'kennybecerra.com'
    );
    console.log("files Uploaded")
  } catch (err) {
    console.log(err);
  } finally {
    await sftp.end();
    console.log('connection closed');
  }
};

deployCode();
