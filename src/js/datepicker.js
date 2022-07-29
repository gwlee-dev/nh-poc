import { easepick } from "@easepick/core";
import { RangePlugin } from "@easepick/range-plugin";
import { AmpPlugin } from "@easepick/amp-plugin";

const start = document.querySelector("#start-date");
const end = document.querySelector("#end-date");

if (start !== null) {
    const datePicker = new easepick.create({
        element: start,
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css",
        ],
        zIndex: 10,
        AmpPlugin: {
            dropdown: {
                months: true,
                years: true,
            },
            resetButton: true,
        },
        RangePlugin: {
            elementEnd: end,
            locale: {
                one: "일",
                other: "일",
            },
        },
        plugins: [AmpPlugin, RangePlugin],
        lang: "ko-KR",
    });
}
