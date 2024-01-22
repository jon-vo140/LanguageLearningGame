let animalProperties = [
    {text: 'dog', image: 'Pictures/dog.png'},
    {text: 'cat', image: 'Pictures/cat.png'},
    {text: 'fish', image: 'Pictures/fish.png'},
    {text: 'bird', image: 'Pictures/bird.png'},
    {text: 'mouse', image: 'Pictures/mouse.png'},
    {text: 'horse', image: 'Pictures/horse.png'},
    {text: 'lizard', image: 'Pictures/lizard.png'},
    {text: 'elephant', image: 'Pictures/elephant.png'},
    {text: 'shark', image: 'Pictures/shark.png'},
    {text: 'bear', image: 'Pictures/bear.png'},
];

let animals = {};
for (let animal of animalProperties) {
    animals[animal.text] = animal;
}

let questions = [
    {
        title: 'gato',
        alternatives: [
            animals.dog,
            animals.cat,
            animals.fish,
            animals.lizard,
        ],
        correctAnswer: 1
    },
    {
        title: 'ave',
        alternatives: [
            animals.mouse,
            animals.horse,
            animals.lizard,
            animals.bird,
        ],
        correctAnswer: 3
    },
    {
        title: 'ratón',
        alternatives: [
            animals.cat,
            animals.fish,
            animals.mouse,
            animals.shark,
        ],
        correctAnswer: 2
    },
    {
        title: 'caballo',
        alternatives: [
            animals.horse,
            animals.elephant, 
            animals.fish,
            animals.dog,
        ],
        correctAnswer: 0
    },
    {
        title: 'perro',
        alternatives: [
            animals.shark,
            animals.horse, 
            animals.dog,
            animals.lizard,
        ],
        correctAnswer: 2
    },
    {
        title: 'pescado',
        alternatives: [
            animals.bear,
            animals.cat, 
            animals.elephant,
            animals.fish,
        ],
        correctAnswer: 3
    },
    {
        title: 'elefante',
        alternatives: [
            animals.dog,
            animals.elephant, 
            animals.cat,
            animals.lizard,
        ],
        correctAnswer: 1
    },
    {
        title: 'lagarto',
        alternatives: [
            animals.horse,
            animals.lizard, 
            animals.bear,
            animals.shark,
        ],
        correctAnswer: 1
    },
    {
        title: 'oso',
        alternatives: [
            animals.dog,
            animals.mouse, 
            animals.bear,
            animals.cat,
        ],
        correctAnswer: 2
    },
    {
        title: 'tiburón',
        alternatives: [
            animals.shark,
            animals.bird, 
            animals.fish,
            animals.lizard,
        ],
        correctAnswer: 0
    },
];

let app = {
    start: function() {

        this.currPosition = 0;
        this.score = 0;

        let alts = document.querySelectorAll('.alternative');

        alts.forEach((element,index) => {
            element.addEventListener('click',() => {
                this.checkAnswer(index);    
            });
        });

        this.updateStats()

        this.showQuestion(questions[this.currPosition]);
    },

    showQuestion: function(q) {
        
        let titleDiv = document.getElementById('title');
        titleDiv.textContent = q.title;

        let alts = document.querySelectorAll('.alternative');
        alts.forEach(function(element,index){
            const alternative = q.alternatives[index]
            element.innerHTML = `${alternative.text} <br> <img src="${alternative.image}"> `
        });
    },

    checkAnswer: function(userSelected) {
        let currQuestion = questions[this.currPosition];

        if (currQuestion.correctAnswer == userSelected) {
            console.log('correct');
            this.score++;
            this.showResult(true);
        }
        else {
            console.log('not correct');
            this.showResult(false);

        };
        
        this.updateStats()

        this.increasePosition()

        this.showQuestion(questions[this.currPosition]);

    },

    increasePosition: function() {
        this.currPosition++;

        if (this.currPosition == questions.length){
            let endDiv = document.getElementById('end');
            endDiv.textContent = 'Congrats! You have reached the end of the game.';
            let restartDiv = document.getElementById('restart');
            restartDiv.textContent = '*Refresh the page to start the game over.';

            let finalScore = this.score;
            let highestScore = questions.length;
            let finalPercentScore = finalScore/highestScore;
            let rankingDiv = document.getElementById('ranking');
            let rankingResult = '';
            let failingThreshold = .50;
            let passingThreshold = .80;
            
            if (finalPercentScore <= failingThreshold) {
                rankingResult = 'Keep practicing and try again!';
            }
            else if (finalPercentScore > failingThreshold && finalPercentScore < passingThreshold) {
                rankingResult = 'Good job! Keep practicing to increase your score!';
            }
            else {
                rankingResult = 'You are a Language Genius!';
            }
            
            rankingDiv.textContent = rankingResult;
        }
    },

    updateStats: function () {
        let scoreDiv = document.getElementById('score');
        scoreDiv.textContent = `Your Score: ${this.score}/${questions.length}`;

        
    },

    showResult: function (isCorrect) {
        let resultDiv = document.getElementById('results');
        let result = '';

        if(isCorrect){
            result = 'Correct Answer!'
        }
        else {
        let currQuestion = questions[this.currPosition];
        let correctAnswIndex = currQuestion.correctAnswer; 
        let correctAnswText = currQuestion.alternatives[correctAnswIndex].text;
        result = `Wrong. The correct answer was ${correctAnswText}.`;
        }

        resultDiv.textContent = result;
    }  
};

app.start();



