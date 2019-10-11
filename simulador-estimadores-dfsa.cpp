#include<iostream>

using namespace std;

int main(){

    int etiquetas_iniciais;
    int quantidade_inicial_slots;

    cin>>etiquetas_iniciais>>quantidade_inicial_slots;


    int etiquetas = etiquetas_iniciais;
    int slots = quantidade_inicial_slots;

    int quadro[slots] = {0};


    srand(time(0));
    for(int i=0;i<etiquetas;i++){
        
        quadro[(rand() % slots)] +=1;

    }

    for(int i=0;i<slots;i++){
        
        cout<<quadro[i]<<endl;

    }

    return 0;
}