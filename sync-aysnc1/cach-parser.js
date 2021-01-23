const cache = {}

function parseJSONAsync(json, callback) {
  setTimeout(() => {
    try {
      callback(null, JSON.parse(json))
    } catch (err) {
      callback(err)
    }
  }, 1000)
}

function parseJSONAsyncWithCache(json, callback) {
  const cached = cache[json]
  if (cached) {
    // ここでsetTimeout, process.nextTick()を利用しない場合は、非同期と同期が混在しているため、アンチパターン
    process.nextTick(() => callback(cached.err, cached.result) )
    // for browser
    // 1. queueMicroTask()
    // queueMicroTask(() => callback(cached.err, cached.result))
    // 2. Promise.resolve()
    // Promise.resolve().then(() => callback(cached.err, cached.result))
    return
  }

  parseJSONAsync(json, (err, result) => {
    cache[json] = { err, result }
    callback(err, result)
  })
}

parseJSONAsyncWithCache(
  '{"message": "Hello", "to": "World"}',
  (err, result) => {
    console.log('1 time', err, result);

    // callback内で2回目
    parseJSONAsyncWithCache(
      '{"message": "Hello", "to": "World"}',
      (err, result) => {
        console.log('2 time', err, result);
      }
    )
    console.log('2回目の呼び出し完了');
  }
)
console.log('1回目の呼び出し完了')
