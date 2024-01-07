export class Matrix {
    private values: number[][];

    /**
     * Will create a Matrix object from a two dimensional array of numbers. The
     * point of the wrapper object is so be able to enforce some rules about the
     * matrix operations, that are not enforced if using only the arrays, such as
     * consistent dimensionality.
     * @param values 2 dimensional array of numbers
     */
    constructor(values: number[][]) {
        if (!values) {
            throw new Error("Enter values to create a Matrix");
        }

        if (values.length == 0) {
            throw new Error("At least one row needed");
        }

        if (values[0].length == 0) {
            throw new Error("At least one column needed");
        }

        const rowLen = values[0].length;
        for (const row of values) {
            if (row.length != rowLen) {
                throw new Error("Inconsistent row lengths");
            }
        }

        this.values = values;
    }

    /**
     * Fetch the matrix number of columns
     * @returns Num of columns
     */
    public getCols(): number {
        return this.values[0].length;
    }


    /**
     * Fetch the matrix number of rows
     * @returns Num of rows
     */
    public getRows(): number {
        return this.values.length;
    }

    /**
     * Logs matrix dimensions and values to the console
     */
    public log(): void {
        console.log("Dimensions: (" + this.getRows() + " | " + this.getCols() + ")");
        console.table(this.values);
    }

    /**
     * Function returns the underlying values of the matrix object. Returns a deep clone
     * of the matrix values.
     * @returns 2-dimensional array that is a clone of the matrix values
     */
    public getValues(): number[][] {
        return JSON.parse(JSON.stringify(this.values));
    }

}

/**
 * The function creates a zero Matrix object of desired dimensions
 * @param cols Number of culumns
 * @param rows Number of rows
 * @returns Matrix object of (col x row) dimensions filled with 0
 */
export function zeroMatrix(cols: number, rows: number): Matrix {
    if (cols < 1) {
        throw new Error("You need at least one column");
    }
    if (rows < 1) {
        throw new Error("You need at least one row");
    }

    const values: number[][] = [];
    for (let i = 0 ; i < rows ; i++) {
        values.push([]);
        for (let j = 0 ; j < cols ; j++) {
            values[i].push(0);
        }
    }
    return new Matrix(values);
}

/**
 * The function creates a zero Matrix object of desired dimensions
 * @param cols Number of culumns
 * @param rows Number of rows
 * @returns Matrix object of (col x row) dimensions filled with 0
 */
export function oneMatrix(cols: number, rows: number): Matrix {
    if (cols < 1) {
        throw new Error("You need at least one column");
    }
    if (rows < 1) {
        throw new Error("You need at least one row");
    }

    const values: number[][] = [];
    for (let i = 0 ; i < rows ; i++) {
        values.push([]);
        for (let j = 0 ; j < cols ; j++) {
            values[i].push(1);
        }
    }
    return new Matrix(values);
}

/**
 * The function creates a random Matrix object of desired dimensions.
 * All the values in the matrix are going to be between 0 and 1.
 * @param cols Number of culumns
 * @param rows Number of rows
 * @returns Matrix object of (col x row) dimensions filled with random 
 * numbers
 */
export function randomMatrix(cols: number, rows: number): Matrix {
    if (cols < 1) {
        throw new Error("You need at least one column");
    }
    if (rows < 1) {
        throw new Error("You need at least one row");
    }

    const values: number[][] = [];
    for (let i = 0 ; i < rows ; i++) {
        values.push([]);
        for (let j = 0 ; j < cols ; j++) {
            values[i].push(Math.random() * 4 - 2);
        }
    }
    return new Matrix(values);
}

/**
 * Adds a scalar to every element of the given matrix. The result is a new 
 * matrix and the source matrix is left unchangd.
 * @param mat Source Matrix
 * @param scalar Value to be added to all elemnts of the matrix
 * @returns a new Matrix that is the result of the add-scalar operation
 */
export function addScalar(mat: Matrix, scalar: number): Matrix {
    const values = mat.getValues();
    for (let i = 0 ; i < mat.getRows() ; i++) {
        for (let j = 0 ; j < mat.getCols() ; j++) {
            values[i][j] += scalar;
        }
    }
    return new Matrix(values);
}

/**
 * Adds a scalar to every element of the given matrix. The result is a new matrix and
 * the source matrix is left unchanged.
 * @param mat Source matrix
 * @param func transformation function to be applied to all the elements
 * @returns a new matrix that is the result of the add-scalar operation
 */
export function mapByElt(mat: Matrix, func: (n: number) => number): Matrix {
    const values = mat.getValues();
    for (let i = 0 ; i < mat.getRows() ; i++) {
        for (let j = 0 ; j < mat.getCols() ; j++) {
            values[i][j] = func(values[i][j]);
        }
    }
    return new Matrix(values);
}

/**
 * Multiplay two matrices. The source matrices will remain unchanged and the result is a new matrix. 
 * The function throws if the multiplication dimensions do not match. The amount of columns in m1 should
 * fit the amount of rows in m2.
 * @param m1 First operand
 * @param m2 Second operand
 * @returns a new matrix that is the result of matrix multiplication of the first and second operand
 */
export function multiply(m1: Matrix, m2: Matrix): Matrix {
    if (m1.getCols() != m2.getRows()) {
        throw new Error("Invalid dimensions for matrix multiplication");
    }
    const values = zeroMatrix(m2.getCols(), m1.getRows()).getValues();
    const m1values = m1.getValues();
    const m2values = m2.getValues();
    for (let row = 0 ; row < m1.getRows() ; row++) {
        for (let col = 0 ; col < m2.getCols() ; col++) {
            for (let offset = 0 ; offset < m1.getCols() ; offset++) {
                values[row][col] += m1values[row][offset] * m2values[offset][col];
            }
        }
    }
    return new Matrix(values);
}

/**
 * Transposes the given matrix. Transposing a matrix involves swapping its rows and columns:
 * the first row becomes the first column, the second row becomes the second column, and so on.
 * This function does not modify the original matrix, but rather returns a new transposed Matrix.
 *
 * @param mat The Matrix to be transposed.
 * @returns A new Matrix object that is the transpose of the input matrix.
 */
export function transpose(mat: Matrix): Matrix {
    const rows = mat.getRows();
    const cols = mat.getCols();
    const transposedValues: number[][] = [];
    const vals = mat.getValues();
    for (let i = 0; i < cols; i++) {
        transposedValues[i] = [];
        for (let j = 0; j < rows; j++) {
            transposedValues[i][j] = vals[j][i];
        }
    }

    return new Matrix(transposedValues);
}

/**
 * Adds two matrices together. The function iterates through each element of the matrices,
 * sums the corresponding elements, and stores the result in a new matrix.
 * Both matrices must have the same dimensions. If they don't, an error is thrown.
 * 
 * @param mat1 The first Matrix to be added.
 * @param mat2 The second Matrix to be added.
 * @returns A new Matrix object that is the result of adding the two input matrices.
 * @throws Error if the input matrices have different dimensions.
 */
export function addMatrices(mat1: Matrix, mat2: Matrix): Matrix {
    if (mat1.getRows() !== mat2.getRows() || mat1.getCols() !== mat2.getCols()) {
        throw new Error("Matrices must have the same dimensions to be added.");
    }

    const rows = mat1.getRows();
    const cols = mat1.getCols();
    const summedValues: number[][] = [];
    const m1 = mat1.getValues();
    const m2 = mat2.getValues();

    for (let i = 0; i < rows; i++) {
        summedValues[i] = [];
        for (let j = 0; j < cols; j++) {
            summedValues[i][j] = m1[i][j] + m2[i][j];
        }
    }

    return new Matrix(summedValues);
}

/**
 * Subtracts the second matrix from the first matrix. The function iterates through each element of the matrices,
 * subtracts the corresponding elements of the second matrix from the first, and stores the result in a new matrix.
 * Both matrices must have the same dimensions. If they don't, an error is thrown.
 * 
 * @param mat1 The Matrix from which the second matrix will be subtracted.
 * @param mat2 The Matrix to be subtracted from the first matrix.
 * @returns A new Matrix object that is the result of the subtraction.
 * @throws Error if the input matrices have different dimensions.
 */
export function subtractMatrices(mat1: Matrix, mat2: Matrix): Matrix {
    if (mat1.getRows() !== mat2.getRows() || mat1.getCols() !== mat2.getCols()) {
        throw new Error("Matrices must have the same dimensions to be subtracted.");
    }

    const rows = mat1.getRows();
    const cols = mat1.getCols();
    const subtractedValues: number[][] = [];
    const m1 = mat1.getValues();
    const m2 = mat2.getValues();

    for (let i = 0; i < rows; i++) {
        subtractedValues[i] = [];
        for (let j = 0; j < cols; j++) {
            subtractedValues[i][j] = m1[i][j] - m2[i][j];
        }
    }

    return new Matrix(subtractedValues);
}


/**
 * Multiplies two matrices element-wise. The function iterates through each element of the matrices
 * and multiplies the corresponding elements. Both matrices must have the same dimensions.
 * If they don't, an error is thrown.
 *
 * @param mat1 The first matrix for element-wise multiplication.
 * @param mat2 The second matrix for element-wise multiplication.
 * @returns A new Matrix object resulting from the element-wise multiplication of mat1 and mat2.
 * @throws Error if the input matrices have different dimensions.
 */
export function multiplyByElement(mat1: Matrix, mat2: Matrix): Matrix {
    if (mat1.getRows() !== mat2.getRows() || mat1.getCols() !== mat2.getCols()) {
        throw new Error("Matrices must have the same dimensions for element-wise multiplication.");
    }

    const rows = mat1.getRows();
    const cols = mat1.getCols();
    const multipliedValues: number[][] = [];
    const m1 = mat1.getValues();
    const m2 = mat2.getValues();

    for (let i = 0; i < rows; i++) {
        multipliedValues[i] = [];
        for (let j = 0; j < cols; j++) {
            multipliedValues[i][j] = m1[i][j] * m2[i][j];
        }
    }

    return new Matrix(multipliedValues);
}


/**
 * Multiplies each element of a matrix by a scalar value.
 * 
 * @param mat The matrix whose elements will be multiplied.
 * @param scalar The scalar value by which each element of the matrix will be multiplied.
 * @returns A new Matrix object resulting from the scalar multiplication of each element in the input matrix.
 */
export function multiplyScalar(mat: Matrix, scalar: number): Matrix {
    const rows = mat.getRows();
    const cols = mat.getCols();
    const scaledValues: number[][] = [];
    const vals = mat.getValues();

    for (let i = 0; i < rows; i++) {
        scaledValues[i] = [];
        for (let j = 0; j < cols; j++) {
            scaledValues[i][j] = vals[i][j] * scalar;
        }
    }

    return new Matrix(scaledValues);
}
