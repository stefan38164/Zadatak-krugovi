
// uzima broj sa servera
async function uzmiBroj() {
  const response = await fetch('https://www.random.org/integers/?num=1&min=0&max=255&col=1&base=10&format=plain&rnd=new');
  const text = await response.text();
  return parseInt(text);
}
//konvertuje broj u binarni oblik
function decimalToBinary(decimal) {
  let binary = '';
  for (let i = 7; i >= 0; i--) {
    const bit = decimal >> i & 1;
    binary += bit;
  }
  return binary;
}

// konvertuje binarni oblik u krugove
function binaryToKrugovi(binary) {
  const krugovi = [];
  for (const digit of binary) {
    if (digit === '0') {
      krugovi.push('<div class="crveni-krug"></div>');
    } else if (digit === '1') {
      krugovi.push('<div class="zeleni-krug"></div>');
    } else {
      krugovi.push('<div class="zuti-krug"></div>');
    }
  }
  return krugovi.join('');
}

// sinhronizuje sve funkcije i prikazuje rezultate na stranici
async function updateKrugovi() {
  // Prikazivanje zutih krugova dok se čeka novi broj
  const loadingKrugovi = '<div class="zuti-krug"></div>'.repeat(8);
  document.getElementById('krugovi').innerHTML = loadingKrugovi;

  const number = await uzmiBroj();
  const binary = decimalToBinary(number);
  const krugovi = binaryToKrugovi(binary);
  document.getElementById('krugovi').innerHTML = krugovi;
  document.getElementById('broj').innerHTML = number;
}

// Pozivanje funkcije updateKrugovi svake sekunde
setInterval(updateKrugovi, 1000);

