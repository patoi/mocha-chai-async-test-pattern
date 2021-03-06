# mocha-chai-async-test-pattern
Async/await test example with Chai, Mocha and try-catch-finally without chai-as-promised

Writing flawless test is not easy.

More information on [medium.com](https://medium.com/@patoistvan/testing-async-await-in-javascript-8a449a5df7af)

✨ Example code:

```javascript
async function testFunction (isOK) {
    if (isOK === true) {
      return 'OK'
    } else {
      throw new Error('not OK')
    }
}
```

**Simulating code flaw:** change ```isOK === true```  to ```isOK === false``` in testFunction.

## 👎 Naive testing async/await code

```javascript
it('is OK - not bad', async () => {
  let result = await testFunction(true)
  expect(result).to.be.equal('OK')
  // flawed test throws an error, but it is not a test error (AssertionError)
})

it('is not OK - bad!', async () => {
  try {
    let result = await testFunction(false)
    // flawed tests __pass__ instead of throw an error!
  } catch (err) {
    expect(err.message).to.be.equal('not OK')
  }
})

it('is not OK - not bad, but it could be better', async () => {
  try {
    let result = await testFunction(false)
    expect.fail()
    // add expect.fail(), and flawed test throws an ugly error:
  } catch (err) {
    // ...'AssertionError: expected 'expect.fail()' to equal 'not OK''
    expect(err.message).to.be.equal('not OK')
  }
})
```

## 👍 Better way

```javascript
// handlig resolve, reject in try - catch, and run tests in finally block
it('is not OK - better way', async function() {
  let result, error
  try {
    result = await testFunction(false)
  } catch (err) {
    error = err
  } finally {
    expect(result).to.be.undefined() // handling flawed test case
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
    expect(error).to.be.undefined() // handling flawed test case
    expect(result).to.be.equal('OK')
  }
})
```
