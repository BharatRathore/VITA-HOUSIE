
const inputButton = document.getElementById('input-button')
const generateButton = document.getElementById('generate-button')
const hostbtn = document.getElementById('host-button')
let bingoWord=document.querySelector('.bingo-word')
let wordGenerator=document.querySelector('#word-generator')
const hostDiv=document.querySelector('.host')
let remWordCount = document.getElementById('remaining-words')
let noOfTickets = document.getElementById('no-of-tickets')
const printBtn=document.getElementById('print-btn')


let printableDiv=document.querySelector('#printable')
let userInput = document.getElementById('input-words')
let ticketDiv=document.querySelector('.ticket-div-row')
let words=document.querySelectorAll('.words')
let comments=document.getElementById('comments')

let outerTicketDiv=document.querySelector('.ticket-div')
let themes=document.getElementById('themes')

let wordlist=[]
let ticket=[]
let test=[]



printBtn.style.display="none"
hostDiv.style.display="none"
noOfTickets.style.display="none"
generateButton.style.display="none";
hostbtn.style.display="none";
outerTicketDiv.style.display="none";
//printableDiv.style.display="none"

//generateButton.style.display="none";



//API based data

let countryName=[]
let capitals=[]
let districts=[]

fetch('https://restcountries.eu/rest/v2/all')
.then(response=>{
    return response.json()
})
.then(data=>{
    data.forEach(cntry=>{
        countryName.push(cntry.name)
        if(cntry.capital!=""){
            capitals.push(cntry.capital)
        }
        
    })
})



fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities')
.then( response=>{
    return response.json()
})
.then(data=>{
    data.forEach(area=>{
        if(!districts.includes(area.District)){
            districts.push(area.District)
        }
    })
})

let apiwords={
    countries:countryName,
    capitals:capitals,
    indianDistricts:districts
}
console.log(apiwords)

themes.addEventListener('change',e=>{
    if(themes.value){
        console.log(apiwords[themes.value])
        userInput.value=apiwords[themes.value]
    }

})



inputButton.addEventListener('click',e=>{
    let words=userInput.value
    wordlist=words.split(',')
    let length=wordlist.length
    if(!wordlist[0]){
        length=0
    }
    
    if(wordlist.length > 49){
        comments.innerText=`${length} words entered`
        generateButton.style.display="block";
        noOfTickets.style.display="block"
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
    
    
                <div class="ticket-box mb-5 ">
                            <label>Ticket-${ticketid++}</label>
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
    
    
    
    let n=noOfTickets.value
    ticketDiv.innerHTML='';
    ticketid=1;
    for(let no=0;no<n;no++){
        createTicket()
    }

    outerTicketDiv.style.display="block";
    hostbtn.style.display="block"
    //printableDiv.style.display="block"
    //ticketDiv.style.display="block";
    printBtn.style.display="block"
   

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
        remWordCount.innerText=`${max+1-count} Words Remaining`
    console.log(hostWords)
    }
    else{
        remWordCount.innerText=`Last Word`
        bingoWord.innerText="All Words Done!!"
  
    }
    
    
})

function printDiv() {
    var printContents = document.getElementById('printable').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}


