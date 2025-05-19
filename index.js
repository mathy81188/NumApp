const form = document.getElementById("navForm");
const action = document.getElementById("action");
const secondInput = document.getElementById("secondNumber");
const resultContent = document.getElementById("resultContent");
const modal = new bootstrap.Modal(document.getElementById("resultModal"));
const subir = document.getElementById("subir");


action.addEventListener("change", () => {
  if (action.value === "coprimo") {
    secondInput.classList.remove("d-none");
    secondInput.required = true;
  } else {
    secondInput.classList.add("d-none");
    secondInput.required = false;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const num1 = parseInt(document.getElementById("mainNumber").value);
  const num2 = parseInt(secondInput.value);
  let result = "";

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
    default:
      result = "Acción no válida.";
  }

  resultContent.innerHTML = result.replace(/\n/g, "<br>");
  const modal = new bootstrap.Modal(document.getElementById("resultModal"));
  modal.show();
});

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