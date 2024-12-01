export interface ICloudinaryAssetResponse {
  asset_id: string; // Unique identifier for the asset
  public_id: string; // Public identifier for accessing the asset
  format: string; // File format (e.g., png, jpg)
  version: number; // Version number of the asset
  resource_type: string; // Type of the resource (e.g., image, video)
  type: string; // Type of upload (e.g., upload, fetch)
  created_at: string; // Creation timestamp in ISO format
  bytes: number; // Size of the file in bytes
  width: number; // Width of the asset in pixels
  height: number; // Height of the asset in pixels
  asset_folder: string; // Folder where the asset is stored (empty if root)
  display_name: string; // Display name for the asset
  access_mode: string; // Access mode (e.g., public, authenticated)
  url: string; // URL to access the asset
  secure_url: string; // Secure HTTPS URL to access the asset
}
