import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useDispatch } from "react-redux";
import { clearCart } from "../slice/cart.slice";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
});

const PdfReceipt = ({ items, total, paymentMethod, receiptId, date, terminal }) => {
  const tax = total * 0.12;
  const grandTotal = total + tax;

  const dispatch = useDispatch();
    dispatch(clearCart());

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>🧾 Payment Receipt</Text>
        <View style={styles.section}>
          <Text>Receipt ID: {receiptId}</Text>
          <Text>Date: {date}</Text>
          <Text>Terminal: {terminal}</Text>
          <Text>Payment Method: {paymentMethod}</Text>
        </View>

        <View style={styles.section}>
          <Text>Items:</Text>
          {items.map(item => (
            <View key={item._id} style={styles.row}>
              <Text>{item.title} ({item.brand})</Text>
              <Text>{item.quantity} x ${item.price.toFixed(2)} = ${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text>Subtotal: ${total.toFixed(2)}</Text>
          <Text>Tax (12%): ${tax.toFixed(2)}</Text>
          <Text>Total: ${grandTotal.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfReceipt;