import bootstrap from "bootstrap";

window.bootstrap = bootstrap;

const $ = (query) => document.querySelector(query);

const navOffcanvas = () => {
    const sidebar = $(".sidebar");
    console.log(sidebar);
    const offcanvas = new bootstrap.Offcanvas($(".offcanvas"));
};

navOffcanvas();
