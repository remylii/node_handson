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

const toBeFulfilled = parseJSONAsync('{"foo": 1}')
const toBeRejected = parseJSONAsync("unko")
console.log('++++++++++++');
console.log(toBeFulfilled);
console.log(toBeRejected);
setTimeout(() => { console.log('**********'); console.log(toBeFulfilled); console.log(toBeRejected); }, 1000)
