const inputButton = document.getElementById('input-button')
const generateButton = document.getElementById('generate-button')
const hostbtn = document.getElementById('host-button')
let bingoWord=document.querySelector('.bingo-word')
let wordGenerator=document.querySelector('#word-generator')
const hostDiv=document.querySelector('.host')
let remWordCount = document.getElementById('remaining-words')
hostDiv.style.display="none"

let userInput = document.getElementById('input-words')
let ticketDiv=document.querySelector('.ticket-div-row')
let words=document.querySelectorAll('.words')
let comments=document.getElementById('comments')
let wordlist=[]
let ticket=[]
let test=[]
generateButton.style.display="none";
hostbtn.style.display="none";

//generateButton.style.display="none";
inputButton.addEventListener('click',e=>{
    let words=userInput.value
    wordlist=words.split(',')
    let length=wordlist.length
    if(!wordlist[0]){
        length=0
    }
    
    if(wordlist.length > 8){
        comments.innerText=`${length} words entered`
        generateButton.style.display="block";
    }
    else{
        comments.innerText=`Only ${length} words entered, plz enter more`
    }
})

let createTicket=()=>{
    //Generate random 9 words and store in array

    
    ticket=[]
    test=[]
    let max=wordlist.length-1
    let rand;
    for(let i=0;i<9;){
        rand=Math.floor(Math.random() * (max + 1) )
        console.log(rand)
        if(!test.includes(rand)){
            test.push(rand)
        ticket.push(wordlist[rand])
        i++
        }
        
    }
    
    let coldiv=document.createElement('div')
    coldiv.setAttribute('class', 'col');
    //generate html ticket containing 9 words
    let ticketHTML='';
    ticketHTML=`
    
    
                <div class="ticket-box mb-5">
                            <label>${ticketid++}</label>
                            <div class="row1 d-flex">
                                <div class="words">${ticket[0]}</div>
                                <div class="words">${ticket[1]}</div>
                                <div class="words">${ticket[2]}</div>
                            </div>
                            <div class="row1 d-flex">
                                <div class="words">${ticket[3]}</div>
                                <div class="words">${ticket[4]}</div>
                                <div class="words">${ticket[5]}</div>
                            </div>
                            <div class="row1 d-flex">
                                <div class="words">${ticket[6]}</div>
                                <div class="words">${ticket[7]}</div>
                                <div class="words">${ticket[8]}</div>
                            </div>
                            
                          
                        </div>
                
    
    
    
    `


    coldiv.innerHTML+=ticketHTML;
    ticketDiv.appendChild(coldiv)

}



generateButton.addEventListener('click',e=>{
    ticketDiv.innerHTML='';
    ticketid=1;
    for(let no=0;no<50;no++){
        createTicket()
    }

  
    hostbtn.style.display="block"


    console.log(ticket)
    console.log(test)
})



hostbtn.addEventListener('click',()=>{
    hostDiv.style.display="block"
})


let hostWords=[];
let hostNumbers=[];
let count=0
wordGenerator.addEventListener('click',e=>{
    max=wordlist.length-1
    let flag=1;
    if(hostWords.length!=wordlist.length){
        while(flag){
            rand=Math.floor(Math.random() * (max + 1) )
            
            if(!hostNumbers.includes(rand)){
            hostNumbers.push(rand)
            hostWords.push(wordlist[rand])
            count++
            flag=0
        }
        }
        bingoWord.innerText=wordlist[rand]
        remWordCount.innerText=`${42-count} Words Remaining`
    console.log(hostWords)
    }
    else{
        remWordCount.innerText=`Last Word`
        bingoWord.innerText="All Words Done!!"
  
    }
    
    
})




