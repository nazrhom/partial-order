class PartialOrder {
  constructor (leq) {
    this.leq = leq
  }

  geq (a, b) {
    return this.leq(b, a)
  }

  equ (a, b) {
    return this.leq(a, b) && this.geq(a, b)
  }

  neq (a, b) {
    return !this.eq(a, b)
  }

  lss (a, b) {
    return this.leq(a, b) && this.neq(a, b)
  }

  gtr (a, b) {
    return this.leq(b, a) && this.neq(a, b)
  }

  compare (a, b) {
    if (this.equ(a, b)) {
      return 0
    } else if (this.leq(a, b)) {
      return -1
    } else if (this.geq(a, b)) {
      return 1
    }
    return null
  }
}

module.exports = PartialOrder
