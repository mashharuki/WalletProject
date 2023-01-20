import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Web3 from 'web3';
import Home from "../components/pages/Home";
import {
      baseURL, CONTRACT_ADDRESS, MYTOKEN_ADDRESS, RPC_URL
} from "./../components/common/Constant";

/**
 * Snapshots test code
 */
describe('Snapshots Home component', () => {

      // create web3 object
      const provider = new Web3(RPC_URL);
      
      
      it('rendering <Home/>', () => {
            // get signer
            const signers = "0x00000";

            // create Home component
            const component = TestRenderer.create(<Home CONTRACT_ADDRESS={CONTRACT_ADDRESS} MYTOKEN_ADDRESS={MYTOKEN_ADDRESS} provider={provider} signer={signers[0]} baseURL={baseURL} />);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});