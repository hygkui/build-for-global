出海黄金组合 

本项目的目的是生成技术栈组合，并且能够配置好直接生成模板文件。

形式是： 
1. 提供web界面，创建项目，勾选技术栈，并且内置ai，随时咨询问问题。
2. 保存不同的模板，可以分享和导入
3. 支持cli，方便的管理自己的模板
4. 完善的文档说明
5. skills支持导入
6. 可以是npm包


## 快速部署

- vercel
- cloudflase worker
- deno
- railway

## 数据库

- neon
- supabase

## 存储

- vercel blob
- CF R2
- aliyun oss
- aws s3

## email

-resend

## pay

- stripay
- Polar.sh

## monitor

- sentry.io

## cache

- upstash
- kv on vercel/deno

## auth

- better-auth
- supacebase auth

## ai

- vercel ai
- vercel chat

## i18n

推荐使用 `next-intl`，并遵循以下规范以避免 i18n 随项目成长失控：

**常见痛点**

- JSON 文件过大（1000+ 行），难以维护
- key 命名随意，无统一规范（`user.name` vs `username` 混用）
- 嵌套层级不一致（有的三层，有的平铺）
- 僵尸 key 大量堆积，无人清理
- 动态拼接 key（如 `t('status.' + code)`）无法静态分析
- 缺乏类型提示，key 写错只在运行时才暴露

**解决方案**

详见生成项目根目录的 `AGENTS.md`，其中包含完整的 i18n 技术规范与落地指南。

