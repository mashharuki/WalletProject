import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import ActionButton2 from "./../components/common/ActionButton2";

/**
 * Snapshots test code
 */
describe('Snapshots ActionButton2 component', () => {

      /**
       * sample function
       */
      const handleOpen = () => {}

      it('rendering <ActionButton2/>', () => {
            // create App component
            const component = TestRenderer.create(<ActionButton2 buttonName="send" color="primary" clickAction={handleOpen}/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});