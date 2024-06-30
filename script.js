const scrollers = document.querySelectorAll('.scroller');
const containerDeFotos = document.querySelector('.scrollerInner');
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const sairModal = document.querySelector(".botaoSairModal");
const popup = document.querySelector(".popup");
const sobressair = document.querySelector(".sobressair");
const sairQrCode = document.querySelector(".sairQrcode");
const timer = document.querySelector(".timer");
const sombra = document.querySelector(".sombra");

  if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
    adicionarAnimacao()
  };

  function adicionarAnimacao(){
    scrollers.forEach(scroller => {
    scroller.setAttribute('data-animated', true);
    })
  };

  document.addEventListener("keydown", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      contagemFoto();
    }})

  document.addEventListener("keydown", function(event) {
      event.preventDefault();
    if (event.key === 'q' || event.key === 'Q') {
      abrirModalQrCode();
    }
  });

  document.addEventListener("keydown", function(event) {
    event.preventDefault();
      if (event.key === 'Escape') {
      fecharModalQrCode();
      fecharModalSalvar();
    }
  });

  const abrirModalSalvar = function () {
    modal.classList.remove("escondido");
    overlay.classList.remove("escondido");
  };

  const fecharModalSalvar = function () {
    modal.classList.add("escondido");
    overlay.classList.add("escondido");
  };

  const abrirModalQrCode = function () {
    popup.classList.remove("qrCode");
    sobressair.classList.remove("qrCode");
  };

  const fecharModalQrCode = function () {
    popup.classList.add("qrCode");
    sobressair.classList.add("qrCode");
  };

  const encerrarContagem = function () {
    timer.classList.add("escondida");
    sombra.classList.add("escondida");
  };

  const contagemFoto = function () {
    timer.classList.remove("escondida");
    sombra.classList.remove("escondida");

    let contagem = 3;
    const timerFoto = setInterval(function() {
    contagem--;
    timer.innerHTML = `
    <h1> CONTAGEM: </h1>
    <p class="contagem"> ${contagem+1} </p>
    `
    
    if (contagem === -1) {
    clearInterval(timerFoto);
    tirarFoto();
    encerrarContagem();
    } 

  }, 1020);};

  function tirarFoto() {

    const video = document.getElementById('video');
    const fotos = document.createElement('canvas');
    fotos.width = video.videoWidth;
    fotos.height = video.videoHeight;
    const context = fotos.getContext('2d');
    context.drawImage(video, 0, 0, fotos.width, fotos.height);
  
    const dataUrl = fotos.toDataURL('img.png');
  
    const novaFoto = document.createElement("img");
    novaFoto.src = dataUrl;
    novaFoto.className = 'fotos'; 
  
    novaFoto.style.height = '250px'; 
    novaFoto.style.width = '350px'; 
  
    containerDeFotos.appendChild(novaFoto);
  
    salvarFoto(dataUrl);
    abrirModalSalvar()
  };


  function salvarFoto(dataUrl) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'photo.png';
    link.click();
    
  };

  async function photoBooth() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (err) {
      console.error("Erro ao acessar a câmera: ", err);
    }

  };

  photoBooth();