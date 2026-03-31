import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);

  // Act
  const float = fraction.toFloat(0.1);

  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);

  // Act
  const float = fraction.toFloat(0.01);

  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);

  // Act
  const result = left.add(right);

  // Assert
  assertAlmostEquals(result.toFloat(0.01), 0.67);
});

Deno.test("Fraction constructor throws on zero denominator", () => {
  try {
    new Fraction(3, 0);
    throw new Error("Should have thrown");
  } catch (e) {
    assertEquals((e as Error).message, "Denominator cannot be zero");
  }
});

Deno.test("Fraction.parse throws on zero denominator", () => {
  try {
    Fraction.parse("3 / 0");
    throw new Error("Should have thrown");
  } catch (e) {
    assertEquals((e as Error).message, "Denominator cannot be zero");
  }
});

Deno.test("fraction of -2/5 is -0.4", () => {
  const fraction = new Fraction(-2, 5);
  assertAlmostEquals(fraction.toFloat(0.01), -0.4);
});

Deno.test("fraction toString returns correct format", () => {
  const fraction = new Fraction(7, 8);
  assertEquals(fraction.toString(), "7/8");
});

Deno.test("fraction subtract works", () => {
  const left = new Fraction(3, 4);
  const right = new Fraction(1, 4);
  const result = left.subtract(right);
  assertAlmostEquals(result.toFloat(0.01), 0.5);
});

Deno.test("fraction multiply works", () => {
  const left = new Fraction(2, 3);
  const right = new Fraction(3, 4);
  const result = left.multiply(right);
  assertAlmostEquals(result.toFloat(0.01), 0.5);
});

Deno.test("fraction divide works", () => {
  const left = new Fraction(2, 3);
  const right = new Fraction(2, 3);
  const result = left.divide(right);
  assertAlmostEquals(result.toFloat(0.01), 1.0);
});

Deno.test("Fraction.parse parses valid string", () => {
  const f = Fraction.parse("  9 / 10 ");
  assertEquals(f.toString(), "9/10");
});

Deno.test("Fraction.parse throws on invalid string", () => {
  try {
    Fraction.parse("not a fraction");
    throw new Error("Should have thrown");
  } catch (e) {
    assertEquals((e as Error).message, 'illegal syntax: "[numerator]/[denominator]" required');
  }
});

Deno.test("Fraction.parse throws on non-numeric input", () => {
  try {
    Fraction.parse("a / b");
    throw new Error("Should have thrown");
  } catch (e) {
    assertEquals((e as Error).message, "non-numeric numerator/denominator");
  }
});

Deno.test("fraction cancel reduces correctly", () => {
  const fraction = new Fraction(15, 20);
  const reduced = fraction.cancel();
  assertEquals(reduced.toString(), "3/4");
});

Deno.test("fraction constructor auto-reduces values", () => {
  const fraction = new Fraction(10, 40);
  assertEquals(fraction.toString(), "1/4");
});

Deno.test("fraction parse auto-reduces values", () => {
  const fraction = Fraction.parse("  12 /  16 ");
  assertEquals(fraction.toString(), "3/4");
});
