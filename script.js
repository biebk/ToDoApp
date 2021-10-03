//getting date and assigning
var date = new Date();
var day = date.getDate();
var year = date.getFullYear();
var month = date.getMonth();
var nameOfTheDay = date.getDay();
const monthArray = ["January", "February", "March", "May", "April", "June", "July", "August", "September", "October", "November", "December"];
const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//setting date 
document.getElementById("year").innerHTML = year;
document.getElementById("month").innerHTML = monthArray[month];
document.getElementById("dayName").innerHTML = dayName[nameOfTheDay];
document.getElementById("dayDate").innerHTML = "&nbsp;" + day + "&comma;&nbsp;";

// Saving quotes and author name to array

const quotes = [
    "Hard work is an essential element in tracking down and perfecting a strategy or in executing it.",
    "Luck is great, but most of life is hard work.",
    "Work and you’ll get what you need; work harder and you’ll get what you want.",
    "The story of life is quicker than the wink of an eye.",
    "I’m a great believer in luck, and I find the harder I work the more I have of it.",
    "Plans are only good intentions unless they immediately degenerate into hard work.",
    "Men die of boredom, psychological conflict and disease. They do not die of hard work.",
    "Happiness is the real sense of fulfillment that comes from hard work.",
    "Be willing to be uncomfortable. Be comfortable being uncomfortable. It may get tough, but it's a small price to pay for living a dream.",
    "The more you seek the uncomfortable, the more you will become comfortable.",
    "I think goals should never be easy, they should force you to work, even if they are uncomfortable at the time.",
    "The one thing you learn is when you can step out of your comfort zone and be uncomfortable, you see what you are made of and who you are.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "When something is important enough, you do it even if the odds are not in your favour.",
    "I may climb perhaps to no great heights, but I will climb alone.",
    "If you fulfill your obligations everyday you don't need to worry about the future.",
    "If you always do what you’ve always done, you’ll always be where you’ve always been.",
    "You’ve got to have rules to live by, and one of mine is always say yes. Put yourself in danger of something amazing happening to you.",
    "The key to happiness is really progress and growth and constantly working on yourself and developing something.",
    "The two most powerful warriors are patience and time.",
    "Lost time is never found again.",
    "Work as hard as you possibly can on at least one thing and see what happens."
];
const quotesAuthor = [
    "Charlie Munger",
    "Iain Duncan Smith",
    "Prabakaran Thirumalai",
    "Jimi Hendrix",
    "Thomas Jefferson",
    "Peter F. Drucker",
    "David Ogilvy",
    "Joseph Barbara",
    "Peter McWilliams",
    "Connor McGregor",
    "Michael Phelps",
    "Sue Bird",
    "B.B King",
    "Elon Musk",
    "Cyrano De Bergerac",
    "Jordan Peterson",
    "T.D Jakes",
    "Tom Bilyeu",
    "Lewis Howes",
    "Leo Tolstoy",
    "Benjamin Franklin",
    "Jordan B. Peterson"
];
// Generating Random Number and making that as array index to display quote and author name
var quoteText = document.getElementById("quoteText");
var authorName = document.getElementById("authorName");
function quoteGenerator() {
    var index = Math.floor(Math.random() * 22);
    console.log(index);
    quoteText.innerHTML = "&ldquo;&nbsp;" + quotes[index] + "&nbsp;&rdquo;";
    authorName.innerHTML += quotesAuthor[index];
}

quoteGenerator();

// convert the currentDate into array name so we can store current Dated array to local storage
var list = document.getElementById("listBox");
var currentDay = monthArray[month] + day;
function makeArray(name) {
    window[name] = [];
    return window[name];
}
var currentDayArray = makeArray(currentDay);

// creating a toggle for displaying the initial list while clicking on create ToDo button

var box = document.getElementById("initialList");
var toggleOn = false;
var toggleToDo = () => {

    if (toggleOn === false) {
        box.style.cssText = "opacity: 1; z-index:2;"
        toggleOn = true;
    }
    else {
        box.style.cssText = "opacity: 0; z-index: -1;"
        toggleOn = false;
    }
};

//creating function for close button that pops after clicking on create Todo
var closer = () => {
    box.style.cssText = "opacity: 0; z-index: -1;"
    toggleOn = false;
};

//Script for generating list items dynamically
var input = document.querySelector('#initialList input[type="text"]');
function listGenerator() {
    var inputValue = input.value;
    if (inputValue == "") {
        input.setAttribute("placeholder", "Error! Enter task first");
    }
    else {
        var li = document.createElement("li");
        var liTextNode = document.createTextNode(inputValue);
        li.appendChild(liTextNode);
        list.appendChild(li);
        currentDayArray.push(inputValue);
        if (currentDayArray.length === 12) {
            list.style.overflowY = "scroll";
        }
        input.value = "";
        input.setAttribute("placeholder", "Success! Enter next task ..");
    }
}

//save array while clicking on submit button to window local storage
var storage = window.localStorage;
console.log(storage);
var ongoingTaskList = document.getElementById("ongoingTaskList");

var submitter = () => {
    var currentDay = [...currentDayArray];
    if (currentDay.length === 0) {
        input.setAttribute("placeholder", "Error ! Enter no task to submit.");

    }
    else {
        if(storage[monthArray[month]+day]!=undefined){
           console.log("i was there");
            const tempArray = JSON.parse(window.localStorage.getItem(monthArray[month]+day));
            const temp=tempArray.concat(...currentDay);
            window.localStorage.setItem((monthArray[month]+day),JSON.stringify(temp));
        }
        else{
            console.log("no you didn't made it");
            window.localStorage.setItem((monthArray[month]+day),JSON.stringify(currentDay));
        }
       
        document.location.reload();
        closer();
    }
};

//create a function that will display all the array
//of local storage in on Going task
const storageArrays = [];

var fetchStorageArrays = ()=>{

for(let key in storage){
if(key!=='length'&&key!=="clear"&&key!=="getItem"&&key!=="setItem"&&key!=="key"&&key!=="removeItem"){
    storageArrays.push(key);
}   
}
for(let key of storageArrays){
taskCreator(key);
}
};
fetchStorageArrays();

//Function to create li inside ongoing task
function taskCreator(key){
let li = document.createElement("li");
let liText=document.createTextNode(key);
li.appendChild(liText);
ongoingTaskList.appendChild(li);
}

//Now its time to create a function that will add event to all list item in ongoing task when the app is loaded
//then on clicking that we should get access to that particular li and it's inner text

var addEventOnLi = ()=>{
const liArray = document.querySelectorAll(".ongoingTask #ongoingTaskList >li");
liArray.forEach(item=>{
item.addEventListener('click',showResultBox);
});
};
addEventOnLi();
var resultBox = document.querySelector("#resultBox");
function showResultBox(){
resultBox.style.display="block";
let liName=event.target.textContent;
var arr = JSON.parse(window.localStorage.getItem(liName));
let spanElement = document.createElement("span");
spanElement.setAttribute("id","listInfo");
let spanText = document.createTextNode(liName);
spanElement.appendChild(spanText);
resultBox.append(spanElement);
for(let item of arr){
let li = document.createElement("li");
li.innerHTML ="<label>"+item+"<input type='checkbox'></label>"
resultBox.append(li);
}
}


//function to close the resultBox that we get when we click any item of ongoing task section
var closeResult = ()=>{
    window.location.reload();
    document.getElementById('resultBox').style.display='none';
}


/* What is next?
The idea now is while user checks the list items on ongoing task, it should be stay same even
when he closes the browser. He should be able to see where he left off. I am not able to manage this
for now. And when all the list item in one particular date is being selected then, there
should be functionality to hide or remove that from ongoing task and transfer to completed 
task. 
I came this far from a simple concept and sketch in paper. Whoa!, what these few day has made me.
Now I am more confident on learning, understanding the concept. I believe doing these kind of 
solo project is quite essential to make concept stick to memory.
I am up for next challenge which is to create a working clone of mero share result checker.
I am really excited for that . Let's go

If  you think you can add other functionality, you can contact me, I also eager to learn from you.
Thank you! 
-Bibek
October 3,2021
*/