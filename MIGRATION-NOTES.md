# 迁移改动与还原指南

本文件记录从 **Mizuki → Shirone** 迁移时对 Shirone 主题做的所有改动，
以及**每一项的还原方式**。遵循"不删除、只注释"的原则，凡是能在代码里注释
保留的都已就地注释；只有**文件级别**的删除无法注释，集中记录在这里。

> 上游原始文件完整保留在 **`D:\blog\Shirone`**（未做任何修改，`git status` 干净，
> HEAD = `b7560d7`）。任何被替换/删除的内容都可以从那里取回。

---

## 1. 已在代码里注释保留的改动（就地还原）

| 文件 | 改动 | 还原方式 |
|---|---|---|
| `src/config/projectsConfig.ts` | `enable: true` → `enable: false` | 改回 `enable: true` |
| `src/config/skillsConfig.ts` | 同上 | 同上 |
| `src/config/timelineConfig.ts` | 同上 | 同上 |
| `src/config/momentsConfig.ts` | 同上 | 同上 |
| `src/config/albumsConfig.ts` | 同上 | 同上 |
| `src/config/gamesConfig.ts` | 同上 | 同上 |
| `src/config/compassConfig.ts` | 同上 | 同上 |
| `src/config/seriesConfig.ts` | 同上 | 同上 |
| `src/config/navBarConfig.ts` | 导航结构按博主原样重写；**上游原始导航整段注释在文件末尾** | 复制注释块覆盖 `defaultNavBarConfig.links` |
| `src/config/profileConfig.ts` | 社交链接换成 B站/GitHub；**上游 X / Steam / GitHub 三条注释保留在 links 内** | 取消注释 |
| `src/config/devicesConfig.ts` | 分类换成 手机/路由器/电脑；**上游 desk/mobile/audio/peripheral 四个分类注释保留** | 取消注释（并同步改 `src/data/devices.ts` 的 `category`） |
| `src/types/seriesConfig.ts` | `enable` 由必填改为可选 | 改回 `enable: boolean;` |

> **为什么停用页面用的是 `enable: false` 而不是把整行注释掉？**
> `src/config/sitemapFilter.ts` 用的是严格判断 `enable === false`，而页面自身用 `!enable`。
> 如果把 `enable` 整行注释掉，页面会正确跳 404，但 **sitemap 仍会收录这些死链**。
> 所以这里用显式 `false`，并在行尾用 `// 原值 enable: true` 保留原状态。

---

## 2. 文件级删除（无法注释，记录于此）

### 2.1 Shirone 示例文章 —— 已从 `src/content/posts/` 删除

迁移时清空了 Shirone 的示例文章目录，再放入博主的 44 篇文章。
**原文件全部仍在上游**，需要哪一篇直接拷回即可：

```
源：D:\blog\Shirone\src\content\posts\<文件名>
目标：D:\blog\Shirone-Blog\src\content\posts\<文件名>
```

被删除的示例文章清单：

```
admonitions.md            audio-reader.md          collapse-panels.md
content-annotations.md    draft.md                 encrypted-demo.md
expressive-code.md        markdown-abbreviations.md markdown-enhancements.md
markdown-extended.md      markdown-fields.md       markdown-includes.md
markdown-mermaid.md       markdown.md              marker-highlights.md
mdx-showcase.mdx          option-groups.md         spoilers.md
steps.md                  video.md
目录：image-grid-demo/    guide/index.md
```

> ⚠️ 注意：博主自己也有同名的 `markdown-extended.md`、`markdown-mermaid.md`、
> `markdown-tutorial.md`、`video.md`、`draft.md`、`encrypted-post.md` —— 那是博主
> 从 Mizuki 带过来的，**不是** Shirone 示例，不要用上游文件覆盖它们。

### 2.2 Shirone 示例瞬间 —— 未迁入

`src/content/moments/` 已随 `momentsConfig.enable: false` 停用：

```
2026-07-27-reading.md          2026-07-30-desk-setup.md
2026-08-03-film-roll.md        2026-08-08-late-night-coding.md
2026-08-12-riverside.md        2026-08-15-welcome.md
```

还原：从 `D:\blog\Shirone\src\content\moments\` 拷回，并把
`momentsConfig.ts` 的 `enable` 改回 `true`。

### 2.3 Shirone 示例相册 —— 未迁入

`public/images/albums/` 下的 `AcgExample`、`EncryptedExample`、
`ExternalExample`、`HiddenExample` 未复制。还原：从
`D:\blog\Shirone\public\images\albums\` 拷回，并把 `albumsConfig.enable` 改回 `true`。

### 2.4 关于页 —— 内容被重写

`src/content/spec/about.md` 原本是 Shirone 的英文主题介绍，已重写为博主的个人介绍。
上游原文在 `D:\blog\Shirone\src\content\spec\about.md`。

### 2.5 数据文件 —— 就地替换（未注释）

| 文件 | 状态 | 说明 |
|---|---|---|
| `src/data/friends.ts` | 替换为博主 4 条友链 | 上游原文在上游同路径 |
| `src/data/devices.ts` | 替换为博主 3 台设备 | 上游是 MacBook/iPhone/Sony/键盘/iPad |
| `src/data/projects.ts` | **未改**（保留上游示例） | 页面已停用，数据未动 |
| `src/data/skills.ts` | **未改** | 同上 |
| `src/data/timeline.ts` | **未改** | 同上 |
| `src/data/anime.ts` | **未改** | 页面仍启用，当前显示上游示例数据 |
| `src/data/music.ts` | **未改** | 音乐走 Meting 远程歌单，未用本地曲目 |
| `src/data/games.ts` / `compass.ts` | **未改** | 页面已停用 |

> 这些是**对象数组**，把整个数组注释掉会让文件很难读，所以采用就地替换。
> 需要找回上游版本时，直接与 `D:\blog\Shirone\src\data\<同名文件>` 对比即可。

---

## 3. 博主内容（从 Mizuki 迁移，非 Shirone 原生）

| 内容 | 位置 |
|---|---|
| 44 篇文章 | `src/content/posts/`（含 `guide/` 11 张图片） |
| 头像 / 横幅（3+3 张） | `src/assets/images/`、`src/assets/images/banner/` |
| 设备图 3 张 | `public/images/device/` |
| favicon | `public/logo/icon.webp` |
| 旧链接跳转页 21 个 | `public/posts/<旧文件名>/index.html`，由 `D:\blog\Make-Redirects.ps1` 生成 |
| `CNAME` / `.nojekyll` | `public/` |

### 迁移脚本（在 `D:\blog\` 下，不在本站仓库内）

| 脚本 | 作用 |
|---|---|
| `Migrate-Posts.ps1` | 文章 frontmatter 清理；`author`/`licenseName`/`sourceLink` 转成正文引用块 |
| `Make-Redirects.ps1` | 生成旧 URL 跳转页 |
| `Map-Slugs.ps1` | 新旧 slug 对照诊断 |
| `Disable-Unused-Pages.ps1` | 批量停用无内容页面 |

### 文章 frontmatter 的处理规则

```
删除（两版 schema 都没有的死字段）：date, pubDate
删除（Shirone schema 无对应字段）：  author, licenseName
保留在正文（避免丢数据）：          原文链接 -> "> 原文链接：..." 引用块
                                  非默认许可 -> "> 本文许可：..." 引用块
其余字段：                          title/published/description/tags/category/
                                   draft/pinned/image/alias/updated/
                                   encrypted/password/passwordHint 全部保留
```

---

## 4. 版本与构建

| 项 | 值 |
|---|---|
| 站点目录 | `D:\blog\Shirone-Blog` |
| 上游对照（只读） | `D:\blog\Shirone`（HEAD `b7560d7`） |
| 旧站点（未改动） | `D:\blog\Mizuki`（HEAD `92b1db6`） |
| git 基线 | `b6aab4f` 迁移基线 / `ab4a696` 停用页面 |
| Shirone 锁定 pnpm | `9.14.4`（本机全局为 12.6.0，且无 corepack） |
| 本机 Node | `v26.7.0`（Shirone 要求 ≥ 22.12） |

正常环境构建：

```powershell
cd D:\blog\Shirone-Blog
pnpm install
pnpm build
```

本次迁移在受限沙箱内验证时使用的等效命令（含绕过参数，**普通环境不需要**）：

```powershell
npx pnpm@10.22.0 install --node-linker=hoisted --ignore-scripts
node scripts/icons/generate-local-icons.mjs
npx astro build
```

---

## 5. 推送到 GitHub（覆盖 yuyuano.github.io）

本地已备好：`master` 分支、3 个提交、工作区干净、`public/CNAME` 与 `public/.nojekyll` 就位。
**远端尚未配置**（迁移时故意不配，避免误推）。

### 5.1 备份旧线上仓库（务必先做）

```bash
cd D:\blog\Mizuki
git push origin master:backup-mizuki-v9   # 把当前线上状态存成备份分支
```

`D:\blog\Mizuki` 本身也是完整历史，等于第二份备份。

### 5.2 推送覆盖

```bash
cd D:\blog\Shirone-Blog
git remote add origin git@github.com:Yuyuano/yuyuano.github.io.git
git push --force origin master
```

> 新仓库历史与旧仓库**完全无关**（重写过），所以必须 `--force`。
> 旧历史已由 5.1 的备份分支与 `D:\blog\Mizuki` 保住。

### 5.3 ⚠️ 必须改 GitHub Pages 设置，否则站点不会更新

这是**最容易漏掉的一步**，会导致推上去之后线上还是旧版或直接 404：

| | 现在（Mizuki） | 迁移后（Shirone） |
|---|---|---|
| 部署分支 | push `main` → 构建 → 推 `pages` 分支 | push `main` → Actions → artifacts |
| Pages Source | **`pages` 分支 / root** | 必须改成 **GitHub Actions** |
| 工作流文件 | `.github/workflows/deploy.yml`（JamesIves 推 `pages`） | **仍然是 `.example`，没启用** |
| 权限 | `contents: write` | `contents: read` + `pages: write` + `id-token: write` |

**具体操作：**

1. 仓库 Settings → Pages → Source 改成 **GitHub Actions**（不再是分支）。
2. 把部署工作流启用起来，并替换其中那个故意 `exit 1` 的占位步骤：

   ```bash
   cd D:\blog\Shirone-Blog
   cp .github/workflows/deploy.yml.example .github/workflows/deploy.yml
   ```

   然后把文件里的 `Deploy` 步骤（会打印 "replace this step" 并 `exit 1`）换成
   GitHub Pages 变体：`actions/upload-pages-artifact`（`path: dist`）
   + `actions/deploy-pages`；`permissions` 改为
   `contents: read` / `pages: write` / `id-token: write`；并把
   `CONTENT_REPOSITORY` / `CONTENT_DIR` 相关的单仓依赖去掉（本博客用本地内容，
   `content:sync` 在 local 模式下是空操作）。
3. 另外上游 `ci.yml` 与 `content-validate.yml` 是按双仓内容分离设计的，
   单仓博客可以保留不管（`ci.yml` 有 `continue-on-error`），也可以删掉。

> 分支名：本地是 `master`。若你希望线上用 `main`，先
> `git branch -M master main` 再推，并同步改工作流里的触发分支。

