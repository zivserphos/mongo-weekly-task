const fs = require("fs/promises")



const a = [{

    name: "Ido",
    surName: "Arbel",
    birth: "26/01/1998",
    phone: "0526305421",
    gender: "Male",
    courses: [
      "Java",
      "Math",
    ]} , 
    
    {
    name: "Chen" ,
    surName: "Halevi" ,
    birth: "11/03/1997" ,
    phone : "0526323421",
    gender : "Male" ,
    courses : [
      "Math",
      "Law"
    ]} , 
    
    {
    name : "Koren" , 
    surName : "Gan-or",
    birth : "19/01/1997",
    phone : "0526305321",
    gender : "Male",
    courses : [
      "JavaScript",
      "Finance",
      "Law"
    ]} , 
      
      {
      name: "Oryan",
    surName: "Levy",
    birth: "02/04/1998",
    phone: "0542305321",
    gender: "Male",
    courses: [
      "JavaScript",
      "Law"
    ]} ,
    
    {
    name: "Yahalom",
    surName: "Cohen",
    birth: "03/11/1993",
    phone: "0542305392",
    gender: "Female",
    courses: [
      "Java",
      "Law"
    ]}   
] 

async function writeFile()
{
    await fs.writeFile("zzz.js" , JSON.stringify(a))
    //console.log(c)

}

writeFile();
