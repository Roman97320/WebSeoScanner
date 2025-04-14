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
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">How Your Page Appears in Search Results</h3>
      
      {/* Google SERP Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
          Google Search Result Preview
        </div>
        <div className="p-4">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-xl text-primary-700 font-medium">{serp.title || "Title Missing"}</div>
              <div className="text-green-800 text-sm">{serp.url}</div>
              <div className="text-gray-600 text-sm">
                {serp.description || "Meta description missing. Search engines may generate a description from page content."}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Media Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
          Social Media Preview
        </div>
        <div className="p-4">
          <div className="max-w-sm mx-auto border border-gray-300 rounded-md overflow-hidden">
            {social.imageUrl ? (
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${social.imageUrl})` }}
              ></div>
            ) : (
              <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
                <i className="ri-image-line text-3xl"></i>
                <span className="ml-2">Preview Image Missing</span>
              </div>
            )}
            <div className="p-3">
              <div className="text-base font-medium">{social.title || "Title Missing"}</div>
              <div className="text-sm text-gray-600 mt-1">
                {social.description || "Description missing for social media cards."}
              </div>
              <div className="text-xs text-gray-500 mt-2">{new URL(serp.url).hostname}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCards;
