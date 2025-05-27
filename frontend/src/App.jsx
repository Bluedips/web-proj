// components/PersonQuiz.js
import { useState, useEffect } from 'react';
import './App.css'; 
const personIds = [287, 819, 1892, 2888, 6968]; // 예시: 유명 인물 ID 배열

export default function PersonQuiz() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // 랜덤 인물 선택
    const randomId = personIds[Math.floor(Math.random() * personIds.length)];
    fetch(`/api/tmdb?personId=${randomId}`)
      .then(res => res.json())
      .then(data => setQuestion(data));
  }, []);

  const checkAnswer = () => {
    if (!question) return;
    if (answer.trim() === question.name) {
      setFeedback('정답입니다!');
    } else {
      setFeedback(`틀렸습니다. 정답: ${question.name}`);
    }
  };

  if (!question) return <div>로딩 중...</div>;

  return (
    <div className="quiz-container">
      <h1>TMDB 인물 퀴즈</h1>
      <h2>이 사람의 이름은?</h2>
      <img src={`https://image.tmdb.org/t/p/w300${question.profile_path}`} alt="인물 사진" />
      <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="이름 입력" />
      <button onClick={checkAnswer}>제출</button>
      <div>{feedback}</div>
    </div>
  );
}
