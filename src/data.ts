import { Drawable } from "./gfx.js";

/** 
 * Represents a point that can be drawn on a canvas.
 * Implements the Drawable interface.
 */
export class Point implements Drawable {
    public x: number;
    public y: number;
    public label: number;
    public guessed: boolean;

    /**
     * Constructs a point.
     * @param {number} x - X coordinate of the point.
     * @param {number} y - Y coordinate of the point.
     * @param {number} label - The label of the point (used for coloring).
     */
    constructor(x: number, y: number, label: number) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.guessed = false;
    }

    /**
     * Draws the point on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} cw - Canvas width.
     * @param {number} ch - Canvas height.
     */
    public draw(ctx: CanvasRenderingContext2D, cw: number, ch: number): void {
        const displayX = this.x * cw;
        const displayY = this.y * ch;

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(displayX, displayY, 10, 0, 2 * Math.PI);

        // Fills the circle for label 1, otherwise just strokes it.
        if (this.label == 1) {
            ctx.fill();
        } else {
            ctx.stroke();
        }

        // Changes fill color based on the 'guessed' property.
        ctx.fillStyle = this.guessed ? "green" : "red";
        ctx.beginPath();
        ctx.arc(displayX, displayY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

/** 
 * Generates an array of random points.
 * @param {number} numOfPoints - Number of points to generate.
 * @return {Point[]} Array of Point objects.
 */
export function generatePoints(numOfPoints: number): Point[] {
    const points: Point[] = [];
    for (let i = 0; i < numOfPoints; i++) {
        const x = Math.random();
        const y = Math.random();
        let lab = y >= x ? 0 : 1;
        points.push(new Point(x, y, lab));
    }

    return points;
}
