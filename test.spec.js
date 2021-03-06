const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

async function testFunction (isOK) {
    if (isOK === true) {
      return 'OK'
    } else {
      throw new Error('not OK')
    }
}

describe('testFunction', () => {
  it('is OK - not bad', async () => {
    let result = await testFunction(true)
    expect(result).to.be.equal('OK')
    // flawed test throws an error, but it is not a test error (AssertionError)
  })

  it('is not OK - bad!', async () => {
    try {
      let result = await testFunction(true)
      // flawed tests __pass__ instead of throws an error!
    } catch (err) {
      expect(err.message).to.be.equal('not OK')
    }
  })

  it('is not OK - not bad, but it could be better', async () => {
    try {
      let result = await testFunction(false)
      expect.fail()
      // flawed test throws an ugly error:
    } catch (err) {
      // ...'AssertionError: expected 'expect.fail()' to equal 'not OK''
      expect(err.message).to.be.equal('not OK')
    }
  })

  // handlig resolve, reject in try - catch, and run tests in finally
  it('is not OK - better way', async function() {
    let result, error
    try {
      result = await testFunction(false)
    } catch (err) {
      error = err
    } finally {
      expect(result).to.be.undefined() // guard: handling code flaw
      expect(error.message).to.be.equal('not OK')
    }
  })

  it('is OK - better way', async function() {
    let result, error
    try {
      result = await testFunction(true)
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.undefined() // guard: handling code flaw
      expect(result).to.be.equal('OK')
    }
  })
})
