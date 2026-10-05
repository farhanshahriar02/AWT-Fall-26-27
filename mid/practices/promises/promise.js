function processOrder() {
    return new Promise((resolve, reject) => {
        console.log("Processing order...");

        setTimeout(() => {
            let success = true;

            if (success) {
                resolve({
                    orderId: 42017,
                    customer: "Farhan Shahriar",
                    item: "Chicken Burger",
                    quantity: 2,
                    total: 500
                });
            } else {
                reject("Failed to process the order");
            }
        }, 3000);
    });
}

processOrder()
    .then((order) => {
        console.log("Order ID:", order.orderId);
        console.log("Customer:", order.customer);
        console.log("Item:", order.item);
        console.log("Quantity:", order.quantity);
        console.log("Total Amount:", order.total);
    })
    .catch((error) => {
        console.log("Error:", error);
    })
    .finally(() => {
        console.log("Order processing completed");
    });