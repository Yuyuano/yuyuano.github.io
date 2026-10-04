import type { DevicesConfig } from "@/types/devicesConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 设备展示页行为与展示配置。
 *
 * 遵循「配置管行为，数据管内容」原则：
 * - enable：页面总开关；false 时导航入口同步隐藏，访问 /devices/ 跳转 404；
 * - categories：场景分类清单（数组顺序即页面顶部 Chips 顺序）；
 * - disabledIds：可选被禁用的设备 ID 列表；
 *
 * 注：设备的具体清单数据（设备名、品牌、规格、感受说明、图片等）请在 `src/data/devices.ts` 中维护。
 */
export const devicesConfig: DevicesConfig = withUserConfig("devices", {
	enable: true,
	title: "$t:devices",
	description: "$t:devicesBanner",
	categories: [
		{
			key: "phone",
			label: "手机",
			icon: "material-symbols:phone-iphone",
			description: "日常主力与备用手机",
		},
		{
			key: "router",
			label: "路由器",
			icon: "material-symbols:router-outline",
			description: "家庭网络设备",
		},
		{
			key: "computer",
			label: "电脑",
			icon: "material-symbols:laptop-mac-outline-rounded",
			description: "主力工作站与笔记本",
		},
	],
	// disabledIds: [],
});
