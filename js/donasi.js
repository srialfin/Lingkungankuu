function submitDonation() {
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (name && amount && paymentMethod) {
        // Isi data ke modal
        document.getElementById("modalName").textContent = name;
        document.getElementById("modalAmount").textContent = parseInt(amount).toLocaleString("id-ID");
        document.getElementById("modalPaymentMethod").textContent = paymentMethod;

        // Tampilkan modal
        const modal = new bootstrap.Modal(document.getElementById("donationModal"));
        modal.show();

        // Reset form setelah submit
        document.getElementById("donationForm").reset();
    } else {
        alert("Mohon isi semua kolom dengan benar.");
    }
}
