import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database file paths
const productsFile = 'data/products.json';
const addonsFile = 'data/addons.json';

// Ensure data directory exists
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

// Initialize data files if they don't exist
if (!fs.existsSync(productsFile)) {
  fs.writeFileSync(productsFile, JSON.stringify([], null, 2));
}
if (!fs.existsSync(addonsFile)) {
  fs.writeFileSync(addonsFile, JSON.stringify([], null, 2));
}

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add new product
app.post('/api/products', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    const newProduct = {
      id: Date.now(),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      description: req.body.description || '',
      createdAt: new Date()
    };
    products.push(newProduct);
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all addons
app.get('/api/addons', (req, res) => {
  try {
    const addons = JSON.parse(fs.readFileSync(addonsFile, 'utf8'));
    res.json(addons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addons' });
  }
});

// Add new addon
app.post('/api/addons', (req, res) => {
  try {
    const addons = JSON.parse(fs.readFileSync(addonsFile, 'utf8'));
    const newAddon = {
      id: Date.now(),
      name: req.body.name,
      price: req.body.price,
      createdAt: new Date()
    };
    addons.push(newAddon);
    fs.writeFileSync(addonsFile, JSON.stringify(addons, null, 2));
    res.json({ success: true, addon: newAddon });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add addon' });
  }
});

// Send order via WhatsApp
app.post('/api/send-whatsapp', (req, res) => {
  try {
    const { orderNumber, products, addons, quantity, delivery, cost, notes, total } = req.body;
    const phone = '963956492267';
    
    // Build WhatsApp message
    let message = `*طلب جديد من متجر مثلجات هاواي* 🍦\n\n`;
    message += `*رقم الطلب:* ${orderNumber}\n\n`;
    message += `*المنتجات:*\n`;
    products.forEach(p => {
      message += `• ${p.name} (${p.quantity}) - ${p.price * p.quantity}$\n`;
    });
    if (addons.length > 0) {
      message += `\n*الإضافات:*\n`;
      addons.forEach(a => {
        message += `• ${a.name} (${a.quantity}) - ${a.price * a.quantity}$\n`;
      });
    }
    message += `\n*طريقة الاستلام:* ${delivery.type === 'delivery' ? 'توصيل' : 'استلام من المتجر'}\n`;
    if (delivery.type === 'delivery') {
      message += `*تكلفة التوصيل:* ${delivery.cost}$\n`;
      message += `*مدة التوصيل:* ${delivery.duration}\n`;
    }
    if (notes) {
      message += `*ملاحظات:* ${notes}\n`;
    }
    message += `\n*الإجمالي:* ${total}$`;
    
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    res.json({ success: true, waLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to prepare WhatsApp message' });
  }
});

app.listen(PORT, () => {
  console.log(`✨ Hawaii Ice Cream Shop running on http://localhost:${PORT}`);
});
