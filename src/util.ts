import { Matrix, addScalar, mapByElt, multiplyByElement, oneMatrix, subtractMatrices, zeroMatrix } from "./matrix.js";

export class ActivationFunction {
    static sigmoid = (l: Matrix): Matrix => {
        return mapByElt(l, (x: number) => 1 / (1 + Math.exp(-x)));
    }

}

export class ActivationDerivatives {
    static sigmoid = (l: Matrix): Matrix => {
        return mapByElt(l, (x: number) => {
            x = 1 / (1 + Math.exp(-x));
            return x * (1 - x);
        });
    }

}

export function getDerivative(f: (x: Matrix) => Matrix): (x: Matrix) => Matrix {
    if (f == ActivationFunction.sigmoid) return ActivationDerivatives.sigmoid;

    throw new Error("Can't find derivative of the function");
}