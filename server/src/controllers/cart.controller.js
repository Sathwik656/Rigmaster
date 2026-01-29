import { Cart } from '../models/Cart.model.js';
import { Product } from '../models/Product.model.js';
import { AppError } from '../utils/error.util.js';

export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const addItem = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const product = await Product.findById(productId);
        if (!product) throw new AppError('Product not found', 404);

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const updateItem = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) throw new AppError('Cart not found', 404);

        const item = cart.items.find((i) => i.product.toString() === productId);
        if (!item) throw new AppError('Item not found in cart', 404);

        if (quantity <= 0) {
            cart.items = cart.items.filter((i) => i.product.toString() !== productId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const removeItem = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) throw new AppError('Cart not found', 404);

        cart.items = cart.items.filter((i) => i.product.toString() !== productId);
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (err) {
        next(err);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        next(err);
    }
};
