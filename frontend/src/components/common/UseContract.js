import superAgent from 'superagent';

const baseURL = "http://192.168.0.19:3001";

/**
 * FactoryContractを使うための共有メソッド
 * @param methodName メソッド名
 * @param args 引数
 */
const UseFactory = async(methodName, args) => {
      // APIの呼び出し
      superAgent
            .post(baseURL + '/api/excute/factory')
            .query({
                  methodName: methodName,
                  args: args
            })
            .end(async(err, res) => {
                  if (err) {
                        console.error("Factoryコントラクト用API呼び出し中に失敗", err);
                        console.log(`メソッド名：${methodName} 引数：${args}`);
                        return err;
                  }
                  console.log(`Factoryコントラクト用APIが正常に終了。メソッド名：${methodName} 引数：${args}`);
                  return res.body;
            });
}

export default UseFactory;