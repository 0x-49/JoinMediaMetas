import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface ThumbnailData {
  vidNumber: string;
  URLPath: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoNumber = searchParams.get('videoNumber');

  if (!videoNumber) {
    return NextResponse.json({ error: 'Video number is required' }, { status: 400 });
  }

  try {
    const csvPath = path.join(process.cwd(), 'Thumbnails.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }) as ThumbnailData[];

    const thumbnails = records
      .filter(record => record.vidNumber === videoNumber)
      .map(record => record.URLPath);

    return NextResponse.json({ thumbnails });
  } catch (error) {
    console.error('Error reading thumbnails:', error);
    return NextResponse.json({ error: 'Failed to read thumbnails' }, { status: 500 });
  }
}
