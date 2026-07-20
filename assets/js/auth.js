const AUTH_KEY='pacificaAuthV1',DEFAULT_USER='admin',DEFAULT_PASSWORD='Pacifica2026';
const quickHash=value=>{let h1=0x811c9dc5,h2=0x01000193;for(const c of value){h1=Math.imul(h1^c.charCodeAt(0),16777619);h2=Math.imul(h2+c.charCodeAt(0),2246822519)}return (h1>>>0).toString(16).padStart(8,'0')+(h2>>>0).toString(16).padStart(8,'0')};
const authConfig=()=>JSON.parse(localStorage.getItem(AUTH_KEY)||'null')||{user:DEFAULT_USER,password:quickHash(DEFAULT_PASSWORD)};
const saveAuth=config=>localStorage.setItem(AUTH_KEY,JSON.stringify(config));
const authToast=message=>{const t=document.querySelector('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)};
function openLogin(){document.querySelector('#loginOverlay').classList.add('open');document.querySelector('#loginError').textContent='';setTimeout(()=>document.querySelector('#loginUser').focus(),100)}
function closeLogin(){document.querySelector('#loginOverlay').classList.remove('open')}
function openDataCenter(){document.querySelector('#dataCenter').classList.add('open');document.body.style.overflow='hidden'}
function requestDataCenter(){sessionStorage.getItem('pacificaAuthenticated')==='1'?openDataCenter():openLogin()}
document.querySelector('#loginForm').addEventListener('submit',e=>{e.preventDefault();const config=authConfig(),user=e.target.user.value.trim(),pass=e.target.password.value;if(user===config.user&&quickHash(pass)===config.password){sessionStorage.setItem('pacificaAuthenticated','1');e.target.reset();closeLogin();openDataCenter()}else document.querySelector('#loginError').textContent='Usuario o contraseña incorrectos.'});
document.querySelector('#toggleLoginPassword').addEventListener('click',()=>{const i=document.querySelector('#loginPassword');i.type=i.type==='password'?'text':'password'});
document.querySelector('#cancelLogin').addEventListener('click',closeLogin);
document.querySelector('#logoutData').addEventListener('click',()=>{sessionStorage.removeItem('pacificaAuthenticated');document.querySelector('#dataCenter').classList.remove('open');document.body.style.overflow='';authToast('Sesión de carga cerrada')});
document.querySelector('#showChangePassword').addEventListener('click',()=>document.querySelector('#passwordOverlay').classList.add('open'));
document.querySelector('#cancelPassword').addEventListener('click',()=>document.querySelector('#passwordOverlay').classList.remove('open'));
document.querySelector('#changePasswordForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target,c=authConfig(),current=f.current.value,next=f.next.value,confirm=f.confirm.value,error=document.querySelector('#passwordError');if(quickHash(current)!==c.password){error.textContent='La contraseña actual no coincide.';return}if(next.length<8){error.textContent='La nueva contraseña debe tener al menos 8 caracteres.';return}if(next!==confirm){error.textContent='La confirmación no coincide.';return}c.password=quickHash(next);saveAuth(c);f.reset();error.textContent='';document.querySelector('#passwordOverlay').classList.remove('open');authToast('Contraseña actualizada correctamente')});
document.querySelectorAll('a[href="#alimentar"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();requestDataCenter()}));
