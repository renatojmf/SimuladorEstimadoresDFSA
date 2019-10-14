

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
                data: media['slots']
            },{
                label: 'Slots vazios totais',
                borderColor: 'rgb(255,0,0)',
                data: media['vazio']
            },{
                label: 'Colisões totais',
                borderColor: 'rgb(0,255,0)',
                data: media['colisao']
            },{
                label: 'Eficiência',
                borderColor: 'rgb(0,0,255)',
                data: media['eficiencia']
            },{
                label: 'Tempo médio de execução',
                borderColor: 'rgb(0,255,255)',
                data: media['tempo']
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}