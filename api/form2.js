'use client';

export default function Home() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>테스트</h1>

      <button onClick={() => alert("클릭됨")}>
        클릭 테스트
      </button>
    </div>
  );
}
