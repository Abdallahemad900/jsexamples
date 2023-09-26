// Ex 1


const counter = document.getElementById("counter");
const btnElement =document.querySelector(".btn-element");
const btnElementDec =document.querySelector(".btn-decrement");
// const parent = document.querySelector(".content");
 
const colors = ["red","yellow","blue","orange","black"];

btnElement.onclick = function(){
    counter.textContent = +counter.textContent +1;
     
    counter.parentElement.style.backgroundColor= getRandomColor(); 
    
}
btnElementDec.onclick = function(){
    counter.textContent = +counter.textContent -1;
    counter.parentElement.style.backgroundColor= getRandomColor(); 

}

function getRandomColor(){
    let randNum = parseInt(Math.random() * 6);
    return colors[randNum]; 
}
 





// Ex 2





const mainImage = document.getElementById ("main-image");
const innerImage = document.querySelectorAll (".inner-image");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
let state = 0;

btnNext.onclick = function(){
    state= state+1;
    if(state < innerImage.length){
        mainImage.src=innerImage[state].src;
    }
    else{
        state = 0;
        mainImage.src=innerImage[state].src;

    }
}

btnPrev.onclick = function(){
    state= state -1;
    if(state >= 0){
        mainImage.src=innerImage[state].src;
    }
    else{
        state = innerImage.length -1;
        mainImage.src=innerImage[state].src;

    }
}

for(let i=0 ; i < innerImage.length ; i++){
    // al i = 0 wekol lma t onclick 3la al innerImage  hy3ml i++ ll result algdeda

innerImage[i].onclick =function(){
    let imageReplaceSrc = innerImage[i].src;
    mainImage.src = imageReplaceSrc;
}
}

// innerImage[0].onclick =function(){
//     let imageReplaceSrc = innerImage[0].src;
//     mainImage.src = imageReplaceSrc;
// }


// innerImage[1].onclick =function(){
//     let imageReplaceSrc = innerImage[1].src;
//     mainImage.src = imageReplaceSrc;
// }


// innerImage[2].onclick =function(){
//     let imageReplaceSrc = innerImage[2].src;
//     mainImage.src = imageReplaceSrc;
// }


// innerImage[3].onclick =function(){
//     let imageReplaceSrc = innerImage[3].src;
//     mainImage.src = imageReplaceSrc;
// }










// Ex 3
const btns = document.querySelectorAll(".btn-incs");
const color = ["red","yellow","blue","orange","black","tan","green"];

btns.forEach(function(item){

    item.addEventListener("click", addStyleAction)
})

function addStyleAction() {
        const rand = parseInt(Math.random() * 8)
        // const card = item.closest(".card");
        const card = this.closest(".card");
// ta3od 3la al addstyleAction bta3 al addevent listener
        card.style.backgroundColor = color[rand];
        const para = card.querySelector("h1");
        let content = +para.textContent;
        para.textContent = content +1 ;    
        para.style.color="white";
    }





// Ex 4

const tabTitle = document.querySelectorAll(".tab-title");
const tabContent = document.querySelectorAll(".tab-content");

tabTitle.forEach(function (el) {
  el.addEventListener("click", function () {
    removeClassActive(tabTitle);
    el.classList.add("active");
    let dataId = el.dataset.id;
    removeClassActive(tabContent);
    document.getElementById(dataId).classList.add("active");
  });
});

function removeClassActive(items) {
  items.forEach((element) => {
    element.classList.remove("active");
  });
}

// function removeClassActiveFromContent (){
//     tabContent.forEach((element) => {
//         element.classList.remove("active");
//     })
// }








// Ex 5

const hexCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];


const colorItems = document.querySelectorAll(".color");
// const colorss = ["red", "blue","tan","black","yellow"] ;
// index is an argument function بتلف علي الاندكس 0 1 2 3 4
// item بيشير للايتم اللي بلوب عليه 
colorItems.forEach(function(item){
    let coloro = generateColor();
    item.style.backgroundColor = coloro;
    item.addEventListener("click" , function(){
        document.body.style.backgroundColor = coloro;
        item.classList.add("selected-color");
    });
});


function generateColor(){
    let coloro = "";
    for  (i = 0 ; i<= 5 ; i ++){
        let randIndex = parseInt(Math.random() * hexCode.length);
        coloro += hexCode[randIndex];
    }
    return "#"  + coloro;

}
















// Ex 6

const formTask = document.getElementById("task-form");
const taskTitle =  document.getElementById("name");
const taskContainer = document.querySelector("table tbody");
const task =getTasksFromLocalStorage() ?? [];
const btnSubmit = document.getElementById("submit-btn");
let statuss = null;

function renderTasks(){
  let task = getTasksFromLocalStorage() ;
  task.forEach(function(item){
    taskContainer.innerHTML +=
    `<tr>
    <td> ${item.title} </td>
    <td>
        <button class="btn btn-primary btn-edit" data-id = "${item.id}"> Edit</button>
    </td>
    <td>
        <button class="btn btn-danger btn-delete" data-id = "${item.id}">Delete</button>
    </td>
      </tr> ` ;
});
}

  renderTasks();  
 

// ${taskTitle.value} بتنده علي الكلام اللي بتكتبه في البوكس ويظهرهولك تحت البوتن
formTask.addEventListener("submit", function (e){
    e.preventDefault();
    if(statuss == null){

      let id = parseInt(Math.random()* 10000) ;
      task.push ({
        id: id
        ,title: taskTitle.value
     }) ;
      taskContainer.innerHTML +=renderTask(taskTitle.value,id);
      //   جيسون بيخزن الكلام فالصفحه حتي لو عملت رفرش
        localStorage.setItem("task-list" , JSON.stringify(task));

    }   else{
      let storageData =getTasksFromLocalStorage();
      let newData = storageData.map(function (item){
       if(item.id == statuss){
        return{
          id:statuss, 
          title:taskTitle.value,
        };
       } else{
        return item ;
       }
      });
      localStorage.setItem("task-list", JSON.stringify(newData));
      btnSubmit.classList.add("bg-success");
      btnSubmit.classList.remove("bg-info");
      btnSubmit.value = "Add";
      statuss = null ;
      taskContainer.innerHTML ="";
      renderTasks();  


    }
    taskTitle.value = "" ;
    //   دي اللي بتخلي الكلام يتمسح من الانبوت بعد الكتابه 
});

// const deleteBtn = document.querySelectorAll(".btn-delete");
// deleteBtn.forEach(function(item){
//     item.addEventListener("click" , function(){
//       let id =item.getAttribute("data-id");
//       let storageData = JSON.parse(localStorage.getItem("task-list"));
//       let newData = storageData.filter(function (item){
//         return item.id != id ;
//       });
//       localStorage.setItem("task-list", JSON.stringify(newData));
//       item.parentElement.parentElement.remove();
//     });
// });
// const editBtn = document.querySelectorAll(".btn-edit");
// editBtn.forEach(function(item){
//     item.addEventListener("click" , function(){
//        let taskTdTitle = item.parentElement.previousElementSibling.textContent;
//        taskTitle.value = taskTdTitle;
//        btnSubmit.value = "Update";
//        btnSubmit.classList.remove("bg-success");
//        btnSubmit.classList.add("bg-info");
//        statuss = item.getAttribute("data-id") ;

//     });
// });



taskContainer.addEventListener("click" , function(e){
  if(e.target.classList.contains("btn-delete")){
    let item = e.target;

      let id =item.getAttribute("data-id");
      let storageData = getTasksFromLocalStorage();
      let newData = storageData.filter(function (item){
        return item.id != id ;
      });
      localStorage.setItem("task-list", JSON.stringify(newData));
      item.parentElement.parentElement.remove();
  }
  
if(e.target.classList.contains("btn-edit")){
  let item = e.target;
  let taskTdTitle = item.parentElement.previousElementSibling.textContent;
  taskTitle.value = taskTdTitle;
  btnSubmit.value = "Update";
  btnSubmit.classList.remove("bg-success");
  btnSubmit.classList.add("bg-info");
  statuss = item.getAttribute("data-id") ;
}
});


function getTasksFromLocalStorage(){
  return JSON.parse(localStorage.getItem("task-list")) ;
}

function renderTask(value,id){

  return `<tr>
      <td> ${value} </td>
      <td>
          <button class="btn btn-primary btn-edit" data-id="${id} "> Edit</button>
      </td>
      <td>
          <button class="btn btn-danger btn-delete" data-id="${id}" >Delete</button>
      </td>
        </tr> ` ;
}










// Ex 7



const scrollTop = document.querySelector(".scroll-top");
const scrollBar = document.querySelector(".scroll-bar");
const links = document.querySelectorAll(".nav-link");

links.forEach(function(item){
  item.addEventListener("click", function(e){
    e.preventDefault();
    let targetElement = document.getElementById(item.dataset.target);
    let position =  targetElement.offsetTop -targetElement.clientHeight
    window.scrollTo({
      top: position ,
    })
  })
})

window.addEventListener("scroll" , function(){
  let mainHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight

let percentage =
document.documentElement.scrollTop / mainHeight;
scrollBar.style.width = `${percentage * 100}% `;

  // kol lma tnzl al button hyzhr lma ttl3 y5tfy
  if(window.scrollY>600){
    scrollTop.style.display ="block";
  } else{
    scrollTop.style.display ="none";

  }
})
scrollTop.addEventListener("click" , function(){
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})












