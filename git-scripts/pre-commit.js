const prompt = require('prompt-sync')();
const checkRepoPublic = require('./checkRepoPublic');

function preCommit() {
  checkRepoPublic()
    .then((isPublic) => {
      if (!isPublic) {
        const response = prompt(
          'Respository is not public. Do you want to procees (y/n) ? '
        );
        if (response.toLowerCase() != 'y') process.exit(-1);
      } else {
        console.log('Repository is public');
      }
      return;
    })
    .then(() => {
      process.exit(0);
    });
}

preCommit();
