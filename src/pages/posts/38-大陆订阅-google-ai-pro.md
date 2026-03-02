---
layout: "../../layouts/BlogPost.astro"
title: "国内订阅 Google AI Pro，用上 Antigravity 真挺难"
description: "踩坑记录：账号地区、Antigravity、以及“网页端无法续费”的最终解法（Android + Play 美区）。"
pubDate: "2026-03-02"
heroImage: "/assets/imgs/2b14941894f199b4e2076b4e19a70099aa356fa4dc0b7567f8c38eda9afe1c67.png"
---
> 本文由 AI 优化组织完成，非个人完整编写，AI 参与度：90%
> 
> 写于 **2025.12.26**，最后更新于 **2026.03.02**，涉及价格、活动、权益、可用地区等都有时效性


最近同事们都在安利 Antigravity, 为了把 Antigravity 用起来，在「账号地区」和「付款/续费」上踩了不少坑，差不多就是——**没想到 2025 年，还有想付钱付不出去的时候** 🤣

![picture 4](/assets/imgs/9d8a984098626a1aeb43c5e2116b19913822f95df70d7c7ca633e3ec4a70cf9d.png)  

这篇文章记录我在中国大陆地区，最终用 **700 块左右**（我开通时刚好赶上活动）开通一年 Google AI Pro 的全过程，重点是两件事：

- **用上 Antigravity**
- **用上“每 5 小时刷新”的 quota**（一周刷新一次根本不够用）


# TL;DR（省流版）

如果你只想要一个“能跑通”的最短路径：

1. **先把 Google 账号地区从中国/香港切走**（否则 Antigravity 大概率直接卡住）  
   - 参考这篇：[`loongphy.com` 的教程](https://loongphy.com/blog/google-antigravity-stuck-setting-up-your-account)
2. 你会发现：地区切完后，**网页端还是可能无法开通/续费 AI Pro**（提示“当前账号无法访问此页面”之类的）
3. 这时候用 **Android + Google Play**，把 Play 的国家/地区切到 **美国**（通常需要绑卡触发）
4. Play 美区生效后，下载 **Gemini App**，从 App 里走订阅/续费
5. 订阅页面可能会弹一个“低价用 3 个月”的活动：**先别点**
6. 回到 Google One 的 AI 套餐页，从“**全年半价**”入口进入，再完成订阅  
   - 我最后是通过这个路径拿到最便宜的价格

![picture 5](/assets/imgs/0ce6bf5e398d6b8d8e1dd7a4a599f23028cdce997111385b0593b3e37a327002.png)  


# 背景：为啥要折腾 AI Pro

我主要是两个诉求：

1. **Antigravity**（它对账号地区非常敏感）
2. **更高频率的 quota 刷新**（我这边是“每 5 小时刷新”这个体验最关键）

但真正折磨人的不是“买不买”，而是：

- Antigravity 要求 **Google 账号地区不能是中国/香港**
- 账号地区改完以后，AI Pro 的订阅/续费又会遇到 **网页端直接拒绝访问**  
  - 导致你永远停留在“能用一点，但不够用”的尴尬状态


# Part 1：先解决 Antigravity（账号地区不能是中国/香港）

我遇到的典型症状是：

- 打开 Antigravity，一直卡在 “Setting up your account” 或者类似的初始化页面
- 你怎么刷新都没用，甚至换浏览器也没用

根因基本就是：**账号地区不在支持列表里**（尤其是中国/香港）。

解决方案可参考这篇，改不成 US，但是可以改成 Japan，内容也写得很细：

- 参考：[`Google Antigravity stuck setting up your account`（loongphy）](https://loongphy.com/blog/google-antigravity-stuck-setting-up-your-account)

> 注意：Google 的地区切换/国家关联通常有频率限制（比如一年一次之类的），这里请你按官方提示来，别硬冲。

到这一步，你一般可以正常进 Antigravity 了。

# Part 2：你会发现：网页端“根本无法续费/开通 AI Pro”

我这里遇到的情况是：

- 账号地区已经切好了（Antigravity 已经能用了）
- 但是想把配额拉满（用 AI Pro 的 5 小时刷新 quota）
- 打开 `Google One` 的 AI 订阅页面，直接提示：
  - “当前账号无法访问此页面”
  - 或者无法加载付款/订阅入口

这会导致一个非常尴尬的状态：

- 你已经“半只脚进来了”，但 quota 根本不够用


# Part 3：终极解法：Android + Google Play 切美区，再从 Gemini App 订阅

![picture 6](/assets/imgs/5dfe0bbe83e46b0b395c873a446a59c6297d9a57cf53aa9782be7b65e63913f3.png)  

这里的关键点是：**不要在网页端死磕**。

我最后跑通的是这条路：

## 1）准备一台 Android（能用 Google Play）

- 你需要的是“能装 Play + 能登录你的 Google 账号”的 Android 环境
- 如果你平常不用 Android，这一步可能是最大门槛（借一台也行）

## 2）把 Google Play 的国家/地区设置到美国

重点是：Play 的国家/地区不是你浏览器语言，不是你 IP，也不是你 Gmail 显示地区。

它更像一个“账单国家/付款资料”的组合拳，常见触发方式是：

- 在 Google Play 里添加一张卡（支持外币/境外交易的信用卡即可；我这边 **招行多币卡**就行）
- 填一个美国地址（账单地址）
- Play 会出现“切换到美国”的入口/提示

> 注意：Play 的国家/地区也可能有频率限制（一年一次/需要等待 24 小时生效等），以你页面提示为准。

## 3）下载 Gemini App，并从 App 里进入订阅

Play 美区生效后：

- 搜索并安装 `Gemini`
- 打开后会看到订阅相关入口

## 4）订阅页面的两个“活动入口”：别选错

这一步是我觉得最容易踩的：

- Gemini 里可能会弹一个 **“低价用 3 个月”** 的活动（看起来很香）
- 但是如果你的目标是“**一年最便宜**”，它可能不是最优解

我最后采用的策略是：

- **不点 3 个月低价活动**
- 而是去 `Google One AI plans` 页面，从 **“全年半价”** 的入口进入，再完成年度订阅

最终我用大约 **700 RMB** 拿下了一年（会受汇率/税费影响，以账单为准）。


# AI Pro 里 “除了 Gemini 以外”的其他服务

除了“Gemini 额度变多”之外，但官方订阅页里其实还包含一些对开发者/重度用户非常有用的东西（仍以你所在地区可见为准）：[`gemini.google/subscriptions`](https://gemini.google/subscriptions/)。

- **Google Search（Gemini in Search / AI Mode 相关）**：更高访问（有地区限制）
- **Jules**：异步编程代理（beta，有年龄/语言/容量限制）
- **Gemini Code Assist + Gemini CLI**：更高的每日请求上限
- **Gemini in Gmail / Docs / Vids / 更多 Google Apps**：在 Google 应用里直接用 Gemini
- **Gemini in Chrome（early access）**：浏览网页的个人助手
- **Google Home Premium（Standard plan）**：事件历史 + Gemini 相关能力（同样有地区/设备限制）
- **NotebookLM**：更多上限/更强能力
- **Storage**：从 15 GB 升到 **2 TB**

## 🆕 Google Cloud 每月免费抵用金（2026.03 更新）

Google 开发者计划为 AI 订阅用户提供了 **每月 Google Cloud 抵用金**，可用于 Gen AI & Cloud 相关服务：

- **AI Pro 用户**：每月 **$10** Google Cloud credits
- **AI Ultra 用户**：每月 **$100** Google Cloud credits

领取地址：[Google 开发者计划 - 我的福利](https://developers.google.com/program/my-benefits?hl=zh-cn)

> 有效期到 **2027 年**，每个月都可以领取。这 $10 是通用的 Google Cloud credits，除了开小规格云服务器（e2-micro 之类），也可以直接用来**调用 Vertex AI / Gemini API**，对做 AI 应用开发的同学来说非常实用。**注意绑的卡不要有太多余额，关注账单计费，别超额被反薅。** 🫡

![picture 7](/assets/imgs/dff9b64ad78928d779e86c425c4c90ed7ac1bd09ac718057591f3f91295fb938.png)  

如果你平常会用：

- NotebookLM 做资料整理
- Code Assist / CLI 帮你写代码、改代码
- 或者希望 Workspace（Gmail/Docs）里直接上 AI
- **GCP 云服务器**做轻量开发/测试

那 AI Pro 的“捆绑价值”会比你想象得大。

# Part 4：开通后怎么验证：Antigravity + 5 小时刷新 quota 真的生效

用两个维度确认：

1. **订阅状态**：Google Play 的订阅里能看到 AI Pro 处于有效状态
2. **产品内提示**：Antigravity / Gemini / 相关产品页里，会提示你当前的 plan 与 quota 规则

这块可以直接搜索 quota，安装 antigravity 中的第一个插件，还是挺好用的

![picture 0](/assets/imgs/62aca550dff13a58cba351f71559f9bafc31b5cb7959e0a2b20f90d46718ad92.png)  
![picture 8](/assets/imgs/86584d03e015043aaf90246cdda8794d3774db94d6556fd0df08e9b85b1b6b92.png)  


# 常见坑总结（给后来人避雷）

- **坑 1：以为改了账号地区 = 一切都好了**
  - 实际上：Antigravity 能用只是第一关，付费订阅是第二关
- **坑 2：网页端死磕订阅入口**
  - 实际上：很多时候网页端就是不给你访问，换 Android/Play 反而秒过
- **坑 3：只看活动“看起来便宜”**
  - 实际上：3 个月低价不一定比“全年半价”更省（尤其你是高频用户）
- **坑 4：Play 国家/账号国家/网络地区混为一谈**
  - 实际上：这是三套系统，彼此有关联但不是一个东西


# 总结

前后尝试了得有一周多，给我的最大感受是：**越来越封闭的反全球化，备一个美国账号的优先级日益提升...**。


# 附录：Google 的 AI 计划（更新：Free / Pro / Ultra）

## 免费

Google AI 的日常支持，帮你处理工作、学校、日常生活里的各种任务。

**价格（日区文案）**

- **￥0 JPY / 月**（需有 Google 账号）

**包含内容**

- **Gemini app**：你的专属、可靠 AI 助理
  - **3 Flash** 访问权限
  - **3 Pro** 访问权限（部分功能受限）
  - 图片生成与编辑
  - Deep Research
  - Gemini Live
  - Canvas
  - Gem
- **每月 100 AI credits**：用于在 Flow / Whisk 生成视频（credits 共享）
- **Flow**：AI 影像制作工具，可创作电影感场景与故事（可有限度使用 **Veo 3.1**）
- **Whisk**：使用 **Imagen 4** / **Veo 3** 生成图像并制作动画
- **NotebookLM**：研究与写作助手
- **Storage**：**15 GB**（Google フォト / Google ドライブ / Gmail 共用）

## Google AI Pro（本文主角）

可以更多使用强大的新功能，提升生产力与创造力。

**价格（日区文案）**

- **￥2,900 JPY / 月**
- **1 个月 ￥0 JPY**

**包含内容（在免费方案基础上加码）**

- **Gemini app**：更高权限
  - 更高权限使用 Google 最聪明的 **3 Pro**、Deep Research
  - 更充分使用 **Nano Banana Pro** 进行图片生成
  - 可使用 **Veo 3.1 Fast** 生成视频
- **每月 1,000 AI credits**：用于在 Flow / Whisk 生成视频（credits 共享）
- **Flow**：更高等级访问（可有限度使用 **Veo 3.1**）
- **Whisk**：使用 **Veo 3** 的 image-to-video 功能，上限提高
- **NotebookLM**：Audio Overview、notebook 等使用上限提升 **5 倍**
- **Gemini in Gmail / Gemini in Google ドキュメント / Gemini in Google Vids** 等：可从 Google 工具直接访问 Gemini
- **Google Home Premium: Standard プラン**：30 天活动历史与 Gemini 功能
- **Storage**：**2 TB**（Google フォト / Google ドライブ / Gmail 共用）

> Google AI Pro 可在 150+ 个国家和地区使用（以订阅页国家列表为准）：[`gemini.google/subscriptions`](https://gemini.google/subscriptions/)。


## Google AI Ultra

最大限度使用最前沿的 Google AI 与限定功能。

**价格（日区文案）**

- **￥36,400 JPY / 月**
- **3 个月 ￥18,000 JPY / 月**

**包含内容（在 Pro 基础上加码）**

- **Gemini app**：最高等级模型与功能（含 **Veo 3.1** 视频生成），并可使用 Deep Think 与 Gemini Agent（仅限美国、仅限英文）
- **每月 25,000 AI credits**：用于在 Flow / Whisk 生成视频（credits 共享）
- **Flow**：最高等级访问（可有限度使用 **Veo 3.1**）
- **Whisk**：使用 **Veo 3** 的 image-to-video 功能，上限最大
- **NotebookLM**：最前沿模型能力（上限最大）
- **Gemini in Gmail / Gemini in Google ドキュメント / Gemini in Google Vids** 等：从 Google 工具访问 Gemini（上限最大）
- **Google Home Premium: Advanced プラン**：连续视频历史、事件描述等
- **YouTube Premium 個人プラン**
- **Storage**：**30 TB**（Google フォト / Google ドライブ / Gmail 共用）

> Google AI Ultra 可在 140+ 个国家使用；YouTube Premium 個人プラン可在 40+ 个国家使用（以订阅页国家列表为准）：[`gemini.google/subscriptions`](https://gemini.google/subscriptions/)。

