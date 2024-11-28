const wrapper = document.querySelector(".wrapper"),
      qrInput = wrapper.querySelector(".form input"),
      generateBtn = wrapper.querySelector(".form button"),
      qrImg = wrapper.querySelector(".qr-code img"),
      exportPDFBtn = document.getElementById("exportPDF");

let preValue;

// Gerar QR Code
generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return; // Evitar gerar o mesmo QR repetidamente
    preValue = qrValue;

    generateBtn.innerText = "Gerando QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active"); // Mostrar a área do QR Code
        generateBtn.innerText = "Gerar QR Code";
        exportPDFBtn.style.display = "block"; // Mostrar botão de exportação após geração
    });
});

// Limpar área se o campo for esvaziado
qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
        exportPDFBtn.style.display = "none"; // Esconder botão de exportação
    }
});

// Exportar QR Code como PDF
exportPDFBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf; // Importando jsPDF
    const pdf = new jsPDF();

    // Configurar PDF
    pdf.text("QR Code Gerado", 15, 15); // Adicionar título
    const qrImgData = qrImg.src; // Capturar a imagem do QR Code

    // Adicionar QR Code ao PDF
    pdf.addImage(qrImgData, "PNG", 20, 35, 60, 60);

    // Salvar PDF
    pdf.save("QRCode.pdf");
});
