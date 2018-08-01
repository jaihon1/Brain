
import numpy as np
import csv

M = 194
N = 194
zeros = [ [0] * M for _ in range(N)]

print(np.matrix(zeros))

for i in range(N):
    for j in range(M):
        if(i==j):
            zeros[i][j] = 1


with open("new_file.csv", "w+") as my_file:
    csvWriter = csv.writer(my_file)
    csvWriter.writerows(zeros)
