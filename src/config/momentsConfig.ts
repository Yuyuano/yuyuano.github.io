import type { MomentsConfig } from "../types/momentsConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const momentsConfig: MomentsConfig = withUserConfig("moments", {
	// 迁移时停用：Shirone 示例瞬间（原 diary.ts 只有 1 条示例）。
	// 需要启用时把下面这行改回 enable: true 即可，导航入口会自动恢复。
	enable: false, // 原值 enable: true
	title: "$t:moments",
	description: "$t:momentsBanner",
});
