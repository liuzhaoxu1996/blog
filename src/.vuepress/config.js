const fs = require('fs');
const path = require('path');
const blogList = fs.readdirSync(path.resolve(__dirname, '../blog')).map(item => {
	return `/blog/${item.split('.')[0]}`
})
module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Zhaoxu Liu",

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Zhaoxu Liu",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    [
      "meta",
      {
        name: "theme-color",
        content: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "博文",
        link: "/blog/1",
      },
      //   {
      //     text: "归档",
      //     items: [
      //       {
      //         text: "go",
      //         link: "/document/go/1",
      //       },
      //       {
      //         text: "java",
      //         link: "/document/java/1",
      //       },
      //       {
      //         text: "flutter",
      //         link: "/document/flutter/init",
      //       },
      //       {
      //         text: "webpack5",
      //         link: "/document/webpack/introduction",
      //       },
      //       {
      //         text: "tensorflow",
      //         link: "/document/tensorflow/1",
      //       },
      //       {
      //         text: "mysql",
      //         link: "/document/mysql/1",
      //       },
      //       {
      //         text: "nodejs",
      //         link: "/document/nodejs/1",
      //       },
      //       {
      //         text: "面试",
      //         link: "/document/interview/javascript",
      //       },
      //     ],
      //   },
      //   {
      //     text: "读书笔记",
      //     items: [
      //       {
      //         text: "JavaScript函数式编程指南",
      //         link: "/book/functional/first",
      //       },
      //       {
      //         text: "JavaScript高级程序设计",
      //         link: "/book/professional/1",
      //       },
      //     ],
      //   },
      //   {
      //     text: "算法",
      //     link: "/algorithm/2",
      //   },
    ],
    sidebarDepth: 1,
    sidebar: {
      "/blog/": [
        {
          title: "博文",
          sidebarDepth: 0,
          collapsable: false,
          children: blogList,
        },
      ],
      "/book/functional/": [
        {
          title: "Javascript函数式编程指南",
          collapsable: false,
          children: ["/book/functional/first"],
        },
      ],
      "/book/professional/": [
        {
          title: "Javascript高级程序设计",
          collapsable: false,
          children: [
            "/book/professional/1",
            "/book/professional/2",
            "/book/professional/3",
            "/book/professional/4",
            "/book/professional/5",
            "/book/professional/6",
            "/book/professional/7",
            "/book/professional/8",
            "/book/professional/9",
            "/book/professional/10",
            "/book/professional/11",
          ],
        },
      ],
      "/algorithm/": [
        {
          title: "算法",
          collapsable: false,
          children: [
            "/algorithm/2",
            "/algorithm/3",
            "/algorithm/4",
            "/algorithm/8",
            "/algorithm/9",
          ],
        },
      ],
      "/document/java/": [
        {
          title: "极客时间：零基础学Java",
          collapsable: false,
          children: [
            "/document/java/1",
            "/document/java/2",
            "/document/java/3",
            "/document/java/15",
            "/document/java/16",
            "/document/java/17",
            "/document/java/22",
            "/document/java/27",
            "/document/java/32",
            "/document/java/33",
            "/document/java/35",
            "/document/java/36",
            "/document/java/37",
            "/document/java/38",
            "/document/java/39",
            "/document/java/47",
            "/document/java/136",
            "/document/java/137",
            "/document/java/138",
            "/document/java/139",
          ],
        },
      ],
      "/document/go/": [
        {
          title: "go",
          collapsable: false,
          children: [
            "/document/go/1",
            "/document/go/2",
            "/document/go/3",
            "/document/go/4",
            "/document/go/5",
            "/document/go/6",
            "/document/go/7",
            "/document/go/8",
            "/document/go/9",
            "/document/go/10",
            "/document/go/11",
            "/document/go/12",
            "/document/go/13",
          ],
        },
      ],
      "/document/flutter/": [
        {
          title: "flutter",
          collapsable: false,
          children: [
            "/document/flutter/init",
            "/document/flutter/package",
            "/document/flutter/layout",
            "/document/flutter/route",
            "/document/flutter/app",
            "/document/flutter/lifecycle",
            "/document/flutter/widget",
            "/document/flutter/dart",
            "/document/flutter/usage",
            "/document/flutter/components",
            "/document/flutter/example",
          ],
        },
      ],
      "/document/webpack/": [
        {
          title: "webpack 5.x",
          collapsable: true,
          children: [
            "/document/webpack/introduction",
            "/document/webpack/loaders",
            "/document/webpack/plugins",
            "/document/webpack/mode",
            "/document/webpack/watch",
            "/document/webpack/optimize",
            "/document/webpack/speed",
            "/document/webpack/webpackLibrary",
            "/document/webpack/upgrade",
            "/document/webpack/delete",
            "/document/webpack/federation",
            "/document/webpack/commonConfig",
          ],
        },
      ],
      "/document/tensorflow/": [
        {
          title: "tensorflow",
          collapsable: false,
          children: [
            "/document/tensorflow/1",
            "/document/tensorflow/2",
            "/document/tensorflow/3",
          ],
        },
      ],
      "/document/mysql/": [
        {
          title: "mysql",
          collapsable: false,
          children: ["/document/mysql/1", "/document/mysql/2"],
        },
      ],
      "/document/nodejs/": [
        {
          title: "nodejs",
          collapsable: false,
          children: [
            "/document/nodejs/1",
            "/document/nodejs/2",
            "/document/nodejs/3",
            "/document/nodejs/4",
          ],
        },
      ],
      "/document/interview/": [
        {
          title: "面试",
          collapsable: false,
          children: [
            "/document/interview/javascript",
            "/document/interview/css",
            "/document/interview/html",
            "/document/interview/vue",
            "/document/interview/react",
            "/document/interview/http",
            "/document/interview/node",
            "/document/interview/flow",
            "/document/interview/other",
            "/document/interview/coding",
            "/document/interview/coding2",
            "/document/interview/interview",
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
