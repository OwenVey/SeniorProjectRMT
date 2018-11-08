export default {
    recentlyViewedItems: [
        {
            id: 1,
            name: 'Item 1',
            icon: 'file'
        },
        {
            id: 2,
            name: 'Item 2',
            icon: 'file'
        },
        {
            id: 3,
            name: 'Item 3',
            icon: 'file'
        },
    ],

    projectTreeData: [{
        title: 'Project Name',
        key: '0-0',
        icon: 'archive',
        children: [{
            title: 'Component 1',
            key: '0-0-0',
            icon: 'sitemap',
            children: [
                { title: 'Requirement 0001', key: '0-0-0-0', icon: 'file-alt' },
                { title: 'Requirement 0002', key: '0-0-0-1', icon: 'file-alt' },
                { title: 'Requirement 0003', key: '0-0-0-2', icon: 'file-alt' },
            ],
        }, {
            title: 'Component 2',
            key: '0-0-1',
            icon: 'sitemap',
            children: [
                { title: 'Requirement 0001', key: '0-0-1-0', icon: 'file-alt' },
                { title: 'Requirement 0002', key: '0-0-1-1', icon: 'file-alt' },
                { title: 'Requirement 0003', key: '0-0-1-2', icon: 'file-alt' },
            ],
        }, {
            title: 'Component 3',
            key: '0-0-2',
            icon: 'sitemap',
            children: [
                { title: 'Requirement 0001', key: '0-0-2-0', icon: 'file-alt' },
                { title: 'Requirement 0002', key: '0-0-2-1', icon: 'file-alt' },
                { title: 'Requirement 0003', key: '0-0-2-2', icon: 'file-alt' },
                {
                    title: 'Requirement 0004', key: '0-0-2-3', icon: 'file-alt',
                    children: [
                        { title: 'Note 1', key: '0-0-2-3-0', icon: 'file-signature' },
                    ]
                },
            ],
        }],
    }]
};