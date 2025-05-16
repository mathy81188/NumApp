const form = document.getElementById("navForm");
const action = document.getElementById("action");
const secondInput = document.getElementById("secondNumber");
const resultContent = document.getElementById("resultContent");

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
      result = `El número ${num1} pertenece a... (aquí va la lógica).`;
      break;
    case "primo":
      result = `${num1} ${esPrimo(num1) ? "es primo" : "no es primo"}.`;
      break;
    case "divisores":
      result = `Divisores de ${num1}: ${divisores(num1).join(", ")}.`;
      break;
    case "multiplos":
      result = `Primeros múltiplos de ${num1}: ${multiplos(num1, 5).join(", ")}.`;
      break;
    case "coprimo":
      result = `${num1} y ${num2} ${sonCoprimos(num1, num2) ? "son coprimos" : "no son coprimos"}.`;
      break;
    default:
      result = "Acción no válida.";
  }

  resultContent.textContent = result;
  const modal = new bootstrap.Modal(document.getElementById("resultModal"));
  modal.show();
});

// Funciones de ejemplo
function esPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function divisores(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) result.push(i);
  }
  return result;
}

function multiplos(n, cantidad) {
  return Array.from({ length: cantidad }, (_, i) => n * (i + 1));
}

function sonCoprimos(a, b) {
  function mcd(x, y) {
    return y === 0 ? x : mcd(y, x % y);
  }
  return mcd(a, b) === 1;
}