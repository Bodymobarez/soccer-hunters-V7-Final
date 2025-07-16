import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import axios from "axios";

// جلب كائن OpenAI باستخدام API Key مع معالجة الأخطاء
let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } else {
    console.warn("OPENAI_API_KEY is not set. OpenAI features will be disabled.");
  }
} catch (error) {
  console.error("Failed to initialize OpenAI client:", error);
}

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

// دالة لإنشاء صور لمشاهد توقيع العقود باستخدام DALL-E
async function generateSigningCeremonyImages(numImages: number = 4): Promise<string[]> {
  // إذا لم يكن OpenAI متاحاً، نعيد صور نموذجية
  if (!openai) {
    console.log("OpenAI not available, returning sample images");
    return [
      "/images/signing_ceremony_1.jpg",
      "/images/signing_ceremony_2.jpg", 
      "/images/signing_ceremony_3.jpg",
      "/images/signing_ceremony_4.jpg"
    ];
  }

  const prompts = [
    "Professional football player signing contract with major club, business setting, agent nearby, formal attire, press cameras, handshake moment, Arabic setting, realistic photographic style, clear faces",
    "Football signing ceremony, Arab soccer player with club official, agent present, contract on desk, professional lighting, press conference setup, photorealistic style",
    "Soccer player signing new club contract, business meeting room with club logo, agent and club president watching, Arabic style interior, photojournalistic style",
    "Close up of football transfer contract signing, pen on paper, Arabic footballer, club manager and agent in background, professional photography style"
  ];

  // انشاء مجلد الصور إذا لم يكن موجوداً
  const imagesDir = path.join(process.cwd(), 'public', 'generated-images');
  if (!fs.existsSync(imagesDir)) {
    await mkdirAsync(imagesDir, { recursive: true });
  }

  const imagePaths: string[] = [];

  for (let i = 0; i < Math.min(numImages, prompts.length); i++) {
    try {
      // إنشاء الصورة باستخدام DALL-E 3
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompts[i],
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      // الحصول على URL الصورة
      const imageUrl = response.data?.[0]?.url;
      
      if (imageUrl) {
        // تنزيل الصورة
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageName = `signing_ceremony_${i + 1}.png`;
        const imagePath = path.join(imagesDir, imageName);
        
        // حفظ الصورة محلياً
        await writeFileAsync(imagePath, Buffer.from(imageResponse.data));
        
        // إضافة مسار الصورة إلى المصفوفة
        imagePaths.push(`/generated-images/${imageName}`);
        
        console.log(`Image ${i + 1} generated and saved to ${imagePath}`);
      }
    } catch (error) {
      console.error(`Error generating image ${i + 1}:`, error);
    }
  }

  return imagePaths;
}

// دالة لإنشاء وصف متحرك لكل صورة باستخدام GPT-4
async function generateImageCaptions(numCaptions: number = 4): Promise<string[]> {
  // إذا لم يكن OpenAI متاحاً، نعيد تسميات نموذجية
  if (!openai) {
    console.log("OpenAI not available, returning sample captions");
    return [
      "لحظة تاريخية في مسيرة اللاعب مع توقيع عقد جديد",
      "احتفالية توقيع عقد انتقال مثيرة في عالم كرة القدم",
      "لحظة تغيير مسار المهنة مع توقيع عقد جديد",
      "توقيع عقد تاريخي بين نجم وناد عريق"
    ];
  }

  const captions: string[] = [];
  
  const captionPrompts = [
    "Write a short, exciting caption in Arabic about a football player signing a new contract with a club",
    "Write a brief, enthusiastic caption in Arabic describing a football transfer signing ceremony",
    "Write a short, dramatic caption in Arabic about a footballer's career-changing moment signing with a new team",
    "Write a concise, powerful caption in Arabic about a historic contract signing between a star player and a prestigious club"
  ];

  for (let i = 0; i < Math.min(numCaptions, captionPrompts.length); i++) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // استخدام أحدث نموذج من OpenAI
        messages: [
          {
            role: "system",
            content: "You are a sports journalist who writes concise, exciting captions for football transfer news. Write in fluent Arabic with professional sports terminology."
          },
          {
            role: "user",
            content: captionPrompts[i]
          }
        ],
        max_tokens: 100
      });

      const caption = completion.choices[0].message.content;
      if (caption) {
        captions.push(caption.trim());
        console.log(`Caption ${i + 1} generated: ${caption}`);
      }
    } catch (error) {
      console.error(`Error generating caption ${i + 1}:`, error);
      captions.push("لحظة تاريخية في مسيرة اللاعب مع توقيع عقد جديد"); // نص بديل في حالة الخطأ
    }
  }

  return captions;
}

// دالة رئيسية لإنشاء بيانات الفيديو الترويجي
export async function generateSigningVideoData(): Promise<{images: string[], captions: string[]}> {
  const NUM_SCENES = 4;
  
  console.log("Generating signing ceremony images...");
  const images = await generateSigningCeremonyImages(NUM_SCENES);
  
  console.log("Generating captions for the images...");
  const captions = await generateImageCaptions(NUM_SCENES);
  
  return {
    images,
    captions
  };
}
