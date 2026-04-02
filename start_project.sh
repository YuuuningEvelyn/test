#!/bin/bash

# 项目启动脚本 - 使用本地Node.js
# 检测依赖并使用国内镜像安装

echo "=============================================="
echo "          本地 Node 自动运行项目"
echo "=============================================="
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NODE_FOLDER="$SCRIPT_DIR/NODE/node-v25.9.0-win-x64"

# 检查本地Node.js是否存在
if [ ! -f "$NODE_FOLDER/node.exe" ]; then
    echo "错误：未找到内置 Node.js"
    echo "路径：$NODE_FOLDER/node.exe"
    echo ""
    read -p "按回车键退出..."
    exit 1
fi

# 将本地Node.js添加到PATH
export PATH="$NODE_FOLDER:$PATH"
echo "已加载本地 Node.js"
echo ""

# 显示版本信息
node -v
npm -v
echo ""

# 切换到项目目录
cd "$SCRIPT_DIR"

# 检查是否存在package.json文件
if [ ! -f "package.json" ]; then
    echo "错误：当前目录没有 package.json"
    echo ""
    read -p "按回车键退出..."
    exit 1
fi

# 检查是否需要安装依赖
echo "正在安装依赖..."
npm install --registry=https://registry.npmmirror.com --force

if [ $? -ne 0 ]; then
    echo ""
    echo "错误：依赖安装失败"
    read -p "按回车键退出..."
    exit 1
fi

echo ""
echo "正在启动项目..."
echo "启动命令：npm run dev"
echo ""

npm run dev

echo ""
echo "项目已停止"
read -p "按回车键退出..."
