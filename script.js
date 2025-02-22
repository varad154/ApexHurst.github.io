const urlParams = new URLSearchParams(window.location.search);
    const selectedAmount = urlParams.get('amount');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    document.getElementById('payBtn').addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (email && name && phone) {
            // Send data to Google Sheets
            sendToGoogleSheet(email, name, phone, selectedAmount);
            // Proceed to payment with Paystack
            payWithPaystack(selectedAmount, email, name, phone);
        } else {
            alert("Please fill all the fields.");
        }
    });

    // Function to send data to Google Sheets
    function sendToGoogleSheet(email, name, phone, amount) {
        const url = 'AKfycbxG--zDOlCq4FYvqCHZcoYWdhkCMHR6_QMbwBi7Unu5qGtDpWgzim2QIu42zGKmPD4'; // Replace with your Google Apps Script URL

        const data = {
            email: email,
            name: name,
            phone: phone,
            amount: amount
        };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data sent to Google Sheets successfully:', data);
        })
        .catch(error => {
            console.error('Error sending data to Google Sheets:', error);
        });
    }

    function payWithPaystack(amount, email, name, phone) {
        var handler = PaystackPop.setup({
            key: 'pk_test_7c8e764ec8ab7b8b7d4b59c113550206716a16b4', // Replace with your public key
            email: email, // User's email address
            amount: amount * 100, // Amount in kobo (multiply by 100)
            currency: "NGN",
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a random reference number
            metadata: {
                name: name, // User's name
                phone: phone // User's phone number
            },
            callback: function(response) {
                alert('Payment successful! Transaction reference: ' + response.reference);
                console.log(response);
                // Redirect to success page
                window.location.href = 'success.html'; // Change this to your actual success page URL
            },
            onClose: function() {
                alert('Payment window closed.');
            }
        });
        handler.openIframe();
    }
