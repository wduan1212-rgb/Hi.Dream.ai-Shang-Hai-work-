# HiDream.ai Shanghai Creative Workspace

智象未来上海海外互动营销内容创作工作台，是一个可直接通过 GitHub Pages 运行的单页 HTML 应用。

## Online Page

- GitHub Pages: https://wduan1212-rgb.github.io/Hi.Dream.ai-Shang-Hai-work-/
- Repository: https://github.com/wduan1212-rgb/Hi.Dream.ai-Shang-Hai-work-

## Repository Structure

| 文件 | 说明 |
| --- | --- |
| `index.html` | GitHub Pages 入口文件，也是最终上线网页。所有关键样式、脚本、logo 和主要视觉资源已内嵌。 |
| `README.md` | 项目说明与使用说明。 |
| `.gitignore` | 忽略本地生成脚本、源 HTML、大型素材和系统文件，避免影响线上部署。 |

> 线上运行只需要 `index.html`。原始合并源文件和生成脚本已从仓库中移除，避免 Pages 部署加载不必要的大文件。

## Website Features

- `Prompt Hub`：保留冰丝凉凉裤 15 个 AI 视频提示词核心模块，去除产品概述、参考图和最近生成历史。
- `Hair Brush / Foot File / Trimmer / Pore Vacuum`：四个自运营产品默认进入 AI 视频提示词主工作流。
- `运营素材库`：集中收纳四个产品的口播、花字、评论回复，支持按产品、素材类型和关键词筛选。
- `全局搜索`：跨产品搜索素材与提示词，支持定位、复制和存入灵感。
- `灵感备忘录`：通过右下角悬浮球记录提示词片段、镜头变量和创意方向，支持颜色标记、调用与复制。
- `最近复制`：保留近期复制内容，方便快速复用。
- `单文件部署`：网页入口为 `index.html`，可直接由 GitHub Pages 托管。

## Local Preview

直接打开根目录的 `index.html` 即可预览。

```text
index.html
```

## Design Direction

界面采用深色科技工作台风格，聚焦内容运营的高频动作：产品切换、提示词生成、素材检索、复制复用和灵感记录。整体目标是减少冗余信息，同时保留原工具的核心能力。
