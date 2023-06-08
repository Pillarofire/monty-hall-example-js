const METHODS = {
	'Marilyn vos Savant': 'Marilyn vos Savant',
	'Do Nothing': 'Do Nothing',
	'New Random': 'New Random'
};

const data = {
	winningDoor: [],
	doorRevealed: [],
	doorFirstGuesses: [],
	[METHODS["Do Nothing"]]: [],
	[METHODS["Marilyn vos Savant"]]: [],
	[METHODS["New Random"]]: []
}

// Simulators global variables that can be modified.
const DOORS = 10;
const ITERATIONS = 100000;

function main() {
	for (let i = 0; i < ITERATIONS; i++) {
		// setup a new game.
		setup(i);
		// player makes a guess.
		guess(i);
		// host reveals a non-winner, and non-guessed door.
		reveal(i);
		// player gets to maybe choose a new door.
		secondGuess(i);
	}
	// conclude the game, show the results.
	conclusion();

	console.log(data);
}

function setup(iteration) {
	// pick a door at random to be our winning door.
	let doorIndex = rand(0,DOORS);
	console.log(`Game #${iteration}`);
	// console.log(`Winning door is number ${doorIndex}.`);
	data.winningDoor[iteration] = doorIndex;
}

function guess(iteration) {
	// Player makes a guess to choose one of the non-displayed doors.
	let doorIndex = rand(0,DOORS);
	// console.log(`At this point player has a ${1 / maxDoors} probability to guess correctly.`);
	// console.log(`At this point player has a ${maxDoors-1 / maxDoors} probability to guess incorrectly.`);
	// console.log(`Player has guessed door number ${doorIndex}.`);
	if (doorIndex == data.winningDoor[iteration]) {
		// console.log(`Player actually guessed correctly on the first try.`);
	}
	data.doorFirstGuesses[iteration] = doorIndex;
}

function reveal(iteration) {
	// Since the host knows what door the car is in choose one that is not the car 
	//  and not the player's guess and show it.
	let doorIndex = rand(0,DOORS);
	while (doorIndex === data.winningDoor[iteration] || doorIndex === data.doorFirstGuesses[iteration]) {
		doorIndex = rand(0,DOORS);
	}
	// console.log(`Host reveals door number ${doorIndex} is not the winner.`);
	data.doorRevealed[iteration] = doorIndex;
}

function secondGuess(iteration) {
	let doorIndex = rand(0,DOORS);
	// Following Marilyn Vos Savant's advice, you switch your guess, always...
	// Pick a random door that is neither your first guess nor the revealed Door.
	while (doorIndex === data.doorRevealed[iteration] || doorIndex === data.doorFirstGuesses[iteration]) {
		doorIndex = rand(0,DOORS);
	}
	data[METHODS["Marilyn vos Savant"]][iteration] = doorIndex;
	// console.log(`By ${METHODS["Marilyn vos Savant"]}'s method, player chooses ${doorIndex}`);
	// console.log(`Player would have ${doorIndex===data.winningDoor[iteration]?'won':'lost'}.`);

	// Just for posterity lets pick a new random number for the next type.
	doorIndex = rand(0,DOORS);
	// Pick a random door that is just not the revealed Door.
	while (doorIndex === data.doorRevealed[iteration]) {
		doorIndex = rand(0,DOORS);
	}
	data[METHODS["New Random"]][iteration] = doorIndex;
	// console.log(`By the ${METHODS["New Random"]} method, player chooses ${doorIndex}`);
	// console.log(`Player would have ${doorIndex===data.winningDoor[iteration]?'won':'lost'}.`);

	// Just stick with your first guess.
	data[METHODS["Do Nothing"]][iteration] = data.doorFirstGuesses[iteration];
	// console.log(`By the ${METHODS["Do Nothing"]} method, player chooses ${doorIndex}`);
	// console.log(`Player would have ${doorIndex===data.winningDoor[iteration]?'won':'lost'}.`);

}
function rand(min, max) {
	return min + Math.floor(Math.random() * max);
}


function conclusion() {

	let sum = 0;
	let results = {};

	sum = 0;
	data[METHODS["Do Nothing"]].forEach((val,i)=>sum+=val === data.winningDoor[i]?1:0);
	results[METHODS["Do Nothing"]]=sum;
	console.log(`If the player kept the first choice and did nothing, the win rate is ${sum/ITERATIONS}`);

	sum = 0;
	data[METHODS["New Random"]].forEach((val,i)=>sum+=val === data.winningDoor[i]?1:0);
	results[METHODS["New Random"]]=sum;
	console.log(`If the player chose a new door at random, the win rate is ${sum/ITERATIONS}`);

	sum = 0;
	data[METHODS["Marilyn vos Savant"]].forEach((val,i)=>sum+=val === data.winningDoor[i]?1:0);
	results[METHODS["Marilyn vos Savant"]]=sum;
	console.log(`If the player always switched, the win rate is ${sum/ITERATIONS}`);

	// Debug information:
	// console.log( results );
	// console.log( data );
}

// Run the simulation
main();