import { exec } from 'child_process'
import shell from 'shelljs'

async function getBranchName(): Promise<string> {
	return new Promise((resolvoe, reject) => {
		exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
				if (err) {
					reject(err)
				} else {
					resolvoe(stdout.trim())
				}
		})
	})
}

export function getBranchNameSync() {
  return shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout
}

export default getBranchName
