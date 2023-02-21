//入口文件
//引入react核心库
import React from "react";
//引入ReactDOM
import ReactDOM from "react-dom";
//引入App组件
import App from "./App";

//渲染App到桌面
ReactDOM.render(<App />, document.getElementById("root"));

// React18写法
/*import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);*/
