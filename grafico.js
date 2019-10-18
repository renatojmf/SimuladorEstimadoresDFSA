function gerarDataObject(param){

    let ds = [];

    if(algoritmo_lowerBound){
        ds.push({
            label: 'Lower Bound',
            borderColor: 'rgb(0,0,0)',
            fill: false,
            data: media['lowerbound'][param]
        });
    }
    if(algoritmo_eomlee){
        ds.push({
            label: 'Eom Lee',
            borderColor: 'rgb(0,0,255)',
            fill: false,
            data: media['eomlee'][param]
        });
    }
    if(algoritmo_ilcm){
        ds.push({
            label: 'ILCM',
            borderColor: 'rgb(0,255,0)',
            fill: false,
            data: media['ilcm'][param]
        });
    }
    if(algoritmo_vahedi){
        ds.push({
            label: 'Vahedi',
            borderColor: 'rgb(255,0,0)',
            fill: false,
            data: media['vahedi'][param]
        });
    }

    return ds;
}

function rodarGrafico(){
    var ctxTotais = document.getElementById('graficoSlotsTotais').getContext('2d');
    var ctxVazios = document.getElementById('graficoSlotsVazios').getContext('2d');
    var ctxColisoes = document.getElementById('graficoSlotsColisoes').getContext('2d');
    var ctxEficiencia = document.getElementById('graficoSlotsEficiencia').getContext('2d');
    var ctxEstimador = document.getElementById('graficoSlotsEstimador').getContext('2d');
    var ctxSimulador = document.getElementById('graficoSlotsSimulador').getContext('2d');

    var grafico_slots_totais = new Chart(ctxTotais, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['lowerbound']['etiquetas'],
            datasets: gerarDataObject("slots")
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var grafico_slots_vazios = new Chart(ctxVazios, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['lowerbound']['etiquetas'],
            datasets: gerarDataObject("vazio")
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var grafico_slots_colisoes = new Chart(ctxColisoes, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['lowerbound']['etiquetas'],
            datasets: gerarDataObject("colisao")
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var grafico_slots_eficiencia = new Chart(ctxEficiencia, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['lowerbound']['etiquetas'],
            datasets: gerarDataObject("eficiencia")
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            min: 0,
            max: 100
        }
    });

    var grafico_slots_tempo_estimador = new Chart(ctxEstimador, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['lowerbound']['etiquetas'],
            datasets: gerarDataObject("tempoEst")
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var grafico_slots_tempo_Simulador = new Chart(ctxSimulador, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['lowerbound']['etiquetas'],
            datasets: gerarDataObject("tempoSim")
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
}
