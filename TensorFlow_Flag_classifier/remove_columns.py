import pandas as pd

df = pd.read_csv('data_input.csv')
print(df.to_string())
#df.drop(df.columns[0], axis=1, inplace=True)
print(df.shape)
