#include<iostream>

using namespace std;

int main(){

    int etiquetas_iniciais;
    int quantidade_inicial_slots;

    cout<<"Digite o número de etiquetas: ";
    cin>>etiquetas_iniciais;
    cout<<endl;
    cout<<"Digite a quantidade de slots inicial do quadro: ";
    cin>>quantidade_inicial_slots;
    cout<<endl;

    int etiquetas = etiquetas_iniciais;
    int slots = quantidade_inicial_slots;

    while(etiquetas){

        int quadro[slots] = {0};

        srand(time(0));
        for(int i=0;i<etiquetas;i++){
            
            quadro[(rand() % slots)] +=1;

        }
        int sucesso = 0,colisao = 0, vazio = 0;

        for(int i=0;i<slots;i++){
            
            if(quadro[i]==0){
                vazio++;
            }else if(quadro[i]==1){
                sucesso++;
            }else if(quadro[i]>1){
                colisao++;
            }

        }

        cout<<"Etiquetas: "<<etiquetas;
        cout<<"  Slots: "<<slots;
        cout<<"  Sucesso: "<<sucesso;
        cout<<"  Colisao: "<<colisao;
        cout<<"  Vazio: "<<vazio<<endl;

        etiquetas = etiquetas - sucesso;

    }

    return 0;
}