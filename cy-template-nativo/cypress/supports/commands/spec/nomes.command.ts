/// <reference types="cypress"/>

// Listas de nomes e sobrenomes brasileiros
const nomesMasculinos = [
    'João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Daniel', 'Mateus', 'Felipe', 
    'Bruno', 'Carlos', 'André', 'Marcos', 'Paulo', 'Ricardo', 'Fernando', 'Diego',
    'Thiago', 'Gustavo', 'Leonardo', 'Eduardo', 'Roberto', 'Vinícius', 'Rodrigo',
    'Alexandre', 'Henrique', 'Márcio', 'José', 'Antonio', 'Fabio', 'Renato',
    'Wagner', 'Otavio', 'Wellington',
];

const nomesFemininos = [
    'Maria', 'Ana', 'Carla', 'Fernanda', 'Paula', 'Juliana', 'Camila', 'Patrícia',
    'Beatriz', 'Larissa', 'Mariana', 'Gabriela', 'Letícia', 'Carolina', 'Débora',
    'Priscila', 'Vanessa', 'Cristina', 'Amanda', 'Mônica', 'Sandra', 'Luciana',
    'Rafaela', 'Adriana', 'Daniela', 'Simone', 'Renata', 'Tatiana', 'Viviane', 'Bianca'
];

const sobrenomes = [
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira',
    'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes',
    'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Monteiro', 'Cardoso',
    'Ramos', 'Nunes', 'Teixeira', 'Mendes', 'Pinto', 'Machado', 'Freitas', 'Araújo',
    'Nascimento', 'Correia', 'Castro', 'Moreira', 'Campos', 'Moura', 'Cunha', 'Pires'
];

// Gera nome completo aleatório
Cypress.Commands.add("geraNome", (genero?: 'masculino' | 'feminino' | 'aleatorio') => {
    const gerarNomeCompleto = (tipoGenero?: 'masculino' | 'feminino' | 'aleatorio'): string => {
        let listaNomes: string[];
        
        // Define qual lista de nomes usar baseado no gênero
        if (tipoGenero === 'masculino') {
            listaNomes = nomesMasculinos;
        } else if (tipoGenero === 'feminino') {
            listaNomes = nomesFemininos;
        } else {
            // Se não especificado ou 'aleatorio', escolhe aleatoriamente entre masculino e feminino
            const escolhaAleatoria = Math.random() < 0.5;
            listaNomes = escolhaAleatoria ? nomesMasculinos : nomesFemininos;
        }

        // Seleciona nome e sobrenome aleatórios
        const nomeEscolhido = listaNomes[Math.floor(Math.random() * listaNomes.length)];
        const sobrenomeEscolhido = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
        
        // Adiciona um segundo sobrenome ocasionalmente (30% de chance)
        let nomeCompleto = `${nomeEscolhido} ${sobrenomeEscolhido}`;
        if (Math.random() < 0.3) {
            const segundoSobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
            if (segundoSobrenome !== sobrenomeEscolhido) {
                nomeCompleto = `${nomeEscolhido} ${sobrenomeEscolhido} ${segundoSobrenome}`;
            }
        }

        // Salva o nome gerado para uso posterior
        localStorage.setItem("nomeGeradoCypress", nomeCompleto);
        Cypress.env("nomeGerado", nomeCompleto);

        return nomeCompleto;
    };

    return cy.wrap(gerarNomeCompleto(genero));
});

// Recupera o último nome gerado
Cypress.Commands.add("obterNomeGerado", () => {
    const nomeSalvo = localStorage.getItem("nomeGeradoCypress") || Cypress.env("nomeGerado");

    if (!nomeSalvo) {
        throw new Error("Nenhum nome foi gerado ainda. Use cy.geraNome() primeiro.");
    }

    return cy.wrap<string>(nomeSalvo);
});