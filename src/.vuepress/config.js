const { description } = require('../../package')

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
		['meta', { name: 'theme-color', content: '#3eaf7c' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
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
		nav: [
		],
		sidebarDepth: 1,
		sidebar: {
			collapsable: false,
			'/blog/': [
				{
					title: 'webpack 5.x',
					// collapsable: false,
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
					title: 'http3',
					// collapsable: false,
					children: [
						'/blog/http/introduction',
					]
				},
				{
					title: 'flutter',
					children: [
						'/blog/flutter/init',
						'/blog/flutter/flutter',
						'/blog/flutter/dart',
						'/blog/flutter/example',
					]
				},
				{
					title: 'tensorflow',
					children: [
						'/blog/tensorflow/init',
					]
				}
			],
			'/http/': [
				{
					title: 'http3',
					collapsable: false,
					children: [
						''
					]
				}
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
