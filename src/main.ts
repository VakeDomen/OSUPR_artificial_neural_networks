import { Point, generatePoints } from "./data.js";
import { initGraphics, setDrawables } from "./gfx.js";
import { Perceptron } from "./perceptron.js";

async function main() {
    initGraphics();
    const points = generatePoints(1000);
    setDrawables(points);


    const model = new Perceptron(2);

    for (const point of points) {
        const inputVector = [point.x, point.y];
        const error = model.fitOne(inputVector, point.label);
        predictAndDrawAll(model, points);
        await sleep(100);
    }

    console.log("Learning done!");

}


function predictAndDrawAll(model: Perceptron, data: Point[]): void {
    for (const point of data) {
        const inputVector = [point.x, point.y];
        const prediction = model.predOne(inputVector);
        point.guessed = (prediction == point.label);
    }
}


const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


window.onload = main;