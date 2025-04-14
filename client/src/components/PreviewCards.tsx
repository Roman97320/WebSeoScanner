interface PreviewCardProps {
  serp: {
    title: string;
    url: string;
    description: string;
  };
  social: {
    title: string;
    description: string;
    imageUrl?: string;
  };
}

const PreviewCards = ({ serp, social }: PreviewCardProps) => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-6">How Your Page Appears in Search Results</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Google SERP Preview */}
        <div className="card shadow-md overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-4 py-3 flex items-center">
            <i className="ri-google-line text-primary mr-2"></i>
            <h4 className="font-medium">Google Search Result Preview</h4>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <div className="text-xl text-primary font-medium truncate">{serp.title || "Title Missing"}</div>
              <div className="text-green-700 text-sm truncate">{serp.url}</div>
              <div className="text-gray-600 text-sm line-clamp-3">
                {serp.description || "Meta description missing. Search engines may generate a description from page content."}
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media Preview */}
        <div className="card shadow-md overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-4 py-3 flex items-center">
            <i className="ri-share-line text-primary mr-2"></i>
            <h4 className="font-medium">Social Media Preview</h4>
          </div>
          <div className="p-6">
            <div className="border border-border rounded-md overflow-hidden shadow-sm">
              {social.imageUrl ? (
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${social.imageUrl})` }}
                ></div>
              ) : (
                <div className="bg-background h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <i className="ri-image-line text-4xl"></i>
                    <p className="mt-2">Preview Image Missing</p>
                  </div>
                </div>
              )}
              <div className="p-4">
                <div className="text-base font-medium line-clamp-1">{social.title || "Title Missing"}</div>
                <div className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {social.description || "Description missing for social media cards."}
                </div>
                <div className="text-xs text-gray-500 mt-3 flex items-center">
                  <i className="ri-global-line mr-1"></i> 
                  {new URL(serp.url).hostname}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 bg-background/50 p-4 rounded-md border border-border">
        <div className="flex items-start">
          <i className="ri-information-line text-primary mt-0.5 mr-2"></i>
          <p>These previews show how your page may appear in search results and social media shares. 
          Well-optimized titles and descriptions can significantly improve click-through rates.</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewCards;
