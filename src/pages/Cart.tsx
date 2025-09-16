import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

export const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, itemCount } = useCart();

  const subtotal = total;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 99 ? 0 : 9.99;
  const finalTotal = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Looks like you haven't added anything to your cart yet
            </p>
            <Button asChild variant="accent" size="lg">
              <Link to="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="block hover:text-accent transition-colors"
                          >
                            <h3 className="font-semibold text-lg mb-1">
                              {item.product.name}
                            </h3>
                          </Link>
                          
                          <p className="text-muted-foreground text-sm mb-2">
                            {item.product.description.length > 100
                              ? `${item.product.description.substring(0, 100)}...`
                              : item.product.description
                            }
                          </p>

                          <div className="flex items-center space-x-4 mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {item.product.category}
                            </Badge>
                            {item.selectedColor && (
                              <span className="text-sm text-muted-foreground">
                                Color: {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="text-sm text-muted-foreground">
                                Size: {item.selectedSize}
                              </span>
                            )}
                          </div>

                          {/* Price and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-accent">
                                ${item.product.price.toFixed(2)}
                              </span>
                              {item.product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="mt-2 text-right">
                            <span className="text-sm text-muted-foreground">
                              Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="card-elevated sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge variant="secondary" className="text-xs">FREE</Badge>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="p-3 bg-accent-light rounded-lg">
                    <p className="text-sm text-accent-foreground">
                      Add ${(99 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-accent">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild variant="accent" size="lg" className="w-full">
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>

                {/* Security Badge */}
                <div className="text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    🔒 Secure checkout with SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};