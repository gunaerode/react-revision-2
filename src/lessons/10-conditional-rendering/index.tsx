import { useState } from "react";
import LessonLayout from "../../components/lesson/LessonLayout";
import { metaFor } from "../meta";
import OrderStatusCard from "./OrderStatusCard";
import type { OrderStatus } from "./types";

const meta = metaFor("10-conditional-rendering");
const STATUSES: OrderStatus[] = ["loading", "error", "empty", "ready"];

export default function ConditionalRendering() {
  const [status, setStatus] = useState<OrderStatus>("ready");

  return (
    <LessonLayout
      meta={meta}
      concept={[
        "JSX has no if/else tags - conditional rendering means using ordinary JavaScript (if statements, ternaries, &&) to decide which JSX an expression evaluates to.",
        "OrderStatusCard shows all three common patterns: early-return if statements for whole-branch swaps, a ternary for two short alternatives, and && to render something-or-nothing.",
        "This lesson uses useState just to let you flip between the four statuses below - state itself gets its own explanation starting at lesson 17, so don't worry about the hook yet.",
      ]}
    >
      <div className="side-by-side">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setStatus(s)} disabled={s === status}>
            {s}
          </button>
        ))}
      </div>
      <OrderStatusCard status={status} />
    </LessonLayout>
  );
}
