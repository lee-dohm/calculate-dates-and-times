import * as core from '@actions/core'
import moment from 'moment'

export function getDeltaParams(text: string): [number, moment.unitOfTime.Base] {
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
      const params = getDeltaParams(add)
      value = value.add(...params)
    }

    if (subtract) {
      const params = getDeltaParams(subtract)
      value = value.subtract(...params)
    }

    core.setOutput('date', value.format(format))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
