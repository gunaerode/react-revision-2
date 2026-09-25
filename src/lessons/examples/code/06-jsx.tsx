// Inside JSX, curly braces { } switch back to JavaScript.
// Any expression works: variables, math, function calls, ternaries...

const city = "Chennai";
const temperatureC = 31;
const forecast = ["☀️", "⛅", "🌧️", "☀️", "⛅"];

function toFahrenheit(c: number) {
  return Math.round((c * 9) / 5 + 32);
}

export default function App() {
  const isHot = temperatureC > 30;

  return (
    <div
      className="weather"
      style={{
        fontFamily: "system-ui",
        maxWidth: 320,
        padding: 20,
        borderRadius: 16,
        color: "white",
        background: isHot
          ? "linear-gradient(135deg, #ff9a44, #fc6076)"
          : "linear-gradient(135deg, #4facfe, #00c6fb)",
      }}
    >
      <p style={{ margin: 0, opacity: 0.85 }}>{city.toUpperCase()}</p>
      <h1 style={{ margin: "4px 0", fontSize: 48 }}>{temperatureC}°C</h1>
      <p style={{ margin: 0 }}>
        {toFahrenheit(temperatureC)}°F · {isHot ? "Stay hydrated!" : "Nice weather"}
      </p>
      <p style={{ fontSize: 24, letterSpacing: 6 }}>{forecast.join("")}</p>
      <small>Updated at {new Date().toLocaleTimeString()}</small>
    </div>
  );
}
