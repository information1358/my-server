mport { useState } from 'react';

export default function Home() {
  const [type, setType] = useState('basic');
  const [size, setSize] = useState('small');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, size }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: 'auto',
        background: 'white',
        padding: '30px',
        borderRadius: '12px'
      }}>

        <h1>📦 견적 계산기</h1>

        <form onSubmit={handleSubmit}>

          <div style={{ marginTop: '20px' }}>
            <h3>서비스 종류</h3>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: '100%', padding: '10px' }}
            >
              <option value="basic">기본</option>
              <option value="premium">프리미엄</option>
            </select>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h3>사이즈</h3>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              style={{ width: '100%', padding: '10px' }}
            >
              <option value="small">소형</option>
              <option value="large">대형</option>
            </select>
          </div>

          <button style={{
            marginTop: '30px',
            width: '100%',
            padding: '15px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '8px'
          }}>
            결과 보기
          </button>

        </form>

      </div>
    </div>
  );
}
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { type, size } = req.body;

  let price = 0;

  if (type === 'basic') price += 50000;
  if (type === 'premium') price += 100000;

  if (size === 'small') price += 10000;
  if (size === 'large') price += 50000;

  const info = `${type} / ${size}`;

  const id = Math.random().toString(36).substring(2, 10);

  const url = `/result/${id}?price=${price}&info=${encodeURIComponent(info)}`;

  res.status(200).json({ url });
}
import { useRouter } from 'next/router';

export default function ResultPage() {
  const router = useRouter();
  const { price, info } = router.query;

  return (
    <div style={{
      padding: '40px',
      background: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: 'auto',
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>

        <h1>📊 견적 결과</h1>

        <p style={{ marginTop: '10px', color: '#666' }}>
          선택: {info}
        </p>

        <h2 style={{
          marginTop: '30px',
          fontSize: '32px',
          color: 'green'
        }}>
          💰 {price}원
        </h2>

        <p style={{ marginTop: '10px' }}>
          현재 선택 기준 예상 견적입니다.
        </p>

        <button style={{
          marginTop: '30px',
          width: '100%',
          padding: '15px',
          background: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px'
        }}>
          🚀 진행하기
        </button>

      </div>
    </div>
  );
}
