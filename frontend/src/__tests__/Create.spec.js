import BloctoSDK from '@blocto/sdk';
import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Web3 from 'web3';
import Create from "../components/pages/Create";
import { chainId, CONTRACT_ADDRESS, RPC_URL } from "./../components/common/Constant";

/**
 * Snapshots test code
 */
describe('Snapshots Create component', () => {

      // create bloctoSDK object
      const bloctoSDK = new BloctoSDK({
            ethereum: {
                chainId: chainId, 
                rpc: RPC_URL,
            }
          });
      // create web3 object
      const provider = new Web3(RPC_URL);
      
      
      it('rendering <Create/>', () => {
            // get signer
            const signers = "0x00000";

            // create Create component
            const component = TestRenderer.create(<Create CONTRACT_ADDRESS={CONTRACT_ADDRESS} provider={provider} blocto={bloctoSDK} signer={signers} />);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});