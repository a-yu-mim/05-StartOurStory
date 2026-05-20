
function esconderLoading() {
    let loadingEl = document.getElementById('loading');
    
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

let menuAberto = false;
let menuItens = document.getElementById('menuItens');

function abreFechaMenu() {
    if (menuAberto) {
        menuItens.style.display = 'none';
        menuAberto = false;
        document.getElementById('menu').style.borderColor = '#ffffff #5a5a5a #5a5a5a #ffffff';
    } else {
        menuItens.style.display = 'block';
        menuAberto = true;
        document.getElementById('menu').style.borderColor = '#5a5a5a #ffffff #ffffff #5a5a5a';
    }
}

esconderLoading();