import { easepick } from "@easepick/core";
import { RangePlugin } from "@easepick/range-plugin";
import { AmpPlugin } from "@easepick/amp-plugin";

const range = document.querySelectorAll(".date-range-wrap");
const datepicker = document.querySelectorAll(".datepicker");
const pickerOption = {
    css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"],
    zIndex: 10,
    AmpPlugin: {
        dropdown: {
            months: true,
            years: true,
        },
        resetButton: true,
    },
    lang: "ko-KR",
};

[...range].forEach(
    (x) =>
        new easepick.create({
            element: x.querySelector(".start-date"),
            RangePlugin: {
                elementEnd: x.querySelector(".end-date"),
                repick: true,
            },
            plugins: [AmpPlugin, RangePlugin],
            ...pickerOption,
        })
);

[...datepicker].forEach(
    (element) =>
        new easepick.create({
            element,
            plugins: [AmpPlugin],
            ...pickerOption,
        })
);
