import { assertAlmostEquals, assertEquals } from "@std/assert";
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

Deno.test("circle north/east/south/west points", () => {
  const circle = new Circle(new Point2D(5, 5), 5);
  assertEquals(circle.north(), new Point2D(5, 10));
  assertEquals(circle.east(), new Point2D(10, 5));
  assertEquals(circle.south(), new Point2D(5, 0));
  assertEquals(circle.west(), new Point2D(0, 5));
});

Deno.test("point isBetweenX and isBetweenY", () => {
  const p = new Point2D(3, 4);
  const p1 = new Point2D(1, 1);
  const p2 = new Point2D(5, 6);

  assertEquals(p.isBetweenX(p1, p2), true);
  assertEquals(p.isBetweenY(p1, p2), true);
  assertEquals(p1.isBetweenX(p, p2), false);
  assertEquals(p1.isBetweenY(p, p2), false);
});

Deno.test("rectangle encompasses circle and circle encompasses rectangle", () => {
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(10, 10));
  const circleInside = new Circle(new Point2D(5, 5), 4);
  const circleOutside = new Circle(new Point2D(5, 5), 6);

  assertEquals(rect.encompasses(circleInside), true);
  assertEquals(rect.encompasses(circleOutside), false);

  const rectInside = new Rectangle(new Point2D(4, 4), new Point2D(6, 6));
  const circle = new Circle(new Point2D(5, 5), 5);

  assertEquals(circle.encompasses(rectInside), true);
  assertEquals(circle.encompasses(rect), false);
});
