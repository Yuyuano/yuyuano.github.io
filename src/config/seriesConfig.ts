import type { SeriesConfig } from "../types/seriesConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const seriesConfig: SeriesConfig = withUserConfig("series", {
	// 迁移时停用：未创建任何系列（需要真实连载内容才有意义）。
	// 需要启用时把下面这行改回 enable: true 即可，导航入口会自动恢复。
	enable: false, // 原值 enable: true
	title: "$t:series",
	// 空 = 使用动态汇总（「x 个系列 · y 篇文章」）
	description: "",
	cardPosition: "bottom",
});
