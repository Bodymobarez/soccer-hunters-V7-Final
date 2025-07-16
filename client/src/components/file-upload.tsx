import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Check, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface FileUploadProps {
  title?: string;
  description?: string;
  type?: "image" | "document" | "video";
  onSuccess?: (fileUrl: string) => void;
}

const FileUpload = ({
  title = "رفع ملف",
  description = "اختر الملف الذي ترغب برفعه",
  type = "image",
  onSuccess,
}: FileUploadProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileDescription, setFileDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadedUrl(null); // Reset uploaded URL when new file is selected
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار ملف أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append(type, file);
      if (fileDescription) {
        formData.append("description", fileDescription);
      }

      const response = await fetch(`/api/upload/${type}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`حدث خطأ أثناء رفع الملف: ${response.statusText}`);
      }

      const result = await response.json();
      setUploadedUrl(result.fileUrl);
      toast({
        title: "تم الرفع بنجاح",
        description: "تم رفع الملف بنجاح",
        variant: "default",
      });

      if (onSuccess && result.fileUrl) {
        onSuccess(result.fileUrl);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء رفع الملف:", error);
      toast({
        title: "خطأ",
        description: `حدث خطأ أثناء رفع الملف: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Function to get file type label in Arabic
  const getFileTypeLabel = () => {
    switch (type) {
      case "image":
        return "صورة";
      case "document":
        return "مستند";
      case "video":
        return "فيديو";
      default:
        return "ملف";
    }
  };

  // Get accepted file types based on type prop
  const getAcceptedFileTypes = () => {
    switch (type) {
      case "image":
        return "image/jpeg,image/png,image/gif,image/webp";
      case "document":
        return "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "video":
        return "video/mp4,video/mpeg,video/quicktime";
      default:
        return "*/*";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">{`اختر ${getFileTypeLabel()} للرفع`}</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept={getAcceptedFileTypes()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">وصف الملف (اختياري)</Label>
          <Textarea
            id="description"
            placeholder="أدخل وصفاً للملف"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
          />
        </div>

        {uploadedUrl && (
          <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-md">
            <Check className="h-5 w-5 mr-2" />
            <span>تم رفع الملف بنجاح!</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              جارٍ الرفع...
            </>
          ) : (
            <>
              <UploadCloud className="h-5 w-5 ml-2" />
              رفع الملف
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
