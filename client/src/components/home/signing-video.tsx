import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

type SigningVideoData = {
  images: string[];
  captions: string[];
};

export default function SigningVideo() {
  const { t } = useTranslation();
  const [videoData, setVideoData] = useState<SigningVideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/signing-video");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setVideoData(data);
      } catch (err: any) {
        console.error("Error fetching signing video data:", err);
        setError(err.message || t('errorLoadingData'));
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  // تغيير الصورة كل 5 ثوانٍ
  useEffect(() => {
    if (!videoData || videoData.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % videoData.images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [videoData]);

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto mt-4" />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <Skeleton className="h-96 w-full lg:w-1/2 rounded-lg" />
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-full mt-4" />
              <Skeleton className="h-6 w-5/6 mt-2" />
              <Skeleton className="h-6 w-4/5 mt-2" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !videoData || videoData.images.length === 0) {
    return (
      <section className="py-12 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("signingVideoErrorTitle")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {error || t("signingVideoErrorMessage")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t("signingVideoTitle")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("signingVideoSubtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
          <div className="relative w-full lg:w-1/2 h-96 overflow-hidden">
            {videoData.images.map((imageSrc, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentImageIndex === index ? 1 : 0,
                  scale: currentImageIndex === index ? 1 : 1.1
                }}
                transition={{ duration: 1.2 }}
              >
                <img
                  src={imageSrc}
                  alt={`${t("signingVideoImageAlt")} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
            
            {/* مؤشرات الشرائح */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
              {videoData.images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`عرض الشريحة ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="h-full flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("signingVideoCaptionTitle")}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                {videoData.captions[currentImageIndex] || 
                  t("signingVideoDefaultCaption")
                }
              </p>
              <div className="mt-8">
                <button 
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md shadow-md transition-transform transform hover:scale-105"
                  onClick={() => window.location.href = '/talents'}
                >
                  {t("signingVideoExploreButton")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
