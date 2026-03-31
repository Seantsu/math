export interface Shape {
  circumference(): number;
  area(): number;
  encompasses(other: Shape): boolean;
}

export class Point2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  distanceTo(other: Point2D): number {
    return Math.sqrt(
      Math.abs(this.x - other.x) ** 2 + Math.abs(this.y - other.y) ** 2,
    );
  }

  isBetweenX(p: Point2D, q: Point2D): boolean {
    return p.x < this.x && this.x < q.x;
  }

  isBetweenY(p: Point2D, q: Point2D): boolean {
    return p.y < this.y && this.y < q.y;
  }
}

export class Circle implements Shape {
  constructor(
    private center: Point2D,
    private radius: number,
  ) {}

  circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  diameter(): number {
    return 2 * this.radius;
  }

  getCenter(): Point2D {
    return this.center;
  }

  getRadius(): number {
    return this.radius;
  }

  north(): Point2D {
    return new Point2D(this.center.x, this.center.y + this.radius);
  }

  east(): Point2D {
    return new Point2D(this.center.x + this.radius, this.center.y);
  }

  south(): Point2D {
    return new Point2D(this.center.x, this.center.y - this.radius);
  }

  west(): Point2D {
    return new Point2D(this.center.x - this.radius, this.center.y);
  }

  encompasses(other: Shape): boolean {
    if (other instanceof Rectangle) {
      const corners = [
        other.getBottomLeft(),
        new Point2D(other.getBottomLeft().x, other.getTopRight().y),
        other.getTopRight(),
        new Point2D(other.getTopRight().x, other.getBottomLeft().y),
      ];
      return corners.every((pt) => this.center.distanceTo(pt) < this.radius);
    }

    if (other instanceof Circle) {
      const distance = this.center.distanceTo(other.getCenter());
      return distance + other.getRadius() < this.radius;
    }

    return false;
  }
}

export class Rectangle implements Shape {
  constructor(
    private bottomLeft: Point2D,
    private topRight: Point2D,
  ) {}

  circumference(): number {
    return 2 * (this.width() + this.height());
  }

  area(): number {
    return this.width() * this.height();
  }

  diagonal(): number {
    return this.bottomLeft.distanceTo(this.topRight);
  }

  getBottomLeft(): Point2D {
    return this.bottomLeft;
  }

  getTopRight(): Point2D {
    return this.topRight;
  }

  encompasses(other: Shape): boolean {
    if (other instanceof Circle) {
      const m = other.getCenter();
      const circPoints = [other.north(), other.east(), other.south(), other.west()];
      if (!m.isBetweenX(this.bottomLeft, this.topRight)) {
        return false;
      }
      if (!m.isBetweenY(this.bottomLeft, this.topRight)) {
        return false;
      }

      return circPoints.every((p) =>
        p.isBetweenX(this.bottomLeft, this.topRight) &&
          p.isBetweenY(this.bottomLeft, this.topRight)
      );
    }

    if (other instanceof Rectangle) {
      const points = [
        other.bottomLeft,
        new Point2D(other.bottomLeft.x, other.topRight.y),
        other.topRight,
        new Point2D(other.topRight.x, other.bottomLeft.y),
      ];
      return points.every((p) =>
        p.isBetweenX(this.bottomLeft, this.topRight) &&
          p.isBetweenY(this.bottomLeft, this.topRight)
      );
    }

    return false;
  }

  private width(): number {
    return this.topRight.x - this.bottomLeft.x;
  }

  private height(): number {
    return this.topRight.y - this.bottomLeft.y;
  }
}
