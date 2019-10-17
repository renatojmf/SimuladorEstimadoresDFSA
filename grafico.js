

function rodarGrafico(){
    var ctx = document.getElementById('lineColision').getContext('2d');

    var chart = new Chart(ctx, {
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
            },{
                label: 'Slots vazios totais',
                borderColor: 'rgb(255,0,0)',
                fill: false,
                data: media['vazio']
            },{
                label: 'Colisões totais',
                borderColor: 'rgb(0,255,0)',
                fill: false,
                data: media['colisao']
            },{
                label: 'Eficiência',
                borderColor: 'rgb(0,0,255)',
                fill: false,
                data: media['eficiencia']
            },{
                label: 'Tempo médio de execução',
                borderColor: 'rgb(0,255,255)',
                fill: false,
                data: media['tempo']
            },{
                label: 'Estimativas',
                borderColor: 'rgb(255,255,255)',
                fill: false,
                data: [0,0.10,0.20,0.30,0.40,0.50,0.60,0.70,0.80,0.90,1]
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}