import { ArtificialNeuralNetwork, Layer } from "./ann.js";
import { Point, generatePoints } from "./data.js";
import { initGraphics, setDrawables } from "./gfx.js";
import { Perceptron } from "./perceptron.js";
import { ActivationFunction } from "./util.js";

async function main() {
    initGraphics();
    const points = generatePoints(500);
    setDrawables(points);


    const model = new ArtificialNeuralNetwork(2, 0.001, [
        new Layer(50, ActivationFunction.sigmoid),
        new Layer(50, ActivationFunction.sigmoid),
        new Layer(2, ActivationFunction.sigmoid),
    ]);
    
    let epochs = 10;
    for (let i = 0 ; i < epochs ; i++) {
        console.log("Epoch: ", i);
        for (let i = 0 ; i < points.length ; i++) {
            const pt = points[i];

            const inputVector = [pt.x, pt.y];
            
            // make one hot encoded version
            const label = [0, 0];
            label[pt.label] = 1;
            
            model.fitOne(inputVector, label);

            if (i % 25 == 0) {
                predictAll(model, points);
            }
            await sleep(1);
        } 
    }
    console.log("Learning done?");

}

function predictAll(model: ArtificialNeuralNetwork, points: Point[]): void {
    // make the predictions
    for (const point of points) {
        const inputVector = [point.x, point.y];
        const y = model.predOne(inputVector);
        const y_norm = argMax(y);
        
        point.guessed = (y_norm == point.label);
    }
}

function argMax(vec: number[]): number {
    let maxIndex = 0;
    for (let i = 0 ; i < vec.length ; i++) {
        if (vec[i] > vec[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}


const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


window.onload = main;