import type { AlbumsConfig } from "../types/albumsConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

export const albumsConfig: AlbumsConfig = withUserConfig("albums", {
	// 迁移时停用：Shirone 示例相册（示例图 acg/external/hidden/encrypted）。
	// 需要启用时把下面这行改回 enable: true 即可，导航入口会自动恢复。
	enable: false, // 原值 enable: true
	title: "$t:albums",
	description: "$t:albumsBanner",
});
