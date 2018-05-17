

class Matrix{
    //Constructor intitialization
    constructor(rows, cols){
        this.rows = rows;
        this.columns = cols;
        this.data = []; //matrix elements

        for(let i = 0; i < this.rows; i++){
            this.data[i] = [];
            for(let j = 0; j < this.columns; j++){
                this.data[i][j] = 0;
            }
        }
    }

    //Randomize every elements of matrix
    randomize(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                this.data[i][j] = (Math.random() * 2 - 1); //random number [-1, 1]
            }
        }
    }
    //Turn an array into a 1 column matrix
    static fromArray(n){
        let m = new Matrix(n.length, 1);
        for(let i = 0; i < n.length; i++){
            m.data[i][0] = n[i];
        }
        return m;
    }

    //Turn matrix into an array
    toArray(){
        let arr = [];
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    //Element wise substraction
    static substract(a, b){
        //Return a new matrix a-b
        let result = new Matrix(a.rows, a.columns);
        for(let i = 0; i < a.rows; i++){
            for(let j = 0; j < a.columns; j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    //Matrix addition
    add(n){
        //n is a matrix
        if(n instanceof Matrix){
            if(this.rows === n.rows && this.columns === n.columns){
                for(let i = 0; i < this.rows; i++){
                    for(let j = 0; j < this.columns; j++){
                        this.data[i][j] += n.data[i][j];
                    }
                }
            }
            else{
                console.log('Matrix A and B must have the same dimensions.');
            }
        }
        //n is a number
        else{
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.columns; j++){
                    this.data[i][j] += n;
                }
            }
        }

    }
    //Static multiply
    static multiply(a, b){
        if(a.columns !== b.rows){
            console.log('Columns of A must match rows of B.');
            return undefined;
        }
        let result = new Matrix(a.rows, b.columns);
        for(let i = 0; i < result.rows; i++){
            for(let j = 0; j < result.columns; j++){
                let sum = 0;
                for(let k = 0; k < a.columns; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    //Matrix multiplication
    multiply(n){
        //Element wise multiplication (n is a matrix of exactly same dimension)
        if(n instanceof Matrix){
            if(this.rows === n.rows && this.columns === n.columns){
                for(let i = 0; i < this.rows; i++){
                    for(let j = 0; j < this.columns; j++){
                        this.data[i][j] *= n.data[i][j];
                    }
                }
            }
            else{
                console.log('Matrix A and B must have the same dimensions.');
            }
        }
        //Scalar product
        else{
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.columns; j++){
                    this.data[i][j] *= n;
                }
            }
        }
    }

    //MAP function
    map(func){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    //Static map function
    static map(matrix, func){
        let result = new Matrix(matrix.rows, matrix.columns);
        for(let i = 0; i < matrix.rows; i++){
            for(let j = 0; j < matrix.columns; j++){
                let val = matrix.data[i][j];
                result.data[i][j] = func(val);
            }
        }
        return result;
    }

    //Static Matrix Transpose
    static transpose(n){
        let result = new Matrix(n.columns, n.rows);
        for(let i = 0; i < n.rows; i++){
            for(let j = 0; j < n.columns; j++){
                result.data[j][i] = n.data[i][j];
            }
        }
        return result;
    }

    //Print matrix
    print(){
        console.table(this.data);
    }
}
