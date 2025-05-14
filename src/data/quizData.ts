import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What was the first movie we watched together?',
    options: ['Your Name', 'A Silent Voice', 'Spirited Away', 'Weathering With You'],
    correctAnswer: 0,
    reward: 'Just like Taki and Mitsuha, our connection transcends time and space.'
  },
  {
    id: 2,
    question: 'Where did we go on our first date?',
    options: ['The park', 'A coffee shop', 'The beach', 'A restaurant'],
    correctAnswer: 1,
    reward: 'That small coffee shop will always hold a special place in my heart.'
  },
  {
    id: 3,
    question: 'What\'s my favorite thing about you?',
    options: ['Your smile', 'Your kindness', 'Your determination', 'All of the above'],
    correctAnswer: 3,
    reward: 'Everything about you makes my heart skip a beat.'
  }
];