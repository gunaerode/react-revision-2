import { useState } from "react";
import "./App.css";
import { MyButton } from "./components/MyButton";
import ShoppingList from "./components/Product";
import Profile from "./components/Profile";
import Greeting from "./components/Greeting";
import FilterableProductTable from "./components/FilterableProductTable";
import { user } from "./constants/common.constants";

function App() {
  // StrictMode (dev only) runs the component body twice per render
  // to help surface impure logic - watch the console log twice per update.
  console.log("App rendering");

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <>
      <h1>Welcome to my app</h1>
      {/* Event Propagation Example */}
      <div
        onClick={() => alert("Parent div clicked!")}
        style={{
          padding: "20px",
          background: "#f0f0f0",
          display: "inline-block",
        }}
      >
        <MyButton handleButtonClick={handleClick}>Click me</MyButton>
        <MyButton
          handleButtonClick={(e) => {
            e.stopPropagation();
            alert("Propagation stopped!");
          }}
        >
          Stop Propagation
        </MyButton>
      </div>
      <p>Clicked {count} times</p>
      <Profile user={user} />
      <Greeting name="Guna" />
      <ShoppingList />
      <FilterableProductTable />
    </>
  );
}

export default App;
