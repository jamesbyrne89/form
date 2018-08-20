import { Card } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css/normalize.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import Form from './components/Form';

import store from './store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Card className="form-container">
            <h1 className="bp3-heading">Contact Us</h1>
            <Form />
          </Card>
        </div>
      </Provider>
    );
  }
}

export default App;
