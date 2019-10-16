// function shuffle(array) {
//   var currentIndex = array.length,
//     temporaryValue,
//     randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

let QuestionMocks = [
  {
    id: 1,
    question: "Which of the following code creates an object?",
    answers: [
      {
        index: "A",
        content: "var book = Object();"
      },
      {
        index: "B",
        content: "var book = new Object();"
      },
      {
        index: "C",
        content: "var book = new OBJECT();"
      },
      {
        index: "D",
        content: "var book = new Book();"
      }
    ],
    correctAnswer: "B"
  },
  {
    id: 2,
    question:
      "Which of the following is the correct syntax to print a page using JavaScript?",
    answers: [
      {
        index: "A",
        content: "window.print();"
      },
      {
        index: "B",
        content: "browser.print();"
      },
      {
        index: "C",
        content: "navigator.print();"
      },
      {
        index: "D",
        content: "document.print();"
      }
    ],
    correctAnswer: "A"
  },
  {
    id: 3,
    question:
      "Which built-in method removes the last element from an array and returns that element?",
    answers: [
      {
        index: "A",
        content: "last()"
      },
      {
        index: "B",
        content: "get()"
      },
      {
        index: "C",
        content: "pop()"
      },
      {
        index: "D",
        content: "Don't have correct answer."
      }
    ],
    correctAnswer: "C"
  },
  {
    id: 4,
    question:
      "Which built-in method returns the characters in a string beginning at the specified location?",
    answers: [
      {
        index: "A",
        content: "substr()"
      },
      {
        index: "B",
        content: "getSubstring()"
      },
      {
        index: "C",
        content: "slice()"
      },
      {
        index: "D",
        content: "Don't have correct answer."
      }
    ],
    correctAnswer: "A"
  },
  {
    id: 5,
    question:
      "Which of the following function of Number object returns the number's value?",
    answers: [
      {
        index: "A",
        content: "toString()"
      },
      {
        index: "B",
        content: "valueOf()"
      },
      {
        index: "C",
        content: "toLocaleString()"
      },
      {
        index: "D",
        content: "toPrecision()"
      }
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    question:
      "Which of the following function of String object is used to find a match between a regular expression and a string, and to replace the matched substring with a new substring?",
    answers: [
      {
        index: "A",
        content: "concat()"
      },
      {
        index: "B",
        content: "match()"
      },
      {
        index: "C",
        content: "replace()"
      },
      {
        index: "D",
        content: "search()"
      }
    ],
    correctAnswer: "C"
  },
  {
    id: 7,
    question:
      "Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
    answers: [
      {
        index: "A",
        content: "anchor()"
      },
      {
        index: "B",
        content: "big()"
      },
      {
        index: "C",
        content: "blink()"
      },
      {
        index: "D",
        content: "italics()"
      }
    ],
    correctAnswer: "B"
  },
  {
    id: 8,
    question:
      "Which of the following function of String object causes a string to be displayed as struck-out text, as if it were in a <strike> tag?",
    answers: [
      {
        index: "A",
        content: "sup()"
      },
      {
        index: "B",
        content: "small()"
      },
      {
        index: "C",
        content: "strike()"
      },
      {
        index: "D",
        content: "sub()"
      }
    ],
    correctAnswer: "C"
  },
  {
    id: 9,
    question:
      "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
    answers: [
      {
        index: "A",
        content: "pop()"
      },
      {
        index: "B",
        content: "push()"
      },
      {
        index: "C",
        content: "join()"
      },
      {
        index: "D",
        content: "map()"
      }
    ],
    correctAnswer: "B"
  },
  {
    id: 10,
    question:
      "Which of the following function of Array object adds and/or removes elements from an array?",
    answers: [
      {
        index: "A",
        content: "toSource()"
      },
      {
        index: "B",
        content: "sort()"
      },
      {
        index: "C",
        content: "splice()"
      },
      {
        index: "D",
        content: "unshift()"
      }
    ],
    correctAnswer: "C"
  }
];

export default QuestionMocks;
