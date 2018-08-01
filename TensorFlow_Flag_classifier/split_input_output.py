import pandas as pd

df = pd.read_csv('flag_data.csv')

##print(df['Country'].to_string())

#print(df[['Country', 'Population']].to_string())

df['Country'].to_csv('data_output.csv')
print(df.shape)
df.drop(df.columns[0], axis=1, inplace=False)
print(df.shape)

df[['Landmass',	'Geographic quadrant', 'Area','Population' ,'Lang',	'Religion',	'Bars',	'Stripes',
'Colours',	'Red',	'Green',	'Blue',	'Gold',	'White',	'Black',	'Orange',
'Circles',	'Crosses',	'Saltires',	'Quarters',	'Sunstars','Crescent','Triangle',
'Icon','Animate','Test']].to_csv('data_input.csv')
