
let canStart = true;

const startGameBtn = document.getElementById('button-1');

const imagesContainer = document.getElementById('images-container');

const prompt = document.getElementById('prompt');

const feedbackPrompt = document.getElementById('feedback')

let gameDog = '';


const getDogsList = async () => {
    const x = await fetch('https://dog.ceo/api/breeds/list/all');
    const response = await x.json();
    const data = response.message;
    // console.log(data);
    return data;
}



const makeDogNamesarray = async () => {
    const x = await getDogsList();
    // console.log(x)
    const data = Object.keys(x);
    // console.log(data)
    return data;
}


const fetchgameDogNames = async () => {
    const data = await makeDogNamesarray();
    // console.log(data)
    
    let index1 = Math.floor(Math.random() * data.length);
    let index2 = Math.floor(Math.random() * data.length);
    let index3 = Math.floor(Math.random() * data.length);
    let index4 = Math.floor(Math.random() * data.length);

    let dogs = [];
    const dog1= data[index1];
    dogs.push(dog1);
    
    const dog2= data[index2];
    dogs.push(dog2);
   
    const dog3= data[index3];
    dogs.push(dog3);
    
    const dog4= data[index4];
    dogs.push(dog4);

    // console.log(dogs);
    return dogs;

}

const setGameDogImages = async () => {
    const x = await fetchgameDogNames();
    // console.log(x);
    // console.log('this is setGameDogImages');
    // console.log(y);

    const fetch1Url = await fetch(`https://dog.ceo/api/breed/${x[0]}/images/random`);
    const url1Object = await fetch1Url.json();
    const url1 = url1Object.message;

    
    const image1 = document.createElement('img');
    image1.src = `${url1}`;
    image1.width = "160";
    image1.height = "160";
    image1.id = x[0];
    imagesContainer.appendChild(image1);
    // console.log(image1);
   

    const fetch2Url = await fetch(`https://dog.ceo/api/breed/${x[1]}/images/random`);
    const url2Object = await fetch2Url.json();
    const url2 = url2Object.message;
    const image2 = document.createElement('img');
    image2.src = `${url2}`;
    image2.width = "160";
    image2.height = "160";
    image2.id = x[1];
    imagesContainer.appendChild(image2);
    
    const fetch3Url = await fetch(`https://dog.ceo/api/breed/${x[2]}/images/random`);
    const url3Object = await fetch3Url.json();
    const url3 = url3Object.message;
    const image3 = document.createElement('img');
    image3.src = `${url3}`;
    image3.width = "160";
    image3.height = "160";
    image3.id = x[2];
    imagesContainer.appendChild(image3);
    
    const fetch4Url = await fetch(`https://dog.ceo/api/breed/${x[3]}/images/random`);
    const url4Object = await fetch4Url.json();
    const url4 = url4Object.message;
    const image4 = document.createElement('img');
    image4.src = `${url4}`;
    image4.width = "160";
    image4.height = "160";
    image4.id = x[3];
    imagesContainer.appendChild(image4);
    
    const randomDogIndex = Math.floor(Math.random() * x.length);
    // console.log(randomDogIndex);
    const randomDog = x[randomDogIndex];
    // console.log(randomDog);
    const randomPrompt = document.createElement('p');
    randomPrompt.innerText = `Select the ${randomDog}`;
    prompt.appendChild(randomPrompt)

    gameDog = randomDog;
    console.log(gameDog);
    
}



const startGame = async () => {

    
    // startGameBtn.removeEventListener('click', startGame)
    if (canStart === true) {
        await setGameDogImages(); 
        // prompt.lastChild.remove(); 
        console.log(imagesContainer);
        canStart = false;
        feedbackPrompt.innerText = '';



        
    }
    if (canStart === false) {
        return
    }

    

    
    

}
startGameBtn.addEventListener('click', startGame);





let playerScore = 15;
let turnNumber = 1

const getScore = document.getElementById('score')


// const turnNumberDict = {
//     "1": 3, 
//     "2": 2,
//     "3": 3,
//     "4": -5
// }

// arrow functions do not have access to this
imagesContainer.addEventListener('click', e => {
    // console.log('working');
    console.log(imagesContainer);
    const target = e.target
    console.log(target.id, gameDog)


    if (target.matches('img')) {
        // console.log(true);
        if (target.id === gameDog && turnNumber === 1) {
            // console.log(true);
            displayFeedback();
            winThreePoints();
            updatePlayerScore();
            imagesContainer.innerHTML = '';
            canStart=true

            turnNumber = 1
            console.log(turnNumber);

        } else if (target.id === gameDog && turnNumber === 2) {
            // console.log(true);
            displayFeedback();
            winTwoPoints();
            updatePlayerScore();
            imagesContainer.innerHTML = '';
            canStart=true

            turnNumber = 1
            console.log(turnNumber);
        

        } else if (target.id === gameDog && turnNumber === 3) {
            // console.log(true);
            displayFeedback();
            winOnePoint();
            updatePlayerScore();
            imagesContainer.innerHTML = '';
            canStart=true

            turnNumber = 1 
            console.log(turnNumber);

        } else if (target.id === gameDog && turnNumber === 4) {
            // console.log(true);
            displayFeedback();
            lose5Points();
            updatePlayerScore();
            imagesContainer.innerHTML = '';

            canStart=true
            turnNumber = 1 

        } else {
            ++turnNumber
            target.remove()
        }
    }

    if (!target.matches('img')) {
        console.log(false)
        return
    }

})

// These functions are triggered when the User selects the correct answer.
function displayFeedback () {
    prompt.innerText = ''

    feedbackPrompt.innerText = `correct!`;

}


function winThreePoints () {
    ++playerScore
    ++playerScore
    ++playerScore
}

function winTwoPoints () {
    playerScore += 2
}

function winOnePoint () {
    playerScore++

}

function lose5Points () {
    playerScore -= 5 
}

function updatePlayerScore() {
    getScore.textContent = `${playerScore}`;
}