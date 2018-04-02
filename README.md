# mocha-chai-async-test-pattern
Async/await test example with Chai, Mocha and try-catch-finally without chai-as-promised

Writing flawless test is not easy.

✨ Example code:

```javascript
function testFunction (isOK) {
  return new Promise((resolve, reject) => {
    if (isOK === true) {
      resolve('OK')
    } else {
      reject(new Error('not OK'))
    }
  })
}
```

👎 Naive testing async/await code:

```javascript
it('is OK - not bad', async () => {
  let result = await testFunction(true)
  expect(result).to.be.equal('OK')
  // flawed test throws an error, but it is not a test error (AssertionError)
})

it('is not OK - bad!', async () => {
  try {
    let result = await testFunction(true)
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

👍 Better way:

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

☝️ **TIP:** to show all error messages change ```if (isOK === true)``` to ```if (isOK !== true)```
