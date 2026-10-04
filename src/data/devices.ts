/**
 * 设备展示页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/devicesConfig.ts 控制。
 */
import type { DeviceItem } from "@/types/devicesConfig";

export const devicesData: DeviceItem[] = [
	{
		id: "iqoo-neo9",
		name: "IQOO NEO 9",
		brand: "iQOO",
		category: "phone",
		status: "active",
		specs: "红白魂 / 16G + 256GB",
		description: "iQOO 于 2023 年 12 月发布的智能手机。",
		image: "/images/device/iqoo-neo9.jpg",
		featured: true,
		year: "2023",
		link: "https://www.vivo.com/vivo/iqooneo9/",
	},
	{
		id: "xiaomi-ax3000t",
		name: "Xiaomi-AX3000T",
		brand: "Xiaomi",
		category: "router",
		status: "active",
		specs: "1000Mbps / 5G",
		description: "后期产品有减配，小米我去你的。",
		image: "/images/device/xiaomi-ax3000t.jpg",
		link: "https://www.mi.com/xiaomi-ax3000t/",
	},
	{
		id: "mechrevo-kuangshi-x",
		name: "机械革命旷世X",
		brand: "MECHREVO",
		category: "computer",
		status: "active",
		specs: "i7 14650HX / RTX5060",
		description: "机革毛病挺多的，谨慎选择。",
		image: "/images/device/mechrevo.jpg",
		featured: true,
		link: "https://www.mechrevo.com/",
	},
];

/** 获取所有设备数据列表 */
export function getDevicesList(): DeviceItem[] {
	return devicesData;
}
