

function rodarGrafico(){
    var ctx = document.getElementById('lineColision').getContext('2d');

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: dadosJSON['etiquetas'],
            datasets: [{
                label: 'Slots totais',
                borderColor: 'rgb(0,0,0)',
                data: dadosJSON['total']['slots']
            },{
                label: 'Slots vazios totais',
                borderColor: 'rgb(255,0,0)',
                data: dadosJSON['total']['vazio']
            },{
                label: 'Colisões totais',
                borderColor: 'rgb(0,255,0)',
                data: dadosJSON['total']['colisao']
            },{
                label: 'Eficiência',
                borderColor: 'rgb(0,0,255)',
                data: dadosJSON['total']['eficiencia']
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}