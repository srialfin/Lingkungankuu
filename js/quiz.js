const questions = [
    {
        question: "Apa yang dapat kita lakukan untuk mengurangi polusi udara?",
        options: ["Menggunakan kendaraan pribadi lebih sering", "Menanam pohon", "Menggunakan produk sekali pakai", "Membuang sampah sembarangan"],
        answer: 1,
    },
    {
        question: "Apa yang dimaksud dengan daur ulang?",
        options: ["Proses mengubah barang bekas menjadi produk baru", "Membuang barang bekas ke tempat sampah", "Memasukkan sampah ke tempat yang lebih jauh", "Menjual barang bekas ke pasar"],
        answer: 0,
    },
    {
        question: "Mengapa penting untuk mengurangi penggunaan plastik sekali pakai?",
        options: ["Karena plastik sulit terurai dan mencemari lingkungan", "Karena plastik murah", "Karena plastik lebih mudah digunakan", "Karena plastik bisa dibakar tanpa masalah"],
        answer: 0,
    },
    {
        question: "Apa yang dimaksud dengan energi terbarukan?",
        options: ["Energi yang berasal dari sumber daya alam yang dapat diperbaharui", "Energi yang dihasilkan dari bahan bakar fosil", "Energi yang digunakan untuk memanaskan rumah", "Energi yang berasal dari sampah"],
        answer: 0,
    },
    {
        question: "Apa langkah pertama dalam melestarikan lingkungan?",
        options: ["Membuang sampah di tempatnya", "Mengurangi penggunaan air", "Mengurangi penggunaan energi", "Semua jawaban benar"],
        answer: 3,
    },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");

// Memuat pertanyaan
function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    const options = optionsContainer.querySelectorAll("button");
    options.forEach((button, index) => {
        button.textContent = current.options[index];
        button.className = "list-group-item list-group-item-action";
        button.disabled = false; 
    });
    nextButton.classList.add("d-none");
    selectedAnswer = null; 
}

// Memilih jawaban
function selectAnswer(selected) {
    const options = optionsContainer.querySelectorAll("button");
    options.forEach((button) => button.classList.remove("selected")); 
    options[selected].classList.add("selected"); 
    selectedAnswer = selected; 
    nextButton.classList.remove("d-none"); 
}

// Lanjut ke pertanyaan berikutnya
function nextQuestion() {
    if (selectedAnswer !== null) {
        const correctAnswer = questions[currentQuestion].answer;
        if (selectedAnswer === correctAnswer) score++;
        highlightAnswer(correctAnswer, selectedAnswer);
        currentQuestion++;
        setTimeout(() => {
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 1000); 
    }
}

// Menandai jawaban yang benar dan salah
function highlightAnswer(correctAnswer, selectedAnswer) {
    const options = optionsContainer.querySelectorAll("button");
    options[correctAnswer].classList.add("correct");
    if (selectedAnswer !== correctAnswer) {
        options[selectedAnswer].classList.add("wrong");
    }
    options.forEach((button) => (button.disabled = true)); 
}

// Menampilkan hasil quiz
function showResult() {
    document.getElementById("quiz").classList.add("d-none");
    resultContainer.classList.remove("d-none");
    scoreElement.textContent = `${score} / ${questions.length}`;
    messageElement.textContent = score === questions.length
        ? "Luar biasa! Anda menjawab semua dengan benar!"
        : score >= questions.length / 2
        ? "Bagus! Anda cukup memahami materi."
        : "Jangan menyerah, coba lagi!";
}

// Mengulang quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    resultContainer.classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");
}

window.onload = loadQuestion;