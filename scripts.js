const upload = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

// Contabiliza o click para abrir a janela de carregamento de imagens

upload.addEventListener("click", () => {
    inputUpload.click();
});

// Função que le o arquivo; se não for possivel ler, mostra mensagem de erro

function lerConteudoDoArquivo(file) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, name: file.name});
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`);
        }

        leitor.readAsDataURL(file);
    });
}

const imagemPrincipal = document.querySelector(".main-image");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

// Função que coloca a imagem na tela; checa tamanho e tipo do arquivo

inputUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Por favor, selecione uma imagem PNG ou JPEG.');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
    }

    if (file) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(file);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.name;
        } catch (error){
            console.log("Erro na leitura do arquivo");
        }
    }
});

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove-tag")) {
        const tagRemover = event.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
});

// Tags em maiusculo, para funcionar com o tuUpperCase na função de listar tags 

const tagsDisponiveis = [
  "FRONT-END",
  "PROGRAMAÇÃO",
  "BACK-END",
  "DATA SCIENCE",
  "FULL-STACK",
  "JAVASCRIPT",
  "HTML",
  "CSS",
  "REACT",
  "NODE.JS",
  "PYTHON",
  "MACHINE LEARNING",
  "INTELIGÊNCIA ARTIFICIAL",
  "UX/UI",
  "DEVOPS",
  "BANCO DE DADOS",
  "SQL",
  "NOSQL",
  "API REST",
  "GIT",
  "GITHUB",
  "SEGURANÇA DA INFORMAÇÃO",
  "CLOUD COMPUTING",
  "TYPESCRIPT",
  "MOBILE",
  "TESTES AUTOMATIZADOS"
];

// Função que verificar se a tag existe

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

// Função que usa a função de veficar a tag usando o toUpperCase;
// Se (true) a tag sera adicionada, se (false) o alert sera acionado, se (error) vai ir pro console

inputTags.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const tagTexto = inputTags.value.trim()
        const tagTextoFormatado = tagTexto.charAt(0).toUpperCase() + tagTexto.slice(1);
        if (tagTexto !== "") {
            try {
                const tagMaiusculo = tagTexto.toUpperCase();
                const tagExiste = await verificaTagsDisponiveis(tagMaiusculo);
                if (tagExiste){
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagTextoFormatado}</p> <img src="./img/close-black.svg" class="remove-tag"/>`
                    listaTags.appendChild(newTag);
                    inputTags.value = "";
                } else {
                    alert("Tag não foi encontrada");
                }
                
            } catch (error) {
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag, verifique o console");
            }
        }
    }
});

const botaoPublicar = document.querySelector(".botao-publicar");

// Simula o envio do projeto ao back-end

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso");
            } else {
                reject("Erro ao publicar o projeto");
            }
        }, 2000);
    });
}

// Função publicar

botaoPublicar.addEventListener("click", async (event) => {
    event.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo :)")

        console.log(nomeDoProjeto);
        console.log(descricaoDoProjeto);
        console.log(tagsProjeto);
    } catch (error) {
        console.log("Deu errado", error);
        alert("Deu tudo errado :(");
    }

});

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (event) => {
    event.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";
});