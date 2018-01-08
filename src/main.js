const reduce = Symbol("reduce");

export default class Store {
  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this[reduce](initialState, {});
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    fn(this.state);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  dispatch(action) {
    this.state = this[reduce](this.state, action);
    this.subscribers.forEach(fn => fn(this.state));
  }

  [reduce](state, action) {
    const newState = { ...state };
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
