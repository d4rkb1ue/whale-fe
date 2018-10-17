import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import './App.css';
import { OfferList } from './components/offer';

class App extends Component {

    render() {
        const store = createStore(reducer, applyMiddleware(thunk));
        return (
            <Provider store={store}>
                <OfferList />
            </Provider>
        );
    }
}

export default App;
