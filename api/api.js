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
