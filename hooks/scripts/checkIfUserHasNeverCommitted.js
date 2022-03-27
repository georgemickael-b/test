const child = require('child_process');

function checkRepoPublic(remote) {
  return new Promise((resolve, reject) => {
    try {
      child.execSync('git fetch --all');
      const currentUserEmail = child
        .execSync('git config user.email')
        .toString()
        .split('\n')[0];

      const emailSlugs = child
        .execSync(`git shortlog -se --all --remotes=${remote} --pretty=email`)
        .toString()
        .split('\n');

      for (let emailSlug of emailSlugs) {
        console.log(emailSlug);
        const email = emailSlug.trim().split(' ')[1];
        if (email === `<${currentUserEmail}>`) {
          resolve(true);
        }
      }
      resolve(false);
    } catch (err) {
      reject({
        msg: 'Cannot get committers of the repository'
      });
    }
  });
}

module.exports = checkRepoPublic;
