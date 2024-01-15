"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./styles.css");
function TodoItem(props) {
    const [isChecked, setChecked] = (0, react_1.useState)(false);
    const [textInputValue, setTextInputValue] = (0, react_1.useState)("");
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };
    const handleTextInputChange = (event) => {
        setTextInputValue(event.target.value);
    };
    return (react_1.default.createElement("div", { key: props.index, className: "todo-item-container" },
        textInputValue && (react_1.default.createElement("input", { className: "checkbox", type: "checkbox", checked: isChecked, onChange: handleCheckboxChange })),
        react_1.default.createElement("input", { className: `todo-item font-style ${isChecked ? "completed-todo-item" : ""}`, type: "text", value: textInputValue, onChange: handleTextInputChange })));
}
exports.default = TodoItem;
