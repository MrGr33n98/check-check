export interface Banner {
  id: number;
  title: string;
  subtitle?: string | null;
  button_text?: string | null;
  button_url?: string | null;
  button_secondary_text?: string | null;
  button_secondary_url?: string | null;
  background_color: string;
  text_color: string;
  position: 'sidebar' | 'header' | 'footer';
  priority: number;
  background_image_url?: string | null;
  show_title: boolean;
  show_subtitle: boolean;
  overlay_enabled: boolean;
  overlay_color: string;
  overlay_opacity: number;
  text_align: 'left' | 'center' | 'right';
}

export interface BannerList {
  data: Banner[];
}
