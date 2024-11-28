import { HomeClient } from "@/components/home/home-client";
import { generateMetadata } from "@/components/seo/metadata-generator";
import { MeteorShower } from "@/components/ui/meteor-shower";

export const metadata = generateMetadata({
  title: "我的作品集 | 个人网站",
  description: "展示我的创意作品和项目经验",
  keywords: ["作品集", "个人网站", "开发", "设计"],
});

export default function Home() {
  return (
    <>
      <MeteorShower />
      <HomeClient />
    </>
  );
}
