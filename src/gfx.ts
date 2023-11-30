/** Constants defining canvas dimensions and frame interval */
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;
const FRAME_INTERVAL = 50;

/** Array to hold drawable objects */
let drawables: Drawable[] = [];

/** 
 * Class representing a drawable object. 
 * This is a base class and should be extended with a specific draw method implementation.
 */
export class Drawable {
    /**
     * Method to draw the object. Should be implemented by subclasses.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} cw - Canvas width.
     * @param {number} ch - Canvas height.
     */
    public draw(ctx: CanvasRenderingContext2D, cw: number, ch: number): void {
        throw Error("You forgot to implement the draw method");
    }
}

/**
 * Sets the array of drawable objects.
 * @param {Drawable[]} dr - An array of Drawable objects.
 */
export function setDrawables(dr: Drawable[]): void {
    drawables = dr;
}

/** Initializes canvas graphics. Sets canvas size and starts the drawing interval. */
export function initGraphics(): void {
    const canvas = getCanvas();
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    setInterval(draw, FRAME_INTERVAL);
}

/** Draws all drawable objects onto the canvas. */
function draw(): void {
    const context = getCanvasContext();
    clearScreen(context);
    for (const drawable of drawables) {
        drawable.draw(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

/**
 * Clears the canvas.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 */
function clearScreen(context: CanvasRenderingContext2D) {
    context.fillStyle = "white";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/** Retrieves the canvas element from the DOM. Throws an error if not found. */
function getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementsByTagName("canvas")[0];
    if (!canvas) {
        throw new Error("Can't find canvas");
    }
    return canvas;
}

/** Retrieves the 2D context of the canvas. Throws an error if not found. */
function getCanvasContext(): CanvasRenderingContext2D {
    const canvas = getCanvas();
    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("Can't get canvas context");
    }
    return context;
}
