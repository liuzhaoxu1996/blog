module.exports = {
  /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
  title: "Liu zhaoxu's blog",

  /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
  description: "Liuzhaoxu's blog",

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
        content: "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      }
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black"
      }
    ]
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
        items: [
          {
            text: "webpack",
            link: "/blog/webpack/introduction"
          },
          {
            text: "flutter",
            link: "/blog/flutter/init"
          },
          {
            text: "go",
            link: "/blog/go/lesson1"
          },
          {
            text: "spider",
            link: "/blog/spider/introduction"
          },
          {
            text: "https",
            link: "/blog/https/introduction"
          },
          {
            text: "tensorflow",
            link: "/blog/tensorflow/introduction"
          }
        ]
      },
      {
        text: "读书笔记",
        items: [
          {
            text: "JavaScript函数式编程指南",
            link: "/book/functional/first"
          },
          {
            text: "JavaScript高级程序设计",
            link: "/book/professional/1"
          }
        ]
      },
      {
        text: "视频笔记",
        items: [
          {
            text: "极客时间: 算法训练营",
            link: "/video/algorithm/8"
          },
          {
            text: "零基础学Java",
            link: "/video/java/1"
          }
        ]
      }
    ],
    sidebarDepth: 1,
    sidebar: {
      "/blog/": [
        {
          title: "webRTC",
          collapsable: false,
          children: ["/blog/webRTC/1", "/blog/webRTC/2", "/blog/webRTC/3"]
        },
        {
          title: "tensorflow",
          collapsable: false,
          children: [
            "/blog/tensorflow/1",
            "/blog/tensorflow/2",
            "/blog/tensorflow/3"
          ]
        },
        {
          title: "webpack 5.x",
          collapsable: true,
          children: [
            "/blog/webpack/introduction",
            "/blog/webpack/loaders",
            "/blog/webpack/plugins",
            "/blog/webpack/mode",
            "/blog/webpack/watch",
            "/blog/webpack/optimize",
            "/blog/webpack/speed",
            "/blog/webpack/webpackLibrary",
            "/blog/webpack/upgrade",
            "/blog/webpack/delete",
            "/blog/webpack/federation",
            "/blog/webpack/commonConfig"
          ]
        },
        {
          title: "flutter",
          collapsable: true,
          children: [
            "/blog/flutter/init",
            "/blog/flutter/package",
            "/blog/flutter/layout",
            "/blog/flutter/route",
            "/blog/flutter/app",
            "/blog/flutter/lifecycle",
            "/blog/flutter/widget",
            "/blog/flutter/dart",
            "/blog/flutter/usage",
            "/blog/flutter/components",
            "/blog/flutter/example"
          ]
        },
        {
          title: "go",
          collapsable: true,
          children: [
            "/blog/go/1",
            "/blog/go/2",
            "/blog/go/3",
            "/blog/go/4",
            "/blog/go/5",
            "/blog/go/6",
            "/blog/go/7",
            "/blog/go/8",
            "/blog/go/9",
            "/blog/go/10",
            "/blog/go/11",
            "/blog/go/12",
            "/blog/go/13",
            "/blog/go/14"
          ]
        },
        {
          title: "spider",
          collapsable: true,
          children: ["/blog/spider/init"]
        },
        {
          title: "mysql",
          collapsable: true,
          children: ["/blog/mysql/lesson1", "/blog/mysql/lesson2"]
        },
        {
          title: "http",
          collapsable: true,
          children: ["/blog/http/introduction"]
        }
      ],
      "/book/functional/": [
        {
          title: "Javascript函数式编程指南",
          collapsable: false,
          children: ["/book/functional/first"]
        }
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
            "/book/professional/11"
          ]
        }
      ],
      "/video/algorithm/": [
        {
          title: "极客时间: 算法训练营",
          collapsable: false,
          children: [
            "/video/algorithm/2",
            "/video/algorithm/3",
            "/video/algorithm/4",
            "/video/algorithm/8",
            "/video/algorithm/9"
          ]
        }
      ],
      "/video/java/": [
        {
          title: "极客时间：零基础学Java",
          collapsable: false,
          children: [
            "/video/java/1",
            "/video/java/2",
            "/video/java/3",
            "/video/java/15",
            "/video/java/16",
            "/video/java/17",
            "/video/java/22",
            "/video/java/27",
            "/video/java/32",
            "/video/java/33",
            "/video/java/35",
            "/video/java/36",
            "/video/java/37",
            "/video/java/38",
            "/video/java/39",
            "/video/java/47",
            "/video/java/136",
            "/video/java/137",
            "/video/java/138",
            "/video/java/139"
          ]
        }
      ]
    }
  },

  /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"]
};
