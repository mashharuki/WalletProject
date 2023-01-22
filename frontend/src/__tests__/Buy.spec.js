import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Buy from "./../components/pages/Buy";

/**
 * Snapshots test code
 */
describe('Snapshots Buy component', () => {
      it('rendering <Buy/>', () => {
            // 引数からデータを取得する。
            const signer = "0x00000";;
            const baseURL = "httpss://...";

            // create Buy component
            const component = TestRenderer.create(<Buy signer={signer} baseURL={baseURL} />);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});