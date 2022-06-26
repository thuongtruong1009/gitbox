const download = (repo: string) => `${repo}/archive/HEAD.zip`

const fork = (repo: string) => `${repo}/forks`

const generate = ( repo: string) => `${repo}/generate`

export { download, fork, generate}
