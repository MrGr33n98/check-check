import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, GripVertical, PlusCircle, Upload, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { api } from '@/middleware/authMiddleware';

const ItemType = 'BANNER';

interface Banner {
  id: number;
  title: string;
  description: string;
  cta_text: string;
  url: string;
  image_url: string;
  background_color: string;
  text_color: string;
  active: boolean;
  position: string;
  display_order: number;
  start_date: string;
  end_date: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

interface DraggableBannerProps {
  banner: Banner;
  index: number;
  moveBanner: (dragIndex: number, hoverIndex: number) => void;
  onUpdate: (id: number, field: keyof Banner, value: any) => void;
  onDelete: (id: number) => void;
  onImageUpload: (id: number, file: File) => void;
}

const DraggableBanner: React.FC<DraggableBannerProps> = ({ banner, index, moveBanner, onUpdate, onDelete, onImageUpload }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveBanner(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(banner.id, e.target.files[0]);
    }
  };

  return (
    <div ref={preview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-4 relative" ref={ref}>
        <button ref={drag} className="absolute top-1/2 -left-2 -translate-y-1/2 cursor-move p-1 text-gray-400 hover:text-gray-600">
          <GripVertical />
        </button>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <Input value={banner.title} onChange={(e) => onUpdate(banner.id, 'title', e.target.value)} placeholder="Title" />
            <Input value={banner.description} onChange={(e) => onUpdate(banner.id, 'description', e.target.value)} placeholder="Description" />
            <Input value={banner.cta_text} onChange={(e) => onUpdate(banner.id, 'cta_text', e.target.value)} placeholder="CTA Text" />
            <Input value={banner.url} onChange={(e) => onUpdate(banner.id, 'url', e.target.value)} placeholder="URL" />
          </div>
          <div className="space-y-3">
            <Select value={banner.position} onValueChange={(value) => onUpdate(banner.id, 'position', value)}>
              <SelectTrigger><SelectValue placeholder="Position" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="homepage_hero">Homepage Hero</SelectItem>
                <SelectItem value="category_sidebar">Category Sidebar</SelectItem>
                <SelectItem value="search_results_top">Search Results Top</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <label>BG Color:</label>
              <Input type="color" value={banner.background_color} onChange={(e) => onUpdate(banner.id, 'background_color', e.target.value)} className="w-12 h-8 p-1" />
              <label>Text Color:</label>
              <Input type="color" value={banner.text_color} onChange={(e) => onUpdate(banner.id, 'text_color', e.target.value)} className="w-12 h-8 p-1" />
            </div>
            <div className="flex items-center gap-2">
              <label>Active:</label>
              <Switch checked={banner.active} onCheckedChange={(checked) => onUpdate(banner.id, 'active', checked)} />
            </div>
            <div className="flex items-center gap-2">
              <label>Start:</label>
              <Input type="date" value={banner.start_date} onChange={(e) => onUpdate(banner.id, 'start_date', e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <label>End:</label>
              <Input type="date" value={banner.end_date} onChange={(e) => onUpdate(banner.id, 'end_date', e.target.value)} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {banner.image_url ? (
                <img src={banner.image_url} alt="Banner" className="mx-auto h-24 object-contain" />
              ) : (
                <div className="text-gray-400">
                  <ImageIcon className="mx-auto h-12 w-12" />
                  <p>No image</p>
                </div>
              )}
              <Input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            <Button variant="destructive" size="sm" onClick={() => onDelete(banner.id)} className="w-full">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BannerManager: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/promotional_banners');
      setBanners(response.data.sort((a: Banner, b: Banner) => a.display_order - b.display_order));
    } catch (error) {
      toast.error('Failed to fetch banners.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const moveBanner = useCallback((dragIndex: number, hoverIndex: number) => {
    setBanners((prevBanners) => {
      const newBanners = [...prevBanners];
      const [draggedBanner] = newBanners.splice(dragIndex, 1);
      newBanners.splice(hoverIndex, 0, draggedBanner);
      return newBanners.map((b, i) => ({ ...b, display_order: i }));
    });
  }, []);

  const handleUpdate = (id: number, field: keyof Banner, value: any) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const handleSaveChanges = async () => {
    try {
      await api.post('/promotional_banners/batch_update', { banners });
      toast.success('Banners saved successfully!');
      fetchBanners();
    } catch (error) {
      toast.error('Failed to save banners.');
      console.error(error);
    }
  };

  const handleAddBanner = async () => {
    try {
      const response = await api.post('/promotional_banners', {
        banner: { title: 'New Banner', active: false, position: 'homepage_hero' },
      });
      setBanners((prev) => [...prev, response.data]);
      toast.success('New banner added.');
    } catch (error) {
      toast.error('Failed to add banner.');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      await api.delete(`/promotional_banners/${id}`);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      toast.success('Banner deleted.');
    } catch (error) {
      toast.error('Failed to delete banner.');
      console.error(error);
    }
  };

  const handleImageUpload = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('banner[image]', file);
    try {
      const response = await api.put(`/promotional_banners/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBanners((prev) => prev.map((b) => (b.id === id ? response.data : b)));
      toast.success('Image uploaded successfully.');
    } catch (error) {
      toast.error('Failed to upload image.');
      console.error(error);
    }
  };

  if (loading) return <div>Loading banners...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 md:p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Banner Management</CardTitle>
            <div className="space-x-2">
              <Button onClick={handleAddBanner}><PlusCircle className="w-4 h-4 mr-2" /> Add Banner</Button>
              <Button onClick={handleSaveChanges} variant="default">Save Changes</Button>
            </div>
          </CardHeader>
          <CardContent>
            {banners.length > 0 ? (
              <div>
                {banners.map((banner, index) => (
                  <DraggableBanner
                    key={banner.id}
                    index={index}
                    banner={banner}
                    moveBanner={moveBanner}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onImageUpload={handleImageUpload}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No banners found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new banner.</p>
                <div className="mt-6">
                  <Button onClick={handleAddBanner}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Banner
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DndProvider>
  );
};

export default BannerManager;
