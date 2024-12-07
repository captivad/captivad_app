import * as yup from "yup";
import dotenv from "dotenv";

dotenv.config();
const envSchema = yup.object({
  BREVO_HOST: yup.string().required(),
  BREVO_PORT: yup.string().required(),
  BREVO_EMAIL_AUTH: yup.string().required(),
  BREVO_SMTP_USERNAME: yup.string().required(),
  BREVO_SMTP_PASSWORD: yup.string().required(),

  BREVO_API_KEY: yup.string().required(),
  BREVO_BASE_API: yup.string().required(),

  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: yup.string().required(),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: yup.string().required(),
  CLOUDINARY_API_SECRET: yup.string().required(),
  CLOUDINARY_UPLOAD_PRESET: yup.string().required(),

  NEXT_PUBLIC_BASE_URL: yup.string().required(),
});

const validatedEnv = () => {
  try {
    return envSchema.validateSync(process.env, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    console.error("Environment validation errors:", error.errors);
    process.exit(1);
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: validatedEnv(),
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
