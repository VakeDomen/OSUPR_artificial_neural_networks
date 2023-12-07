export class Perceptron {

    private bias: number;
    private weights: number[];
    private learningRate = 0.05;
    private activationFunction: (x: number) => number;
    private loss: (pred: number, goal: number) => number;


    constructor(inputLen: number) {
        this.weights = [];
        for (let i = 0 ; i < inputLen ; i++) {
            this.weights.push(Math.random() * 2 - 1);
        }
        this.activationFunction = ActivationFunction.sign;
        this.loss = LossFunction.absoluteError;
        this.bias = Math.random() * 2 - 1;
    }

    /**
     * Uses the Perceptron model to make a feed-forward prediction
     * @param input Input vector
     * @returns The prediction (output of the activation function)
     */
    public predOne(input: number[]): number {
        const weightedSum = this.weightedSum(input);
        const result = this.activationFunction(weightedSum);
        return result;
    }


    /**
     * Makes a feed-forward prediction and uses backpropagation
     * to update the weights based on the error.
     * @param input Input vector
     * @returns The error
     */
    public fitOne(input: number[], label: number): number {
        const prediction = this.predOne(input);
        const error = this.loss(prediction, label);
        this.adjustWeights(input, error);
        return error;
    }

    private adjustWeights(input: number[], error: number): void {
        for (let i = 0 ; i < this.weights.length ; i++) {
            this.weights[i] += error * input[i] * this.learningRate;
        }
        this.bias += error * this.learningRate;
    }

    private weightedSum(input: number[]): number {
        if (input.length != this.weights.length) {
            throw new Error("Prediction input vector size is incorrect");
        }

        let sum = (1 * this.bias);
        for (let i = 0 ; i < input.length ; i++) {
            sum += (input[i] * this.weights[i]);
        }
        return sum;
    }

}

class LossFunction {
    static absoluteError = (pred: number, goal: number) => {
        return goal - pred;
    }
}

class ActivationFunction {
    static sign = (x: number): number => {
        if (x >= 0) {
            return 1;
        } else {
            return -1;
        }
    }
}