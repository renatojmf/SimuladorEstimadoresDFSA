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
            datasets: [{
                label: 'Lower Bound',
                borderColor: 'rgb(0,0,0)',
                fill: false,
                data: media['lowerbound']['slots']
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
            labels: media['lowerbound']['etiquetas'],
            datasets: [{
                label: 'Lower Bound',
                borderColor: 'rgb(255,0,0)',
                fill: false,
                data: media['lowerbound']['vazio']
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
            labels: media['lowerbound']['etiquetas'],
            datasets: [{
                label: 'Lower Bound',
                borderColor: 'rgb(0,255,0)',
                fill: false,
                data: media['lowerbound']['colisao']
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
            labels: media['lowerbound']['etiquetas'],
            datasets: [{
                label: 'Lower Bound',
                borderColor: 'rgb(0,0,255)',
                fill: false,
                data: media['lowerbound']['eficiencia'].concat([0,100])
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
            labels: media['lowerbound']['etiquetas'],
            datasets: [{
                label: 'Lower Bound',
                borderColor: 'rgb(0,255,255)',
                fill: false,
                data: media['lowerbound']['tempo']
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
            labels: media['lowerbound']['etiquetas'],
            datasets: [{
                label: 'Lower Bound',
                borderColor: 'rgb(0,255,255)',
                fill: false,
                data: media['lowerbound']['tempo']
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
}
