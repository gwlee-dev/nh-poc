import "dotenv/config";
import autoprefixer from "autoprefixer";
import sync from "browser-sync";
import browserify from "browserify";
import cssnano from "cssnano";
import del from "del";
import { series, src, dest, watch } from "gulp";
import postcss from "gulp-postcss";
import pug from "gulp-pug";
import rename from "gulp-rename";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import terser from "gulp-terser";
import { log } from "gulp-util";
import dartSass from "sass";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";
import { PATH } from "./gulpPath";

const { SERVER_PORT, FILE_NAME } = process.env;
const sass = gulpSass(dartSass);

const clean = async () => await del.sync(["client"]);

const logger = {
    success: (msg) => {
        log(`✅ ${msg}: Success`);
    },
    failed: (msg, e) => {
        log(`❌ [${msg}] ${e}: Failed`);
    },
};

const runner = {
    view: async () => {
        await src(`${PATH.view.src}/*.pug`)
            .pipe(
                pug({
                    pretty: true,
                })
            )
            .on("error", (e) => logger.failed("pug", e))
            .pipe(dest(PATH.view.dest, { sourcemaps: "." }))
            .on("error", (e) => logger.failed("write", e))
            .on("end", () => {
                logger.success("PUG");
                sync.reload();
            });
    },

    js: async () => {
        await browserify(`${PATH.js.src}/app.js`, { debug: true })
            .transform("babelify")
            .on("error", (e) => logger.failed("babelify", e))
            .bundle()
            .on("error", (e) => {
                log(`${e}`);
                logger.failed("", "browserify");
            })
            .pipe(source(`${FILE_NAME}.js`))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(terser())
            .on("error", (e) => logger.failed("terser", e))
            .pipe(sourcemaps.write("."))
            .pipe(dest(PATH.js.dest))
            .on("end", () => {
                logger.success("JS");
                sync.reload();
            });
    },

    css: async () => {
        await src(`${PATH.css.src}/style.scss`, { sourcemaps: true })
            .pipe(
                sass({
                    includePaths: "node_modules",
                    outputStyle: "compressed",
                })
            )
            .on("error", sass.logError)
            .pipe(rename(`${FILE_NAME}.css`))
            .pipe(postcss([autoprefixer(), cssnano()]))
            .on("error", (e) => logger.failed("postcss", e))
            .pipe(dest(PATH.css.dest, { sourcemaps: "." }))
            .on("error", (e) => logger.failed("write", e))
            .on("end", () => {
                logger.success("SASS");
                sync.reload();
            });
    },

    fonts: async () => {
        await src(PATH.fonts.src)
            .pipe(dest(PATH.fonts.dest))
            .on("error", (e) => logger.failed("fonts", e))
            .on("end", () => {
                logger.success("FONTS");
                sync.reload();
            });
    },

    assets: async () => {
        await src(`${PATH.assets.src}/**/*`)
            .pipe(dest(PATH.assets.dest))
            .on("end", () => {
                logger.success("ASSETS");
                sync.reload();
            });
    },
};

const watcher = () => {
    log("👀 Start watching...");
    ["view", "js", "css", "assets"].forEach((x) => {
        watch(`${PATH[x].src}/**/*`).on("change", (e) => {
            runner[x]();
            log(`\n\n🔄 Source Changed: ${e}`);
        });
    });
};

const server = async () => {
    await sync.init(null, {
        proxy: `http://localhost:${SERVER_PORT}`,
        notify: false,
        open: false,
        port: 3000,
    });
};

const dev = series([server], [watcher]);
const build = series([clean], ...Object.keys(runner).map((x) => [runner[x]]));

exports.dev = dev;
exports.build = build;
