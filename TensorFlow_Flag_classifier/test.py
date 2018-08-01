import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


# Load training data set from CSV file
training_data_input_df = pd.read_csv("data_input.csv", dtype=float)
training_data_output_df = pd.read_csv("data_output.csv", dtype=float, header=None)


# Pull out columns for X (data to train with) and Y (value to predict)
X_training = training_data_input_df.drop(training_data_input_df.columns[0], axis=1).values
Y_training = training_data_output_df
#Y_training = training_data_output_df.drop(training_data_output_df.columns[0], axis=1).values



# All data needs to be scaled to a small range like 0 to 1 for the neural
# network to work well. Create scalers for the inputs and outputs.
X_scaler = MinMaxScaler(feature_range=(0, 1))
Y_scaler = MinMaxScaler(feature_range=(0, 1))

# Scale both the training inputs and outputs
X_scaled_training = X_scaler.fit_transform(X_training)
Y_scaled_training = Y_scaler.fit_transform(Y_training)

print(X_scaled_training.shape)
print(Y_scaled_training.shape)
