import { Matrix, addMatrices, mapByElt, multiply, multiplyByElement, multiplyScalar, randomMatrix, subtractMatrices, transpose } from "./matrix.js";
import { getDerivative } from "./util.js";

export class Layer {
    
    private weights: Matrix | undefined;
    private biases: Matrix | undefined;
    private layerSize: number;
    
    private lastInput: Matrix | undefined;
    private lastOutput: Matrix | undefined;

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
        this.lastInput = inputVector;
        const multResult = multiply(this.weights, inputVector);
        const weightedSums = addMatrices(multResult, this.biases);
        const out = this.activationFunction(weightedSums);
        this.lastOutput = weightedSums;
        return out;
    } 

    public backPropagation(outErrors: Matrix, lr: number): Matrix {
        if (!this.weights || !this.biases) {
            throw new Error("Weights or biases not yet initialized");
        }
        if (!this.lastInput) {
            throw new Error("Last input not stored");
        }
        if (!this.lastOutput) {
            throw new Error("Last output not stored");
        }


        // Calculate the error for the previous layer
        const weightsTransposed = transpose(this.weights);
        const prevLayerErrors = multiply(weightsTransposed, outErrors);
            

        // Calculate gradient of the activation function for each neuron output
        const derivative = getDerivative(this.activationFunction);
        const outGradient = derivative(this.lastOutput);
        
        // Multiply gradient by the errors (element-wise)
        const gradientError = multiplyByElement(outGradient, outErrors);

        // Adjust biases by gradient error scaled by learning rate
        const biasDeltas = multiplyScalar(gradientError, lr);
        this.biases = addMatrices(this.biases, biasDeltas);
    
        // Calculate deltas for weights
        const inputsTransposed = transpose(this.lastInput);
        const weightDeltas = multiply(biasDeltas, inputsTransposed);
        this.weights = addMatrices(this.weights, weightDeltas);
    
        return prevLayerErrors;
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

    public fitOne(input: number[], targets: number[]) {
        const predictions = this.predOne(input);
        const predMatrix = new Matrix([predictions]);
        const targetMatrix = new Matrix([targets]);

        let errors = transpose(subtractMatrices(targetMatrix, predMatrix));
        
        for (let i = this.layers.length - 1; i >= 0 ; i--) {
            errors = this.layers[i].backPropagation(errors, this.learningRate);
        }
        return errors;
    }
}
