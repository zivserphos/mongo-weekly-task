# commands in the mongo-shell:
 - Create collection: 
   - db.createCollection("students")
 ## insert students 
  db.students.insert({name:"Ido" , surName: "Arbel", birth: "26/01/1998" , phone: "0526305421" , gender: "Male" , courses: ["Java" , "Math",]})
  db.students.insertMany([<br>
      {name:"Chen",surName:"Halevi",birth:"11/03/1997",phone:"0526323421",gender:"Male",courses:["Math","Law"]}, <br> 
      {name:"Koren",surName:"Gan-or",birth:"19/01/1997",phone:"0526305321",gender:"Male",courses:["JavaScript","Finance","Law"]},<br>
      {name:"Oryan",surName:"Levy",birth:"02/04/1998",phone:"0542305321",gender:"Male",courses:["JavaScript","Law"]},<br>
      {name:"Yahalom",surName:"Cohen",birth:"03/11/1993",phone:"0542305392",gender:"Female",courses:["Java","Law"]}<br>
      ]) 

### Get all students
 -- db.students.find({})
### Get all students with name set to Ido 
 -- db.students.find({name: "Ido"})
### Get all students where courses include "Law"
 -- db.students.find({courses: {$in: ["Law"]}})
### Get all students where courses include "Java" and gender set to "Female"
 - db.students.find({courses: {$in: ["Java"]} ,gender:{$in: ["Female"]}})
### Get all students where birth > 05/05/1998
 #### first all i had to update all birth properties(which has been set to a string) <br> into an IsoDate so <br> 
 - db.students.update({name: "Ido"} ,{ $set: {birth: new  Date("1998-01-26")}}) <br>
 -  db.students.update({name: "Chen"} ,{ $set: {birth: new  Date("1997-03-11")}}) <br>
 -  db.students.update({name: "Koren"} ,{ $set: {birth: new  Date("1997-01-19")}}) <br>
 -  db.students.update({name: "Oryan"} ,{ $set: {birth: new  Date("1998-04-02")}}) <br>
 -  db.students.update({name: "Yahalom"} ,{ $set: {birth: new  Date("1993-11-03")}}) <br>
 ### Than 
 -  db.students.find({birth: {$gt: new Date("05-05-1998")}})
 
### Get all students where phone starts with 054
 - db.students.find({phone: {$regex: /^054/ } })  
### Get all students where phone not starts with 054(?)
 -  db.students.find({phone: {$not: {$regex: /^054/ }}})
