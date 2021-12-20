const { exec } = require('child_process');
const path = require('path')

exec('cp -R tmp ./dist/tmp', {
	cwd: path.resolve('./')
}, (err) => {
	if (err) {
		console.log(err)
	}
})