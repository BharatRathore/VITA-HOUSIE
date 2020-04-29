
const inputButton = document.getElementById('input-button')
const generateButton = document.getElementById('generate-button')
//const hostbtn = document.getElementById('host-button')
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
//hostbtn.style.display="none";
outerTicketDiv.style.display="none";
//printableDiv.style.display="none"

//generateButton.style.display="none";



//API based data

let countryName=[]
let capitals=[]
let districts=[]

//Country,Capitals Data
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


//Indian Districts Data
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

//Movie Data
let movielist=["JULIE","BAAZIGAR","ANMOL","KAALIA","BAAGHI","BICHOO","HAT TRICK","ISHQZAADE","ZUBAIDA","HERA PHERI","STREE","DILWALE","ANAMIKA","DREAM GIRL","KHUSHBOO","DIL CHAHTA HAI","KABIR SINGH","MASOOM","KUDRAT","HINDI MEDIUM","RAM LAKHAN","GULLY BOY","OMKARA","QUEEN","AWAARA","LIFE PARTNER","GURU","NAMASTE LONDON","ARADHANA","ANKAHI","DHOL","PADOSAN","BLACK","ROCK STAR","RAID","TAARE ZAMEEN PAR","WOH KAUN THI","AASHIQUI","DADDY COOL","TAMASHA","PHILLAURI","JODI NO 1","RAABTA","BUDHA MIL GAYA","RACE","DHAMAAL","BARSAAT","TRISHUL","CHAMATKAAR","GOAL","GOOD NEWS","RANGOON","REFUGEE","JODHA AKBAR","BEES SAAL PEHLE","HEROPANTI","LOAFER","ROZA","TAAL","PARDESI BABU","KARAN ARJUN","NO ENTRY","KATI PATANG","KAL HO NA HO","QAYAMAT","KAI PO CHE","FANAA","AAG","JUAARI","PADMAN","RAJU CHACHA","KHAKHEE","APARTMENT","SILSILA","AAR PAAR","SUI DHAGA","LAGAAN","MULK","ASLI NAQLI","WELCOME "]
let numberslist=[]
for(i=1;i<100;i++){
    numberslist.push(i)
}

let apiwords={
    countries:countryName,
    capitals:capitals,
    indianDistricts:districts,
    movies:movielist,
    numbers:numberslist
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
    for(let i=0;i<12;){
        rand=Math.floor(Math.random() * (max + 1) )
        console.log(rand)
        if(!test.includes(rand)){
            test.push(rand)
        ticket.push(wordlist[rand])
        i++
        }
        
    }
    
    let coldiv=document.createElement('div')
    coldiv.setAttribute('class', 'row');
    coldiv.setAttribute('class', 'm-auto');
    

    //generate html ticket containing 9 words
    let ticketHTML='';
    ticketHTML=`
    
    <div class="ml-auto border p-2 shadow rounded mb-5">
    <div class="d-flex justify-content-between">
    <label >Ticket no. ${ticketid++}</label>
    <label class="text-right">Name:______________</label>
    </div>
    <table class="tablex avoid  table-bordered table-responsive">
    <tbody class="avoid">
    <tr class=" tbl-clr">
      <td class="align-middle">${ticket[0]}</td>
      <td class="align-middle">${ticket[1]}</td>
      <td class="align-middle">${ticket[2]}</td>
      <td class="align-middle">${ticket[3]}</td>
      
      
    </tr>
    <tr class=" tbl-clr">
     <td class="align-middle">${ticket[4]}</td>
     <td class="align-middle">${ticket[5]}</td>
     <td class="align-middle">${ticket[6]}</td>
     <td class="align-middle">${ticket[7]}</td>
     
   </tr>
   <tr class=" tbl-clr">
     <td class="align-middle">${ticket[8]}</td>
     <td class="align-middle">${ticket[9]}</td>
     <td class="align-middle">${ticket[10]}</td>
     <td class="align-middle">${ticket[11]}</td>
     
   </tr>
   
   
    <tbody>
  </table>
 
           </div>     
           
    
    
    `


    coldiv.innerHTML+=ticketHTML;
    ticketDiv.appendChild(coldiv)

}



generateButton.addEventListener('click',e=>{
    
    
    hostDiv.style.display="block"
    let n=noOfTickets.value
    ticketDiv.innerHTML='';
    ticketid=1;
    for(let no=0;no<n;no++){
        createTicket()
    }

    outerTicketDiv.style.display="block";
    //hostbtn.style.display="block"
    //printableDiv.style.display="block"
    //ticketDiv.style.display="block";
    printBtn.style.display="block"
   

    console.log(ticket)
    console.log(test)
})


//For color scheme scetion

let clrBtns=document.querySelectorAll('.clr-btn')
clrBtns.forEach(btn=>{
    btn.addEventListener('mouseover',e=>{
        console.log(e.target.id)
        
        let tblRows=document.querySelectorAll('.tbl-clr')
        tblRows.forEach(row=>{
            row.classList=[]
            if (e.target.id) {row.classList.add(e.target.id)}
            row.classList.add('tbl-clr')
            console.log(row)
            
})
    })
})




// hostbtn.addEventListener('click',()=>{
    //hostDiv.style.display="block"
//     console.log("host")
// })


let hostWords=[];
let hostNumbers=[];
let count=0
let wordgenerator=()=>{
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
    
    
}
let head=document.getElementById('head')
console.log(head)
function printDiv() {
    // var printContents = document.getElementById('printable').innerHTML;
    // var bdy=document.getElementsByClassName('wrapper');
    // var originalContents = document.body.innerHTML;
    
    // document.body.innerHTML=printContents
   
    window.print()
    //document.body.innerHTML=originalContents
    //window.location.reload()
    
 

    
        
    
    
        
        
    
}


//Rules Section
function rules(){
    let rulesObj={
        1:"A single ticket can win multiple prizes ( Loot Lo Jitna Loot Sako).",
        2: "If you are the first person to complete then just send a YES / 👍 in the group and then post a photo of the marked ticket in the group along with the original photo that you have received from our end.",
    
    3:"We will consider last word called out only. Each word will be called out after a gap of 6 ~ 7 seconds.",
    
    4:"In case there is a tie in any particular game, the amount will be divided equally amongst the claimants.",
    
    }
    let rulesModal=document.getElementById('rulesData')
    let rulesHTML=`
    
        <ul >
        ${Object.keys(rulesObj).map(function (key) {
            return "<li>" + rulesObj[key] + "</li>"           
        }).join("")}
        </ul>
    
    `
    rulesModal.innerHTML+=rulesHTML
}

//Prizes Section
// function prizes(){
//     let prizesObj={
//         1:"A single ticket can win multiple prizes ( Loot Lo Jitna Loot Sako).",
//         2: "If you are the first person to complete then just send a YES / 👍 in the group and then post a photo of the marked ticket in the group along with the original photo that you have received from our end.",
    
//     3:"We will consider last word called out only. Each word will be called out after a gap of 6 ~ 7 seconds.",
    
//     4:"In case there is a tie in any particular game, the amount will be divided equally amongst the claimants.",
    
//     }
//     let prizesModal=document.getElementById('prizesData')
//     // let prizesHTML=`
    
//     //     <ul>
//     //     ${Object.keys(prizesObj).map(function (key) {
//     //         return "<li>" + prizesObj[key] + "</li>"           
//     //     }).join("")}
//     //     </ul>
    
//     // `
//     //prizesModal.innerHTML+=prizesHTML
// }


rules()
//prizes()



