export const PATH = {
    view: {
        src: "src/view",
        dest: "client",
    },
    js: {
        src: "src/js",
        dest: "client/js",
    },
    css: {
        src: "src/scss",
        dest: "client/css",
    },
    fonts: {
        src: [
            "node_modules/pretendard/dist/web/static/woff2/Pretendard-ExtraBold.woff2",
            "node_modules/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2",
            "node_modules/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2",
            "node_modules/pretendard/dist/web/static/woff/Pretendard-ExtraBold.woff",
            "node_modules/pretendard/dist/web/static/woff/Pretendard-Bold.woff",
            "node_modules/pretendard/dist/web/static/woff/Pretendard-Regular.woff",
            "node_modules/bootstrap-icons/font/fonts/*",
        ],
        dest: "client/fonts",
    },
    assets: {
        src: "src/assets",
        dest: "client/assets",
    },
};
