import { Offcanvas } from "bootstrap";
export const navOffcanvas = () => {
    const sidebar = document.querySelector(".sidebar");
    const buttons = sidebar.querySelectorAll(".sidebar-button");
    const map = {};
    [...buttons].forEach((button) => {
        const { id } = button;
        const offcanvas = document.querySelector(`#${id}Offcanvas`);
        const instance = new Offcanvas(offcanvas);
        map[id] = { button, offcanvas, instance };
    });

    const showFunc = (button, instance, key) => {
        // button.removeEventListener("click", showFunc(button, instance, key))
        Object.keys(map)
            .filter((x) => x !== key)
            .forEach((x) => map[x].instance.hide());
        instance.show();
    };

    Object.keys(map).forEach((key) => {
        const { button, instance } = map[key];
        button.addEventListener("click", () => showFunc(button, instance, key));
    });
};
