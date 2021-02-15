name = 'lee'
print('to ' + name + ' how are you, ' + name + '? hi ' + name)

# positional formatting
print('to {} how are you, {}? hi {}'.format(name, name, name))

# named placeholder formatting
age = 13
print('to {name} how are you, {name}? hi {name}, {age:d}'.format(name=name, age=age))