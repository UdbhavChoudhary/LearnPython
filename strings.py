# textual data represented with strings
intro = 'Hello World'
# intro is a var which stores the string 'Hello World'
print(intro)
# var names are always lowercase, and multiple words in a name separated by _
my_name = 'Udbhav'
print(my_name)
# var names should be descriptive

# can use '' or "" for strings, sometimes both
print("Hi, what's up") # or
print('Hi, what\'s up')
# use ''' or """ for a multi line string
long_msg = '''My name is Udbhav.
I study at BITS Pilani.
I double major in biology and manufacturing engineering.'''
print(long_msg)
# to find num of char in str, use 'len' function
message = 'Udbhav Choudhary'
print(len(message))
# to access a char at a particular index (starting from 0)
print(message[6], message[7])
# message[7] = 'X'  str doesnt allow item assignment

# to access a range of characters
print(message[2:6])
# prints character from 2 upto but not including 6
print(message[:6]) # assumes start at index 0
print(message[7:]) # assumes last at final index (included)
print(message[:]) # whole string

# all the data types have 'methods' associated with them that are useful
# a method is basically a function that belongs to an object/data type
# eg: lower() method lowercases the string
print(message.lower()) # entire string lowercased
print(message[7:].lower()) # chosen char lowercased
print(message.upper()) # all uppercase
print(message.count('a')) # counts the number of times the arg ('l') appears in the str 
print(message.count('Udbhav'))
print(message.count('l')) # returns 0
print(message.find('a')) # returns the first index where arg is found in str
print(message.find('Udbhav'))
print(message.find('l')) # returns -1
print(message.replace('Udbhav', 'Uddipt')) # returns 'Uddipt Choudhary'
print(message.replace(message[5], 'c'))
# the replace() method takes what we want to replace as 1st arg, and what we replace it with as 2nd arg
print(message) # returns 'Udbhav Choudhary'
# this proves that the replace method() doesnt make the change to the actual var
# it returns a new string itself

# concatenating strings
greeting = 'Hello'
name = 'Malcolm'
message = greeting + ', my name is ' + name + '.'
print(message)
# or use formatted strings
message = '{}, my name is {}.'.format(greeting, name) # {} are placeholders for vars
print(message)
# format() should have args in order of appearance
# or use fstrings
# same as formatted strings but var can be put in placeholder
message = f'{greeting}, my name is {name}.'
print(message)
# since the placeholder contains the var, methods can be used directly
message = f'{greeting}, my name is {name.upper()}.'
print(message)

# to find all methods available to us
print(dir(my_name)) # shows all the methods we have access to for a particular var
# to get more info about methods
print(help(str)) # here the arg isnt the var but the object/class itself
print(help(str.lower)) # gives specific info on lower method of str















