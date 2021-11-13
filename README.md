# commands in the mongo-shell:
 ### Create collection: 
   - db.createCollection("students")
 ### insert students 
  db.students.insert({name:"Ido" , surName: "Arbel", birth: "26/01/1998" , phone: "0526305421" , gender: "Male" , courses: ["Java" , "Math",]})
  db.students.insertMany([<br>
      {name:"Chen",surName:"Halevi",birth:"11/03/1997",phone:"0526323421",gender:"Male",courses:["Math","Law"]}, <br> 
      {name:"Koren",surName:"Gan-or",birth:"19/01/1997",phone:"0526305321",gender:"Male",courses:["JavaScript","Finance","Law"]},<br>
      {name:"Oryan",surName:"Levy",birth:"02/04/1998",phone:"0542305321",gender:"Male",courses:["JavaScript","Law"]},<br>
      {name:"Yahalom",surName:"Cohen",birth:"03/11/1993",phone:"0542305392",gender:"Female",courses:["Java","Law"]}<br>
      ]) 
## Get requirments
### Get all students
 - db.students.find({})
### Get all students with name set to Ido 
 - db.students.find({name: "Ido"})
### Get all students where courses include "Law"
 - db.students.find({courses: {$in: ["Law"]}})
### Get all students where courses include "Java" and gender set to "Female"
 - db.students.find({courses: {$in: ["Java"]} ,gender:{$in: ["Female"]}})
### Get all students where birth > 05/05/1998
 #### first of all i had to update all birth properties(which has been set to a string) <br> into an IsoDate so <br> 
 - db.students.update({name: "Ido"} ,{ $set: {birth: new  Date("1998-01-26")}}) <br>
 -  db.students.update({name: "Chen"} ,{ $set: {birth: new  Date("1997-03-11")}}) <br>
 -  db.students.update({name: "Koren"} ,{ $set: {birth: new  Date("1997-01-19")}}) <br>
 -  db.students.update({name: "Oryan"} ,{ $set: {birth: new  Date("1998-04-02")}}) <br>
 -  db.students.update({name: "Yahalom"} ,{ $set: {birth: new  Date("1993-11-03")}}) <br>
 ### Than 
 -  db.students.find({birth: {$gt: new Date("05-05-1998")}})
 
### *Get all students where phone starts with 054*
 - db.students.find({phone: {$regex: /^054/ } })  
### Get all students where phone not starts with 054(?)
 -  db.students.find({phone: {$not: {$regex: /^054/ }}})

 ## Update documents
 ### Add a JavaScript course to the students where name set to "Yahalom"
 -  db.students.update({name: "Yahalom"} , {$push: {courses: "JavaScript" }})
 ### Update the birth to 02/12/1998 where name set to "Koren"
 -  db.students.update({name: "Koren"} , {$set: {birth: new Date("1998-12-02")}})

 ## Text search 
 ### Find all students that have a name that contains the letter "o"
 - db.students.find({surName: {$regex: "o"}})
 ### Find all students that have a surName that contains the letter "h" or "y"
 - db.students.find({$or:[ {surName: {$regex: "h"}}, {surName: {$regex: "y" }} ] })

 ## Delete Documents
 ### Delete the student where name set to "Ido"
 - db.students.deleteOne({name: "Ido" })
 ### Delete the student where date set to "02/04/1998"
 - db.students.deleteOne({birth: new Date("1998-04-02")})
 
 ## Relationships
 ### Insert the following documents into a users collection
 - db.users.insertMany([ <br>
 {userName: "GoodGuyGreg", first_name:"Good Guy" , last_name: "Greg"} ,<br>
 {userName: "ScumbagSteve" , full_name: {first: "Schumbag", last: "Steve"}} <br>
 ])
 ### Insert the following documents into a posts collection
 - db.posts.insertMany([ <br>
 {userName: "GoodGuyGreg" , title: "Passes out at party" , body: "Wakes up early and cleans house"} <br>
 {userName: "GoodGuyGreg" , title: "Steals your identity" , body: "Raises your credit score" } ,<br> {userName: "GoodGuyGreg" , title: "Reports a bug in your code", body: "Sends you a Pull request"} , <br> {userName: "ScumbagSteve" , title: "Borrows something" , body: "Sells it"} , <br> 
 {userName: "ScumbagSteve", title: "Borrows everything" , body: "The end"} , <br> 
 {userName: "ScumbagSteve" , title: "Forks your repo on github", title: "Sets to private"} <br>
  ])
 ### Insert the following documents into a comments collection
 - db.posts.findOne({title: "Borrows something"} ,{_id: 1})._id
 -  db.comments.insert({userName:"GoodGuyGreg" , comment: "Hope you got a good deal!" , post: ["618e5486676ba91f85e33420" ]}) <br>
 - db.posts.findOne({title: "Borrows everything"} , {_id: 1})._id
 - db.comments.insert({userName: "GoodGuyGreg" , title: "What's mine is yours!" , post: ["618e5486676ba91f85e33421"]}) <br>
 - db.posts.findOne({title: "Forks your repo on github"})._id
 - db.comments.insert({userName: "ScumbagSteve", comment: "Don't violate the 
licensing agreement!", post: ["618e5486676ba91f85e33422"]}) <br>
 - db.posts.findOne({title:"Passes out at party"} ,{_id:1})._id
 -  db.comments.insert({userName: "ScumbagSteve" , comment: "It still isn't clean" , post: ["618e7ecb676ba91f85e3342e"]}) <br>
 - db.posts.findOne({title:  "Reports a bug in your code"} , {_id:1})._id
 - db.comments.insert({userName: "ScumbagSteve" , comment: "Denied your PR cause I found a hack" , post: ["618e5486676ba91f85e3341f"]})
 ## Querying related collections
### find all users
- db.users.find({});
### find all posts
- db.posts.find({})
### find all posts that was authored by "GoodGuyGreg"
- db.posts.find({userName: "GoodGuyGreg"})
### find all posts that was authored by "ScumbagSteve"
- db.posts.find({userName: "ScumbagSteve"})
### find all comments
- db.comments.find({})
### find all comments that was authored by "GoodGuyGreg"
-  db.comments.find({userName: "GoodGuyGreg"})
### find all comments that was authored by "ScumbagSteve"
-  db.comments.find({userName: "ScumbagSteve"})
### find all comments belonging to the post "Reports a bug in your code"
-  db.comments.find({post: ["618e5486676ba91f85e3341f"]})
## bonus

 


