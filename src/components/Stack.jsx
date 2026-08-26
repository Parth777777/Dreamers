"use client";

import { useRef, useState } from "react";
import "./Stack.css";

export default function Stack({
  cards = [],
  randomRotation = true,
  sensitivity = 140,
  sendToBackOnClick = true,
  cardDimensions = { width: 320, height: 420 },
  onSelect,
}) {
  const [order, setOrder] = useState(() => cards.map((_, index) => index));
  const drag = useRef({ x: 0, y: 0, dx: 0, dy: 0, live: false });
  const [tick, setTick] = useState(0);

  const sendToBack = (index) => {
    setOrder((prev) => {
      const next = prev.filter((item) => item !== index);
      next.push(index);
      return next;
    });
  };

  const onPointerDown = (event, index) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, dx: 0, dy: 0, live: true, index };
  };

  const onPointerMove = (event) => {
    if (!drag.current.live) return;
    drag.current.dx = event.clientX - drag.current.x;
    drag.current.dy = event.clientY - drag.current.y;
    const node = event.currentTarget;
    node.style.transform = `translate(${drag.current.dx}px, ${drag.current.dy}px) rotate(${drag.current.dx * 0.08}deg)`;
  };

  const onPointerUp = (event, index) => {
    const node = event.currentTarget;
    const { dx, dy } = drag.current;
    const distance = Math.hypot(dx, dy);
    drag.current.live = false;
    node.style.transform = "";
    if (distance > sensitivity) {
      sendToBack(index);
      return;
    }
    if (distance < 8 && sendToBackOnClick) {
      if (onSelect) onSelect(cards[index]);
      else sendToBack(index);
    }
    setTick((value) => value + 1);
  };

  return (
    <div
      className="stack-wrap"
      style={{ height: cardDimensions.height + 48 }}
      data-tick={tick}
    >
      {order
        .slice()
        .reverse()
        .map((index, depthFromBack) => {
          const card = cards[index];
          const depth = order.length - 1 - depthFromBack;
          const rotate = randomRotation ? ((index % 5) - 2) * 3 : 0;
          return (
            <article
              key={card.id ?? index}
              className="stack-card"
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
                zIndex: 20 - depth,
                transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.04}) rotate(${rotate}deg)`,
              }}
              onPointerDown={(event) => onPointerDown(event, index)}
              onPointerMove={onPointerMove}
              onPointerUp={(event) => onPointerUp(event, index)}
              onPointerCancel={(event) => onPointerUp(event, index)}
            >
              {card.img ? <img src={card.img} alt={card.alt ?? ""} draggable={false} /> : card.content}
            </article>
          );
        })}
    </div>
  );
}
