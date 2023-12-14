import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { Point, generatePoints } from "./data.js";
import { initGraphics, setDrawables } from "./gfx.js";
import { Perceptron } from "./perceptron.js";
import { ActivationFunction } from "./util.js";

async function main() {
    initGraphics();
    const points = generatePoints(1000);
    setDrawables(points);


    const model = new ArtificialNeuralNetwork(2, 0.001, [
        new Layer(50, ActivationFunction.sigmoid),
        new Layer(50, ActivationFunction.sigmoid),
        new Layer(2, ActivationFunction.sigmoid),
    ]);
    


}



const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


window.onload = main;