var dicaList = [];
var count = 1;

function btnInclude(materialInput,dicaInput){
    var materialInput = document.getElementById('materialInput');
    var dicaInput = document.getElementById('dicaInput');
    include(materialInput.value, dicaInput.value);
    dicaInput.value = '';
};

function btnFiltro(filtroInput){
    var filtroInput = document.getElementById('filtroInput');
    if(filtroInput.value!==""){
        var fi = filtroInput.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if(fi == 'plastico' || fi == 'metal' || fi == 'vidro' || fi == 'papel' || fi == 'organico'){      
            filtrar(fi);
        }else{
            alert("Material não encontrado!")
        }
    }else{
        alert("Informe um material a ser pesquisado!")
    }
};

function include(material,dica){
    var newDica = { id: count++, material: material, dica: dica };
    dicaList.push(newDica);
    localStorage.setItem('dicaList', JSON.stringify(dicaList));
    renderDicaList();
}

function filtrar(filtro){
    var storedList2 = [];
    var storedList = JSON.parse(localStorage.getItem('dicaList'))
    storedList.forEach(material =>{
        if(material.material == filtro){
            storedList2.push(material);
        }
    })
    var dicaListElement = document.getElementById('dicaList');
    dicaListElement.innerHTML = "";

    storedList2.forEach(function (dicas) {
        var listItem = document.createElement('li');        
            listItem.classList.add(dicas.material);
            listItem.innerHTML = '<div class="flex"><div class="linha">Dica: ' + dicas.dica + '</div> <div> <button class="delete_button '+ dicas.material +'" onclick="deleteDica(' + dicas.id + ')">Excluir</button></div></div>';
        dicaListElement.appendChild(listItem);
    });
}

function getDicaList() {
    var storedList = JSON.parse(localStorage.getItem('dicaList'));
    dicaList = storedList || [];
}


function renderDicaList() {
    var dicaListElement = document.getElementById('dicaList');
    dicaListElement.innerHTML = "";

    dicaList.forEach(function (dicas) {
        var listItem = document.createElement('li');        
            listItem.classList.add(dicas.material);
            listItem.innerHTML = '<div class="flex"><div class="linha">Dica: ' + dicas.dica + '</div> <div> <button class="delete_button '+ dicas.material +'" onclick="deleteDica(' + dicas.id + ')">Excluir</button></div></div>';
        dicaListElement.appendChild(listItem);
    });
    
}


function deleteDica(dicasId) {
    var updatedDicaList = dicaList.filter(function (dicas) {
        return dicas.id !== dicasId;
    });

    if (updatedDicaList.length < dicaList.length) {
        dicaList = updatedDicaList;
        localStorage.setItem('dicaList', JSON.stringify(dicaList));
        renderDicaList();
    } else {
        alert('Dica não encontrado.');
    }
}

getDicaList();

renderDicaList();




