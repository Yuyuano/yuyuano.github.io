import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "assets/images/avatar.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "遇缘",
	bio: "时光流转，愿有一天你能和你最重要的人重逢",
	links: [
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili", // Visit https://icones.js.org/ for icon codes
			url: "https://space.bilibili.com/1858221327",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Yuyuano",
		},
		// ── 以下是 Shirone 上游的原始示例链接（迁移时被上面两个替换，保留备查）──
		// {
		// 	name: "X",
		// 	icon: "fa6-brands:x-twitter",
		// 	url: "https://x.com",
		// },
		// {
		// 	name: "Steam",
		// 	icon: "fa6-brands:steam",
		// 	url: "https://store.steampowered.com",
		// },
		// {
		// 	name: "GitHub",
		// 	icon: "fa6-brands:github",
		// 	url: "https://github.com/LyraVoid/Shirone",
		// },
	],
});
