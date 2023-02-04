// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./MultiSigWallet.sol";

/**
 * WalletFactoryV4コントラクト
 */
contract WalletFactoryV4 {
    // Verifiable Credentials用の構造体
    struct VcInfo {
        // VCのファイル名
        string name;
        // VCのCID情報(IPFS)
        string cid;
    }

    // MultiSigWallet型の配列
    MultiSigWallet[] public wallets;
    // 関数から返すことのできる最大値
    uint256 constant maxLimit = 20;
    // owner
    address public owner;

    // mapping
    mapping(address => bool) public isRegistered;
    mapping(address => string) public dids;
    mapping(string => address) public addrs;
    mapping(string => VcInfo[]) public vcs;

    //modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "This address is not an owner address!");
        _;
    }

    // event
    event WalletCreated(
        MultiSigWallet indexed wallet,
        string name,
        address[] owners,
        uint256 required
    );
    event Registered(address addr, string did);

    /**
     * コンストラクター
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * MultiSigWalletのインスタンス数を取得する関数
     */
    function walletsCount() public view returns (uint256) {
        return wallets.length;
    }

    /**
     * MultiSigWalletのインスタンス生成関数
     * @param _name ウォレットの名前
     * @param _owners アドレスの配列
     * @param _required 閾値
     */
    function createWallet(
        string memory _name,
        address[] memory _owners,
        uint256 _required
    ) public {
        // インスタンスを生成
        MultiSigWallet wallet = new MultiSigWallet(_name, _owners, _required);
        // 配列に追加する。
        wallets.push(wallet);
        // イベントの発行
        emit WalletCreated(wallet, _name, _owners, _required);
    }

    /**
     * 作成済みウォレットの情報を取得するメソッド
     */
    function getWallets(uint256 limit, uint256 offset)
        public
        view
        returns (MultiSigWallet[] memory coll)
    {
        require(offset <= walletsCount(), "offset out of bounds");
        // 最大値を上回っている場合は、limitを格納する。
        uint256 size = walletsCount() - offset;
        size = size < limit ? size : limit;
        // sizeは、maxLimitを超えてはならない。
        size = size < maxLimit ? size : maxLimit;
        coll = new MultiSigWallet[](size);

        for (uint256 i = 0; i < size; i++) {
            coll[i] = wallets[offset + i];
        }

        return coll;
    }

    /**
     * register
     * @param _addr address
     * @param _did DID
     */
    function register(address _addr, string memory _did) public onlyOwner {
        // check
        require(!isRegistered[_addr], "This address is already registered!!");

        // set
        isRegistered[_addr] = true;
        dids[_addr] = _did;
        addrs[_did] = _addr;

        emit Registered(_addr, _did);
    }

    /**
     * getVcs function
     * @param _did DID
     * @return vcs[_did] Verifiable Credentials
     */
    function getVcs(string memory _did) public view returns (VcInfo[] memory) {
        return vcs[_did];
    }

    /**
     * updatVc function
     * @param _did DID
     * @param _name VC Name
     * @param _cid VC's CID
     */
    function updateVc(
        string memory _did,
        string memory _name,
        string memory _cid
    ) public {
        // get Vcinfo
        VcInfo[] storage coll = vcs[_did];

        // puch new Vc info
        coll.push(VcInfo({name: _name, cid: _cid}));
        // register again
        vcs[_did] = coll;
    }
}
