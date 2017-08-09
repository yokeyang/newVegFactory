//nodejs offer process
const args = [ 'start' ];
const opts = { stdio: 'inherit' , cwd: 'vegfactory', shell: true };
require('child_process').spawn('npm', args, opts);
