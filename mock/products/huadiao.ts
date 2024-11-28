export interface IHuadiaoWebsite {
  name: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  techStack: string[];
  icon: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  screenshots: Array<{
    src: string;
    alt: string;
  }>;
}

export const huadiaoData: IHuadiaoWebsite = {
  name: "花凋",
  description:
    "每一篇文章，都是灵魂的独白；每一次交流，都是心灵的共鸣。简洁而丰富，记录与连接编织出属于你的故事。",
  githubUrl: "https://github.com/flower0wine/huadiao-frontend",
  demoUrl: "https://flowerwine.xyz", // 替换为实际的演示地址
  techStack: [
    "Vue.js",
    "Spring Boot",
    "Redis",
    "WebSocket",
    "JavaScript",
    "CSS3",
  ],
  icon: "/images/huadiao.png",
  features: [
    {
      title: "个性化展示",
      description: "支持用户头像上传和个人资料定制，打造独特的个人空间",
    },
    {
      title: "社交登录集成",
      description: "支持 Github 和 Google 账号登录，让用户快速开始社交之旅",
    },
    {
      title: "即时通讯",
      description: "基于 WebSocket 的实时私信系统，支持关注用户间的即时交流",
    },
    {
      title: "记录访问历史",
      description: "记录用户的访问历史，方便用户回顾和分享",
    },
  ],
  screenshots: [
    {
      src: "/images/huadiao-index.png",
      alt: "花凋首页展示",
    },
    {
      src: "/images/huadiao-homepage.png",
      alt: "用户个人主页",
    },
    {
      src: "/images/huadiao-message.png",
      alt: "即时通讯界面",
    },
    {
      src: "/images/huadiao-history.png",
      alt: "访问历史界面",
    },
    {
      src: "/images/huadiao-account.png",
      alt: "用户设置界面",
    },
    {
      src: "/images/huadiao-blog.png",
      alt: "博客界面",
    },
  ],
};
