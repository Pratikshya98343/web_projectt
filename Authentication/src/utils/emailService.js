import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send order confirmation email to customer
 * @param {Object} order - The order object
 * @param {Object} user - The user who placed the order
 * @param {Array} items - The order items
 */
export const sendOrderConfirmationEmail = async (order, user, items) => {
  try {
    // Create a formatted list of items
    const itemsList = items.map(item => 
      `<li>${item.quantity}x ${item.product?.name || 'Product'} - $${item.price.toFixed(2)} each (Subtotal: $${item.subtotal.toFixed(2)})</li>`
    ).join('');

    // Email content
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Caffio Coffee Shop'}" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation #${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">Your Order Has Been Received!</h2>
          <p>Dear ${user.firstName},</p>
          <p>Thank you for your order. We've received your order and are processing it now.</p>
          
          <div style="background-color: #f8f4e5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Order Summary</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Order Status:</strong> ${order.status}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
            
            <h4 style="color: #8B4513;">Items:</h4>
            <ul>
              ${itemsList}
            </ul>
            
            <p><strong>Shipping Address:</strong> ${order.shippingAddress || 'Not provided'}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Standard payment'}</p>
          </div>
          
          <p>We'll send you another email when your order ships. You can also check your order status by logging into your account.</p>
          
          <p>Thank you for shopping with us!</p>
          <p>The Caffio Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

/**
 * Send order status update email to customer
 * @param {Object} order - The updated order
 * @param {Object} user - The user who placed the order
 * @param {String} previousStatus - The previous order status
 */
export const sendOrderStatusUpdateEmail = async (order, user, previousStatus) => {
  try {
    // Skip if status hasn't changed (safety check)
    if (previousStatus === order.status) {
      return;
    }

    // Email content based on status
    let statusMessage = '';
    let subject = '';
    
    switch(order.status) {
      case 'processing':
        subject = `Your Order #${order.orderNumber} is Being Processed`;
        statusMessage = 'We\'re preparing your items for shipment.';
        break;
      case 'shipped':
        subject = `Your Order #${order.orderNumber} Has Shipped!`;
        statusMessage = 'Your order is on its way to you!';
        break;
      case 'delivered':
        subject = `Your Order #${order.orderNumber} Has Been Delivered`;
        statusMessage = 'Your order has been delivered. We hope you enjoy your purchase!';
        break;
      case 'cancelled':
        subject = `Your Order #${order.orderNumber} Has Been Cancelled`;
        statusMessage = 'Your order has been cancelled. If you didn\'t request this cancellation, please contact our customer service.';
        break;
      case 'completed':
        subject = `Your Order #${order.orderNumber} is Complete`;
        statusMessage = 'Your order is now complete. Thank you for shopping with us!';
        break;
      default:
        subject = `Update on Your Order #${order.orderNumber}`;
        statusMessage = `Your order status has been updated to: ${order.status}`;
    }

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Caffio Coffee Shop'}" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B4513;">Order Status Update</h2>
          <p>Dear ${user.firstName},</p>
          
          <p>Your order status has been updated.</p>
          <p>${statusMessage}</p>
          
          <div style="background-color: #f8f4e5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #8B4513; margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Previous Status:</strong> ${previousStatus}</p>
            <p><strong>New Status:</strong> ${order.status}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
          </div>
          
          <p>If you have any questions about your order, please don't hesitate to contact us.</p>
          
          <p>Thank you for shopping with us!</p>
          <p>The Caffio Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order status update email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending order status update email:', error);
  }
};

// Verify transporter connection during startup
transporter.verify((error) => {
  if (error) {
    console.error('Email service error:', error);
  } else {
    console.log('Email service is ready to send messages');
  }
});
