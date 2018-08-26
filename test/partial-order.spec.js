const ava = require('ava')
const instances = require('../instances.js')

ava.test('Boolean: false <= true', (test) => {
  test.is(instances.boolean.leq(false, false), true)
  test.is(instances.boolean.leq(false, true), true)
  test.is(instances.boolean.leq(true, false), false)
  test.is(instances.boolean.leq(true, true), true)
})

ava.test('JSON: {} <= { a: 1 } <= { a: 2 } ', (test) => {
  const boolTrue = {
    a: true
  }
  const boolFalse = {
    a: false
  }
  const jsonFalse = {
    a: {
      a: false
    }
  }
  const jsonTrue = {
    a: {
      a: true
    }
  }

  test.is(instances.object.leq({}, {}), true)
  test.is(instances.object.leq(boolFalse, boolTrue), true)
  test.is(instances.object.leq(boolTrue, boolFalse), false)
  test.is(instances.object.leq(jsonFalse, jsonTrue), true)
  test.is(instances.object.leq(jsonTrue, jsonFalse), false)
  test.is(instances.object.leq(boolFalse, jsonFalse), false)
  test.is(instances.object.geq(boolFalse, jsonFalse), false)
})



ava.test('number: -1 <= 0 <= 1 <= 10 ', (test) => {
  test.is(instances.number.leq(-1, 0), true)
  test.is(instances.number.leq(-1, 1), true)
  test.is(instances.number.leq(1, -1), false)
  test.is(instances.number.leq(1, 10), true)
  test.is(instances.number.leq(0, -1), false)
})
