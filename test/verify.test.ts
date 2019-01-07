import verify from '../src/verify'

/**
 * verify test
 */
describe('verify test', () => {
  it('--------test-01: string type check---------', () => {
    expect(verify.isString('hello world')).toBeTruthy()
    expect(verify.isString({})).toBeFalsy()
    expect(verify.isString(123)).toBeFalsy()
  })

  it('--------test-02: url type check---------', () => {
    expect(verify.isUrl('http://www.google.com')).toBeTruthy()
    expect(
      verify.isUrl(
        'https://medium.com/s/notes-on-changing-your-life/how-to-develop-better-habits-in-2019-143e1e21ecbc'
      )
    ).toBeTruthy()
    expect(verify.isUrl('http://www')).toBeFalsy()
    expect(verify.isUrl('http://localhost:3000/test?page=1&page_size=10')).toBeTruthy()
    expect(verify.isUrl('')).toBeFalsy()
  })
})
