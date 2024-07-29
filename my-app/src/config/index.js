export default  [
    {
        path: '/home',
        name: 'home',
        label: 'home',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: 'mall manage',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: 'user manage',
        icon: 'UserOutlined',
        url: '/user/index'
    },
    {
        path: '/other',
        label: 'other',
        icon: 'SettingOutlined',
        children: [
        {
            path: '/other/pageOne',
            name: 'page1',
            label: 'page1',
            icon: 'SettingOutlined'
        },
        {
            path: '/other/pageTwo',
            name: 'page2',
            label: 'page2',
            icon: 'SettingOutlined'
        }
        ]
    }
]