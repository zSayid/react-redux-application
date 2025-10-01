import React from "react";
import QRCode from "react-qr-code";
import "../style/receipt.css";
import { FaReceipt } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfReceipt from "./PdfReceipt"; // PDF component


const Receipt = ({ items, total, paymentMethod }) => {

  const date = new Date().toLocaleString();
  const taxRate = 0.12;
  const taxAmount = total * taxRate;
  const grandTotal = total + taxAmount;
  const terminal = "NodirShop Terminal #001";
  const receiptId = `R-${Date.now()}`;

  const qrData = `Receipt ID: ${receiptId}\nDate: ${date}\nTotal: $${grandTotal.toFixed(2)}\nMethod: ${paymentMethod}`;

  return (
    <div className="receipt-container">
      <h2 className="receipt-title">
        <FaReceipt className="me-2" /> Payment Receipt
      </h2>
      <p><strong>Receipt ID:</strong> {receiptId}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Terminal:</strong> {terminal}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <table className="table">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><strong>Subtotal:</strong> ${total.toFixed(2)}</p>
      <p><strong>Tax (12%):</strong> ${taxAmount.toFixed(2)}</p>
      <p><strong>Total:</strong> ${grandTotal.toFixed(2)}</p>

      <div className="qr-section">
        <QRCode value={qrData} />
        <p className="mt-2">Scan to verify payment</p>
      </div>

      {/* PDF Download Button */}
      <div className="pdf-download">
        <PDFDownloadLink
          document={
            <PdfReceipt
              items={items}
              total={total}
              paymentMethod={paymentMethod}
              receiptId={receiptId}
              date={date}
              terminal={terminal}
            />
          }
          fileName="receipt.pdf"
        >
          {({ loading }) =>
            loading ? "Preparing PDF..." : (
              <button className="btn btn-success mt-3">Download PDF</button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Receipt;