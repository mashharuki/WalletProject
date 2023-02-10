import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Verify from "./../components/pages/Verify";

/**
 * Snapshots test code
 */
describe('Snapshots Verify component', () => {
      it('rendering <Verify/>', () => {
            // create Verify component
            const component = TestRenderer.create(<Verify/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});