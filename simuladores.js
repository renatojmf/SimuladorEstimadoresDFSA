var etiquetas_iniciais;
var slots_iniciais;
var algoritmo; //1-Lower Bound, 2-Eom-Lee
var etiquetas_incremento;
var etiquetas_maxima;
var etiquetas_repeticao;
var num_Slots = [];
var etiquetas;
var slots;

//JSON dos dados calculados
var media = {"etiquetas":[],"slots":[],"sucesso":[],"colisao":[],"vazio":[], "tempo":[], "eficiencia":[]};

function getInput(){
   etiquetas_iniciais = parseFloat(document.getElementById('etiquetas').value);
   slots_iniciais = parseFloat(document.getElementById('slots').value);
   algoritmo = document.querySelector('input[name="protocoloOp"]:checked').value;
   etiquetas_incremento = parseFloat(document.getElementById('etiquetas-incremento').value);
   etiquetas_maxima = parseFloat(document.getElementById('etiquetas-maxima').value);
   etiquetas_repeticao = parseFloat(document.getElementById('etiquetas-repeticao').value);
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

function eomLee(NumColisoes,NumSucessos,NumSlots){
    let YkProx = 2.0;
    let Bk;
    let Numerador;
    let Denominador;
    let frac;
    let Yk;
    do{
        Yk=YkProx;
        Bk = NumSlots/((Yk*NumColisoes)+NumSucessos);
        frac = Math.exp(-(1.0/Bk));
        Numerador = 1 - frac;
        Denominador = (Bk * (1.0 - (1.0 + (1.0/Bk))* frac));
        YkProx = Numerador/Denominador;
    } while(Math.abs(Yk-YkProx) >= 0.001);

    let resultado = NumColisoes * YkProx;
    return Math.ceil(resultado);
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
            slotsTemp = eomLee(colisao,sucesso,slotsTemp);
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
        media['eficiencia'][indice] *=100;
        
        slots = slots_iniciais;
        indice++;
        etiquetas = etiquetas_iniciais + (etiquetas_incremento*indice);

    }
    rodarGrafico();
}