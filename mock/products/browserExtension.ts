import { FiShield, FiSun, FiGlobe } from "react-icons/fi";
import { type IconType } from "react-icons";

export interface IBrowserExtension {
  name: string;
  description: string;
  users: string;
  rating: string;
  downloadUrl: string;
  githubUrl: string;
  icon: string;
  features: Array<{
    title: string;
    description: string;
    icon: IconType;
  }>;
  screenshots: Array<{
    src: string;
    alt: string;
    theme: "light" | "dark";
  }>;
}

export const browserExtensions: IBrowserExtension[] = [
  {
    name: "Nice Extension",
    description:
      "一个优雅的浏览器扩展，让您在任何网页都能自由复制文本，支持多种主题和格式。",
    users: "1,000+",
    rating: "4.9/5.0",
    downloadUrl: "https://github.com/flower0wine/nice/releases",
    githubUrl: "https://github.com/flower0wine/nice",
    icon: "/images/nice-ext.png",
    features: [
      {
        title: "无破坏植入",
        description: "不影响网站原有功能，温和且有效",
        icon: FiShield,
      },
      {
        title: "双主题支持",
        description: "精心设计的亮色/暗色主题，自动适应系统主题",
        icon: FiSun,
      },
      {
        title: "多浏览器支持",
        description: "完美支持 Chrome、Edge、Firefox 等主流浏览器",
        icon: FiGlobe,
      },
    ],
    screenshots: [
      {
        src: "/images/nice-light.png",
        alt: "Nice Extension Light Theme",
        theme: "light",
      },
      {
        src: "/images/nice-dark.png",
        alt: "Nice Extension Dark Theme",
        theme: "dark",
      },
    ],
  },
];
