import axios from "axios";

// API URL 설정
const API_URL = process.env.REACT_APP_API_URL;

// 서버로 GET 요청 보내기
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    throw new Error(`데이터를 가져오는 중 에러 발생: ${error.message}`);
  }
};

// 서버로 POST 요청 보내기
export const postData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/`, data);
    return response.data;
  } catch (error) {
    throw new Error(`데이터를 전송하는 중 에러 발생: ${error.message}`);
  }
};
