const RecipeApp=(()=>{
'use strict';

const recipes=[
{id:1,title:'Pasta',ingredients:['noodles','tomato'],description:'Tasty pasta'},
{id:2,title:'Salad',ingredients:['lettuce','tomato'],description:'Fresh salad'}
];

let searchQuery='';
let favorites=JSON.parse(localStorage.getItem('recipeFavorites'))||[];
let debounceTimer;

const container=document.getElementById('recipes');
const searchInput=document.getElementById('search-input');
const clearBtn=document.getElementById('clear-search');
const counter=document.getElementById('counter');

const saveFavorites=()=>localStorage.setItem('recipeFavorites',JSON.stringify(favorites));

const toggleFavorite=id=>{
favorites=favorites.includes(id)?favorites.filter(f=>f!==id):[...favorites,id];
saveFavorites();
updateDisplay();
};

const createCard=r=>{
const div=document.createElement('div');
div.className='recipe-card';
div.innerHTML=`<h3>${r.title}</h3>
<p>${r.description}</p>
<span class="favorite-btn ${favorites.includes(r.id)?'active':''}" data-id="${r.id}">♥</span>`;
return div;
};

const render=items=>{
container.innerHTML='';
items.forEach(r=>container.appendChild(createCard(r)));
counter.textContent=`Showing ${items.length} of ${recipes.length}`;
};

const applySearch=list=>{
const q=searchQuery.toLowerCase();
return list.filter(r=>
r.title.toLowerCase().includes(q)||
r.ingredients.some(i=>i.includes(q))||
r.description.toLowerCase().includes(q)
);
};

const updateDisplay=()=>{
let result=applySearch(recipes);
render(result);
};

searchInput.addEventListener('input',e=>{
clearTimeout(debounceTimer);
debounceTimer=setTimeout(()=>{
searchQuery=e.target.value;
clearBtn.style.display=searchQuery?'inline':'none';
updateDisplay();
},300);
});

clearBtn.addEventListener('click',()=>{
searchQuery='';
searchInput.value='';
clearBtn.style.display='none';
updateDisplay();
});

container.addEventListener('click',e=>{
if(e.target.classList.contains('favorite-btn')){
toggleFavorite(Number(e.target.dataset.id));
}
});

const init=()=>updateDisplay();

return{init};
})();

RecipeApp.init();
