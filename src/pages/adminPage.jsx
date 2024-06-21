import { Menu } from 'antd'
import React, { useState } from 'react'
import { UserOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons'
import Header from '../components/layout/header';

export default function AdminPage() {
    const items = [
        {
          key: 'users',
          icon: <UserOutlined />,
          label: 'Users',
          children: [
            {
              key: '11',
              label: 'Option 1',
            },
            {
              key: '12',
              label: 'Option 2',
            },
            {
              key: '13',
              label: 'Option 3',
            },
            {
              key: '14',
              label: 'Option 4',
            },
          ],
        },
        {
            key: 'products',
            icon: <AppstoreOutlined />,
            label: 'Products',
            children: [
                {
                key: '21',
                label: 'Option 1',
                },
                {
                key: '22',
                label: 'Option 2',
                },
                {
                key: '23',
                label: 'Submenu',
                children: [
                    {
                    key: '231',
                    label: 'Option 1',
                    },
                    {
                    key: '232',
                    label: 'Option 2',
                    },
                    {
                    key: '233',
                    label: 'Option 3',
                    },
                ],
                },
                {
                key: '24',
                label: 'Submenu 2',
                children: [
                    {
                    key: '241',
                    label: 'Option 1',
                    },
                    {
                    key: '242',
                    label: 'Option 2',
                    },
                    {
                    key: '243',
                    label: 'Option 3',
                    },
                ],
                },
            ],
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
        console.log('click', {key});
        setKeySelected(key)
    }

    return (
        <>
            <Header isHiddenNike/>
            <div className='d-flex'>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['231']}
                    openKeys={stateOpenKeys}
                    onOpenChange={onOpenChange}
                    style={{
                        width: 256,
                    }}
                    items={items}
                    onClick={handleOnclick}
                />
                <div style={{flex: 1}}>
                    {keySelected === '21' && <span>Key 21</span>}
                    <span>test</span>
                </div>
            </div>
        </>
    )
}

