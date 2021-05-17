module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'Liu zhaoxu\'s blog',

    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: 'Liuzhaoxu\'s blog',

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }]
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        nav: [{
                text: '博文',
                items: [
                    {
                        text: 'webpack',
                        link: '/blog/webpack/introduction' 
                    },
                    {
                        text: 'flutter',
                        link: '/blog/flutter/init' 
                    },
                    {
                        text: 'go',
                        link: '/blog/go/lesson1' 
                    },
                    {
                        text: 'spider',
                        link: '/blog/spider/introduction' 
                    },
                    {
                        text: 'https',
                        link: '/blog/https/introduction' 
                    },
                    {
                        text: 'tensorflow',
                        link: '/blog/tensorflow/introduction' 
                    },
                ],
            },
            {
                text: '读书笔记',
                items: [
                    {
                        text: 'JavaScript函数式编程指南',
                        link: '/book/functional/first'
                    },
                    {
                        text: 'JavaScript高级程序设计',
                        link: '/book/professional/1'
                    },
                ]
                
            },
            {
                text: '视频笔记',
                items: [
                    {
                        text: '极客时间: 算法训练营',
                        link: '/video/algorithm/8'
                    },
                    {
                        text: '零基础学Java',
                        link: '/video/java/1'
                    }
                ]
            }
        ],
        sidebarDepth: 1,
        sidebar: {
            '/blog/': [
                {
                    title: 'webpack 5.x',
                    collapsable: true,
                    children: [
                        '/blog/webpack/introduction',
                        '/blog/webpack/loaders',
                        '/blog/webpack/plugins',
                        '/blog/webpack/mode',
                        '/blog/webpack/watch',
                        '/blog/webpack/optimize',
                        '/blog/webpack/speed',
                        '/blog/webpack/webpackLibrary',
                        '/blog/webpack/upgrade',
                        '/blog/webpack/delete',
                        '/blog/webpack/federation',
                        '/blog/webpack/commonConfig',
                    ]
                },
                {
                    title: 'flutter',
                    collapsable: true,
                    children: [
                        '/blog/flutter/init',
                        '/blog/flutter/package',
                        '/blog/flutter/layout',
                        '/blog/flutter/route',
                        '/blog/flutter/app',
                        '/blog/flutter/lifecycle',
                        '/blog/flutter/widget',
                        '/blog/flutter/dart',
                        '/blog/flutter/usage',
                        '/blog/flutter/components',
                        '/blog/flutter/example',
                    ]
                },
                {
                    title: 'go',
                    collapsable: true,
                    children: [
                        '/blog/go/lesson1.md',
                        '/blog/go/lesson2.md',
                        '/blog/go/lesson3.md',
                        '/blog/go/lesson4.md',
                        '/blog/go/lesson5.md',
                        '/blog/go/lesson6.md',
                        '/blog/go/lesson7.md',
                        '/blog/go/lesson8.md',
                        '/blog/go/lesson9.md',
                    ]
                },
                {
                    title: 'spider',
                    collapsable: true,
                    children: [
                        '/blog/spider/init',
                    ]
                },
                {
                    title: 'mysql',
                    collapsable: true,
                    children: [
                        '/blog/mysql/lesson1',
                        '/blog/mysql/lesson2',
                    ]
                },
                {
                    title: 'http',
                    collapsable: true,
                    children: [
                        '/blog/http/introduction',
                    ]
                },
                {
                    title: 'tensorflow',
                    collapsable: true,
                    children: [
                        '/blog/tensorflow/init',
                    ]
                },
            ],
            '/book/functional/': [
                {
                    title: 'Javascript函数式编程指南',
                    collapsable: false,
                    children: [
                        '/book/functional/first',
                    ]
                },
            ],
            '/book/professional/': [
                {
                    title: 'Javascript高级程序设计',
                    collapsable: false,
                    children: [
                        '/book/professional/1.md',
                        '/book/professional/2.md',
                        '/book/professional/3.md',
                        '/book/professional/4.md',
                        '/book/professional/5.md',
                        '/book/professional/6.md',
                        '/book/professional/7.md',
                        '/book/professional/8.md',
                        '/book/professional/9.md',
                        '/book/professional/10.md',
                        '/book/professional/11.md',
                    ]
                },
            ],
            '/video/algorithm/': [
                {
                    title: '极客时间: 算法训练营',
                    collapsable: false,
                    children: [
                        '/video/algorithm/2',
                        '/video/algorithm/3',
                        '/video/algorithm/4',
                        '/video/algorithm/8',
                        '/video/algorithm/9',
                    ]
                },
            ],
            '/video/java/': [
                {
                    title: '极客时间：零基础学Java',
                    collapsable: false,
                    children: [
                        '/video/java/1',
                        '/video/java/2',
                        '/video/java/3',
                        '/video/java/15',
                        '/video/java/16',
                        '/video/java/17',
                    ]
                },
            ],
        }
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
    ]
}