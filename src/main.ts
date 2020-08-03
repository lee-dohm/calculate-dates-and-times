import * as core from '@actions/core'
import moment from 'moment'

type Duration = [number, moment.unitOfTime.Base]

export function getDuration(text: string): Duration {
  if (text.match(/^\s*$/)) {
    throw new Error(
      'A duration specification must be supplied such as "2 days", but none was given'
    )
  }

  const values = text.split(/\s+/)

  return [parseInt(values[0]), values[1] as moment.unitOfTime.Base]
}

async function run(): Promise<void> {
  try {
    const add = core.getInput('add')
    const format = core.getInput('format')
    const subtract = core.getInput('subtract')

    let value = moment().utc()

    if (add) {
      core.debug(`Add ${add} to ${value.format()}`)

      const params = getDuration(add)
      value = value.add(...params)
    }

    if (subtract) {
      core.debug(`Subtract ${subtract} from ${value.format()}`)

      const params = getDuration(subtract)
      value = value.subtract(...params)
    }

    core.setOutput('date', value.format(format))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
