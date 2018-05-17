
function sigmoid(x){
    return 1/(1 + Math.exp(-x));
}

class NeuralNetwork{

    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes , 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    feedForward(input_array){
        let inputs = Matrix.fromArray(input_array);

        //Calculate hidden output vector
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        //Adding bias to hidden output vector
        hidden.add(this.bias_h);
        //Activating hidden output vector
        hidden.map(sigmoid);

        //Calculate final output vector
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }

    train(inputs, targets){
        let outputs = this.feedForward(inputs);

        //Convert arrays into matrices
        outputs = Matrix.fromArray(outputs);
        targets = Matrix.fromArray(targets);

        //Calculate final error
        //ERROR = TARGET - OUTPUT
        let output_errors = Matrix.substract(targets, outputs);

        //Calculate hidden error
        let weights_ho_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);


        // outputs.print();
        // targets.print();
        // output_errors.print();
        // hidden_errors.print();
    }


}
