"use client";

import { useState } from "react";

const fallback = "#000000";
const isHexColor = (color: string) => /^#[0-9a-f]{6}$/i.test(color);

export function AdminColorField({ name, initialValue }: { name: string; initialValue: string }) {
  const [value, setValue] = useState(isHexColor(initialValue) ? initialValue : fallback);

  return <span className="color-picker">
    <input aria-label={`Selecionar ${name}`} type="color" value={isHexColor(value) ? value : fallback} onChange={(event) => setValue(event.target.value)} />
    <input name={name} value={value} onChange={(event) => setValue(event.target.value)} inputMode="text" maxLength={7} spellCheck={false} placeholder="#000000" />
  </span>;
}
