import { generatePoints } from "./data.js";
import { initGraphics, setDrawables } from "./gfx.js";


async function main() {
    initGraphics();
    const points = generatePoints(1000);
    setDrawables(points);
}


window.onload = main;