import { generateMetadata } from "@/components/seo/metadata-generator";
import { WorksClient } from "./works-client";
import { codeWorks } from "@/mock/code";
import { mockWorks } from "@/mock/data";
import { MeteorShower } from "@/components/ui/meteor-shower";
import "./masonry.css";
import type { Work } from "@/types/work";

const works: Work[] = [...mockWorks, ...codeWorks];

export const metadata = generateMetadata({
  title: "作品集 | 我的个人网站",
  description: "展示我的项目作品和创意工作",
  keywords: ["作品集", "项目展示", "个人作品", "开发项目"],
});

export default function WorksPage() {
  return (
    <>
      <MeteorShower />
      <WorksClient works={works} />
    </>
  );
}
