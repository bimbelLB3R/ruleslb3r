import axios from 'axios';

export default function TesCharge() {
  const handlePayment = () => {
    const options = {
      method: 'POST',
      url: 'https://api.sandbox.midtrans.com/v2/charge',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization:
          'Basic U0ItTWlkLXNlcnZlci1FZE5hbHZySWMxUENyY0RvVlZPbnBSVjI6',
      },
      data: {
        payment_type: 'gopay',
        transaction_details: { order_id: 'order-id-123', gross_amount: 100000 },
        item_details: [{ id: 'id1', price: 100000, quantity: 1, name: 'name' }],
        customer_details: {
          first_name: 'Budi',
          last_name: 'Utomo',
          email: 'budi.utomo@midtrans.com',
          phone: '081223323423',
        },
        custom_field1: 'custom field 1 content',
        custom_field2: 'custom field 2 content',
        custom_field3: 'custom field 3 content',
        custom_expiry: { expiry_duration: 60, unit: 'minute' },
        metadata: { you: 'can', put: 'any', parameter: 'you like' },
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handlePayment}>Process Payment</button>
    </div>
  );
}
