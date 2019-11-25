const BigInt = require('big-integer')
const { getByteArray, readBigIntFromBuffer, modExp } = require('../Helpers')
const FactorizatorLeemon = require('./FactorizatorLeemon');

class Factorizator {

    /**
     * Calculates the greatest common divisor
     * @param a {BigInteger}
     * @param b {BigInteger}
     * @returns {BigInteger}
     */
    static gcd(a, b) {
        while (b.neq(BigInt.zero)) {
            let temp = b
            b = a.remainder(b)
            a = temp
        }
        return a
    }

    /**
     * Factorizes the given number and returns both the divisor and the number divided by the divisor
     * @param pq {BigInteger}
     * @returns {{p: *, q: *}}
     */
    static factorize(pq) {
        const pqBuffer = getByteArray(pq);
        const { p: pBytes, q: qBytes } = FactorizatorLeemon.factorize(pqBuffer);
        return {
            p: Buffer.from(pBytes),
            q: Buffer.from(qBytes),
        };
    }

    // // TODO Broken. Sometimes this gets stuck for some reason.
    // static factorize(pq) {
    //     console.log("I am going to f", pq)
    //     if (pq.remainder(2).equals(BigInt.zero)) {
    //         return { p: BigInt(2), q: pq.divide(BigInt(2)) }
    //     }
    //     let y = BigInt.randBetween(1, pq.minus(1))
    //     const c = BigInt.randBetween(1, pq.minus(1))
    //     const m = BigInt.randBetween(1, pq.minus(1))
    //     let g = BigInt.one
    //     let r = BigInt.one
    //     let q = BigInt.one
    //     let x = BigInt.zero
    //     let ys = BigInt.zero
    //
    //     let k
    //     while (g.eq(BigInt.one)) {
    //         x = y
    //         for (let i = 0; BigInt(i).lesser(r); i++) {
    //             y = (modExp(y, BigInt(2), pq)).add(c).remainder(pq)
    //         }
    //         k = BigInt.zero
    //         while (k.lesser(r) && g.eq(BigInt.one)) {
    //             ys = y
    //             let condition = BigInt.min(m, r.minus(k))
    //             for (let i = 0; BigInt(i).lesser(condition); i++) {
    //                 y = (modExp(y, BigInt(2), pq)).add(c).remainder(pq)
    //                 q = q.multiply(x.minus(y).abs()).remainder(pq)
    //             }
    //
    //             g = Factorizator.gcd(q, pq)
    //             k = k.add(m)
    //         }
    //         r = r.multiply(2)
    //     }
    //
    //     if (g.eq(pq)) {
    //         while (true) {
    //             ys = (modExp(y, BigInt(2), pq)).add(c).remainder(pq)
    //             g = Factorizator.gcd(x.minus(ys).abs(), pq)
    //             if (g.greater(1)) {
    //                 break
    //             }
    //         }
    //     }
    //     const p = g
    //     q = pq.divide(g)
    //
    //     return p < q ? { p: p, q: q } : { p: q, q: p }
    // }
}

module.exports = Factorizator
