const ava = require('ava')
const jsc = require('jsverify')
const { check } = require('ava-jsverify')
const instances = require('../instances.js')
const _ = require('lodash')

const typeOf = (a) => {
  const type = typeof a
  return instances[type]
}

const reflexivity = (elems) => {
  return _.every(elems, (a) => {
    return typeOf(a).leq(a, a)
  })
}

const antisymmetry = (elems) => {
  const pairs = tuplesMatching(elems, 2, ([a, b]) => {
    return typeOf(a).leq(a, b) && typeOf(b).leq(b, a)
  })
  return _.every(pairs, ([a, b]) => {
    return typeOf(a).equ(a, b)
  })
}

const transitivity = (elems) => {
  const triplets = tuplesMatching(elems, 3, ([a, b, c]) => {
    return typeOf(a).leq(a, b) && typeOf(b).leq(b, c)
  })
  return _.every(triplets, ([a, b, c]) => {
    return typeOf(a).leq(a, c)
  })
}

const verifyAxioms = (test, elems) => {
  test.is(reflexivity(elems), true)
  test.is(antisymmetry(elems), true)
  test.is(transitivity(elems), true)
}

const tuplesMatching = (elems, k, testFn) => {
  const tuples = baseK(elems, k)
  return _.filter(tuples, testFn)
}

const baseK = (set, k) => {
  const combs = []
  if (k === 1) {
    for (let i = 0; i < set.length; i++) {
      combs.push([set[i]])
    }
    return combs
  }
  for (let i = 0; i < set.length; i++) {
    const head = set.slice(i, i + 1)
    const tailcombs = baseK(set, k - 1)
    for (let j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}

const toCanonicalKeys = (obj) => {
  let counter = 65
  return _.mapKeys(obj, (v, k) => {
    return String.fromCharCode(counter++)
  })
}

const restrictedJSON = jsc.dict(jsc.oneof([
  jsc.integer,
  jsc.string,
  jsc.bool
])).smap(toCanonicalKeys, _.identity)

const arbitraryPrimitiveJSON = restrictedJSON

ava.test('Verify axioms for boolean', check(jsc.array(jsc.bool), (test, elems) => {
  verifyAxioms(test, elems)
}))

ava.test('Verify axioms for numbers', check(jsc.array(jsc.integer), (test, elems) => {
  verifyAxioms(test, elems)
}))

ava.test('Verify axioms for strings', check(jsc.array(jsc.string), (test, elems) => {
  verifyAxioms(test, elems)
}))

ava.test('Verify axioms for objects', check(jsc.array(arbitraryPrimitiveJSON), (test, elems) => {
  verifyAxioms(test, elems)
}))

