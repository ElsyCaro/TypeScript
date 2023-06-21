import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';
import { Welcome } from './components/Welcome.js';
import { Login } from './components/Login.js';
import { Register } from './components/Register.js';
import { Wall } from './components/Wall.js';

type miHtml = HTMLElement| null;
const auth = getAuth();

const root: miHtml= document.getElementById('root');

//SPA
enum Rutas {
    Welcome ='/',
    Login = '/login',
    Register = '/register',
     Wall = '/wall',
}

// const routes = {
//   '/': Welcome,
//   '/login': Login,
//   '/register': Register,
//   '/wall': Wall,
// };

export const onNavigate = (pathname:string) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname, //window pantalla principal// location de obtiene donde esta lo original a la nueva  
    // patheme a la nueva ruta parametro
  );
  root.removeChild(root.firstChild);

  //root.appendChild(routes[pathname]()); //ejecuta la funcion
  const indexOfPath = Object.values(Rutas).indexOf(pathname as string as Rutas); 
  const key = Object.keys(Rutas)[indexOfPath]
  root.appendChild(key); //ejecuta la funcion
};

const component = routes[window.location.pathname];

window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component());
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/wall');
  } else {
    onNavigate('/');
  }
});

root.appendChild(component());

