import React from "react";
import Home from "./Home"; // 기존 Home 컴포넌트 불러오기

const testData = [
  [
    "https://cwazzghwilkoqxwzsxte.supabase.co/storage/v1/object/sign/photos/4_108.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvNF8xMDguanBnIiwiaWF0IjoxNzM4NzIwMzA4LCJleHAiOjE3Mzg3MjM5MDh9.QtyA5Fi3AhkgFjCBY7ASvJcwsjLSy-3W7rwNwFIGkT4",
    "https://cwazzghwilkoqxwzsxte.supabase.co/storage/v1/object/sign/photos/4_43.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvNF80My5qcGciLCJpYXQiOjE3Mzg3MjAzMDgsImV4cCI6MTczODcyMzkwOH0.g9QlG6_ymi-Eqtbl3eIrqeFgHxIWmMu5fBzCc9HFmf0",
    "https://cwazzghwilkoqxwzsxte.supabase.co/storage/v1/object/sign/photos/1_18.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvMV8xOC5qcGciLCJpYXQiOjE3Mzg3MjAzMDgsImV4cCI6MTczODcyMzkwOH0.nJyPN5CNetf3Tp-EQrdKFmQU87mZpYi4svOWPboXaQc",
    "https://cwazzghwilkoqxwzsxte.supabase.co/storage/v1/object/sign/photos/2_82.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvMl84Mi5qcGciLCJpYXQiOjE3Mzg3MjAzMDgsImV4cCI6MTczODcyMzkwOH0.MFZmLWWUWXE-ezrBZeXGxeaAtxpmg7O6rhu0C2qX7_4",
    "https://cwazzghwilkoqxwzsxte.supabase.co/storage/v1/object/sign/photos/2_11.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvMl8xMS5qcGciLCJpYXQiOjE3Mzg3MjAzMDgsImV4cCI6MTczODcyMzkwOH0.3QLoco3JZBDDHEIlru68jmjOuepQjFrpRa1OVXKi6-k"
  ],
  "맑은 날씨와 추운 날씨가 섞인 날씨에 적합한 옷차림은, 보온성이 좋은 셔츠와 바지, 그리고 두꺼운 코트입니다."
];

// 데이터를 Home 컴포넌트의 props 형태에 맞게 변환
const testRecommendations = {
  images: testData[0], // 이미지 리스트
  description: testData[1], // 추천 의상 설명
};

function TestHome() {
  return <Home recommendations={testRecommendations} />;
}

export default TestHome;
