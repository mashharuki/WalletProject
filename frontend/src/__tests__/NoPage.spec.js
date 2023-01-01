import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import NoPage from "./../components/pages/NoPage";

/**
 * Snapshots test code
 */
describe('Snapshots NoPage component', () => {
      it('rendering <NoPage/>', () => {
            // create App component
            const component = TestRenderer.create(<NoPage/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});