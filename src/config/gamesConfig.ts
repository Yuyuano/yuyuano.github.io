import type { GamesConfig } from "@/types/gamesConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 游戏展示页行为与展示配置。
 *
 * 遵循「配置管行为，数据管内容」原则：
 * - enable：页面总开关；false 时导航入口同步隐藏，访问 /games/ 跳转 404；
 * - categories：游戏分类清单（数组顺序即页面顶部 Chips 顺序；
 *   没有任何条目的分类会自动隐藏，因此可放心保留暂时用不到的分类）；
 * - disabledIds：可选被禁用的游戏 ID 列表；
 *
 * 注：游戏的具体清单数据（游戏名、开发商、封面、评分、时长、简评等）请在 `src/data/games.ts` 中维护。
 */
export const gamesConfig: GamesConfig = withUserConfig("games", {
	// 迁移时停用：Shirone 示例游戏数据（你没有游戏数据）。
	// 需要启用时把下面这行改回 enable: true 即可，导航入口会自动恢复。
	enable: false, // 原值 enable: true
	title: "$t:games",
	description: "$t:gamesBanner",
	categories: [
		{
			key: "open-world",
			label: "Open World",
			icon: "material-symbols:explore-outline-rounded",
			description: "Open-world adventures",
		},
		{
			key: "sandbox",
			label: "Sandbox",
			icon: "material-symbols:widgets-rounded",
			description: "Building, crafting & creative worlds",
		},
		{
			key: "rpg",
			label: "RPG",
			icon: "material-symbols:shield-outline-rounded",
			description: "Role-playing stories & builds",
		},
		{
			key: "action",
			label: "Action",
			icon: "material-symbols:swords-outline-rounded",
			description: "Action, fighting & shooters",
		},
		{
			key: "casual",
			label: "Casual",
			icon: "material-symbols:extension-outline-rounded",
			description: "Cozy, casual & party games",
		},
	],
	// disabledIds: [],
});
