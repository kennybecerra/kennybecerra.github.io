import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Client from 'ssh2-sftp-client';

dotenv.config();

const sftp = new Client();

const config = {
  host: process.env.WEBSITE_HOST,
  username: process.env.WEBSITE_USERNAME,
  privateKey: fs.readFileSync(process.env.WEBSITE_RSA_LOCATION, 'utf-8'),
};

const siteDir = process.env.WEBSITE_REMOTE_DIRECTORY;
const fileToBedeleted = new RegExp('\\.(js|ico|css|html|gif)$');
const dirToBeDeleted = new RegExp('(assets|js|css)');

const deployCode = async () => {
  try {
    await sftp.connect(config);

    const list = await sftp.list(siteDir).then((res) => res.filter(({ name }) => !name?.startsWith('.')));

    const result = await Promise.allSettled(
      list.map(({ type, name }) => {
        switch (type) {
          case '-':
            if (fileToBedeleted.test(name)) {
              return sftp.delete(`${siteDir}/${name}`);
            }

            return Promise.reject(`${name} will not be deleted`);
          case 'd':
            if (dirToBeDeleted.test(name)) {
              return sftp.rmdir(`${siteDir}/${name}`, true);
            }

            return Promise.reject(`${name} will not be deleted`);
        }
      })
    );

    await sftp.uploadDir(path.join(__dirname, '..', 'dist'), 'kennybecerra.com');
  } catch (err) {
    console.log(err);
  } finally {
    sftp.end();
  }
};

deployCode();
