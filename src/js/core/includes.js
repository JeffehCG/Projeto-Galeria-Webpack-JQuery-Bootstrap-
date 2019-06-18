import $ from 'jquery' //importando o jquery

const loadHtmlSuccessCallbacks = [] //Array que contera funções, que seram chamadas apos a requisição ajax for concluida com exito

export function onLoadHtmlSuccess(callback){ //exportando a função para ser usada em includes.js
    if(!loadHtmlSuccessCallbacks.includes(callback)) { //Se a callback que esta sendo passada não estiver incluida no array, entrar no if
        loadHtmlSuccessCallbacks.push(callback) //adicionando a callback no array
    }
}

function loadIncludes(parent) { //lendo todos atributos wm-include
    if(!parent) parent = 'body' //se parent não estiver definido, sera o body
    $(parent).find('[wm-include]').each(function(i, e){ //procurando todos elementos com wm-include, e percorendo cada um
        const url = $(e).attr('wm-include') //pegando a url do atributo wm-include
        $.ajax({ //chamada ajax
           url,
           success(data){ //função chamada após a requisição for bem sucedida
               $(e).html(data) //pega o elemento atual, e coloca o html da url dentro
               $(e).removeAttr('wm-include') //remove o elemento wm-include para não ocorrem mais nenhuma interpretação da mesma

               loadHtmlSuccessCallbacks.forEach(callback => callback(data)) //Executando as funções contidas no array
               loadIncludes(e)//chamando ne novo, pois é uma função recurciva (se dentra da url buscada tiver outro wm-include)
           }
        })
    })
}

loadIncludes() //chamando a função