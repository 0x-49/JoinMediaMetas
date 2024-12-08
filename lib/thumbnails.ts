'use client';

import { parse } from 'csv-parse/sync';

interface ThumbnailData {
  vidNumber: string;
  URLPath: string;
}

export async function getThumbnailsForVideo(videoNumber: string): Promise<string[]> {
  try {
    const response = await fetch('/api/thumbnails?videoNumber=' + videoNumber);
    const data = await response.json();
    return data.thumbnails;
  } catch (error) {
    console.error('Error fetching thumbnails:', error);
    return [];
  }
}
