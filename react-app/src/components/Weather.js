import React from "react";
import { WiDaySunny, WiCloudy, WiDayCloudy, WiRain, WiSnow, WiSleet, WiThunderstorm, WiThermometer } from "react-icons/wi";

const SKY_MAP = { '1': '맑음', '3': '구름 많음', '4': '흐림' };
const PTY_MAP = { '0': '강수 없음', '1': '비', '2': '비/눈', '3': '눈', '4': '소나기' };

const skyIcons = { 'clear': <WiDaySunny size={50} />, 'partly cloudy': <WiDayCloudy size={50} />, 'cloudy': <WiCloudy size={50} /> };
const ptyIcons = { 'rain': <WiRain size={50} />, 'rain/snow': <WiSleet size={50} />, 'snow': <WiSnow size={50} />, 'rain shower': <WiThunderstorm size={50} /> };

const Weather = ({ weather }) => {
  // ✅ weather가 존재하지 않으면 기본값을 사용하여 에러 방지
  const data = weather?.weather || {}; 

  return (
    <div className="weather-info">
      {/* ✅ 안전한 데이터 접근: data.T1H가 존재할 때만 렌더링 */}
      {data.T1H !== undefined ? (
        <div className="weather-content">
          <div className="temp">{data.T1H}°C</div>
          <div className="weather-icons">
            <p>{skyIcons[data.SKY] || "알 수 없음"}</p>
            <p>{ptyIcons[data.PTY] || ""}</p>
          </div>
          <div className="temp-container">
            <div className="low-temp">
              <WiThermometer size={20} /> 최저 {data.TMN || "N/A"}°C
            </div>
            <div className="high-temp">
              <WiThermometer size={20} /> 최고 {data.TMX || "N/A"}°C
            </div>
          </div>
        </div>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Weather;
