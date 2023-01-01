import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import ActionButton from "./../components/common/ActionButton";

/**
 * Snapshots test code
 */
describe('Snapshots ActionButton component', () => {

      /**
       * sample function
       */
      const handleOpen = () => {}

      it('rendering <ActionButton/>', () => {
            // create App component
            const component = TestRenderer.create(<ActionButton buttonName="send" color="primary" clickAction={handleOpen}/>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});