import { getQuizById, submitQuizResult } from './api.js';
import { getCurrentUser } from './auth.js';

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 300; // 5 minutes in seconds
let quizData;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get('id');
  
  try {
    quizData = await getQuizById(quizId);
    document.getElementById('quiz-title').textContent = quizData.title;
    startTimer();
    showQuestion();
    
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
  } catch (error) {
    console.error('Error loading quiz:', error);
    alert('Failed to load quiz. Please try again.');
  }
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('quiz-timer').textContent = 
    `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showQuestion() {
  const question = quizData.questions[currentQuestionIndex];
  const questionContainer = document.getElementById('question-container');
  
  questionContainer.innerHTML = `
    <div class="question">
      <h3>Question ${currentQuestionIndex + 1}/${quizData.questions.length}</h3>
      <p>${question.text}</p>
      <div class="options">
        ${question.options.map((option, i) => `
          <div class="option" data-index="${i}">${option.text}</div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedIndex = parseInt(e.target.getAttribute('data-index'));
  const correctIndex = quizData.questions[currentQuestionIndex].correctAnswer;
  
  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  e.target.classList.add('selected');
  
  if (selectedIndex === correctIndex) {
    score++;
    document.getElementById('score-display').textContent = `Score: ${score}`;
  }
}

async function submitQuiz() {
  clearInterval(timer);
  const user = getCurrentUser();
  
  try {
    await submitQuizResult(user.id, quizData._id, score);
    window.location.href = `/answers.html?quizId=${quizData._id}&score=${score}`;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    alert('Failed to submit quiz. Please try again.');
  }
}