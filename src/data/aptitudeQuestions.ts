import { AptitudeQuestion } from '../types';

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: 1,
    category: 'Quantitative Aptitude',
    question: 'If a machine learning training pipeline takes 120 minutes on 2 GPUs, assuming linear parallel scaling with 90% efficiency, how long will it take on 4 GPUs?',
    options: ['60 minutes', '66.7 minutes', '54 minutes', '75 minutes'],
    correctIndex: 1,
    explanation: 'With 4 GPUs at 90% efficiency: effective speedup = (4 / 2) * 0.9 = 1.8x. Time = 120 / 1.8 = 66.67 minutes.'
  },
  {
    id: 2,
    category: 'Technical / Programming',
    question: 'What is the average time complexity of searching for a key in a balanced Binary Search Tree (BST) with N nodes?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 1,
    explanation: 'In a balanced BST, the height is log2(N), so each comparison cuts the search space in half, resulting in O(log N) time.'
  },
  {
    id: 3,
    category: 'Logical Reasoning',
    question: 'Statement: "All microservices use Docker. Some Docker containers run on AWS." Which conclusion is logically certain?',
    options: [
      'All microservices run on AWS',
      'Some microservices might run on AWS',
      'No microservices run on AWS',
      'All AWS workloads are microservices'
    ],
    correctIndex: 1,
    explanation: 'Because all microservices are Docker containers and some Docker containers run on AWS, microservices may intersect with AWS, making "Some microservices might run on AWS" the valid possibility.'
  },
  {
    id: 4,
    category: 'Technical / Programming',
    question: 'In SQL, which clause is specifically used to filter groups of aggregated records created by the GROUP BY clause?',
    options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
    correctIndex: 1,
    explanation: 'The HAVING clause is applied after grouping to filter aggregated result sets, whereas WHERE filters individual rows before grouping.'
  },
  {
    id: 5,
    category: 'Quantitative Aptitude',
    question: 'A web server receives 1,800 requests per minute during peak hours. What is the average throughput in requests per second?',
    options: ['18 req/sec', '30 req/sec', '60 req/sec', '180 req/sec'],
    correctIndex: 1,
    explanation: 'Throughput = 1800 requests / 60 seconds = 30 requests per second.'
  },
  {
    id: 6,
    category: 'Logical Reasoning',
    question: 'Find the next term in the sequence: 2, 6, 12, 20, 30, 42, ?',
    options: ['52', '56', '58', '64'],
    correctIndex: 1,
    explanation: 'The differences between consecutive terms are 4, 6, 8, 10, 12, so next difference is 14. 42 + 14 = 56. (Also n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7, 7*8=56).'
  },
  {
    id: 7,
    category: 'Verbal & Communication',
    question: 'Select the sentence that demonstrates the most concise, professional communication for a sprint update to stakeholders:',
    options: [
      'We kinda tried doing the auth stuff but there were lots of things that broke and took time.',
      'Completed OAuth2 authentication milestone; unit test coverage reached 94% with zero blocking regressions.',
      'We did some coding work and hopefully next week everything should basically be fine.',
      'The backend is working because we wrote a ton of cool code yesterday.'
    ],
    correctIndex: 1,
    explanation: 'Option B is quantitative, clear, outcome-focused, and uses precise engineering terminology without filler words.'
  },
  {
    id: 8,
    category: 'Technical / Programming',
    question: 'Which of the following metrics is most sensitive to class imbalance when evaluating a fraud detection ML model?',
    options: ['Accuracy', 'ROC-AUC', 'F1-Score / Precision-Recall', 'Log Loss'],
    correctIndex: 2,
    explanation: 'Accuracy gives misleadingly high numbers on skewed datasets (e.g. 99% non-fraud). Precision-Recall and F1-Score focus directly on true positives and false alarms in the minority class.'
  },
  {
    id: 9,
    category: 'Quantitative Aptitude',
    question: 'If a database storage footprint grows by 20% every month, approximately what factor will it have grown by at the end of 3 months?',
    options: ['1.60x', '1.728x', '1.44x', '2.00x'],
    correctIndex: 1,
    explanation: 'Compound growth: (1.20)^3 = 1.20 * 1.20 * 1.20 = 1.728x.'
  },
  {
    id: 10,
    category: 'Logical Reasoning',
    question: 'If "CLOUD" is coded as "ENQWF", how is "STACK" coded under the same Caesar shift pattern (+2)?',
    options: ['UVBDM', 'UVACM', 'UVCEM', 'TUBCM'],
    correctIndex: 2,
    explanation: 'S+2=U, T+2=V, A+2=C, C+2=E, K+2=M -> UVCEM.'
  }
];
