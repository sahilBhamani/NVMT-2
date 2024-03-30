
        // Define inventory data
const inventoryData = [
    { name: "Lettuce", category: "Vegetables", quantity: 10, unitPrice: 1.50, supplier: "Supplier A" },
    { name: "Tomatoes", category: "Vegetables", quantity: 15, unitPrice: 1.80, supplier: "Supplier B" },
    { name: "Onions", category: "Vegetables", quantity: 8, unitPrice: 1.20, supplier: "Supplier C" },
    { name: "Bell Peppers", category: "Vegetables", quantity: 12, unitPrice: 1.75, supplier: "Supplier D" },
    { name: "Carrots", category: "Vegetables", quantity: 20, unitPrice: 1.30, supplier: "Supplier E" },
    { name: "Chicken Breast", category: "Meat", quantity: 20, unitPrice: 4.00, supplier: "Supplier F" },
    { name: "Ground Beef", category: "Meat", quantity: 15, unitPrice: 5.50, supplier: "Supplier G" },
    { name: "Pork Chops", category: "Meat", quantity: 12, unitPrice: 6.75, supplier: "Supplier H" },
    { name: "Salmon Fillet", category: "Meat", quantity: 18, unitPrice: 8.50, supplier: "Supplier I" },
    { name: "Lamb Rack", category: "Meat", quantity: 10, unitPrice: 9.25, supplier: "Supplier J" },
    { name: "Frozen Fries", category: "Frozen Items", quantity: 30, unitPrice: 2.00, supplier: "Supplier K" },
    { name: "Frozen Fish", category: "Frozen Items", quantity: 25, unitPrice: 6.00, supplier: "Supplier L" },
    { name: "Frozen Pizza", category: "Frozen Items", quantity: 20, unitPrice: 5.50, supplier: "Supplier M" },
    { name: "Soda Cans", category: "Beverages", quantity: 50, unitPrice: 0.50, supplier: "Supplier N" },
    { name: "Bottled Water", category: "Beverages", quantity: 40, unitPrice: 0.30, supplier: "Supplier O" },
    { name: "Orange Juice", category: "Beverages", quantity: 30, unitPrice: 1.20, supplier: "Supplier P" },
    { name: "Iced Tea", category: "Beverages", quantity: 35, unitPrice: 1.00, supplier: "Supplier Q" }
];


        //// Update the showProduceOptions function to include supplier options
    function showProduceOptions(category) {
    const produceOptions = document.querySelectorAll('.produce-options');
    produceOptions.forEach(option => {
        if (option.id === category || option.classList.contains('supplier-options')) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
}


        // Function to calculate weight in pounds
        function calculateWeightInPounds(quantity) {
            return (quantity * 0.5).toFixed(2); // Assuming each unit is 0.5 lbs
        }

       // Define the URL of the server
const serverUrl = 'http://localhost:3000';

// Function to add item to cart
function addItemToCart() {
    const selectedCategory = document.getElementById("category").value;
    let selectedProduce;
    let selectedWeight;

    switch (selectedCategory) {
        case 'vegetables':
            selectedProduce = document.getElementById("vegetableProduce").value;
            selectedWeight = calculateWeightInPounds(document.getElementById("quantity").value);
            document.getElementById("vegetableWeight").textContent = selectedWeight + " lbs";
            break;
        case 'meat':
            selectedProduce = document.getElementById("meatProduce").value;
            selectedWeight = calculateWeightInPounds(document.getElementById("quantity").value);
            document.getElementById("meatWeight").textContent = selectedWeight + " lbs";
            break;
        case 'frozen':
            selectedProduce = document.getElementById("frozenProduce").value;
            break;
        case 'beverages':
            selectedProduce = document.getElementById("beverageProduce").value;
            break;
        default:
            break;
    }

    const selectedQuantity = document.getElementById("quantity").value;
    const selectedItem = inventoryData.find(item => item.name === selectedProduce);
    const totalPrice = selectedItem.unitPrice * selectedQuantity;

    // Create a new row for the cart table
    const newRow = document.createElement("tr");

    // Fill the row with data
    newRow.innerHTML = `
        <td>${selectedItem.name}</td>
        <td>${selectedItem.category}</td>
        <td>${selectedQuantity}</td>
        <td>${selectedItem.supplier}</td>
        <td>$${selectedItem.unitPrice.toFixed(2)}</td>
        <td>$${totalPrice.toFixed(2)}</td>
        <td><button class="remove-btn" onclick="removeItem(this)">Remove</button></td>
    `;

    // Append the new row to the cart table
    document.querySelector("#cartTable tbody").appendChild(newRow);

    // Calculate and display total price
    const currentTotalPrice = parseFloat(document.getElementById("totalPrice").textContent.split(":")[1].trim().replace('$', ''));
    const newTotalPrice = currentTotalPrice + totalPrice;
    document.getElementById("totalPrice").textContent = `Total Price: $${newTotalPrice.toFixed(2)}`;

    // Send a POST request to the server to add the item to the cart
    const data = {
        name: selectedItem.name,
        category: selectedItem.category,
        quantity: selectedQuantity,
        supplier: selectsuppler,
        unitPrice: selectedItem.unitPrice
    };

    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }
    })
    .catch(error => {
        console.error('Error adding item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
    });
}


        // Function to remove item
        function removeItem(button) {
            const row = button.parentNode.parentNode;
            const totalPrice = parseFloat(row.cells[4].textContent.replace('$', ''));

            // Remove the row from the table
            row.parentNode.removeChild(row);

            // Update total price
            const currentTotalPrice = parseFloat(document.getElementById("totalPrice").textContent.split(":")[1].trim().replace('$', ''));
            const newTotalPrice = currentTotalPrice - totalPrice;
            document.getElementById("totalPrice").textContent = `Total Price: $${newTotalPrice.toFixed(2)}`;
        }

        // Event listener for category select change
        document.getElementById("category").addEventListener("change", function() {
            const selectedCategory = this.value;
            showProduceOptions(selectedCategory);
        });

        // Event listener for add button click
        document.getElementById("addBtn").addEventListener("click", addItemToCart);

        // Initially show produce options based on default category
        showProduceOptions(document.getElementById("category").value);
  