// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/**
 * MyToken Contract
 */
contract MyToken is
    ERC20,
    ERC20Burnable,
    Pausable,
    Ownable,
    ERC20Permit,
    ERC20Votes
{
    // トークン名
    string tokenName;
    // シンボル名
    string tokenSymbol;

    /**
     * コンストラクター
     * @param _name トークン名
     * @param _symbol シンボル名
     */
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
        ERC20Permit(_name)
    {
        // トークン名とシンボル名を設定する
        tokenName = _name;
        tokenSymbol = _symbol;
    }

    /**
     * トークンを停止するための関数
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * 停止状態を解除するための関数
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * トークンを発行する関数
     * @param to 発行先アドレス
     * @param amount 発行数
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * トークンを償却する関数
     * @param to 発行先アドレス
     * @param amount 発行数
     */
    function burnToken(address to, uint256 amount) public onlyOwner {
        _burn(to, amount);
    }

    /**
     * トークン移転用の関数
     * @param from 発行元アドレス
     * @param to 発行先アドレス
     * @param amount 発行数
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * トークン移転用の関数
     * @param from 発行元アドレス
     * @param to 発行先アドレス
     * @param amount 発行数
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * 発行用の関数
     */
    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    /**
     * 償却用の関数
     */
    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
