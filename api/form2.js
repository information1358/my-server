'use client';

import { useState } from 'react';

export default function Home() {
  const [type, setType] = useState('basic');
  const [size, setSize] = useState('small');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 실행됨");

    const res = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, size }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>견적 계산</h1>

      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="basic">기본</option>
          <option value="premium">프리미엄</option>
        </select>

        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="small">소형</option>
          <option value="large">대형</option>
        </select>

        <button type="submit">결과 보기</button>
      </form>
    </div>
  );
}
export async function POST(req) {
  const body = await req.json();
  const { type, size } = body;

  let price = 0;

  if (type === 'basic') price += 50000;
  if (type === 'premium') price += 100000;

  if (size === 'small') price += 10000;
  if (size === 'large') price += 50000;

  const info = `${type} / ${size}`;
  const id = Math.random().toString(36).substring(2, 10);

  return Response.json({
    url: `/result/${id}?price=${price}&info=${encodeURIComponent(info)}`
  });
}
'use client';

import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const searchParams = useSearchParams();

  const price = searchParams.get('price');
  const info = searchParams.get('info');

  return (
    <div style={{ padding: '40px' }}>
      <h1>결과</h1>
      <p>{info}</p>
      <h2>{price}원</h2>
    </div>
  );
}
