

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
                this.data[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }

    //data addition
    add(n){
        //n is a matrix
        if(n instanceof data){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.columns; j++){
                    this.data[i][j] += n.data[i][j];
                }
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

    //Element wise multiplication
    multiplyByElement(n){
        //n is a matrix of exactly same dimension
        if(n instanceof data){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.columns; j++){
                    this.data[i][j] *= n.data[i][j];
                }
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

    //Matrix multiplication
    matrixProduct(n){
        if(n instanceof Matrix){
            if(this.columns !== n.rows){
                console.log('Columns of A must match rows of B.');
                return undefined;
            }

            // A x B = result
            let a = this; //Matrix A
            let b = n; //Matrix B
            let result = new Matrix(this.rows, n.columns);

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
        else{
            console.log('n must be a Matrix.');
            return undefined;
        }
    }

    //Matrix Transpose
    transpose(){
        let result = new Matrix(this.columns, this.rows);
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                result.data[j][i] = this.data[i][j];
            }
        }
        return result;
    }
    //Print data
    print(){
        console.table(this.data);
    }
}
