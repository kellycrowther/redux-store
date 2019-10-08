export class Store {
    private Subscribers: Function[];
    private Reducers: { [key: string]: Function }
    private state: { [key: string]: any }

    constructor(reducers = {}, initialState = {}) {
        this.Subscribers = [];
        this.Reducers = reducers;
        this.state = this.reduce(initialState, {});
    }

    get value() {
        return this.state;
    }

    subscribe(fn) {
        this.Subscribers = [
            ...this.Subscribers,
            fn
        ]
        this.notify();
        return () => {
            this.Subscribers = this.Subscribers.filter(sub => sub !== fn)
        }
    }

    dispatch(action) {
        this.state = this.reduce(this.state, action)
        this.notify();
    }

    private notify() {
        this.Subscribers.forEach(fn => fn(this.value))
    }

    private reduce(state, action) {
        const newState = {}
        for (const prop in this.Reducers) {
            newState[prop] = this.Reducers[prop](state[prop], action);
        }
        return newState;
    }
}