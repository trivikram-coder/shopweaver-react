import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.originalPrice && product.discount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="card-product group">
        <Link to={`/product/${product.id}`}>
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            {discountPercentage > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-3 left-3 font-semibold"
              >
                -{discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge 
                variant="secondary" 
                className="absolute top-3 right-3"
              >
                Out of Stock
              </Badge>
            )}
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl flex items-center justify-center">
              <div className="flex space-x-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Add to wishlist functionality
                  }}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="accent"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-accent">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {product.inStock ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddToCart}
                  className="md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  Add to Cart
                </Button>
              ) : (
                <Button variant="secondary" size="sm" disabled>
                  Out of Stock
                </Button>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center space-x-1 mt-3">
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ 
                        backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                       color.toLowerCase() === 'black' ? '#000000' :
                                       color.toLowerCase() === 'blue' ? '#3b82f6' :
                                       color.toLowerCase() === 'red' ? '#ef4444' :
                                       color.toLowerCase() === 'green' ? '#10b981' :
                                       color.toLowerCase() === 'gray' ? '#6b7280' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'silver' ? '#9ca3af' :
                                       color.toLowerCase() === 'rose gold' ? '#f59e0b' :
                                       '#6b7280'
                      }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};