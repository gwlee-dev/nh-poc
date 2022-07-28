import { json } from "@codemirror/lang-json";
import { EditorView, basicSetup } from "codemirror";

const reqEditor = new EditorView({
    extensions: [basicSetup, json()],
    parent: document.querySelector(".req-editor"),
});

const resEditor = new EditorView({
    extensions: [basicSetup, json()],
    parent: document.querySelector(".res-editor"),
});

window.reqEditor = reqEditor;
window.resEditor = resEditor;

window.reqGet = () => reqEditor.state.doc.toString();
window.resGet = () => resEditor.state.doc.toString();

window.reqSet = (text) =>
    reqEditor.dispatch({
        changes: { from: 0, to: reqEditor.state.doc.length, insert: text },
    });
window.resSet = (text) =>
    resEditor.dispatch({
        changes: { from: 0, to: reqEditor.state.doc.length, insert: text },
    });
