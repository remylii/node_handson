function parseJSONAsync(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(json))
      } catch (err) {
        reject(err)
      }
    }, 1000)
  })
}

function* asyncWithGeneratorFunc(json) {
  try {
    const result = yield parseJSONAsync(json)
    console.log('parse Result', result)
  } catch (err) {
    console.error('error catch', err)
  }
}

/**
> const awg1 = asyncWithGeneratorFunc('{"foo": 1 }')
undefined
> const promise1 = awg1.next().value
undefined
> promise1.then(result => awg1.next(result))
Promise { <pending> }
> parse Result { foo: 1 }
 */
