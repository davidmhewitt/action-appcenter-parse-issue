const core = require('@actions/core')
const { context, getOctokit } = require('@actions/github')

module.exports = { run }

async function run () {
    const octokit = getOctokit(core.getInput('token', { required: true }))
  
    const { data: issue } = await octokit.issues.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.payload.issue.number
    })

    core.info(issue.body)
  
    return true
}

if (require.main === module) {
    ;(async () => {
        try {
            await run()
        } catch (error) {
            core.error(error)
            core.setFailed(error.message)
        }
    })()
}