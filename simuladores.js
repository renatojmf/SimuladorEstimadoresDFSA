var etiquetas_iniciais;
var slots_iniciais;
var algoritmo; //1-Lower Bound, 2-Eom-Lee
var etiquetas_incremento;
var etiquetas_maxima;
var etiquetas_repeticao;
var num_Slots = [];
var etiquetas;
var slots;
//var quadro;

//JSON dos dados calculados
var dadosJSON = {"etiquetas":[], "total":{"slots": [], "sucesso": [],"colisao": [], "vazio": [], "eficiencia": []},
                 "medias":{"slots": [], "sucesso": [],"colisao": [], "vazio": []}, 
                "dados":{"ordenamento":[],"etiquetas":[],"slots": [], "sucesso": [], "colisao": [], "vazio": []}};

var dadosTotaisJSON = [];
var media = {"etiquetas":[],"slots":[],"sucesso":[],"colisao":[],"vazio":[], "tempo":[], "eficiencia":[]};

function getInput(){
   etiquetas_iniciais = parseFloat(document.getElementById('etiquetas').value);
   slots_iniciais = parseFloat(document.getElementById('slots').value);
   algoritmo = document.querySelector('input[name="protocoloOp"]:checked').value;
   etiquetas_incremento = parseFloat(document.getElementById('etiquetas-incremento').value);
   etiquetas_maxima = parseFloat(document.getElementById('etiquetas-maxima').value);
   etiquetas_repeticao = parseFloat(document.getElementById('etiquetas-repeticao').value);
   //calculations();
   calcular();
}

function lowerBound(colisoes){
    let novoSlot = 2 * colisoes;
    return novoSlot;
}

function schoute(colisoes){
    let novoSlot = 2.39 * colisoes;
    return novoSlot;
}

function eomLee(colisoes){
    return colisoes;
}

function dfsa(){

    let totais = {"slots":0,"sucesso":0,"colisao":0,"vazio":0, "tempo":0};
    let etiquetasTemp = etiquetas;
    let slotsTemp = slots;
    //variavel para pegar tempo de começo do loop
    let tempo_comeco = performance.now();

    while(etiquetasTemp > 0){
        let quadro = new Array(slotsTemp);
        
        //inicializando array
        for(let i = 0; i < quadro.length; i++){
            quadro[i] = 0;
        }

        //randomizador pra determinar etiquetas e slots
        for(let i = 0; i < etiquetasTemp; i++){
            random = Math.floor(Math.random() * (slotsTemp + 1)); 
            let temp = random % slotsTemp;
            quadro[temp]+= 1;
        }

        let sucesso = 0;
        let colisao = 0;
        let vazio = 0;

        //checar a quantidade de slots vazios, sucesso e em colisão que ocorreram
        for(let i = 0; i < slotsTemp; i++){
            if(quadro[i] == 0){
                vazio++;
            } else if(quadro[i] == 1){
                sucesso++;
            } else if(quadro[i] > 1){
                colisao++;
            }
        }
        
        totais['slots'] += slotsTemp;
        totais['sucesso'] += sucesso;
        totais['colisao'] += colisao;
        totais['vazio'] += vazio;

        etiquetasTemp -= sucesso;
        
        if(algoritmo==1){
            slotsTemp = lowerBound(colisao);

        }else{
            slotsTemp = eomLee(colisao);
        }
    }
    //variavel para pegar o tempo total de execução do estimador
    let tempo_fim = performance.now() - tempo_comeco;

    totais['tempo'] = tempo_fim;

    return totais;
}

function calcular(){
    etiquetas = etiquetas_iniciais;
    slots = slots_iniciais;

    let indice=0;
    while(etiquetas<=etiquetas_maxima){

        media['etiquetas'][indice]=etiquetas;
        
        media['slots'][indice]=0;
        media['colisao'][indice]=0;
        media['vazio'][indice]=0;
        media['sucesso'][indice]=0;
        media['tempo'][indice]=0;
        media['eficiencia'][indice]=0;

        let i;
        for(i=0;i<etiquetas_repeticao;i++){
            let dados = dfsa();
            media['slots'][indice]+=dados['slots'];
            media['colisao'][indice]+=dados['colisao'];
            media['vazio'][indice]+=dados['vazio'];
            media['sucesso'][indice]+=dados['sucesso'];
            media['tempo'][indice]+=dados['tempo'];
            
        }
        media['slots'][indice] /= etiquetas_repeticao;
        media['colisao'][indice] /= etiquetas_repeticao;
        media['vazio'][indice] /= etiquetas_repeticao;
        media['sucesso'][indice] /= etiquetas_repeticao;
        media['tempo'][indice] /= etiquetas_repeticao;
        media['eficiencia'][indice] = media['sucesso'][indice]/media['slots'][indice];

        etiquetas = etiquetas_iniciais + (etiquetas_incremento*indice);
        slots = slots_iniciais;
        indice++;
    }
    rodarGrafico();
}

function calculations(){
    etiquetas = etiquetas_iniciais;
    slots = slots_iniciais;
    quadro = new Array(slots);

    let indice = 0;

    while(etiquetas<=etiquetas_maxima){

        let num_ordem = 0;
        let totais = {"slots":0,"sucesso":0,"colisao":0,"vazio":0};

        //Inicialização de arrays do JSON 
        dadosJSON['dados']['ordenamento'][indice]=[];
        dadosJSON['dados']['etiquetas'][indice]=[];
        dadosJSON['dados']['slots'][indice]=[];
        dadosJSON['dados']['sucesso'][indice]=[];
        dadosJSON['dados']['colisao'][indice]=[];
        dadosJSON['dados']['vazio'][indice]=[];

        dadosJSON['etiquetas'][indice] = etiquetas;
        while(etiquetas > 0){
            num_ordem++;
            quadro = new Array(slots);

            //inicializando array
            for(let i = 0; i < quadro.length; i++){
                quadro[i] = 0;
            }

            //randomizador pra determinar etiquetas e slots
            for(let i = 0; i < etiquetas; i++){
                random = Math.floor(Math.random() * (slots + 1)); 
                let temp = random % slots;
                quadro[temp]+= 1;
            }

            let sucesso = 0;
            let colisao = 0;
            let vazio = 0;

            //checar a quantidade de slots vazios, sucesso e em colisão que ocorreram
            for(let i = 0; i < slots; i++){
                if(quadro[i] == 0){
                    vazio++;
                } else if(quadro[i] == 1){
                    sucesso++;
                } else if(quadro[i] > 1){
                    colisao++;
                }
            }
            

            dadosJSON['dados']['ordenamento'][indice].push(num_ordem);
            dadosJSON['dados']['etiquetas'][indice].push(etiquetas);
            dadosJSON['dados']['slots'][indice].push(slots);
            dadosJSON['dados']['sucesso'][indice].push(sucesso);
            dadosJSON['dados']['colisao'][indice].push(colisao);
            dadosJSON['dados']['vazio'][indice].push(vazio);

            totais['slots'] += slots;
            totais['sucesso'] += sucesso;
            totais['colisao'] += colisao;
            totais['vazio'] += vazio;
                        
            etiquetas = etiquetas - sucesso;
            
            if(algoritmo==1){
                slots = lowerBound(colisao);

            }else{
                slots = eomLee(colisao);
            }
        }

        dadosJSON['total']['slots'][indice]=totais['slots'];
        dadosJSON['total']['sucesso'][indice]=totais['sucesso'];
        dadosJSON['total']['colisao'][indice]=totais['colisao'];
        dadosJSON['total']['vazio'][indice]=totais['vazio'];
        dadosJSON['total']['eficiencia'][indice]=totais['sucesso']/totais['slots'];

        dadosJSON['medias']['slots'][indice]=(totais['slots']/num_ordem);
        dadosJSON['medias']['sucesso'][indice]=(totais['sucesso']/num_ordem);
        dadosJSON['medias']['colisao'][indice]=(totais['colisao']/num_ordem);
        dadosJSON['medias']['vazio'][indice]=(totais['vazio']/num_ordem);

        indice++;
        etiquetas = etiquetas_iniciais + (etiquetas_incremento*indice);
        slots = slots_iniciais;
    }

    /*for(let i = 0; i < num_Slots.length ; i++){
        console.log(num_Slots[i]);
    }*/
    //getChart();
    rodarGrafico();
    //document.getElementById('result').innerHTML = slots;
}