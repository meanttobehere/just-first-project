const ghpages = require('gh-pages');
ghpages.publish('dist', {repo: 'https://github.com/meanttobehere/meanttobehere.github.io.git', branch: 'master'});