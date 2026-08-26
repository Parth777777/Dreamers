declare module "@/components/AccordionGallery" {
  type AccordionItem = {
    image: string;
    label: string;
    link: string;
    alt?: string;
  };

  type AccordionGalleryProps = {
    items?: AccordionItem[];
    defaultIndex?: number;
    accentColor?: string;
    overlayColor?: string;
    textColor?: string;
    height?: number;
    gap?: number;
    radius?: number;
    expandRatio?: number;
    orientation?: "horizontal" | "vertical";
    duration?: number;
    ease?: string;
    parallax?: number;
    tilt?: number;
    stagger?: number;
    trigger?: "hover" | "click";
    showLabels?: boolean;
    grayscale?: boolean;
    className?: string;
  };

  export default function AccordionGallery(props: AccordionGalleryProps): JSX.Element;
}

declare module "@/components/CircularGallery" {
  type CircularGalleryItem = {
    image: string;
    text?: string;
  };

  type CircularGalleryProps = {
    items?: CircularGalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    scrollSpeed?: number;
    scrollEase?: number;
  };

  export default function CircularGallery(props: CircularGalleryProps): JSX.Element;
}

declare module "@/components/FlyingPosters" {
  type FlyingPostersProps = {
    items?: string[];
    planeWidth?: number;
    planeHeight?: number;
    distortion?: number;
    scrollEase?: number;
    cameraFov?: number;
    cameraZ?: number;
    className?: string;
  };

  export default function FlyingPosters(props: FlyingPostersProps): JSX.Element;
}

declare module "@/components/Stack" {
  type StackCard = {
    id: string;
    img?: string;
    alt?: string;
    content?: React.ReactNode;
    reel?: unknown;
  };

  type StackProps = {
    cards?: StackCard[];
    randomRotation?: boolean;
    sensitivity?: number;
    sendToBackOnClick?: boolean;
    cardDimensions?: { width: number; height: number };
    onSelect?: (card: StackCard) => void;
  };

  export default function Stack(props: StackProps): JSX.Element;
}

declare module "@/components/Threads" {
  type ThreadsProps = {
    color?: [number, number, number];
    amplitude?: number;
    distance?: number;
    enableMouseInteraction?: boolean;
  };

  export default function Threads(props: ThreadsProps): JSX.Element;
}

declare module "@/components/RippleDistortion" {
  type RippleDistortionProps = {
    src?: string;
    brushSize?: number;
    strength?: number;
    swirl?: number;
    rings?: number;
    spread?: number;
    fade?: number;
    glint?: number;
    tint?: string;
    tintAmount?: number;
    grayscale?: boolean;
    trigger?: string;
    quality?: string;
    clear?: boolean;
    style?: React.CSSProperties;
    className?: string;
  };

  export default function RippleDistortion(props: RippleDistortionProps): JSX.Element;
}
