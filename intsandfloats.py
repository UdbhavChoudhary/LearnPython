# int is a whole number, float is a decimal
num = 3
decimal = -3.14
print(type(num)) # prints data type of the argument
print(type(decimal)) 

# arithmetic operations
print(3+2) # addition
print(3-2) # subtraction
print(3*2) # multiplication
print(3/2) # division
print(3//2) # floor division (drops the decimal)
print(3**2) # 3 raised to the power of 2
print(3%2) # modulus..returns remainder
# order of operations is BODMAS
num = 3
num += 2 # increments value stored in num by 2, and then stores that in num
print(num) # returns 5
num -= 2
print(num) # returns 3
num *= 2
print(num) # returns 6
num /= 2
print(num) # returns 3
print(abs(-8.79)) # returns absolute value
print(round(-8.79)) # rounds to nearest integer
print(round(3.56, 1)) # round to first digit after decimal

# comparison operators
# comparison ops returns booleans: true or false
# equal ==
# not equal !=
# greater than >
# less than <
# greater or equal >=
# less or equal <=
print(3>=2)
print(8.79 == '8.79')
print(-2.63 <= -2.74)
print(5 != 4)

# casting: turning one data type to another
num_1 = '100'
num_2 = '200'
print(num_1+num_2) # 100200
print(int(num_1)+int(num_2)) # 300
print(float(num_1)+float(num_2)) # 300.0
  