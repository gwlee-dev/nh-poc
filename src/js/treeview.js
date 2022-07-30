/*! @preserve
 * bstreeview.js
 * Version: 1.2.1
 * Authors: Sami CHNITER <sami.chniter@gmail.com>
 * Copyright 2020
 * License: Apache License 2.0
 *
 * Project: https://github.com/chniter/bstreeview
 * Project: https://github.com/nhmvienna/bs5treeview (bootstrap 5)
 * Project: https://github.com/gwlee-dev/vanillajs-bs5treeview (vanilla js)
 */

const parseDOM = (HTML) => {
    const div = document.createElement("div");
    div.innerHTML = HTML;
    return div.querySelector("*");
};

export const bstreeview = class {
    /**
     * Default bstreeview  options.
     */
    pluginName = "bstreeview";
    defaults = {
        expandIcon: "fa fa-angle-down fa-fw",
        collapseIcon: "fa fa-angle-right fa-fw",
        expandClass: "show",
        indent: 1.25,
        parentsMarginLeft: "1.25rem",
        openNodeLinkOnNewTab: true,
    };

    /**
     * bstreeview HTML templates.
     */
    templates = {
        treeview: parseDOM(`<div class="bstreeview"></div>`),
        treeviewItem: parseDOM(
            `<div role="treeitem" class="list-group-item list-group-item-action collapsed" data-bs-toggle="collapse"></div>`
        ),
        treeviewGroupItem: parseDOM(
            `<div role="group" class="list-group collapse" id="itemid"></div>`
        ),
        treeviewItemStateIcon: parseDOM(`<i class="state-icon"></i>`),
        treeviewItemIcon: parseDOM(`<i class="item-icon"></i>`),
    };

    /**
     * BsTreeview Plugin constructor.
     * @param {*} element
     * @param {*} options
     */
    constructor(element, options) {
        this.element = element;
        this.itemIdPrefix = `${element.id}-item-`;
        this.settings = Object.assign({}, this.defaults, options);
        this.init();
    }

    init = () => {
        this.tree = [];
        this.nodes = [];
        // Retrieve bstreeview Json Data.
        if (this.settings.data) {
            if (typeof this.settings.data === "string") {
                this.settings.data = JSON.parse(this.settings.data);
            }
            this.tree = [...this.settings.data];
            delete this.settings.data;
        }
        // Set main bstreeview class to element.
        this.element.classList.add("bstreeview", "list-group");

        this.initData({ nodes: this.tree });
        this.build(this.element, this.tree, 0);
        // Update angle icon on collapse
        [...this.element.querySelectorAll(".list-group-item")].forEach((x) =>
            x.addEventListener("click", (e) => {
                // navigate to href if present
                if (e.target.hasAttribute("href")) {
                    if (this.settings.openNodeLinkOnNewTab) {
                        window.open(e.target.getAttribute("href"), "_blank");
                    } else {
                        window.location = e.target.getAttribute("href");
                    }
                }
            })
        );
    };

    /**
     * Initialize treeview Data.
     * @param {*} node
     */
    initData = (node) => {
        if (!node.nodes) return;
        const parent = node;
        node.nodes.forEach((node) => {
            node.nodeId = this.nodes.length;
            node.parentId = parent.nodeId;
            this.nodes.push(node);

            if (node.nodes) {
                this.initData(node);
            }
        });
    };

    /**
     * Build treeview.
     * @param {*} parentElement
     * @param {*} nodes
     * @param {*} depth
     */
    build = (parentElement, nodes, depth) => {
        // Calculate item padding.
        let leftPadding = this.settings.parentsMarginLeft;

        if (depth > 0) {
            leftPadding =
                (
                    this.settings.indent +
                    depth * this.settings.indent
                ).toString() + "rem;";
        }
        depth += 1;
        // Add each node and sub-nodes.
        nodes.forEach((node) => {
            // Main node element.
            const treeItem = this.templates.treeviewItem.cloneNode();
            treeItem.setAttribute(
                "data-bs-target",
                `#${this.itemIdPrefix}${node.nodeId}`
            );
            treeItem.setAttribute("role", "button");
            treeItem.setAttribute("style", "padding-left:" + leftPadding);
            treeItem.setAttribute("aria-level", depth);
            // Set Expand and Collapse icons.
            if (node.nodes) {
                const treeItemStateIcon =
                    this.templates.treeviewItemStateIcon.cloneNode();
                treeItemStateIcon.classList.add(
                    ...this.settings.expandIcon.split(" ")
                );
                treeItem.append(treeItemStateIcon);
            }
            // set node icon if exist.
            if (node.icon) {
                const treeItemIcon =
                    this.templates.treeviewItemIcon.cloneNode();
                treeItemIcon.classList.add(...node.icon.split(" "));
                treeItem.append(treeItemIcon);
            }
            // Set node Text.
            treeItem.append(node.text);
            // Reset node href if present
            if (node.href) {
                treeItem.setAttribute("href", node.href);
            }
            // Add class to node if present
            if (node.class) {
                treeItem.classList.add(node.class);
            }
            // Add custom id to node if present
            if (node.id) {
                treeItem.setAttribute("id", node.id);
            }
            // Attach node to parent.
            parentElement.append(treeItem);
            // Build child nodes.
            if (node.nodes) {
                // Node group item.
                const treeGroup = this.templates.treeviewGroupItem.cloneNode();
                treeGroup.id = this.itemIdPrefix + node.nodeId;
                parentElement.append(treeGroup);
                this.build(treeGroup, node.nodes, depth);
                if (node.expanded) {
                    parentElement.classList.remove("collapsed");
                    treeGroup.classList.add(this.settings.expandClass);
                }
            }
        });
    };
};
