const gambar = document.querySelector(".gambar img");

// Audio
const soundBenar = new Audio("sound/benar.mp3");
const soundSalah = new Audio("sound/salah.mp3");
const soundMenang = new Audio("sound/winner.mp3");

let posisi = 0;

// 20 pertanyaan Tim A
const pertanyaanA = [
  { t: "Bahasa Inggris 'merah'?", j: "red" },
  { t: "Bahasa Inggris 'biru'?", j: "blue" },
  { t: "Bahasa Inggris 'kuning'?", j: "yellow" },
  { t: "Bahasa Inggris 'hitam'?", j: "black" },
  { t: "Bahasa Inggris 'putih'?", j: "white" },
  { t: "Bahasa Inggris 'ungu'?", j: "purple" },
  { t: "Bahasa Inggris 'hijau'?", j: "green" },
  { t: "Bahasa Inggris 'pink'?", j: "pink" },
  { t: "Bahasa Inggris 'abu-abu'?", j: "gery" },
  { t: "Bahasa Inggris 'ayah'?", j: "father" },
  { t: "Bahasa Inggris 'ibu'?", j: "mother" },
  { t: "Bahasa Inggris 'saudara perempuan'?", j: "sister" },
  { t: "Bahasa Inggris 'saudara laki-laki'?", j: "brother" },
  { t: "Bahasa Inggris 'paman'?", j: "uncle" },
  { t: "Bahasa Inggris 'bibi'?", j: "aunt" },
  // tambahkan sampai 20
];

// 20 pertanyaan Tim B
const pertanyaanB = [
  { t: "Bahasa Inggris 'merah'?", j: "red" },
  { t: "Bahasa Inggris 'biru'?", j: "blue" },
  { t: "Bahasa Inggris 'kuning'?", j: "yellow" },
  { t: "Bahasa Inggris 'hitam'?", j: "black" },
  { t: "Bahasa Inggris 'putih'?", j: "white" },
  { t: "Bahasa Inggris 'ungu'?", j: "purple" },
  { t: "Bahasa Inggris 'hijau'?", j: "green" },
  { t: "Bahasa Inggris 'pink'?", j: "pink" },
  { t: "Bahasa Inggris 'abu-abu'?", j: "gery" },
  { t: "Bahasa Inggris 'ayah'?", j: "father" },
  { t: "Bahasa Inggris 'ibu'?", j: "mother" },
  { t: "Bahasa Inggris 'saudara perempuan'?", j: "sister" },
  { t: "Bahasa Inggris 'saudara laki-laki'?", j: "brother" },
  { t: "Bahasa Inggris 'paman'?", j: "uncle" },
  { t: "Bahasa Inggris 'bibi'?", j: "aunt" },
  // tambahkan sampai 20
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(pertanyaanA);
shuffle(pertanyaanB);

let indexA = 0;
let indexB = 0;

// Tampilkan pertanyaan pertama
document.getElementById("pertanyaanA").textContent = pertanyaanA[indexA].t;
document.getElementById("pertanyaanB").textContent = pertanyaanB[indexB].t;

// ==================================================
//                 JAWAB TIM A
// ==================================================
function jawabA() {
  const inputA = document.getElementById("jawabanA").value.toLowerCase().trim();
  document.getElementById("jawabanA").value = "";

  if (inputA === pertanyaanA[indexA].j) {
    posisi -= 5;
    gambar.style.transform = `translateX(${posisi}%)`;
    soundBenar.play();
  } else {
    soundSalah.play();
  }

  indexA++;

  if (indexA >= pertanyaanA.length) {
    alert("Pertanyaan Tim A habis!");
    return;
  }

  document.getElementById("pertanyaanA").textContent = pertanyaanA[indexA].t;

  setTimeout(() => {
    cekPemenang();
  }, 1000);
}

// ==================================================
//                 JAWAB TIM B
// ==================================================
function jawabB() {
  const inputB = document.getElementById("jawabanB").value.toLowerCase().trim();
  document.getElementById("jawabanB").value = "";

  if (inputB === pertanyaanB[indexB].j) {
    posisi += 5;
    gambar.style.transform = `translateX(${posisi}%)`;
    soundBenar.play();
  } else {
    soundSalah.play();
  }

  indexB++;

  if (indexB >= pertanyaanB.length) {
    alert("Pertanyaan Tim B habis!");
    return;
  }

  document.getElementById("pertanyaanB").textContent = pertanyaanB[indexB].t;

  setTimeout(() => {
    cekPemenang();
  }, 1000);
}

// ==========================
// CEK PEMENANG
// ==========================
function cekPemenang() {
  const alertPemenangA = document.querySelector(".alert-pemenangA");
  const alertPemenangB = document.querySelector(".alert-pemenangB");
  const game = document.querySelector(".game");
  if (posisi <= -25) {
    soundMenang.play();
    // alert("TIM A MENANG!");
    alertPemenangA.style.display = "block";
    game.style.opacity = "0.1";
  }

  if (posisi >= 28) {
    soundMenang.play();
    // alert("TIM B MENANG!");
    alertPemenangB.style.display = "block";
    game.style.opacity = "0.1";
  }
}

///keyboard
// Fungsi untuk membuat keyboard virtual
function buatKeyboard(idKeyboard, inputTarget) {
  const keyboard = document.getElementById(idKeyboard);
  const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Tambah tombol huruf
  keys.split("").forEach((huruf) => {
    const tombol = document.createElement("div");
    tombol.className = "key";
    tombol.textContent = huruf;
    tombol.onclick = () => {
      document.getElementById(inputTarget).value += huruf.toLowerCase();
    };
    keyboard.appendChild(tombol);
  });

  // Tombol Space
  const space = document.createElement("div");
  space.className = "key big";
  space.textContent = "SPACE";
  space.onclick = () => {
    document.getElementById(inputTarget).value += " ";
  };
  keyboard.appendChild(space);

  // Tombol Backspace
  const back = document.createElement("div");
  back.className = "key big";
  back.textContent = "DELETE";
  back.onclick = () => {
    let inp = document.getElementById(inputTarget);
    inp.value = inp.value.slice(0, -1);
  };
  keyboard.appendChild(back);
}

// Buat 2 keyboard: untuk Tim A dan Tim B
buatKeyboard("keyboardA", "jawabanA");
buatKeyboard("keyboardB", "jawabanB");
