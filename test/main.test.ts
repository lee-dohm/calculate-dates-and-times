import { getDeltaParams } from '../src/main'

describe('getDeltaParams', () => {
  it('returns the appropriate values', () => {
    expect(getDeltaParams('2 days')).toStrictEqual([2, 'days'])
  })

  it('throws when given an empty string', () => {
    expect(() => {
      getDeltaParams('')
    }).toThrowError()
  })
})
