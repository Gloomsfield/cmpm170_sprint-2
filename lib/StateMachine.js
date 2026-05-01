/*
- `possibleStates` is an object whose keys refer to the state name and whose values are instances of the `State` class (or subclasses). The class assigns the `stateMachine` property on each instance so they can call `this.stateMachine.transition` whenever they want to trigger a transition.
- `stateArgs` is a list of arguments passed to the `enter` and `execute` functions. This allows us to pass commonly-used values (such as a sprite object or current Phaser Scene) to the state methods.
*/
export class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]) {
        this.initialState = initialState
        this.possibleStates = possibleStates
        this.stateArgs = stateArgs
        this.state = null

        // state instances get access to the state machine via `this.stateMachine`
        // Note: "Object.values() returns an array of a given object's own enumerable property values" (MDN)
        for(const state of Object.values(this.possibleStates)) {
            state.stateMachine = this
        }
    }

    step() {
        // this method should be called in the Scene's update() loop
        // on the first step, the state is null and needs to be initialized
        if(this.state === null) {
            this.state = this.initialState
            this.possibleStates[this.state].enter(...this.stateArgs)
            // note: "Spread syntax allows an iterable such as an array expression to be expanded in places where zero or more arguments or elements are expected." (MDN)
            // translation: the `.enter(...this.stateArgs)` statement allows us to pass an arbitrary number of arguments into the .enter method 
        }

        // run the current state's execute method
        this.possibleStates[this.state].execute(...this.stateArgs)
    }

    transition(newState, ...enterArgs) {
		if(this.state) { this.possibleStates[this.state].exit(...this.stateArgs); }
        this.state = newState
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs)
    }
}

export class StateStack {
	
	constructor(fsm) {
		this.states = [];
		this.fsm = fsm;
	}

	delete(state) {
		for(let i = 0; i < this.states.length; i++) {
			if(this.states[i].state == state) {
				this.states.splice(i, 1);

				if(i == this.states.length - 1) {
					this.fsm.transition(this.states[this.states.length - 1].state);
				}

				return;
			}
		}
	}

	push(state, priority) {
		priority = priority ? priority : 0;

		console.log(`${state}, ${priority}`);
		for(let i = this.states.length - 1; i >= 0; i--) {
			if(priority >= this.states[i].priority) {
				this.states.splice(i + 1, 0, { state: state, priority: priority });

				if(i == this.states.length - 2) {
					this.fsm.transition(state);
				}

				return;
			}
		}

		this.states.push({ state: state, priority: priority });
		this.fsm.transition(state);
	}

}

// parent class structure for all `State` subclasses
export class State {

    enter() {
        // this code happens *once* when we enter the state
    }
    execute() {
        // this code happens each update step (ie every frame)
    }
	exit() {}
}
