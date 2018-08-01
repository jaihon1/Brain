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


#print(X_scaled_testing)
#print(Y_scaled_testing)

print("Note: Y values were scaled by multiplying by {:.10f} and adding {:.4f}".format(Y_scalar.scale_[0], Y_scalar.min_[0]))
