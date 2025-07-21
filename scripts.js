const upload = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

upload.addEventListener("click", () => {
    inputUpload.click();
});

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