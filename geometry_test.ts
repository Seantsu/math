import { assertAlmostEquals } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("area of a circle with radius 5 is roughly 78.54", () => {
  const circle = new Circle(new Point2D(0, 0), 5);
  assertAlmostEquals(circle.area(), 78.54, 0.01);
});

Deno.test("diameter of a circle with radius 5 is 10", () => {
  const circle = new Circle(new Point2D(0, 0), 5);
  assertAlmostEquals(circle.diameter(), 10, 0.01);
});

Deno.test("distance between (0,0) and (3,4) is 5", () => {
  const p1 = new Point2D(0, 0);
  const p2 = new Point2D(3, 4);
  assertAlmostEquals(p1.distanceTo(p2), 5, 0.01);
});

Deno.test("rectangle circumference with width 4 height 3 is 14", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(4, 3));
  assertAlmostEquals(rect.circumference(), 14, 0.01);
});

Deno.test("rectangle area with width 4 height 3 is 12", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(4, 3));
  assertAlmostEquals(rect.area(), 12, 0.01);
});

Deno.test("rectangle diagonal with width 4 height 3 is 5", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(4, 3));
  assertAlmostEquals(rect.diagonal(), 5, 0.01);
});
