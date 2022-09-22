import { exec } from 'child_process'

async function getCommit(branch: string): Promise<{commit: string, commitMessage: string}> {
	return new Promise((resolvoe, reject) => {
		exec(`git log master..${branch}  --pretty=format:"%h %s"`, (err, stdout, stderr) => {
			if (err) {
				reject(err)
			}
			const list = stdout.trim().split('\n')
	
			const commits = list.map((item) => {
				const [commit, ...message] = item.split(' ')
				return { commit, commitMessage: message.join(' ') }
			})

			const lastCommit = commits?.[0]

			if (!lastCommit) {
				reject(new Error('没有找到提交记录'))
			}

			resolvoe(lastCommit)
		})
	})
}

export default getCommit
