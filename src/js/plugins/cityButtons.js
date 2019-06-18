import $ from 'jquery' //importando jquery
import {onLoadHtmlSuccess} from '../core/includes' //importando a função 

const duration = 600 //duração das animações

//Função para filtrar as imagens
function filterByCity(city){
    $('[wm-city]').each(function(i,e){ //percorendo todos elementos com a propriedade wm-city
        const isTarget = $(this).attr('wm-city') === city //se o valor da propriedade wm-city for o mesmo passado pelo parametro city, setar true na variavel
            || city === null // ou então se o parametros estiver nullo setar true
        if(isTarget) { //se for true
            $(this).parent().removeClass('d-none') //remove a classe d-none (responsavel por desabilitar o item na pagina)
            $(this).fadeIn(duration) //Exibe o elemento
        }else{ //Se for false
            $(this).fadeOut(duration, ()=>{ //Esconde o elemento
                $(this).parent().addClass('d-none')
            }) 
        }
    })
}

//Criando plugin
$.fn.cityButtons = function() {
    const cities = new Set //pegar as cidades sem repetir
    $('[wm-city]').each(function(i,e){
        cities.add($(e).attr('wm-city')) //adicionando o valor de wm-city (Lembrando que a cities é um Set, ou seja, não havera repetições)
    })

    const btns = Array.from(cities).map(city => { //Convertendo cities em array
        const btn = $('<button>') //Criando botões com as cidades selecionadas
            .addClass(['btn', 'btn-info']).html(city)
        btn.click(e => filterByCity(city)) //quando clicar nesse botão chamara a função para filtrar
        return btn
    })

    const btnAll = $('<button>') //Criando botão que selecionara todas as cidades precentes
        .addClass(['btn', 'btn-info', 'active']).html('Todas') //Esse botão ja vira ativado
    btnAll.click(e => filterByCity(null))//Quando clicar nesse botão chamara função de filtrar

    btns.push(btnAll) //Adicionando o botão que seleciona todas as cidades no array de botões

    const btnGroup = $('<div>').addClass(['btn-group'])//Criando grupo de botões
    btnGroup.append(btns) //Adicionando o array de botões ao grupo de botões

    $(this).html(btnGroup) //colocando os botões no html
    return this
}

//Executando o plugin (chamando a função, para ser executada após a requisição ajax)
onLoadHtmlSuccess(function(){
    $('[wm-city-buttons]').cityButtons() //pega esse elemento no html e executa a função
})

