from 'react';

interface PromoBannerProps {
  id: number;
  title: string;
  subtitle?: string;
  button_text?: string;
  button_url?: string;
  button_secondary_text?: string;
  button_secondary_url?: string;
  background_color: string;
  text_color: string;
  position: 'sidebar' | 'header' | 'footer';
  priority: number;
  background_image_url?: string;
}

interface PromoBannerComponentProps {
  banner: PromoBannerProps;
  className?: string;
}

export const PromoBanner: React.FC<PromoBannerComponentProps> = ({ banner, className = '' }) => {
  const handleButtonClick = (url?: string) => {
    if (url) {
      if (url.startsWith('http')) {
        window.open(url, '_blank');
      } else {
        window.location.href = url;
      }
    }
  };

  return (
    <div 
      className={`rounded-xl p-6 relative overflow-hidden ${className}`}
      style={{ 
        backgroundImage: banner.background_image_url ? `url(${banner.background_image_url})` : `linear-gradient(135deg, ${banner.background_color}, ${banner.background_color}dd)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Light overlay only for better text readability */}
      <div 
        className="absolute inset-0 rounded-xl bg-black bg-opacity-20"
      />
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3" style={{ color: banner.text_color }}>
          {banner.title}
        </h3>
        
        {banner.subtitle && (
          <p className="text-sm opacity-90 mb-6 leading-relaxed" style={{ color: banner.text_color }}>
            {banner.subtitle}
          </p>
        )}
        
        <div className="flex flex-col gap-3">
          {banner.button_text && (
            <button
              onClick={() => handleButtonClick(banner.button_url)}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              style={{ 
                backgroundColor: banner.background_color,
                color: banner.text_color,
                border: `2px solid ${banner.background_color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = banner.background_color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = banner.background_color;
                e.currentTarget.style.color = banner.text_color;
              }}
            >
              {banner.button_text}
            </button>
          )}
          
          {banner.button_secondary_text && (
            <button
              onClick={() => handleButtonClick(banner.button_secondary_url)}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              style={{ 
                backgroundColor: 'transparent',
                color: banner.text_color,
                border: `2px solid ${banner.text_color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = banner.text_color;
                e.currentTarget.style.color = banner.background_color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = banner.text_color;
              }}
            >
              {banner.button_secondary_text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;