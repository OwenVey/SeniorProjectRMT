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
        key: '0-0',
        title: 'Project Name',
        icon: 'archive',
        children: [{
            title: 'Component 1',
            key: '0-0-0',
            icon: 'sitemap',
            children: [
                {
                    key: '0-0-0-0',
                    title: 'Requirement 0001',
                    description: 'Aute consequat excepteur amet veniam aute laborum.',
                    icon: 'file-alt',
                    status: 'Completed',
                },
                {
                    key: '0-0-0-1',
                    title: 'Requirement 0002',
                    description: 'Commodo ad dolore cillum pariatur.',
                    icon: 'file-alt',
                    status: 'Approved',
                },
                {
                    key: '0-0-0-2',
                    title: 'Requirement 0003',
                    description: 'Dolore amet nisi laborum dolor id.',
                    icon: 'file-alt',
                    status: 'Rejected',
                },
            ],
        }, {
            title: 'Component 2',
            key: '0-0-1',
            icon: 'sitemap',
            children: [
                {
                    key: '0-0-1-0',
                    title: 'Requirement 0001',
                    description: 'Ut proident nulla labore ipsum duis Lorem id irure deserunt deserunt ad labore.',
                    icon: 'file-alt',
                    status: 'Approved',
                },
                {
                    key: '0-0-1-1',
                    title: 'Requirement 0002',
                    description: 'Dolor cillum officia deserunt ea sint veniam id eiusmod aliquip qui.',
                    icon: 'file-alt',
                    status: 'Draft',
                },
                {
                    key: '0-0-1-2',
                    title: 'Requirement 0003',
                    description: 'Ipsum adipisicing laborum qui in reprehenderit anim sunt culpa commodo eiusmod nisi sit esse.',
                    icon: 'file-alt',
                    status: 'Completed',
                },
            ],
        }, {
            key: '0-0-2',
            title: 'Component 3',
            icon: 'sitemap',
            children: [
                {
                    key: '0-0-2-0',
                    title: 'Requirement 0001',
                    description: 'Incididunt consequat pariatur voluptate labore mollit occaecat tempor deserunt commodo.',
                    icon: 'file-alt',
                    status: 'Draft',
                },
                {
                    key: '0-0-2-1',
                    title: 'Requirement 0002',
                    description: 'Cupidatat velit commodo anim quis quis.',
                    icon: 'file-alt',
                    status: 'Approved',
                },
                {
                    key: '0-0-2-2',
                    title: 'Requirement 0003',
                    description: 'Laborum duis velit cillum amet et dolore deserunt excepteur pariatur.',
                    icon: 'file-alt',
                    status: 'Approved',
                },
                {
                    key: '0-0-2-3',
                    title: 'Component 4',
                    icon: 'file-alt',
                    children: [
                        {
                            key: '0-0-2-3-0',
                            title: 'Note 1',
                            description: 'Commodo sunt amet mollit occaecat exercitation officia sint exercitation consectetur.',
                            icon: 'file-signature',
                            status: 'Completed',
                        },
                    ]
                },
            ],
        }],
    }]
};