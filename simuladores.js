var etiquetas_iniciais;
var slots_iniciais;
//var algoritmo; //1-Lower Bound, 2-Eom-Lee
var etiquetas_incremento;
var etiquetas_maxima;
var etiquetas_repeticao;
var algoritmo_lowerBound=false;
var algoritmo_eomlee=false;
var algoritmo_ilcm=false;
var algoritmo_vahedi=false;
var num_Slots = [];
var etiquetas;
var slots;

//JSON dos dados calculados
var media = {"lowerbound":[],"eomlee":[],"ilcm":[],"vahedi":[]};

function definirEstimadores(alg){

    for(let i=0;i<alg.length;i++){
        if(alg[i].value == "1"){
            algoritmo_lowerBound = alg[i].checked;
        }else if(alg[i].value == "2"){
            algoritmo_eomlee = alg[i].checked;
        }else if(alg[i].value == "3"){
            algoritmo_ilcm = alg[i].checked;
        }else if(alg[i].value == "4"){
            algoritmo_vahedi = alg[i].checked;
        }
    }

}

function getInput(){
   etiquetas_iniciais = parseFloat(document.getElementById('etiquetas').value);
   slots_iniciais = parseFloat(document.getElementById('slots').value);
  // algoritmo = document.querySelector('input[name="protocoloOp"]:checked').value;
   etiquetas_incremento = parseFloat(document.getElementById('etiquetas-incremento').value);
   etiquetas_maxima = parseFloat(document.getElementById('etiquetas-maxima').value);
   etiquetas_repeticao = parseFloat(document.getElementById('etiquetas-repeticao').value);
   let algoritmo = document.getElementsByName('protocoloOp');
   definirEstimadores(algoritmo);
    calc();
}

function lowerBound(colisoes){
    let tempo_comeco = performance.now();
    let novoSlot = 2 * colisoes;
    let tempo_fim = performance.now() - tempo_comeco;
    return [novoSlot,tempo_fim];
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
    let tempo_comeco = performance.now();
    do{
        Yk=YkProx;
        Bk = NumSlots/((Yk*NumColisoes)+NumSucessos);
        frac = Math.exp(-(1.0/Bk));
        Numerador = 1 - frac;
        Denominador = (Bk * (1.0 - (1.0 + (1.0/Bk))* frac));
        YkProx = Numerador/Denominador;
    } while(Math.abs(Yk-YkProx) >= 0.001);
    let resultado = NumColisoes * YkProx;
    let tempo_fim = performance.now() - tempo_comeco;
    return [Math.ceil(resultado),tempo_fim];
}

function ilmc(){
    return 1000; //provisório
}

function vahedi(){
    return 1000; //provisório
}

function dfsa(alg){

    let totais = {"slots":0,"sucesso":0,"colisao":0,"vazio":0, "tempoEst":0};
    let etiquetasTemp = etiquetas;
    let slotsTemp = slots;

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
        
        if(alg=="lowerbound"){
            let temp = lowerBound(colisao);
            slotsTemp = temp[0];
            totais['tempoEst'] = temp[1];

        }else if(alg=="eomlee"){
            let temp = eomLee(colisao,sucesso,slotsTemp);
            slotsTemp = temp[0];
            totais['tempoEst'] = temp[1]; 

        }else if(alg=="ilcm"){
            slotsTemp = ilmc();

        }else if(alg=="vahedi"){
            slotsTemp = vahedi();

        }
    }
    
    return totais;
}

function calc(){

    if(algoritmo_lowerBound){
        calcular("lowerbound");
    }
    if(algoritmo_eomlee){
        calcular("eomlee");
    }
    if(algoritmo_ilcm){
        calcular("ilcm");
    }
    if(algoritmo_vahedi){
        calcular("vahedi");
    }
    document.getElementById("container-chart-id").style.visibility = "visible";
    rodarGrafico();
}

function calcular(alg){
    etiquetas = etiquetas_iniciais;
    slots = slots_iniciais;

    media[alg] = {"etiquetas":[],"slots":[],"sucesso":[],"colisao":[],"vazio":[], "tempoEst":[], "tempoSim":[], "eficiencia":[]};

    let indice=0;
    while(etiquetas<=etiquetas_maxima){

        media[alg]['etiquetas'][indice]=etiquetas;
        
        media[alg]['slots'][indice]=0;
        media[alg]['colisao'][indice]=0;
        media[alg]['vazio'][indice]=0;
        media[alg]['sucesso'][indice]=0;
        media[alg]['tempoEst'][indice]=0;
        media[alg]['eficiencia'][indice]=0;
        media[alg]['tempoSim'][indice]=0;

        let i;
        for(i=0;i<etiquetas_repeticao;i++){
            let tempo_comeco = performance.now();
            let dados = dfsa(alg);
            let tempo_fim = performance.now() - tempo_comeco;
            media[alg]['slots'][indice]+=dados['slots'];
            media[alg]['colisao'][indice]+=dados['colisao'];
            media[alg]['vazio'][indice]+=dados['vazio'];
            media[alg]['sucesso'][indice]+=dados['sucesso'];
            media[alg]['tempoEst'][indice]+=dados['tempoEst'];
            media[alg]['tempoSim'][indice]+=tempo_fim;
            
        }
        media[alg]['slots'][indice] /= etiquetas_repeticao;
        media[alg]['colisao'][indice] /= etiquetas_repeticao;
        media[alg]['vazio'][indice] /= etiquetas_repeticao;
        media[alg]['sucesso'][indice] /= etiquetas_repeticao;
        media[alg]['tempoEst'][indice] /= etiquetas_repeticao;
        media[alg]['eficiencia'][indice] = media[alg]['sucesso'][indice]/media[alg]['slots'][indice];
        media[alg]['eficiencia'][indice] *=100;
        
        slots = slots_iniciais;
        indice++;
        etiquetas = etiquetas_iniciais + (etiquetas_incremento*indice);

    }

    //Adição de 0 e 100 na eficiência para corrigir o gráfico
    media[alg]['eficiencia'].push(0,100);

}