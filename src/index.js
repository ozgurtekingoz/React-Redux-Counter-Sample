import React from "react";
import ReactDOM from "react-dom";
// import { createStore } from "redux";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { Provider, connect } from "react-redux";
import logger from "redux-logger";

import "./styles.css";

function SayacReducer(state = { counter: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { counter: state.counter + 1 };
    case "DECREMENT":
      return { counter: state.counter - 1 };
    case "RESET":
      return { counter: 0 };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: SayacReducer,
  middleware: [...getDefaultMiddleware(), logger]
});

// class Sayac extends React.Component {
//   constructor() {
//     super();
//     this.state = store.getState();
//     store.subscribe(() => this.setState(store.getState()));
//   }

//   render() {
//     return (
//       <div>
//         ben sayacım {this.state.counter}
//         <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
//           Artır
//         </button>
//         <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
//           Azalt
//         </button>
//         <button onClick={() => store.dispatch({ type: "RESET" })}>Reset</button>
//       </div>
//     );
//   }
// }

class Sayac2 extends React.Component {
  render() {
    return (
      <div>
        ben sayaç 2'yim {this.props.counter}
        <button onClick={this.props.increment}>Artır</button>
        <button onClick={this.props.decrement}>Azalt</button>
        <button onClick={this.props.reset}>Reset</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { counter: state.counter };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" })
  };
};

const ConnectedSayac = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sayac2);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedSayac />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
