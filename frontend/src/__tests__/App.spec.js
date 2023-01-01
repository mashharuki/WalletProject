import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import App from "./../components/App";

/**
 * Snapshots test code
 */
describe('Snapshots App component', () => {
      it('rendering <App/>', () => {
            // create App component
            const component = TestRenderer.create(<App/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});