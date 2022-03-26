const child = require('child_process');

function checkRepoPublic() {
  return new Promise((resolve, reject) => {
    try {
      const currentUserEmail = child
        .execSync('git config user.email')
        .toString()
        .split('\n')[0];

      const emailSlugs = child
        .execSync('git shortlog -se --all --pretty=email')
        .toString()
        .split('\n');

      for (let emailSlug of emailSlugs) {
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
