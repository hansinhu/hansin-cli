const { exec } = require('child_process');
const path = require('path')

exec('rm -rf ./dist/tmp && cp -R tmp ./dist/tmp', {
	cwd: path.resolve('./')
}, (err) => {
	if (err) {
		console.log(err)
	}
})