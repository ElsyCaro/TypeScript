"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onNavigate = void 0;
const firebase_auth_js_1 = require("https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js");
const auth = (0, firebase_auth_js_1.getAuth)();
const root = document.getElementById('root');
//SPA
var Rutas;
(function (Rutas) {
    Rutas["Welcome"] = "/";
    Rutas["Login"] = "/login";
    Rutas["Register"] = "/register";
    Rutas["Wall"] = "/wall";
})(Rutas || (Rutas = {}));
// const routes = {
//   '/': Welcome,
//   '/login': Login,
//   '/register': Register,
//   '/wall': Wall,
// };
const onNavigate = (pathname) => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    root.removeChild(root.firstChild);
    //root.appendChild(routes[pathname]()); //ejecuta la funcion
    const indexOfPath = Object.values(Rutas).indexOf(pathname);
    const key = Object.keys(Rutas)[indexOfPath];
    root.appendChild(key); //ejecuta la funcion
};
exports.onNavigate = onNavigate;
const component = routes[window.location.pathname];
window.onpopstate = () => {
    root.removeChild(root.firstChild);
    root.append(component());
};
(0, firebase_auth_js_1.onAuthStateChanged)(auth, (user) => {
    if (user) {
        (0, exports.onNavigate)('/wall');
    }
    else {
        (0, exports.onNavigate)('/');
    }
});
root.appendChild(component());
