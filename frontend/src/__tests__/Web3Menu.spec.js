import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Web3Menu from "./../components/common/Web3Menu";

/**
 * Snapshots test code
 */
describe('Snapshots Web3Menu component', () => {
      it('rendering <Web3Menu/>', () => {
            // create App component
            const component = TestRenderer.create(<Web3Menu/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});