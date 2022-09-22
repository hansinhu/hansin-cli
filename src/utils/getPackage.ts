import path from 'path'
import { promises as fs } from 'fs'

const getPackage = async () => {
	const packagePath = path.resolve(process.cwd(), 'package.json')
  const packageStr = await fs.readFile(packagePath, 'utf-8')
  const projectPackage = JSON.parse(packageStr)
	return projectPackage
}

export default getPackage
