import React from "react";

type GreetingProps = {
  name: string;
};

export default function Greeting({ name }: GreetingProps) {
  // Simple example - JSX equivalent: <h1 className="greeting">Hello, {name}!</h1>
  // React.createElement("h1", { className: "greeting" }, `Hello, ${name}!`);

  // Plain JS (vanilla DOM) equivalent - no React involved:
  // const div = document.createElement("div");
  // div.className = "greeting";
  // const h1 = document.createElement("h1");
  // const span = document.createElement("span");
  // span.className = "name";
  // span.textContent = name;
  // h1.append("Hello, ", span, "!");
  // div.append(h1);
  // document.body.append(div);

  // Nested example - JSX equivalent:
  // <div className="greeting">
  //   <h1>
  //     Hello, <span className="name">{name}</span>!
  //   </h1>
  // </div>
  return React.createElement(
    "div", // type
    { className: "greeting" }, // props
    React.createElement(
      "h1", // type
      null, // props
      "Hello, ",
      React.createElement("span", { className: "name" }, name),
      "!",
    ), // children
  );
}
