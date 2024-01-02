import React from 'react';

function ContactPage() {
  return (
    <div className="container mx-auto my-10 p-5">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-4">If you have any questions, concerns, or need assistance, please feel free to reach out to us.</p>
        
        <div className="space-y-3">
          <p><strong>Email:</strong> amiketours@gmail.com</p>
          <p><strong>Phone:</strong> +46761426946 or +46729406310</p>
          

          <p>Or connect with us on social media:</p>
          <ul className="list-disc list-inside">
            <li><a href="https://instagram.com/amiketours" className="text-blue-500 hover:underline">Instagram</a></li>
            <li><a href="https://facebook.com/amiketours" className="text-blue-500 hover:underline">Facebook</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
