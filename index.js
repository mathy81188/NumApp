console.log("JavaScript cargado correctamente");

const form = document.getElementById("navForm");
const action = document.getElementById("action");
const secondInput = document.getElementById("secondNumber");
const resultContent = document.getElementById("resultContent");
const modal = new bootstrap.Modal(document.getElementById("resultModal"));
const subir = document.getElementById("subir");
const formDesktop = document.getElementById("navFormDesktop");

action.addEventListener("change", () => {
  if (action.value === "coprimo") {
    secondInput.classList.remove("d-none");
    secondInput.required = true;
  } else {
    secondInput.classList.add("d-none");
    secondInput.required = false;
  }
});
// Manejo del formulario en escritorio
formDesktop.addEventListener("submit", (e) => {
  e.preventDefault();
  const num1 = parseInt(document.getElementById("mainNumberDesktop").value);
  const num2 = parseInt(document.getElementById("secondNumberDesktop").value);
  const actionValue = document.getElementById("actionDesktop").value;

  let result = "";
  if (isNaN(num1) || (actionValue === "coprimo" && isNaN(num2))) {
    resultContent.innerHTML = "Por favor ingresá números válidos.";
    return;
  }
  switch (actionValue) {
    case "tipo":
      result = `El número ${num1} pertenece a:\n`;
      if (num1 >= 0) result += "- ℕ (Naturales)\n";
      result += "- ℤ (Enteros)\n- ℚ (Racionales)\n- ℝ (Reales)\n";
      if (num1 >= 2) {
        result += `\nAdemás, ${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      }
      break;

    case "primo":
      result = num1 < 2
        ? `${num1} no es primo.\nRecordá que los primos empiezan en 2.`
        : `${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      break;

    case "divisores":
      const todos = divisores(num1);
      const total = todos.length;
      const primeros = todos.slice(0, 10);
      result = `El número ${num1} tiene ${total} divisor${total > 1 ? "es" : ""}.\n`;
      result += total > 10
        ? ` Mostrando los primeros 10:\n ${primeros.join(", ")}.`
        : ` ${todos.join(", ")}.`;
      break;

    case "multiplos":
      result = `Primeros 10 múltiplos de ${num1}:\n ${multiplos(num1, 10).join(", ")}.`;
      break;

    case "coprimo":
      result = `${num1} y ${num2} ${sonCoprimos(num1, num2) ? "son coprimos" : "no son coprimos"}.`;
      break;
    case "multiplos-comunes":
      const m1 = multiplos(num1, 100);
      const m2 = multiplos(num2, 100);
      const comunesM = m1.filter(n => m2.includes(n));
      result = comunesM.length > 0
        ? `Primeros múltiplos en común entre ${num1} y ${num2}:\n${comunesM.slice(0, 10).join(", ")}.`
        : `No se encontraron múltiplos en común en los primeros 100 múltiplos.`;
      break;

    case "divisores-comunes":
      const d1 = divisores(num1);
      const d2 = divisores(num2);
      const comunesD = d1.filter(n => d2.includes(n));
      result = comunesD.length > 0
        ? `Divisores en común entre ${num1} y ${num2}:\n${comunesD.join(", ")}.`
        : `No tienen divisores en común.`;
        break;
    default:
      result = "Acción no válida.";
  }
  
  resultContent.innerHTML = result.replace(/\n/g, "<br>");
  const modal = new bootstrap.Modal(document.getElementById("resultModal")); 
  modal.show();
});
const actionSelectDesktop = document.getElementById("actionDesktop");
  const secondInputDesktop = document.getElementById("secondNumberDesktop");

  actionSelectDesktop.addEventListener("change", () => {
    if (actionSelectDesktop.value === "coprimo") {
      secondInputDesktop.classList.remove("d-none");
      secondInputDesktop.setAttribute("required", "true");
    } else {
      secondInputDesktop.classList.add("d-none");
      secondInputDesktop.removeAttribute("required");
      secondInputDesktop.value = ""; // Limpia el valor si no se usa
    }
  });
// Manejo del formulario en móvil

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const num1 = parseInt(document.getElementById("mainNumber").value);
  const num2 = parseInt(secondInput.value);
  let result = "";
  if (isNaN(num1) || (action.value === "coprimo" && isNaN(num2))) {
    resultContent.innerHTML = "Por favor ingresá números válidos.";
    return;
  }
  switch (action.value) {

    case "tipo":

      result = `El número ${num1} pertenece a:\n`;

      if (num1 >= 0) {
        result += "- ℕ (Naturales)\n";
      }

      result += "- ℤ (Enteros)\n";
      result += "- ℚ (Racionales)\n";
      result += "- ℝ (Reales)\n";

      if (num1 >= 2) {
        result += `\nAdemás, ${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      }
      break;
    case "primo":
      if (num1 < 2) {
        result = `${num1} no es primo.\nRecordá que los primos empiezan en 2.`;
      } else {
        result = `${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      }
      break;
    case "divisores":
      const todos = divisores(num1);
      const total = todos.length;
      const primeros = todos.slice(0, 10);
      result = `El número ${num1} tiene ${total} divisor${total > 1 ? "es" : ""}.\n`;
      if (total > 10) {
        result += ` Mostrando los primeros 10:\n ${primeros.join(", ")}.`;
      } else {
        result += ` ${todos.join(", ")}.`;
      }
      break;
    case "multiplos":
      result = `Primeros 10 múltiplos de ${num1}:\n ${multiplos(num1, 10).join(", ")}.`;
      break;
    case "coprimo":
      result = `${num1} y ${num2} ${sonCoprimos(num1, num2) ? "son coprimos" : "no son coprimos"}.`;
      break;
    case "multiplos-comunes":
      const m1 = multiplos(num1, 100);
      const m2 = multiplos(num2, 100);
      const comunesM = m1.filter(n => m2.includes(n));
      result = comunesM.length > 0
        ? `Primeros múltiplos en común entre ${num1} y ${num2}:\n${comunesM.slice(0, 10).join(", ")}.`
        : `No se encontraron múltiplos en común en los primeros 100 múltiplos.`;
      break;

    case "divisores-comunes":
      const d1 = divisores(num1);
      const d2 = divisores(num2);
      const comunesD = d1.filter(n => d2.includes(n));
      result = comunesD.length > 0
        ? `Divisores en común entre ${num1} y ${num2}:\n${comunesD.join(", ")}.`
        : `No tienen divisores en común.`;
      break;
    default:
      result = "Acción no válida.";
  }

  resultContent.innerHTML = result.replace(/\n/g, "<br>");
  const modal = new bootstrap.Modal(document.getElementById("resultModal"));  
  console.log("JavaScript cargado correctamente 2");
  modal.show();
});

const navbarCollapse = document.querySelector('.navbar-collapse');
if (navbarCollapse.classList.contains('show')) {
  const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
  bsCollapse.hide();
}
//control de MCD Y MCD

const secondNumberInputDesktop = document.getElementById("secondNumberDesktop");

actionSelectDesktop.addEventListener("change", () => {
  const value = actionSelectDesktop.value;
  if (value === "coprimo" || value === "multiplos-comunes" || value === "divisores-comunes") {
    secondNumberInputDesktop.classList.remove("d-none");
  } else {
    secondNumberInputDesktop.classList.add("d-none");
  }
});
// control de acordeones
document.addEventListener("DOMContentLoaded", function () {
  const btnToggle = document.getElementById("btn-toggle");

  btnToggle.addEventListener("click", function () {
    const panels = document.querySelectorAll(".accordion-collapse");
    const toggleButtons = document.querySelectorAll(".accordion-button");

    const algunoAbierto = Array.from(panels).some(panel => panel.classList.contains("show"));

    toggleButtons.forEach(button => {
      const targetSelector = button.getAttribute("data-bs-target");
      const target = document.querySelector(targetSelector);

      const estaAbierto = target.classList.contains("show");

      if (algunoAbierto && estaAbierto) {
        button.click(); // cerrar
      } else if (!algunoAbierto && !estaAbierto) {
        button.click(); // abrir
      }
    });

    if (algunoAbierto) {
      btnToggle.textContent = "Abrir todos los acordeones";
      btnToggle.classList.remove("btn-primary");
      btnToggle.classList.add("btn-success");
    } else {
      btnToggle.textContent = "Cerrar todos los acordeones";
      btnToggle.classList.remove("btn-success");
      btnToggle.classList.add("btn-primary");
    }
  });
});

// Control del botón "Volver arriba" y "Ir abajo"
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnVolverArriba");
  const icon = document.getElementById("btnIcon");
  const main = document.getElementById("main");
  const footer = document.querySelector("footer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      icon.className = "bi bi-chevron-up fs-3";
      btn.title = "Volver arriba";
    } else {
      icon.className = "bi bi-chevron-down fs-3";
      btn.title = "Ir abajo";
    }
  });

  btn.addEventListener("click", () => {
    if (window.scrollY > 200) {
      // Subir al top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Bajamos hasta justo antes del footer
      const footerTop = window.scrollY + footer.getBoundingClientRect().top;
      // quede 30px por encima del inicio del footer
      const target = footerTop - window.innerHeight - 30;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  });
});



function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function divisores(n) {
  const resultado = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) resultado.push(i);
  }
  return resultado;
}

function multiplos(n, cantidad) {
  const resultado = [];
  for (let i = 1; i <= cantidad; i++) {
    resultado.push(n * i);
  }
  return resultado;
}

function sonCoprimos(a, b) {
  function mcd(x, y) {
    return y === 0 ? x : mcd(y, x % y);
  }
  return mcd(a, b) === 1;
}


