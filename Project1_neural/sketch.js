
let training_data = [
    {
        inputs: [0,0],
        targets: [0]
    },
    {
        inputs: [1,0],
        targets: [1]
    },
    {
        inputs: [0,1],
        targets: [1]
    },
    {
        inputs: [1,1],
        targets: [0]
    },
]


function setup() {
  //put setup code here
  let nn = new NeuralNetwork(2, 5, 1);
  console.table(nn.feedForward([0,0]));
  console.table(nn.feedForward([0,1]));
  console.table(nn.feedForward([1,0]));
  console.table(nn.feedForward([1,1]));

  for(let i = 0; i < 10000; i++){
      let data = random(training_data);
      nn.train(data.inputs, data.targets);
  }

  console.table(nn.feedForward([0,0]));
  console.table(nn.feedForward([0,1]));
  console.table(nn.feedForward([1,0]));
  console.table(nn.feedForward([1,1]));





}

function draw() {
  // put drawing code here

}
