
//STEPS
// 1. Create training sets. Inputs and outputs.
// 2. Create your model with layers + activation function + learing rate.
// 3. Fit your model with the training sets.
// 4. Predict value with your model.


//--------------CREATING NEURAL NETRWORK STRUCTURE
const model = tf.sequential();

//First layer after input layer
const configHidden = {
    units: 8,
    inputShape: [2], //Number of input nodes. Must be written!
    activation: 'tanh',
}
const hidden = tf.layers.dense(configHidden); //'dense' is a fully connected layer

//Second layer
const configOutput = {
    units: 1,
    //inputShape is infered by the previous layer
    activation: 'sigmoid',
}
const output = tf.layers.dense(configOutput);

//Add layers to model
model.add(hidden);
model.add(output);

//------------------Configure optimizer and loss function
const sgdOptimizer = tf.train.sgd(0.1); //Stocastic Gradient Descent with learning rate
const config_optimizer = {
    optimizer: sgdOptimizer,
    loss: 'meanSquaredError',
}

//Compile model
model.compile(config_optimizer);

//------------------Fit aka Training with training data
const dataX = tf.tensor2d([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
]);
const dataY = tf.tensor2d([
    [0],
    [1],
    [1],
    [0],
])


const config_train = {
    epochs: 500,
    shuffle: true,

}

async function train(){
    for(let i = 0; i < 5; i++){
        const response = await model.fit(dataX, dataY, config_train);
        console.log(response.history.loss[0]);
    }
}

train().then(() => {
    console.log('Training Complete.');
    let ys = model.predict(xs);
    ys.print();
});


//Inputs
const xs = tf.tensor2d([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
]);

//-----------------------Predict aka (feedForward)
// let ys = model.predict(xs);
// ys.print();




function setup() {
  // put setup code here
}

function draw() {
  // put drawing code here
}
