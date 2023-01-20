import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import LoadingIndicator from "./../components/common/LoadingIndicator/LoadingIndicator";

/**
 * Snapshots test code
 */
describe('Snapshots LoadingIndicator component', () => {
      it('rendering <LoadingIndicator/>', () => {
            // create App component
            const component = TestRenderer.create(<LoadingIndicator/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});