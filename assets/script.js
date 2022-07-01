// Variável para configurar o objeto
let app = new Vue({

    // 1) O elemento HTML que conter um ID chamado app vai ser automaticamente gerenciado pelo vue.js ----------------------------------------------------------------
    el:"#app",

    // 2) Declarar variáveis para usarmos no vue.js ------------------------------------------------------------------------------------------------------------
    data:{

        // Variável p receber os registros
        ListaContatos: [],
        // Variável Normal
        name:'Lista de Contatos',
        // Autoria
        autora:'Dan Veras',
        // Objeto que contém 3 campos      
        ObjetoContato:{
            id:'',
            name: '',
            email:'',
            phone:''
        },
        // Descobre se está editando ou deletando o contato
        Editando: false,
        // Mensagem para aparecer ao passar o mouse pelo título
        titulo: 'Meu primeiro aplicativo com vue.js!',
    },

    // 3) Propriedade Computada permite adicionar mais informações a uma propriedade ------------------------------------------------------------------------------------------------------------
    computed:{
        
        // Função                
        QuantidadeContatos(){
            // Mostra a quantidade de contatos na array lista
            return `O Total de Contatos Registrados é ${this.ListaContatos.length}`;
        },
    },

    // 4) Coletar dados logo após o componente ser criado ------------------------------------------------------------------------------------------------------------
    created(){

        // Se tiver algum contato no storage... 
        if(localStorage.hasOwnProperty("contactsApp")){                    
            //Alimenta o atributo contacts do data
            this.ListaContatos = JSON.parse(localStorage.getItem("contactsApp"));              
        }
    },

    // 5) Declarar Métodos ---------------------------------------------------------------------------------------------------------------------------------
    methods:{

        // Recebe como parâmetro o objeto contact
        SalvarContato(ObjetoContato){

            // Variável que guarda todos os contatos criados em uma array
            let ContatosArray = new Array()

            // Criar um ID para o novo registro
            ObjetoContato.id = new Date().getTime();

            // 1) Se já existir um contato registrado no local storage... ( + Checa se existe algum item no local storage )
            if (localStorage.hasOwnProperty("contactsApp")) {

                // Transforma o novo registro em JSON e guarda na Array contacts. O parse transforma o JSON em objeto no javascript
                ContatosArray = JSON.parse(localStorage.getItem("contactsApp"));       
                
                // Adiciona o último registro no array
                ContatosArray.push(ObjetoContato);

            // 2) Se não existir nenhum contato registrado, criar um novo
            } else{

                // Dentro do local storage teremos uma array de objetos (contatos que estão sendo salvos)
                ContatosArray = [ObjetoContato];
            }                                     

            // Assim que um valor novo é registrado, cria um card inteiro só pra ele
            this.ListaContatos = ContatosArray;

            // Transforma os dados em json
            localStorage.setItem("contactsApp", JSON.stringify(ContatosArray));
            
            // Limpa o formulário
            location.reload();
        
        },

        // Remover o contato da lista
        RemoverContato(ContatoId){

            // Variável que guarda todos os contatos criados em uma array
            let ContatosArray = new Array();

            // 1) Se já existir contatos registrados no local storage... ( + Checa se existe algum item no local storage )
            if (localStorage.hasOwnProperty("contactsApp")) {

                // Transforma o novo registro em JSON e guarda na Array contacts. O parse transforma o JSON em objeto no javascript
                ContatosArray = JSON.parse(localStorage.getItem("contactsApp"));
                
                // Criar uma array com resultados filtrados
                ContatosArray = ContatosArray.filter((ObjetoContato) => {

                    // Retorna todos os contatos, menos aquele que foi deletado
                    return ObjetoContato.id != ContatoId;

                });

                // Atualizar lista automaticamente depois de remover contato
                this.ListaContatos = ContatosArray;

                // Atualiza lista e Transforma os dados em json
                localStorage.setItem("contactsApp", JSON.stringify(ContatosArray));
                            
            // 2) Se não tiver nenhum contato registrado...
            } else {

                // Mostrar mensagem no console
                return console.log("Não tem nenhum contato registrado :<");
            }
                                    
        },

        // Editar Contato
        EditarContato(ObjetoContato){

            // Sobrescrever o objeto contato pelo valor recebido no parâmetro
            this.ObjetoContato = ObjetoContato;

            // Avisa que está editando o contato
            this.Editando = true;

        },

        // Atualizar contato depois de ter editado
        AtualizarContato(ObjetoContato){

            // Variável que guarda todos os contatos criados em uma array
            let ContatosArray = new Array();

            // Array com nossos contatos que recebe método map
            ContatosArray = this.ListaContatos.map(ContatoMap => {

                // Se foi feita uma alteração e seu ID mudou, substituir a linha original pela alterada...
                if(ContatoMap.id == ObjetoContato.id){

                    // Contato alterado pelo usuário
                    return ObjetoContato;

                // Se não foi feita nenhuma alteração...
                } else {

                    // Contato não alterado pelo usuário
                    return ContatoMap;

                }

            });

            // Atualizar lista automaticamente depois de editar contato
            this.ListaContatos = ContatosArray;

            // Avisa que terminou de editar
            this.Editando = false;

            // Transforma os dados em json
            localStorage.setItem("contactsApp", JSON.stringify(ContatosArray));

            // Limpa o formulário
            location.reload();

        }

}});