export function gcdBruteForce(a: number, b: number): number {
  const x = Math.abs(a);
  const y = Math.abs(b);
  if (x === 0 && y === 0) {
    return 0; // defined by convention (both zero)
  }
  if (x === 0) {
    return y;
  }
  if (y === 0) {
    return x;
  }

  const limit = Math.min(x, y);
  for (let i = limit; i >= 1; i--) {
    if (x % i === 0 && y % i === 0) {
      return i;
    }
  }
  return 1;
}

export function gcdEuclid(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  if (x === 0) {
    return y;
  }
  if (y === 0) {
    return x;
  }

  // recursive subtraction-based Euclid algorithm
  if (x === y) {
    return x;
  }

  if (x > y) {
    return gcdEuclid(x - y, y);
  }
  return gcdEuclid(x, y - x);
}
