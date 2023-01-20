import BloctoSDK from '@blocto/sdk';
import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Web3 from 'web3';
import { chainId, RPC_URL } from "./../components/common/Constant";

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
      
      
      it('rendering <Txs/>', () => {
            // get signer
            const signers = "0x00000";

            // create Txs component
            const component = TestRenderer.create(<></>);
            let tree = component.toJSON();
            // check
            expect(tree).toMatchSnapshot();
      });
});