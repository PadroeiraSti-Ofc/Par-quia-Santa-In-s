// ==== 🌍 REGRAS GLOBAIS DE PROTEÇÃO 🌍 ==== //

// Impede a ação de copiar qualquer conteúdo do site
document.addEventListener('copy', function(e) {
  e.preventDefault();
});

// Impede a ação de cortar texto
document.addEventListener('cut', function(e) {
  e.preventDefault();
});

// Dificulta a inspeção do código bloqueando atalhos de teclado
document.addEventListener('keydown', function(e) {
  if (e.key === "F12") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
    e.preventDefault();
  }
  if (e.ctrlKey && ['U', 'u', 'S', 's'].includes(e.key)) {
    e.preventDefault();
  }
  if (e.ctrlKey && ['S', 's'].includes(e.key)) {
    e.preventDefault();
  }
});

// ==== 🔃 TRANSPARÊNCIA NO TOPO AO ROLAR A PÁGINA 🔃 ==== //
window.addEventListener('scroll', function() {
  const header = document.getElementById('mainHeader');
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ==== ⏱️ REDIRECIONAMENTO COM DELAY REAL DE 1 SEGUNDO ==== //
function abrirRedeComDelay(event, url, elemento) {
  // Cancela a ação padrão imediata do clique
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Evita re-cliques enquanto o timer de 1 segundo está rodando
  if (elemento.classList.contains('clicado')) return;
  
  // Aplica o efeito visual do clique (animação de clique)
  elemento.classList.add('clicado');
  
  // Aguarda exatamente 1000ms (1 segundo) para aí sim abrir o link
  setTimeout(function() {
    window.open(url, '_blank');
    
    // Remove a classe do efeito visual depois que o link abre
    setTimeout(function() {
      elemento.classList.remove('clicado');
    }, 500);
  }, 1000);
}

// ==== 🟢/🔴 SISTEMA AUTOMÁTICO DE STATUS DA SECRETARIA ==== //
function verificarStatusAtendimento() {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0: Domingo, 1: Segunda, 2: Terça, 3: Quarta, 4: Quinta, 5: Sexta, 6: Sábado
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  const tempoEmMinutos = hora * 60 + minuto;
  
  // Horários convertidos em minutos
  const inicio0800 = 8 * 60; // 08:00 (480 min)
  const fim1740 = 17 * 60 + 40; // 17:40 (1060 min)
  const fim1200 = 12 * 60; // 12:00 (720 min)
  
  let estaAberto = false;
  
  // Terça (2), Quarta (3), Quinta (4), Sexta (5): 08:00 às 17:40
  if (diaSemana >= 2 && diaSemana <= 5) {
    if (tempoEmMinutos >= inicio0800 && tempoEmMinutos < fim1740) {
      estaAberto = true;
    }
  }
  // Sábado (6): 08:00 às 12:00
  else if (diaSemana === 6) {
    if (tempoEmMinutos >= inicio0800 && tempoEmMinutos < fim1200) {
      estaAberto = true;
    }
  }
  
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  
  if (dot && text) {
    if (estaAberto) {
      dot.className = 'status-dot online';
      text.innerText = 'Atendimento Online no momento';
      text.style.color = '#1b7a37';
    } else {
      dot.className = 'status-dot offline';
      text.innerText = 'Atendimento Indisponível no momento';
      text.style.color = '#c02b2b';
    }
  }
}

// Executa assim que a página carrega e atualiza a cada minuto
document.addEventListener('DOMContentLoaded', verificarStatusAtendimento);
setInterval(verificarStatusAtendimento, 60000);

// ——— ⬆️ LÓGICA DO BOTÃO VOLTAR AO TOPO ⬆️ ———
const btnBackToTop = document.getElementById('btnBackToTop');

if (btnBackToTop) {
  // Monitora a rolagem da página
  window.addEventListener('scroll', () => {
    // Exibe a seta quando rolar mais de 250px para baixo
    if (window.scrollY > 250) {
      btnBackToTop.classList.add('show');
    } else {
      btnBackToTop.classList.remove('show');
    }
  });
  
  // Ação de clique para subir suavemente
  btnBackToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ——— 📋 LÓGICA DE COPIAR ENDEREÇO COM POP-UP 📋 ———
const addressText = document.getElementById('addressText');
const toastNotification = document.getElementById('toastNotification');

if (addressText && toastNotification) {
  addressText.addEventListener('click', () => {
    // Texto do endereço a ser copiado
    const textToCopy = "Av. Luiz Muniz, 1283 - Centro, Santa Inês - MA, 65300-000";
    
    // Copia para a área de transferência do usuário
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Exibe a notificação flutuante
      toastNotification.classList.add('show');
      
      // Esconde o pop-up após 2.5 segundos
      setTimeout(() => {
        toastNotification.classList.remove('show');
      }, 2500);
    }).catch(err => {
      console.error('Erro ao copiar endereço: ', err);
    });
  });
}

console.log("Site Paróquia Santa Inês: Animações e Delay de 1 segundo ativados!");
