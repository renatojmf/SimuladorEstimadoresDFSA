

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
            labels: media['etiquetas'],
            datasets: [{
                label: 'Slots totais',
                borderColor: 'rgb(0,0,0)',
                fill: false,
                data: media['slots']
            }]
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
            labels: media['etiquetas'],
            datasets: [{
                label: 'Slots vazios totais',
                borderColor: 'rgb(255,0,0)',
                fill: false,
                data: media['vazio']
            }]
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
            labels: media['etiquetas'],
            datasets: [{
                label: 'Colisões totais',
                borderColor: 'rgb(0,255,0)',
                fill: false,
                data: media['colisao']
            }]
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
            labels: media['etiquetas'],
            datasets: [{
                label: 'Eficiência',
                borderColor: 'rgb(0,0,255)',
                fill: false,
                data: media['eficiencia'].concat([0,100])
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    var grafico_slots_tempo_estimador = new Chart(ctxEstimador, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: media['etiquetas'],
            datasets: [{
                label: 'Tempo médio de execução do estimador',
                borderColor: 'rgb(0,255,255)',
                fill: false,
                data: media['tempo']
            }]
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
            labels: media['etiquetas'],
            datasets: [{
                label: 'Tempo médio de execução do simulador',
                borderColor: 'rgb(0,255,255)',
                fill: false,
                data: media['tempo']
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
}
