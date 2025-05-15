import * as Tesseract from 'tesseract.js';
import * as path from 'path';

export async function imageToText(): Promise<{
  rawText: string;
  expirationDate: string | null;
}> {
  const imagePath = path.join(process.cwd(), 'assets', 'pollution.jpeg');

  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, 'eng');

  const match = text.match(/Validity upto[:\s]*([\d/-]+)/i);
  const expirationDate = match ? match[1] : null;

  return {
    rawText: text,
    expirationDate,
  };
}
