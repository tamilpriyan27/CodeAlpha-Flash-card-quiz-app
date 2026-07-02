const data=[
    {
        question:"what is national animal?",
        answer:"Tiger"
    },
    {
        question:"what is national bird?",
        answer:"Peacock"
    },
    {
        question:"what is national anthem?",
        answer:"jana gana mana"
    }
];
let currentIndex=0;
document.getElementById("totalquestions").textContent=`${currentIndex+1} / ${data.length}`;
let question=document.getElementById("question");
let answer=document.getElementById("answer");

function displaycards(){
    question.textContent=data[currentIndex].question;
    answer.textContent=data[currentIndex].answer;
}
displaycards();
function next(){
    if (currentIndex<data.length-1){
        document.getElementById("flashcard-inner").classList.remove('flip');
        setTimeout(()=>{
            currentIndex++;
            document.getElementById("totalquestions").textContent=`${currentIndex+1} / ${data.length}`;
            displaycards();
        },200);
    }
}
function previous(){
    if(currentIndex > 0){
        document.getElementById("flashcard-inner").classList.remove('flip');
        setTimeout(()=>{
            currentIndex--;
            document.getElementById("totalquestions").textContent=`${currentIndex+1} / ${data.length}`;
            displaycards();
        },200);
    }
}
function flipCard(){
    document.getElementById("flashcard-inner").classList.toggle('flip');
}
function showaddform(){
    let html=`
    <div id="addForm">
    <input type="text" id="newque" placeholder="Enter Question">
    <br><br>
    <input type="text" id="newans" placeholder="Enter Answer">
    <br><br>
    <button onclick="saveflashcard()" id="savebtn">Save</button>
    </div>
    `;
    document.getElementById("changesbox").innerHTML=html;
}
function saveflashcard(){
    let question=document.getElementById("newque").value;
    let answer=document.getElementById("newans").value;
    if(question === "" || answer===""){
        alert("enter question and answer");
        return;
    }
    data.push({
        question:question,
        answer:answer
    });
    alert("Flashcard Added");
    document.getElementById("changesbox").innerHTML="";
    document.getElementById("totalquestions").textContent=`${currentIndex+1} / ${data.length}`;
}
function showcards(){
    let html="";
    data.forEach((card,index)=>{
        html+=`
        <div class="deleteCard">
        <span id="delques">${card.question}</span>
        <button id="deleteque" onclick="deletecard(${index})">Delete</button>
        </div>
        `;
    });
    document.getElementById("changesbox").innerHTML=html;
}
function deletecard(index){
    let confirmdelete=confirm("Delete this flashcard?");
    if(confirmdelete){
        data.splice(index,1);
        showcards();
        document.getElementById("totalquestions").textContent=`${currentIndex+1} / ${data.length}`;
    }
    if(currentIndex >= data.length){
        currentIndex=data.length-1;
    }
    if(data.length >0){
        displaycards();
    }
}
function showEditCards(){
    let html = "";
    data.forEach((card,index)=>{

        html += `
            <div class="editCard">
                <input
                    type="text"
                    id="question${index}"
                    value="${card.question}">
                <br>
                <input
                    type="text"
                    id="answer${index}"
                    value="${card.answer}">
                <hr>
            </div>
        `;
    });

    html += `
        <button id="saveall" onclick="saveAllEdits()">
            Save All
        </button>
    `;
    document.getElementById("changesbox").innerHTML = html;
}
function saveAllEdits(){
    data.forEach((card,index)=>{
        card.question =
        document.getElementById(`question${index}`).value;
        card.answer =
        document.getElementById(`answer${index}`).value;
    });
    displaycards();
    alert("All Flashcards Updated");
    document.getElementById("changesbox").innerHTML = "";
}