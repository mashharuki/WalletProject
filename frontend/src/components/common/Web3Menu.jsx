import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Menu用の配列
const options = [
      'Home',
      'Buy',
      'Wallets',
      'Create',
      'MyVC',
      'Upload'
];
    
// Menuコンポーネント用の定数
const ITEM_HEIGHT = 48;

/**
 * Web3Menuコンポーネント
 */
const Web3Menu = () => {
      // ステート変数
      const [anchorEl, setAnchorEl] = useState(null);
      // メニュー用の変数
      const open = Boolean(anchorEl);

      /**
       * メニューアイコンをクリックした時の処理
       * @param {*} event イベントハンドラ
       */
      const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
      };
      
      /**
       * メニューバーを閉じる時の処理
       */
      const handleClose = () => {
            setAnchorEl(null);
      };

      return (
            <>
                  <IconButton 
                        aria-label="more"
                        id="home-menu-button"
                        aria-controls={open ? 'home-menu-button' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                  >
                        <MenuIcon/>
                  </IconButton>
                  <Menu
                        id="web3.0-menu"
                        MenuListProps={{
                              'aria-labelledby': 'home-menu-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                              style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: '20ch',
                              },
                        }}
                  >
                        {options.map((option) => (
                              <MenuItem key={option} selected={option === 'Home'} onClick={handleClose}>
                                    {/* 各画面へのリンク */}
                                    <NavLink className="navLink" to={{ pathname: `/${option}` }}>{option}</NavLink>
                              </MenuItem>
                        ))}
                  </Menu>
            </>
      );
}

export default Web3Menu;