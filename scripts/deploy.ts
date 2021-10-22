import fs from 'fs';
import path from 'path';
import Client from 'ssh2-sftp-client';

const sftp = new Client();

const config = {
  host: 'kennybecerra.com',
  username: 'kenbec8',
  privateKey: fs.readFileSync('C:\\Users\\kenny\\.ssh\\dreamhost_website', 'utf-8'),
};

const siteDir = 'kennybecerra.com';
const fileToBedeleted = new RegExp('\\.(js|ico|css|html|gif)$');
const dirToBeDeleted = new RegExp('(assets|js|css)');

const deployCode = async () => {
  try {
    await sftp.connect(config);

    let list = await sftp.list(siteDir).then((res) => res.filter(({ name }) => !name?.startsWith('.')));

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
