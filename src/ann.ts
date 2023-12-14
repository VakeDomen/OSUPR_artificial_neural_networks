import { Matrix, addMatrices, multiply, multiplyByElement, multiplyScalar, randomMatrix, transpose } from "./matrix.js";
import { getDerivative } from "./util.js";

export class Layer {
    
    private weights: Matrix | undefined;
    private biases: Matrix | undefined;
    private layerSize: number;
    
    private activationFunction: (x: Matrix) => Matrix;


    constructor(layerSize: number, activation: (x: Matrix) => Matrix) {
        this.layerSize = layerSize;
        this.activationFunction = activation;
    }

    public initWeights(intputs: number): number {
        this.weights = randomMatrix(intputs, this.layerSize);
        this.biases = randomMatrix(1, this.layerSize);
        return this.layerSize;
    }

    public getLayerSize(): number {
        return this.layerSize;
    }

    public feedForward(inputVector: Matrix): Matrix {
        if (!this.weights || !this.biases) {
            throw new Error("weights or biases not yet initialized");
        }
        const multResult = multiply(this.weights, inputVector);
        const weightedSums = addMatrices(multResult, this.biases);
        const out = this.activationFunction(weightedSums);
        return out;
    } 

}


export class ArtificialNeuralNetwork {

    private layers: Layer[];
    private learningRate: number;

    constructor(inputLength: number, learningRate: number, layers: Layer[]) {
        this.learningRate = learningRate;
        this.layers = layers;

        for (const layer of layers) {
            // tell the next layer the input size so it can correctly init matrix sizes
            inputLength = layer.initWeights(inputLength);
        }
    }


    public predOne(input: number[]): number[] {
        let feedForwardVector = transpose(new Matrix([input]));
        for (const layer of this.layers) {
            feedForwardVector = layer.feedForward(feedForwardVector);
        }
        return transpose(feedForwardVector).getValues()[0];
    }

}
