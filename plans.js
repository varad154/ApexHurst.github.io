function applyDiscount() {
    let codeInput = document.getElementById("discountCode");
    let code = codeInput.value.trim();
    
    // List of valid discount codes and their discounts
    const discountCodes = {
        "GFX10": 0.90,  // 10% discount
        "GFX!x15": 0.85,  // 15% discount
        "GFXj925": 0.75,  // 25% discount
        "GFXw720": 0.80   // 20% discount
    };

    // Check if entered code is valid
    if (discountCodes[code]) {
        let discount3 = 250000 * discountCodes[code];
        let discount6 = 450000 * discountCodes[code];
        let discount12 = 800000 * discountCodes[code];

        document.getElementById("price3").innerHTML = `<span class="discounted-price">₦250,000</span> <span class="discount">₦${discount3.toLocaleString()}</span>`;
        document.getElementById("price6").innerHTML = `<span class="discounted-price">₦450,000</span> <span class="discount">₦${discount6.toLocaleString()}</span>`;
        document.getElementById("price12").innerHTML = `<span class="discounted-price">₦800,000</span> <span class="discount">₦${discount12.toLocaleString()}</span>`;

        document.getElementById("btn3").setAttribute('onclick', `subscribe(${discount3}, 2)`);
        document.getElementById("btn6").setAttribute('onclick', `subscribe(${discount6}, 3)`);
        document.getElementById("btn12").setAttribute('onclick', `subscribe(${discount12}, 4)`);

        showNotification(`✅ Discount applied: ${code}`, "success");
    } else {
        showNotification("❌ Invalid discount code!", "error");
    }

    // Clear input field after applying
    codeInput.value = "";
}

function showNotification(message, type) {
    let messageBox = document.getElementById("discountMessage");

    if (messageBox) {
        messageBox.innerHTML = message;
        messageBox.className = `discount-message ${type}`;
        messageBox.style.display = "block";
        messageBox.style.opacity = "1";

        // Auto-hide after 3 seconds
        setTimeout(() => {
            messageBox.style.opacity = "0";
            setTimeout(() => {
                messageBox.style.display = "none";
            }, 500);
        }, 3000);
    }
}

function subscribe(amount, plan) {
    window.location.href = `payment.html?amount=${amount}&plan=${plan}`;
}
