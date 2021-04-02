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
                    title: 'http3',
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
            '/book/': [
                {
                    title: 'Javascript函数式编程指南',
                    collapsable: false,
                    children: [
                        '/book/functional/first',
                    ]
                },
            ]
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