const button = document.querySelector("#btn");
const title = document.querySelector("h3");
const p = document.querySelector("p");
const divider = document.querySelector("picture img");

const URL = "https://api.adviceslip.com/advice";

const fakeDelay = (delay) => new Promise((res,rej) => setTimeout(res,delay));

const loader = (loading) => {
  title.classList.toggle("loading",loading);
  p.classList.toggle("loading",loading);
  divider.classList.toggle("loading",loading);
  button.classList.toggle("loader",loading);
  // button.disabled = loading;
} 

const dataReciever = (error,advice,id) => {
  if(!error){
    title.innerText = `ADVICE #${id}`;
    p.innerText = `${advice}`;
  }
  else {
    title.innerText = "ERROR!";
    p.innerText = `${error}`;
  }
}


const getAdvice = async () => {
  let loading = true;
  loader(loading);
  try {
    let data = await fetch(URL,{
      method:"GET"
    })
    data = await data.json();
    await fakeDelay(3000);
    loading = false;
    loader(loading);
    const {error,advice,id} = data.slip;
    button.disabled = false;
    dataReciever(error,advice,id);
  }
  catch(er){
    const error = "PLEASE ENTER A VALID URL";
    dataReciever(error)
  }
  
}


window.addEventListener("load", e => getAdvice())


button.addEventListener("click", e => {
  button.disabled = true;  
  getAdvice();
})

