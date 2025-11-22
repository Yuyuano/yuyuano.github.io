// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	{
		id: 2,
		title: "Mizuki Docs",
		imgurl:
			"http://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		desc: "Mizuki User Manual",
		siteurl: "https://docs.mizuki.mysqil.com",
		tags: ["Docs"],
	},
	{
		id: 3,
		title: "Vercel",
		imgurl: "https://avatars.githubusercontent.com/u/14985020?v=4&s=640",
		desc: "Develop. Preview. Ship.",
		siteurl: "https://vercel.com",
		tags: ["Hosting", "Cloud"],
	},
	{
		id: 4,
		title: "我自己的副博客",
		imgurl: "https://avatars.githubusercontent.com/u/170221043?v=4",
		desc: "这是由Gmeek搭建的博客，是我第一个博客",
		siteurl: "https://blog.yuzhiyuan.top",
		tags: ["个人博客", "技术"],
	},
	{
		id: 5,
		title: "Jeet-PR",
		imgurl: "https://jeet-pr.github.io/avatar/avatar.webp",
		desc: "高中同学博客",
		siteurl: "https://jeet-pr.github.io/",
		tags: ["个人博客", "技术"],
	},
	{
		id: 6,
		title: "玉与遇",
		imgurl: "https://avatars.githubusercontent.com/u/242206735?v=4s=640",
		desc: "高中同学博客",
		siteurl: "https://blog.yuyuyu0721.top/",
		tags: ["个人博客", "技术"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
