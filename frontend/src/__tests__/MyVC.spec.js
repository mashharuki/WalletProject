import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import MyVC from "./../components/pages/MyVC";

/**
 * Snapshots test code
 */
describe('Snapshots MyVC component', () => {
      it('rendering <MyVC/>', () => {
            // create MyVC component
            const component = TestRenderer.create(<MyVC/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});