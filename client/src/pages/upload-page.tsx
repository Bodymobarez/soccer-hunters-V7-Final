import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileUpload from "@/components/file-upload";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

const UploadPage = () => {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: string[];
  }>({
    image: [],
    document: [],
    video: [],
  });

  const handleUploadSuccess =
    (type: "image" | "document" | "video") => (fileUrl: string) => {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: [...prev[type], fileUrl],
      }));
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">رفع الملفات</h1>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="image">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="image">صور</TabsTrigger>
            <TabsTrigger value="document">مستندات</TabsTrigger>
            <TabsTrigger value="video">فيديوهات</TabsTrigger>
          </TabsList>

          <TabsContent value="image">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FileUpload
                  type="image"
                  title="رفع صورة"
                  description="يمكنك رفع صور بصيغة JPEG, PNG, GIF, أو WEBP"
                  onSuccess={handleUploadSuccess("image")}
                />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>الصور المرفوعة</CardTitle>
                    <CardDescription>صورك التي تم رفعها مؤخراً</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadedFiles.image.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {uploadedFiles.image.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Uploaded image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-6">
                        لم يتم رفع أي صور بعد
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="document">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FileUpload
                  type="document"
                  title="رفع مستند"
                  description="يمكنك رفع مستندات بصيغة PDF, DOC, أو DOCX"
                  onSuccess={handleUploadSuccess("document")}
                />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>المستندات المرفوعة</CardTitle>
                    <CardDescription>
                      المستندات التي تم رفعها مؤخراً
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadedFiles.document.length > 0 ? (
                      <ul className="space-y-2">
                        {uploadedFiles.document.map((url, index) => (
                          <li key={index}>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              مستند {index + 1}
                              <svg
                                className="w-4 h-4 ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-center py-6">
                        لم يتم رفع أي مستندات بعد
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FileUpload
                  type="video"
                  title="رفع فيديو"
                  description="يمكنك رفع فيديوهات بصيغة MP4, MPEG, أو MOV"
                  onSuccess={handleUploadSuccess("video")}
                />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>الفيديوهات المرفوعة</CardTitle>
                    <CardDescription>
                      الفيديوهات التي تم رفعها مؤخراً
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {uploadedFiles.video.length > 0 ? (
                      <div className="space-y-4">
                        {uploadedFiles.video.map((url, index) => (
                          <div key={index}>
                            <p className="font-medium mb-1">
                              فيديو {index + 1}
                            </p>
                            <video
                              src={url}
                              controls
                              className="w-full rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-6">
                        لم يتم رفع أي فيديوهات بعد
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UploadPage;
