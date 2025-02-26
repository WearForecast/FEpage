import React from "react";

function Home({ recommendations }) {
  // recommendations가 아예 없는 경우 처리
  if (!recommendations) {
    return <p style={{ textAlign: "center", color: "#fff" }}>추천 데이터를 불러오는 중...</p>;
  }

  // 5xx 에러 확인
  const isServerError = recommendations.error >= 500 && recommendations.error < 600;
  if (isServerError) {
    return <p style={{ textAlign: "center", color: "#fff" }}>추천 정보를 불러오지 못했습니다. 새로고침이 필요합니다.</p>;
  }

  // 이미지 데이터가 없는 경우 처리
  if (!recommendations.images || recommendations.images.length === 0) {
    return <p style={{ textAlign: "center", color: "#fff" }}>추천 데이터를 불러오는 중...</p>;
  }

  const { images, description } = recommendations;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ color: "white", textAlign: "center", fontSize: "24px", fontFamily: "TheJamsil5Bold" }}>추천 코디</h2>
      <p style={{ textAlign: "center", fontSize: "16px", color: "#CCC" }}>{description}</p>
      <div>
        {images.map((src, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <img
              src={src}
              alt={`추천 코디 ${index + 1}`}
              style={{ width: "90%", height: "auto", borderRadius: "10px", border: "1px solid #ddd", padding: "5px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
