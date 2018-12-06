var btnClick = function () {
	document.getElementById('addList');
	var list3 = document.getElementById('list');
	list3.innerHTML +=`<li>${prompt()}</li>`;


list3.addEventListener('click', function(event){
  	alert(list3.innerHTML);
  	h1Id.innerHTML = event.target.innerHTML;
    });

}




// var list3 = document.getElementById('list');
//     t.addEventListener('click', function(event){
//         alert(1);
//     });

	// var li = document.createElement('LI');
	// li.appendChild(textPrompt);
	// var li=document.createElement('LI');
	// var textNode=document.createTextNode(textPrompt); 
	// li.appendChild(textNode);
	// document.body.appendChild(li);

// aa.addEventListener('submit' , function());
// aa.addEventListener('' , function());
// list3.addEventListener('click' , charMove());	
// };
// function charMove(){
//   var listres = document.getElementById('li5');
//   listres.value;
// 