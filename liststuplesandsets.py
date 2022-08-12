# lists and tuples allow us to work with sequential data
# sets are unordered collections of values with no duplicates
# lists
courses = ['math', 'physics', 'chem', 'eng'] # this is a list
print(courses)
print(len (courses)) # no. of values in a list
print(courses[2]) # access value at 2nd index
print(courses[-1]) # accesses last item of a list
print(courses[len(courses)-1]) # another way to access the last element of a list
print(courses[-2]) # 2nd last
print(courses[0:2]) # access range of values from list from 0 to but not incl 2
print(courses[:3]) # start assumed at index 0
print(courses[2:]) # goes till the last item

# list methods
courses.append('CS') # adds ONLY ONE item at the end of the list
print(courses)
courses.insert(1, 'art') # adds item to specific location in the list. Takes 2 arg (index, item)
print(courses)
courses = ['math', 'physics', 'chem', 'eng']
courses_2 = ['art', 'CS']
courses.insert(0, courses_2)
print(courses) # adds the courses_2 list itself at 0th index
print(courses[0]) # returns courses_2 list
# if we want to add multiple items without having a list within a list
courses = ['math', 'physics', 'chem', 'eng']
courses.extend(courses_2) # only takes one arg and adds the items of courses_2 to courses
print(courses)
courses.remove('math') # removes given item from list
print(courses)
courses = ['math', 'physics', 'chem', 'eng'] 
courses.pop() # removes the last item from the list
print(courses) # at this point list is [math, phy, chem]
value = courses.pop() # pop also returns the value it removed
print(value) # returns chem as we invoked pop on [math, phy, chem]

# sorting lists
courses = ['math', 'physics', 'chem', 'eng']
courses.reverse() # reverses the list
print(courses)
courses.sort() # sorts in alphabetical order
print(courses)
numbers = [1,15,4,6.9,7,8]
numbers.sort() # sorts in ascending order
print(numbers)
numbers.sort(reverse = True) # to sort in descending order
print(numbers)
courses.sort(reverse = True)
print(courses)
# here these methods change our original list. Use sorted() func to avoid that
courses = ['math', 'physics', 'chem', 'eng']
sorted_courses = sorted(courses) # doesnt sort the list in place, returns a sorted version of list
print(courses)
print(sorted_courses)
numbers = [1,15,4,6.9,7,8]
print(min(numbers)) # func that returns the min value of list
print(max(numbers)) # max value of list
print(sum(numbers)) # prints sum of the nums on list

# finding stuff
courses = ['math', 'physics', 'chem', 'eng']
print(courses.index('eng')) # returns the index of item in list
print('math' in courses) # returns true or false
for course in courses: 
	print(course) # prints each item of the list
# to get items and the index of items in the list
for index, course in enumerate(courses, start = 1): # enumerate() allows to access index and item
	print(index, course) # start = 1 means count starts from 1, which starts from 0 by default

# turning lists into strings using a str method 'join'
courses = ['math', 'physics', 'chem', 'eng']
string = ', '.join(courses) # ', ' means we want to separate items with a comma
print(string)
# to turn a string back to a list using split() method
new_list = string.split(', ') 
# what this means is that we want to cut off ', ' from 'string' and put the items left in a list
print(new_list)

# tuples
# tuples cant be modified
new_tuple =  









