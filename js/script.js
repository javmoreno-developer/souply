//obtener la dificultad
var dificultad=document.getElementById("seleccion");
var maxFallos=0;
 
if(dificultad!=null) { 
	dificultad.addEventListener("change",()=> {
		console.log("dificultad: "+dificultad.value);


	//clasificar dificultad
	dificultad.value=parseInt(dificultad.value);

	switch(dificultad.value) {
		case "1":
			maxFallos=9;
			console.log("primero");
			break;
		case "2":
			maxFallos=6;
			console.log("primer2");
			break;
		case "3":
			maxFallos=3;
			console.log("primer3");
			break;
			default:
			maxFallos=3;
	}

	 sessionStorage.setItem("dificultad", maxFallos);
	 var dificultad2= sessionStorage.getItem("dificultad");
	 console.log("session2:"+maxFallos);
	});
}

var sesion= sessionStorage.getItem("dificultad");
maxFallos=sesion;
if(sesion==null) {
	maxFallos=3;
}
console.log("session:"+sesion);
Swal.fire({
	title: 'Tienes '+maxFallos+" intentos",
	icon: "info",
  confirmButtonText: 'Aceptar',
})
//general
var palabrasAcertar=["BLUE","BLACK","RED","YELLOW","ORANGES"];//array de palabras
var contadorAciertos=0;
var contadorFallos=0;

var coloresBg=["#2A628F","rgb(0,0,0)","rgb(255, 0, 0)","rgb(255, 255, 0)","rgb(255, 153, 51)"];//array de colores (para cuando acierte)
var colores=["white","white","black","black","black"];//array de colores (para cuando acierte)

var horizontal=[false,false,false,false,false];//array que nos servira para ver si una de las anteriores es horizontal o vertical
//asignamos horizontalidad
for(let i=0;i<5;i++) {
	let random=Math.floor(Math.random()*2);
	if(random==0) {
		horizontal[i]=false;
	} else {
		horizontal[i]=true;
	}
}



//horizontal=[true,true,true,true,true];//borrar
//horizontal=[false,false,false,false,false];//borrar
//horizontal=[false,true,true,true,true];//borrar
//console.log(horizontal);

var posicionesX=[];//array que nos servira para ver las posicionesX de las palabras

var posicionesY=[];//array que nos servira para ver las posicionesY de las palabras

var posicionesTotales=[];//array para las posiciones totales (sirve para hacer mas faciles las comprobaciones).

//asignamos posicionesX de las palabras
function posicionesFuncion() {
	for(let i=0;i<5;i++) {
		if(horizontal[i]==false) {//palabra horizontal
			let maximo=10-palabrasAcertar[i].length;
			posicionesX[i]=Math.floor(Math.random()*maximo);//posiciones horizontales
		} else {//palabra vertical
			let maximo=10-palabrasAcertar[i].length;
			posicionesY[i]=Math.floor(Math.random()*maximo);//posiciones horizontales
		}
	}

	//asignamos posicionesY de las palabras
	for(let i=0;i<5;i++) {
		if(horizontal[i]==false) {//palabra horizontal
			let maximo=10;
			let igual=false;
			do {
				igual=false;
				posicionesY[i]=Math.floor(Math.random()*maximo);//posiciones horizontales
				//nos aseguramos de que las posiciones de i no son iguales
				
				for(z=0;z<i;z++) {
					if(posicionesY[i]==posicionesY[z]) {
						igual=true;
					}
				}
			} while(igual==true);
		} else {
			let maximo=10;
			let igual2=false;
			do {
				igual2=false;
				posicionesX[i]=Math.floor(Math.random()*maximo);//posiciones verticales
				//nos aseguramos de que las posiciones de i no son iguales
				
				for(z=0;z<i;z++) {
					if(posicionesX[i]==posicionesX[z]) {
						igual2=true;
					}
				}
			} while(igual2==true);
		}
	}

	//asignamos posiciones totales
	for(let j=0;j<5;j++) {
		if(horizontal[j]==false) {
			posicionesTotales[j]=(posicionesX[j]+(posicionesY[j]*10));
		} else {
			posicionesTotales[j]=(posicionesY[j]*10)+posicionesX[j];
		}

		//console.log("Posicion final "+j + " : "+posicionesY[j] + ","+ posicionesX[j] + " vertical: "+horizontal[j] + ",total: "+posicionesTotales[j]);
	}
}
posicionesFuncion();
//-------------------------------------------------------
//REFACTORIZAMOS LAS POSICIONES 
var posicionesUltimas=[];
for(let i=0;i<5;i++) {
	let array=[];
	for(let j=0;j<palabrasAcertar[i].length;j++) {
		if(horizontal[i]==false) {
			array.push(posicionesTotales[i] + j);
		} else {
			array.push(posicionesTotales[i] + (j*10));
		}
	}
	posicionesUltimas.push(array);
}
console.log(posicionesUltimas);
//CON ESTO YA TENEMOS LAS POSICIONES ULTIMAS(ARRAY BI)
//RECORRER
var cancelled = 0;


		for(let i=0;i<5;i++) {
			let array=posicionesUltimas[i];
			for(let j=0;j<array.length;j++) {
				let instancia=array[j];
				for(let z=i+1;z<5;z++) {
					if(posicionesUltimas[z].includes(instancia)) {
						console.log("delito: "+posicionesUltimas[z] + ",culpable: "+instancia);
						console.log(posicionesUltimas[z]);
						//refatorizar el segundo array (el de mas adelante,no el que se esta comparando).
						//posicionesFuncion();
						cancelled++;
					}
				}
			}
		}
	
	var posibles=5-cancelled;
	if(window.innerWidth>600) {
		document.getElementById("number").innerText+=(5-cancelled);
	} else {
		document.getElementById("number2").innerText+=(5-cancelled);
	}
	
//-------------------------------------------------------
//MAIN
var casillasTotales=document.getElementsByClassName("casilla");

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let posible=false;//variable que nos sirve para ver donde empezar una palabra
let palabraAux="";//igual que 'posible'
let palabraAux2="";//igual que 'posible'
let palabraAux3="";//igual que 'posible'
let contador=0;
let you=false;

//array pos contador de vertical
var posContador=[0,0,0,0,0];

//asignar letras a las casillas
for(let i=0;i<100;i++) {
	let casilla=i;
	for(let j=0;j<5;j++) {//comprobar si la casilla correspondiente es una posible palabra
		if(posible==false) {
		if(posicionesTotales[j]===casilla) {
			posible=true;
			if(horizontal[j]==false) {
				palabraAux=palabrasAcertar[j];
				palabraAux2=j;
				//console.log("palabraAux2:"+palabraAux);
				//console.log("j:"+palabraAux2);
			} else {
				palabraAux3=j;
				palabraAux2=j;
				//console.log("palabraAux: "+palabraAux);
			}
			//console.log(palabraAux);
		}
	  }
	}


	if(posible==true) {//palabra encontrada
		if(horizontal[palabraAux2]==false) {//palabra horizontal
			casillasTotales[i].innerText= palabraAux[contador];
			//casillasTotales[i].style.color = "blue";
			//console.log("contador2: "+contador);
			contador++;
			if(contador==palabraAux.length) {
				posible=false;
				contador=0;
			}
		} else {
			posContador[palabraAux3]++;
			//console.log("Posiciones: "+palabrasAcertar[palabraAux].length);
			//console.log("Posiciones: "+posContador +" AND "+posContador[palabraAux]);
			//console.log("Palabra: "+palabrasAcertar[palabraAux]);
			//console.log(posicionesTotales);
			if(typeof(palabraAux3)=="string") {
				for(let j=0;j<5;j++) {
					if(palabrasAcertar[j]==palabraAux3) {
						palabraAux3=j;
					}
				}
			}
			
			if(posContador[palabraAux3]>palabrasAcertar[palabraAux3].length) {
				posible=false;
				
				posicionesTotales[palabraAux3]=null;
				casillasTotales[i].innerText= characters.charAt(Math.floor(Math.random() * characters.length));
			} else {
				posicionesTotales[palabraAux3]+=10;
				//posicionesTotales[palabraAux]=null;
				casillasTotales[i].innerText= palabrasAcertar[palabraAux3].charAt(posContador[palabraAux3]-1);
				casillasTotales[i].style.color = "black";
				
			}
			posible=false;
		}
	} else {
		//casillasTotales[i].innerText= casilla;
		casillasTotales[i].innerText= characters.charAt(Math.floor(Math.random() * characters.length));
	}
}

//drag and drop



var blocks=document.getElementsByClassName("casilla");
var md=false;
let current_word="";
var posicionesDrag=[];
if(window.innerWidth>600) {
for(let i=0;i<100;i++) {
	let elm=blocks[i];
	//ordenador
    elm.onmousedown = function() {
      md = true
      if(md) {
       current_word += this.innerHTML;
       posicionesDrag.push(i);
        this.classList.add('highlight')
        console.log(current_word)
      }    
    }
    elm.onmouseenter = function() {
      if(md) {
        current_word += this.innerHTML;
         posicionesDrag.push(i);
        this.classList.add('highlight')
        // checkCurrentWord()
      }    
    }
    elm.onmouseup = function() { 
      md = false 
      //checkCurrentWord()
      //current_word = '';
      checkCurrentWord(current_word,posicionesDrag);
      console.log(current_word);
      current_word="";
      posicionesDrag=[];
      
	      for(j=0;j<blocks.length;j++) {
	      	blocks[j].className="casilla";
	      }  
	    }
    
    
    //fin bucle i
}
}


var u=0;

function checkCurrentWord(param,p2) {
	let ok=false;
	let q=0;
	console.log("2: "+p2);
	for(let i=0;i<5;i++) {
		if(param==palabrasAcertar[i]) {
			ok=true;
			q=i;
			if(window.innerWidth>600) {
				document.getElementById("q"+q).style.textDecoration="line-through";
			} else {
				document.getElementById("a"+q).style.textDecoration="line-through";
			}
		}
	}

	u=p2;

	if(ok==true) {
		contadorAciertos++;
		console.log("aciertos: "+contadorAciertos);
		for(let i=0;i<p2.length;i++) {
			
			console.log("casilla"+(p2[i]));
			
			//background
			document.getElementById("casilla"+(p2[i]+1)).style.backgroundColor=coloresBg[q];
			document.getElementById("casilla"+(p2[i]+1)).style.color=colores[q];
			document.getElementById("casilla"+(p2[i]+1)).style.borderRadius="4px";
			
			//color
			
			//document.getElementById("casilla"+(posicionesDrag[i]+1)).style.color='rgb('+inv_rgb.join(',')+')';
		}
		//animacion 
			for(let k=0;k<p2.length;k++) {
				document.getElementById("casilla"+(p2[k]+1)).className="acierto";
			}
		//final
		if(contadorAciertos==posibles) {
			 Swal.fire({
				  title: 'Has superado el nivel',
				  icon: "success",
				  confirmButtonText: 'Aceptar',
				}).then((result) => {
				  /* Read more about isConfirmed, isDenied below */
				  if (result.isConfirmed) {
				    //Swal.fire('Saved!', '', 'success'),
				    window.location.href="./game.html";
				  } 
				});
				document.getElementById("number").style.color="#368F8B";
				 contadorAciertos=0;
		}

	} else {
		contadorFallos++;
		if(contadorFallos==maxFallos) {
			  Swal.fire({
				  title: 'Has superado el limite de fallos',
				  icon: "error",
				  confirmButtonText: 'Aceptar',
				}).then((result) => {
				  /* Read more about isConfirmed, isDenied below */
				  if (result.isConfirmed) {
				    //Swal.fire('Saved!', '', 'success'),
				    window.location.href="./game.html";
				  } 
				});
			 contadorFallos=0;
		}
	}
	current_word2="";
	posicionesTouch=[];
}

//new Puzzle
document.getElementById("newPuzzle").addEventListener("click",()=> {
	 window.location.href="./game.html";
});

//new Puzzle2
if(window.innerWidth<600) {
	document.getElementById("newPuzzle2").addEventListener("click",()=> {
		 window.location.href="./game.html";
	});
}



let minX=19;
let maxX=80;
let minY=18;
let maxY=106;
var posicionesTouch=[];
let current_word2="";

if(window.innerWidth<600) {
	for(let i=0;i<100;i++) {
			let elm=blocks[i];
		//movil
	     elm.onclick = function() {
	      console.log("click");
	       md = true
	      if(md) {
	       current_word2 += this.innerHTML;
	       posicionesTouch.push(i);
	        //this.classList.add('highlight')
	        elm.className+=' highlight';
	        console.log(current_word2);
	      }    
	    }
	   //fin del bucle i
	}
	//enviar datos
	document.getElementById("submit").addEventListener("click",()=> {
			checkCurrentWord(current_word2,posicionesTouch);
		});
}

//modificar mensaje click and drag
if(window.innerWidth<600) {
	document.getElementById("clickAdrag").innerText="Click the letters to form words below";
} else {
	document.getElementById("clickAdrag").innerText="Click & Drag the letters to form words below";
}
