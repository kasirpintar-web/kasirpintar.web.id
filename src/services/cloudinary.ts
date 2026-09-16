/**
 * Cloudinary Unsigned Upload Service for Kasir Pintar
 * Security: NO API Secret in client-side code.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'tupwxnhg';
const LOGO_PRESET = import.meta.env.VITE_CLOUDINARY_LOGO_PRESET || 'kasirpintar_logo';
const PRODUCT_PRESET = import.meta.env.VITE_CLOUDINARY_PRODUCT_PRESET || 'kasirpintar_product';

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
}

export async function uploadToCloudinary(
  file: File,
  type: 'logo' | 'product'
): Promise<CloudinaryUploadResult> {
  const preset = type === 'logo' ? LOGO_PRESET : PRODUCT_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || 'Gagal mengunggah gambar ke Cloudinary.';
    throw new Error(message);
  }

  const data = await response.json();
  return {
    secureUrl: data.secure_url || data.url,
    publicId: data.public_id,
  };
}

export async function uploadImageToCloudinary(
  file: File,
  type: 'logo' | 'product' = 'product'
): Promise<string> {
  const result = await uploadToCloudinary(file, type);
  return result.secureUrl;
}
