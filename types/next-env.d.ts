/// <reference types="next" />
/// <reference types="next/image-types/global" />

import type { ReactNode } from 'react';

declare module 'react' {
  interface ReactElement {
    type: any;
    props: any;
    key: any | null;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
