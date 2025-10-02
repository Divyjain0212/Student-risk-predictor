// Cloud storage adapter for Vercel compatibility
import { NextRequest } from 'next/server';

export interface StorageAdapter {
  uploadFile(file: File, path: string): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): Promise<string>;
}

// Vercel Blob Storage implementation
export class VercelBlobStorage implements StorageAdapter {
  async uploadFile(file: File, path: string): Promise<string> {
    // Implementation for Vercel Blob Storage
    // Alternative: Use AWS S3, Cloudinary, or other cloud storage
    throw new Error('Implement cloud storage for production');
  }

  async deleteFile(path: string): Promise<void> {
    throw new Error('Implement cloud storage for production');
  }

  async getFileUrl(path: string): Promise<string> {
    throw new Error('Implement cloud storage for production');
  }
}

// Temporary memory storage for development
export class MemoryStorage implements StorageAdapter {
  private files = new Map<string, File>();

  async uploadFile(file: File, path: string): Promise<string> {
    this.files.set(path, file);
    return `memory://${path}`;
  }

  async deleteFile(path: string): Promise<void> {
    this.files.delete(path);
  }

  async getFileUrl(path: string): Promise<string> {
    return `memory://${path}`;
  }
}

export const storage = process.env.NODE_ENV === 'production' 
  ? new VercelBlobStorage()
  : new MemoryStorage();