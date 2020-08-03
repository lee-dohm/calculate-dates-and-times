import { getDuration } from '../src/main'

describe('getDuration', () => {
  it('returns the appropriate values', () => {
    expect(getDuration('2 days')).toStrictEqual([2, 'days'])
  })

  it('throws when given an empty string', () => {
    expect(() => {
      getDuration('')
    }).toThrowError()
  })
})
