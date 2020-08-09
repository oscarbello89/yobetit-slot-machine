# To make this project work, you need:

 ### 1.- Install NodeJS and NPM from https://nodejs.org/en/download/.
 ### 2.- Download or clone the project source code from https://github.com/oscarbello89/yobetit-slot-machine.git
 ### 3.- Install all required npm packages by running `npm install` from the command line in the project root folder (where the package.json is located).
 ### 4.- Start the application by running `npm start` from the command line in the project root folder, this will launch a browser displaying the application.

# Test Questions:
### Question 4:
Considering a Slot machine defined like this:
- Reel1: [“cherry”, ”lemon”, “apple”, ”lemon”, “banana”, “banana”, ”lemon”, ”lemon”]
- Reel2: [”lemon”, “apple”, ”lemon”, “lemon”, “cherry”, “apple”, ”banana”, ”lemon”]
- Reel3: [”lemon”, “apple”, ”lemon”, “apple”, “cherry”, “lemon”, ”banana”, ”lemon”]
Coins:
The user start with 20 coins, when the user run the function the user will lose 1 coin,
1 spin = 1 coin
. 3 cherries in a row: won 50 coins
. 2 cherries in a row: won 40 coins
. 3 Apples in a row: won 20 coins
. 2 Apples in a row: won 10 coins
. 3 Bananas in a row: won 15 coins
. 2 Bananas in a row: won 5 coins
. 3 lemons in a row: won 3 coins
Using these data, create a function that, when it’s called by the front end, gives back the result
of a spin and show the result.