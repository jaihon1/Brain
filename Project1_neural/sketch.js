
function setup() {
  // put setup code here
  let nn = new NeuralNetwork(2, 2, 2);
  let input = [1, 0];
  let targets = [1, 0.6];
  //let output = nn.feedForward(input);

  nn.train(input, targets);




}

function draw() {
  // put drawing code here

}
