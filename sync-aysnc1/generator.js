/**
 * ジェネレータ関数
 */
function* generatorFunc() {
  console.log('generator func start');
  console.log('yield 1');
  yield 1
  console.log('yield 2');
  yield 2
  console.log('yield 3');
  yield 3
  console.log('end generator func')
  return 'generator func return value'
}

const generator = generatorFunc()
