'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, deleteProduct } from '@/lib/products';
import { Product, CATEGORIES } from '@/lib/types';
import { getImageUrl } from '@/lib/supabase';
import { Plus, Edit2, Trash2, LogOut, Package, Eye, BarChart3, AlertTriangle, CheckCircle, XCircle, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ProductForm from '@/components/admin/ProductForm';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('msa_admin_auth');
    if (isAuth !== 'true') {
      router.push('/admin');
      return;
    }
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    const success = await deleteProduct(id);
    if (success) {
      toast.success('Product deleted');
      loadProducts();
    } else {
      toast.error('Failed to delete product');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('msa_admin_auth');
    router.push('/admin');
  };

  const filteredProducts = products
    .filter((p) => !filterCategory || p.category === filterCategory)
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand?.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalInStock = products.filter((p) => p.stock_quantity > 0).length;
  const totalOutOfStock = products.filter((p) => p.stock_quantity === 0).length;
  const totalLowStock = products.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= 3).length;

  if (showForm || editProduct) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 md:py-8">
        <div className="container-custom">
          <ProductForm
            product={editProduct}
            onSave={() => {
              setShowForm(false);
              setEditProduct(null);
              loadProducts();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Product Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage your medical equipment catalog</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowForm(true)} className="btn-accent flex items-center gap-2 !py-2.5 !px-4 text-sm !rounded-xl">
              <Plus size={16} /> Add Product
            </button>
            <Link href="/" target="_blank" className="btn-outline flex items-center gap-2 !py-2.5 !px-4 text-sm !rounded-xl">
              <Eye size={16} /> View Site
            </Link>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2 text-sm font-semibold">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { label: 'Total Products', value: products.length, icon: BarChart3, color: 'bg-primary-50 text-primary-500', border: 'border-primary-100' },
            { label: 'In Stock', value: totalInStock, icon: CheckCircle, color: 'bg-green-50 text-green-500', border: 'border-green-100' },
            { label: 'Out of Stock', value: totalOutOfStock, icon: XCircle, color: 'bg-red-50 text-red-500', border: 'border-red-100' },
            { label: 'Low Stock', value: totalLowStock, icon: AlertTriangle, color: 'bg-amber-50 text-amber-500', border: 'border-amber-100' },
          ].map(({ label, value, icon: Icon, color, border }) => (
            <div key={label} className={`bg-white rounded-2xl p-4 md:p-5 border ${border} shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent-100 focus:border-accent-400 outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setFilterCategory('')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                !filterCategory ? 'bg-primary-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All ({products.length})
            </button>
            {CATEGORIES.filter((cat) => products.some((p) => p.category === cat.slug)).map((cat) => {
              const count = products.filter((p) => p.category === cat.slug).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setFilterCategory(cat.slug)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    filterCategory === cat.slug ? 'bg-primary-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="card p-10 text-center">
            <Package size={40} className="text-gray-200 mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-700 mb-2">
              {searchQuery ? 'No matching products' : 'No Products Yet'}
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              {searchQuery ? 'Try a different search term' : 'Add your first product to get started'}
            </p>
            {!searchQuery && (
              <button onClick={() => setShowForm(true)} className="btn-accent inline-flex items-center gap-2 !text-sm">
                <Plus size={16} /> Add Product
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="relative w-full sm:w-16 h-28 sm:h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={product.images?.[0] ? getImageUrl(product.images[0]) : '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 truncate">{product.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="text-[10px] bg-accent-50 text-accent-700 px-2 py-0.5 rounded-md font-semibold">
                      {CATEGORIES.find((c) => c.slug === product.category)?.name || product.category}
                    </span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">
                      {product.condition}
                    </span>
                    {product.brand && (
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-medium">
                        {product.brand}
                      </span>
                    )}
                  </div>
                </div>
                {/* Stock */}
                <div className="shrink-0">
                  {product.stock_quantity > 3 ? (
                    <span className="badge-stock-high text-[10px]">{product.stock_quantity} in stock</span>
                  ) : product.stock_quantity > 0 ? (
                    <span className="badge-stock-low text-[10px]">{product.stock_quantity} left</span>
                  ) : (
                    <span className="badge-stock-out text-[10px]">Out of stock</span>
                  )}
                </div>
                {/* Price */}
                <div className="text-right shrink-0 hidden md:block">
                  {product.price ? (
                    <p className="font-bold text-sm text-primary-500">PKR {product.price.toLocaleString()}</p>
                  ) : (
                    <p className="text-xs text-gray-400 font-medium">{product.price_label || 'Contact'}</p>
                  )}
                </div>
                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
