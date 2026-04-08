import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useProducts(series = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [series]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (series && series !== 'All Anime') {
        query = query.eq('series', series);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Map snake_case DB fields to camelCase for our components
      setProducts(data.map(p => ({
        id: p.id,
        name: p.name,
        series: p.series,
        price: p.price,
        oldPrice: p.old_price,
        badge: p.badge,
        badgeColor: p.badge_color,
        img: p.img,
        description: p.description,
        stock: p.stock,
      })));
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setProduct({
        id: data.id,
        name: data.name,
        series: data.series,
        price: data.price,
        oldPrice: data.old_price,
        badge: data.badge,
        badgeColor: data.badge_color,
        img: data.img,
        description: data.description,
        stock: data.stock,
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error };
}
