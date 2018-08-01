import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np

#Training data
training_data_df = pd.read_csv("sales_data_training.csv", dtype=float)

X_training = training_data_df.drop('total_earnings', axis=1).values
Y_training = training_data_df[['total_earnings']].values

#Testing data
test_data_df = pd.read_csv("sales_data_test.csv", dtype=float)

X_testing = test_data_df.drop('total_earnings', axis=1).values
Y_testing = test_data_df[['total_earnings']].values

#All data to be between 0 and 1
X_scalar = MinMaxScaler(feature_range=(0, 1))
Y_scalar = MinMaxScaler(feature_range=(0, 1))

X_scaled_training = X_scalar.fit_transform(X_training)
Y_scaled_training = Y_scalar.fit_transform(Y_training)

X_scaled_testing = X_scalar.fit_transform(X_testing)
Y_scaled_testing = Y_scalar.fit_transform(Y_testing)


#Neural Network parameters
learning_rate = 0.001
training_epochs = 100
display_step = 5

number_of_inputs = 9
number_of_outputs = 1

layer_1_nodes = 50
layer_2_nodes = 100
layer_3_nodes = 50


#Step 1: Defining layers of the Network

#Input layer
with tf.variable_scope('input'):
    X = tf.placeholder(tf.float32, shape=(None, number_of_inputs))

#1st layer
with tf.variable_scope('layer_1'):
    weights = tf.get_variable(name='weights1', shape=[number_of_inputs, layer_1_nodes], initializer=tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name='biases1', shape=[layer_1_nodes], initializer=tf.zeros_initializer())
    layer_1_output = tf.nn.relu(tf.matmul(X, weights) + biases)

#2nd layer
with tf.variable_scope('layer_2'):
    weights = tf.get_variable(name='weights2', shape=[layer_1_nodes, layer_2_nodes], initializer=tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name='biases2', shape=[layer_2_nodes], initializer=tf.zeros_initializer())
    layer_2_output = tf.nn.relu(tf.matmul(layer_1_output, weights) + biases)

#3rd layer
with tf.variable_scope('layer_3'):
    weights = tf.get_variable(name='weights3', shape=[layer_2_nodes, layer_3_nodes], initializer=tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name='biases3', shape=[layer_3_nodes], initializer=tf.zeros_initializer())
    layer_3_output = tf.nn.relu(tf.matmul(layer_2_output, weights) + biases)

#Output layer
with tf.variable_scope('output'):
    weights = tf.get_variable(name='weights4', shape=[layer_3_nodes, number_of_outputs], initializer=tf.contrib.layers.xavier_initializer())
    biases = tf.get_variable(name='biases4', shape=[number_of_outputs], initializer=tf.zeros_initializer())
    prediction = tf.nn.relu(tf.matmul(layer_3_output, weights) + biases)


#Step 2: Cost function
with tf.variable_scope('cost'):
    Y = tf.placeholder(tf.float32, shape=(None, 1))
    cost = tf.reduce_mean(tf.squared_difference(prediction, Y))

#Step 3: Train function (Optimizer)
with tf.variable_scope('train'):
    optimizer = tf.train.AdamOptimizer(learning_rate).minimize(cost)

#Log progress of our Network
with tf.variable_scope('logging'):
    tf.summary.scalar('current_cost', cost)
    summary = tf.summary.merge_all()

#Save trained ANN
saver = tf.train.Saver()



#RUNNING tensorflow
with tf.Session() as session:
    session.run(tf.global_variables_initializer())

    #Record training progress
    training_writer = tf.summary.FileWriter("./logs/training", session.graph)
    testing_writer = tf.summary.FileWriter("./logs/testing", session.graph)


    #training loop
    for epoch in range(training_epochs):
        session.run(optimizer, feed_dict={X: X_scaled_training, Y: Y_scaled_training})

        #Log our progress at each epoch (100 training data)
        training_cost, training_summary = session.run([cost, summary], feed_dict={X: X_scaled_training, Y: Y_scaled_training})
        testing_cost, testing_summary = session.run([cost, summary], feed_dict={X: X_scaled_testing, Y: Y_scaled_testing})

        training_writer.add_summary(training_summary, epoch)
        testing_writer.add_summary(testing_summary, epoch)

        print("Training pass: {}".format(epoch), training_cost, testing_cost)

    print("Training is Complete!")

    #Printing our final values
    final_training_cost = session.run(cost, feed_dict={X: X_scaled_training, Y: Y_scaled_training})
    final_testing_cost = session.run(cost, feed_dict={X: X_scaled_testing, Y: Y_scaled_testing})
    print("Final training cost: {}".format(training_cost))
    print("Final testing cost: {}".format(testing_cost))


    save_path = saver.save(session, "logs/trained_model.ckpt")
    print("Model saved: {}".format(save_path))
