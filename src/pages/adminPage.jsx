import { Menu } from 'antd'
import React, { useState } from 'react'
import { UserOutlined, AppstoreOutlined} from '@ant-design/icons'
import Header from '../components/layout/header';
import AdminUser from '../components/admin/adminUser';
import AdminPoroduct from '../components/admin/adminProduct';

export default function AdminPage() {
    const items = [
        {
          key: 'users',
          icon: <UserOutlined />,
          label: 'Users',
        },
        {
            key: 'products',
            icon: <AppstoreOutlined />,
            label: 'Products',
        }
    ]; 

    const getLevelKeys = (items1) => {
        const key = {};
        const func = (items2, level = 1) => {
          items2.forEach((item) => {
            if (item.key) {
              key[item.key] = level;
            }
            if (item.children) {
              func(item.children, level + 1);
            }
          });
        };
        func(items1);
        return key;
    };

    const levelKeys = getLevelKeys(items);
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
      switch(key) { 
        case 'users':  
          return (
            <AdminUser/>
          ) 
        case 'products':
          return (
            <AdminPoroduct/>
          ) 
        default:
          return <></>
      }
    }

    const onOpenChange = (openKeys) => {
        // console.log('keys', openKeys)
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
        const repeatIndex = openKeys
            .filter((key) => key !== currentOpenKey)
            .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
        setStateOpenKeys(
            openKeys
            // remove repeat key
            .filter((_, index) => index !== repeatIndex)
            // remove current level all child
            .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
        );
        } else {
        // close
        setStateOpenKeys(openKeys);
        }
    }

    const handleOnclick = ({key}) => {
        
        setKeySelected(key)
    }

    return (
        <>
            <Header isHiddenNike/>
            <div className='d-flex'>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                    }}
                    items={items}
                    onClick={handleOnclick}
                />
                <div style={{flex: 1, padding: '1.5rem'}}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

