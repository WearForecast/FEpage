import React, { useEffect, useState } from "react";
import { fetchData } from "./ApiService";

const DataDisplay = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData(); // 서버 데이터 가져오기
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    loadData();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>에러: {error}</p>;

  return (
    <div>
      <h2>서버 데이터</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataDisplay;
