"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface IpInfo {
  ip: string;
  country_name?: string;
  city?: string;
  continent_name?: string;
}

export function Footer() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        // 先获取IP地址
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();

        // 然后获取IP详细信息
        const infoResponse = await fetch(
          `https://api.ipstack.com/${ip}?access_key=49b632060e1d7b54de432e005793dc59`
        );
        const data = await infoResponse.json();

        setIpInfo({
          ip,
          country_name: data.country_name,
          city: data.city,
          continent_name: data.continent_name,
        });
      } catch (error) {
        console.error("Failed to fetch IP info:", error);
        setIpInfo({ ip: "Unknown" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  return (
    <motion.footer
      className={cn(
        "relative mt-20 border-t",
        "bg-gradient-to-b from-background/50 to-background/50",
        "backdrop-blur-sm"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* 网站信息 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold">关于本站</h3>
            <p className="text-sm text-muted-foreground">
              这是一个使用 Next.js 和 Radix UI 构建的个人网站， 采用了现代化的
              UI 设计和动画效果。
            </p>
          </motion.div>

          {/* 技术栈 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold">技术栈</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 15 & React 18</li>
              <li>TypeScript & TailwindCSS</li>
              <li>Framer Motion</li>
              <li>Radix UI</li>
            </ul>
          </motion.div>

          {/* 访客信息 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold">访客信息</h3>
            <div className="space-y-2 text-sm">
              {isLoading ? (
                <motion.div
                  className="h-20 rounded-md bg-muted/50"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ) : (
                <div className="space-y-1">
                  <p className="text-muted-foreground">IP: {ipInfo?.ip}</p>
                  {ipInfo?.country_name && (
                    <p className="text-muted-foreground">
                      位置: {ipInfo.city}, {ipInfo.country_name}
                    </p>
                  )}
                  {ipInfo?.continent_name && (
                    <p className="text-muted-foreground">
                      大洲: {ipInfo.continent_name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* 版权信息 */}
        <motion.div
          className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} flowerwine. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ using Next.js and TypeScript</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
