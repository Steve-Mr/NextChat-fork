<h1 align="center"><i>Maary Flavored</i> NextChat</h1>

English / [简体中文](./README_CN.md)

Maary flavored [NextChat](https://github.com/ChatGPTNextWeb/NextChat)

## Features

- Plugin support in ByteDance model.
- Use Github gist as sync provider.
- Auto Sync.
- Auto collapse model's thought process.
- New skin.

## Get Started

1. Get [OpenAI API Key](https://platform.openai.com/account/api-keys);
2. Use the fork button in the upper right corner of the page to fork this project;
3. Choose and deploy in Vercel, [please see the detailed tutorial](./docs/vercel-cn.md).
4. Enjoy :)

##### Access Password

This project provides limited access control. Please add an environment variable named `CODE` on the vercel environment variables page. The value should be passwords separated by comma like this:

```
code1,code2,code3
```

After adding or modifying this environment variable, please redeploy the project for the changes to take effect.

## Environment Variables

<details>

##### `CODE` (optional)

Access password, separated by comma.

#### `OPENAI_API_KEY` (optional)

Your openai api key, join multiple api keys with comma.

#### `BASE_URL` (optional)

> Default: `https://api.openai.com`

> Examples: `http://your-openai-proxy.com`

Override openai api request base url.

#### `OPENAI_ORG_ID` (optional)

Specify OpenAI organization ID.

#### `AZURE_URL` (optional)

> Example: https://{azure-resource-url}/openai

Azure deploy url.

#### `AZURE_API_KEY` (optional)

Azure Api Key.

#### `AZURE_API_VERSION` (optional)

Azure Api Version, find it at [Azure Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions).

#### `GOOGLE_API_KEY` (optional)

Google Gemini Pro Api Key.

#### `GOOGLE_URL` (optional)

Google Gemini Pro Api Url.

#### `ANTHROPIC_API_KEY` (optional)

anthropic claude Api Key.

#### `ANTHROPIC_API_VERSION` (optional)

anthropic claude Api version.

#### `ANTHROPIC_URL` (optional)

anthropic claude Api Url.

#### `BAIDU_API_KEY` (optional)

Baidu Api Key.

#### `BAIDU_SECRET_KEY` (optional)

Baidu Secret Key.

#### `BAIDU_URL` (optional)

Baidu Api Url.

#### `BYTEDANCE_API_KEY` (optional)

ByteDance Api Key.

#### `BYTEDANCE_URL` (optional)

ByteDance Api Url.

#### `ALIBABA_API_KEY` (optional)

Alibaba Cloud Api Key.

#### `ALIBABA_URL` (optional)

Alibaba Cloud Api Url.

#### `IFLYTEK_URL` (Optional)

iflytek Api Url.

#### `IFLYTEK_API_KEY` (Optional)

iflytek Api Key.

#### `IFLYTEK_API_SECRET` (Optional)

iflytek Api Secret.

#### `CHATGLM_API_KEY` (optional)

ChatGLM Api Key.

#### `CHATGLM_URL` (optional)

ChatGLM Api Url.

#### `DEEPSEEK_API_KEY` (optional)

DeepSeek Api Key.

#### `DEEPSEEK_URL` (optional)

DeepSeek Api Url.

#### `HIDE_USER_API_KEY` (optional)

> Default: Empty

If you do not want users to input their own API key, set this value to 1.

#### `DISABLE_GPT4` (optional)

> Default: Empty

If you do not want users to use GPT-4, set this value to 1.

#### `ENABLE_BALANCE_QUERY` (optional)

> Default: Empty

If you do want users to query balance, set this value to 1.

#### `DISABLE_FAST_LINK` (optional)

> Default: Empty

If you want to disable parse settings from url, set this to 1.

#### `CUSTOM_MODELS` (optional)

> Default: Empty
> Example: `+llama,+claude-2,-gpt-3.5-turbo,gpt-4-1106-preview=gpt-4-turbo` means add `llama, claude-2` to model list, and remove `gpt-3.5-turbo` from list, and display `gpt-4-1106-preview` as `gpt-4-turbo`.

To control custom models, use `+` to add a custom model, use `-` to hide a model, use `name=displayName` to customize model name, separated by comma.

User `-all` to disable all default models, `+all` to enable all default models.

For Azure: use `modelName@Azure=deploymentName` to customize model name and deployment name.
> Example: `+gpt-3.5-turbo@Azure=gpt35` will show option `gpt35(Azure)` in model list.
> If you only can use Azure model, `-all,+gpt-3.5-turbo@Azure=gpt35` will `gpt35(Azure)` the only option in model list.

For ByteDance: use `modelName@bytedance=deploymentName` to customize model name and deployment name.
> Example: `+Doubao-lite-4k@bytedance=ep-xxxxx-xxx` will show option `Doubao-lite-4k(ByteDance)` in model list.

#### `DEFAULT_MODEL` （optional）

Change default model

#### `VISION_MODELS` (optional)

> Default: Empty
> Example: `gpt-4-vision,claude-3-opus,my-custom-model` means add vision capabilities to these models in addition to the default pattern matches (which detect models containing keywords like "vision", "claude-3", "gemini-1.5", etc).

Add additional models to have vision capabilities, beyond the default pattern matching. Multiple models should be separated by commas.

#### `WHITE_WEBDAV_ENDPOINTS` (optional)

You can use this option if you want to increase the number of webdav service addresses you are allowed to access, as required by the format：
- Each address must be a complete endpoint 
> `https://xxxx/yyy`
- Multiple addresses are connected by ', '

#### `DEFAULT_INPUT_TEMPLATE` (optional)

Customize the default template used to initialize the User Input Preprocessing configuration item in Settings.

#### `STABILITY_API_KEY` (optional)

Stability API key.

#### `STABILITY_URL` (optional)

Customize Stability API url.


#### `ENABLE_MCP` (optional)

Enable MCP（Model Context Protocol）Feature

#### `SILICONFLOW_API_KEY` (optional)

SiliconFlow API Key.

#### `SILICONFLOW_URL` (optional)

SiliconFlow API URL.

</details>

## Deployment

<details>

#### Docker (Recommended)

```shell
docker pull yidadaa/chatgpt-next-web

docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CODE=your-password \
   yidadaa/chatgpt-next-web
```

You can start service behind a proxy:

```shell
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CODE=your-password \
   -e PROXY_URL=http://localhost:7890 \
   yidadaa/chatgpt-next-web
```

If your proxy needs password, use:

```shell
-e PROXY_URL="http://127.0.0.1:7890 user pass"
```

If enable MCP, use：

```
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CODE=your-password \
   -e ENABLE_MCP=true \
   yidadaa/chatgpt-next-web
```

#### Shell

```shell
bash <(curl -s https://raw.githubusercontent.com/Steve-Mr/NextChat-fork/main/scripts/setup.sh)
```
</details>

## Documentation

> Please go to the [docs][./docs] directory for more documentation instructions.

- [Frequent Ask Questions](./docs/faq-en.md)
- [How to add a new translation](./docs/translation.md)
- [How to use Vercel (No English)](./docs/vercel-cn.md)
- [User Manual (Only Chinese, WIP)](./docs/user-manual-cn.md)

#### Synchronizing Chat Records (UpStash)

| [简体中文](./docs/synchronise-chat-logs-cn.md) | [English](./docs/synchronise-chat-logs-en.md) | [Italiano](./docs/synchronise-chat-logs-es.md) | [日本語](./docs/synchronise-chat-logs-ja.md) | [한국어](./docs/synchronise-chat-logs-ko.md)****

#### Enable Automatic Updates

> If you encounter a failure of Upstream Sync execution, please [manually update code](./README.md#manually-updating-code).

After forking the project, due to the limitations imposed by GitHub, you need to manually enable Workflows and Upstream Sync Action on the Actions page of the forked project. Once enabled, automatic updates will be scheduled every hour:

|![Automatic Updates](./docs/images/enable-actions.jpg)|![Enable Automatic Updates](./docs/images/enable-actions-sync.jpg)|
|:--:|:--:|
|Automatic Updates|Enable Automatic Updates|

#### Manually Updating Code

If you want to update instantly, you can check out the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to learn how to synchronize a forked project with upstream code.

You can star or watch this project or follow author to get release notifications in time.

#### FAQ

[English > FAQ](./docs/faq-en.md)

## Development

<details>

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Steve-Mr/NextChat-fork)

Before starting development, you must create a new `.env.local` file at project root, and place your api key into it:

```
OPENAI_API_KEY=<your api key here>

# if you are not able to access openai service, use this BASE_URL
BASE_URL=https://chatgpt1.nextweb.fun/api/proxy
```
#### Requirements

NodeJS >= 18, Docker >= 20

#### Local Development

```shell
# 1. install nodejs and yarn first
# 2. config local env vars in `.env.local`
# 3. run
yarn install
yarn dev
```

#### Translation

If you want to add a new translation, read this [document](./docs/translation.md).

</details>

## LICENSE

[MIT](https://opensource.org/license/mit/)
