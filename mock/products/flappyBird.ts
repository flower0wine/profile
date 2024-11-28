export interface IFlappyBird {
  name: string;
  description: string;
  githubUrl: string;
  playUrl: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  screenshots: Array<{
    src: string;
    alt: string;
  }>;
}

export const flappyBirdData: IFlappyBird = {
  name: "Flappy Bird",
  description: "经典像素风小游戏的 Web 重制版，考验你的反应能力和耐心",
  githubUrl: "https://github.com/flower0wine/flappy-bird",
  playUrl: "https://flower0wine.github.io/flappy-bird/",
  features: [
    {
      title: "经典玩法",
      description: "完美还原原版游戏的操作手感和难度曲线，让你重温经典",
    },
    {
      title: "精确物理",
      description: "精心调教的重力加速度和跳跃力度，打造流畅的游戏体验",
    },
    {
      title: "像素艺术",
      description: "保留原汁原味的像素风格，展现复古游戏的独特魅力",
    },
    {
      title: "响应式设计",
      description: "完美适配各种屏幕尺寸，随时随地享受游戏乐趣",
    },
  ],
  screenshots: [
    {
      src: "/images/flappybird-ready.png",
      alt: "游戏开始画面",
    },
    {
      src: "/images/flappybird-start.png",
      alt: "游戏进行中",
    },
  ],
};
