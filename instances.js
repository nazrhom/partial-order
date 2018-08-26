const _ = require('lodash')
const PartialOrder = require('./partial-order')

const booleanLEQ = (a, b) => {
  if (!a) return true
  return b
}

const LEQ = (a, b) => {
  return a <= b
}

const stringLEQ = LEQ
const numberLEQ = LEQ

const objectLEQ = (a, b) => {
  for (const aKey of _.keys(a)) {
    const aValue = a[aKey]
    const bValue = b[aKey]

    if (_.isUndefined(bValue)) {
      return false
    }
    const aType = typeof aValue
    const bType = typeof bValue

    if (aType !== bType) {
      return false
    }

    if (!orders[aType].leq(aValue, bValue)) {
      return false
    }
  }
  return true
}

const orders = {
  boolean: new PartialOrder(booleanLEQ),
  string: new PartialOrder(stringLEQ),
  number: new PartialOrder(numberLEQ),
  object: new PartialOrder(objectLEQ),
  null: new PartialOrder(() => true),
  undefined: new PartialOrder(() => true)
}

module.exports = orders