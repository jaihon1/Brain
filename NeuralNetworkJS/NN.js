
function sigmoid(x){
    return 1/(1 + Math.exp(-x));
}

function dsigmoid(y){
    return y * (1 - y);
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

        this.learning_rate = 0.1;
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

    train(input_array, target_array){
        //feedForward
        let inputs = Matrix.fromArray(input_array);

        //Calculate hidden output vector
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        //Adding bias to hidden output vector
        hidden.add(this.bias_h);
        //Activating hidden output vector
        hidden.map(sigmoid);

        //Calculate final output vector
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);

        //Convert arrays into matrices
        let targets = Matrix.fromArray(target_array);

        //Calculate final error
        //ERROR = TARGET - OUTPUT
        let output_errors = Matrix.substract(targets, outputs);

        //Calculate gradients (H_O)
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);

        //Calculate deltas (H_O)
        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);

        //Update weights by deltas (H_O)
        this.weights_ho.add(weights_ho_deltas);
        //Update bias by its deltas (which is just the gradients)
        this.bias_o.add(gradients);


        //Calculate hidden error
        let weights_ho_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);

        //Calculate gradients (I_H)
        let hidden_gradients = Matrix.map(hidden, dsigmoid);
        hidden_gradients.multiply(hidden_errors);
        hidden_gradients.multiply(this.learning_rate);

        //Calculate deltas (I_H)
        let input_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradients, input_T);

        //Update weights by deltas (I_H)
        this.weights_ih.add(weights_ih_deltas);
        //Update bias by its deltas (which is just the gradients)
        this.bias_h.add(hidden_gradients);

    }


}
