# ImageWrapper Component

## Description

`ImageWrapper` is a React component designed to wrap a Next.js `<Image>` component inside a customizable 
wrapper element. 


- **Flexible `src`**: accepts either
- a **string URL or path** (e.g. `/public/...`, a fully qualified **CDN/remote URL**, or an **app-provided URL** from a CMS/DB), or
- a **`StaticImageData` object** produced by static imports and exposed via your generated `@/lib/generated/imageMap.ts`.


The resolution strategy is:
1) If `src` looks like a generated key (e.g. starts with `"generated"`), it is resolved through `imageMap`.
2) Otherwise, `src` is used as-is.


See the image source strategy in [docs/image-strategy.md](./docs/image-strategy.md).


- **Safe wrapper styles**: the wrapper is forced to `position: relative` and gets a **deterministic width** and **computed `aspectRatio`** to keep layout stable for `<Image fill />`. Critical properties are protected from accidental overrides.
- **Responsive images**: pass `breakPoints` to auto-generate a `sizes` string so the browser downloads the right image variant.
- **Prop hygiene**: conflicting props are stripped from `imageProps` and `wrapperProps` to avoid layout bugs.


---


## How it works (high-level)


1. **Source resolution**
- Keys that begin with `generated` are looked up in `imageMap`. If the key is missing, the component logs a warning and renders nothing.
- Non-generated strings are treated as direct URLs/paths (local or remote). Ensure remote hosts are allowed in your Next.js config.


2. **Wrapper layout**
- `getImageWrapperStyle()` always returns a style with:
- `position: 'relative'` (required for `<Image fill />` layering),
- a deterministic **width** (taken from `imageProps.width`), and
- an **`aspectRatio`** computed from either `StaticImageData` dimensions or from `imageProps.width` & `imageProps.height` if `src` is a string.
- **User styles via `propStyle` are merged** but **cannot override** the critical keys `position`, `width`, and `aspectRatio` to preserve stable layout. This avoids CLS and ensures the absolutely positioned `<Image>` knows its container box.


3. **Responsive `sizes`**
- If `breakPoints` are provided, `getImageSizes()` generates a correct `sizes` value used by browsers to pick the most efficient source from the `srcset` that Next.js builds. When `sizes` is omitted, Next.js emits a limited `srcset` suitable for fixed-size images.


4. **Prop cleaning**
- From **`imageProps`** we remove: `fill`, `sizes`, and `style` — these are controlled internally:
- `fill` is always set by `ImageWrapper` to ensure the image covers the wrapper box that we define.
- `sizes` is generated from `breakPoints` to reflect your layout; passing an external `sizes` could desync the intent.
- `style` is sanitized; only `objectFit` is allowed through, so external styles won't break the fill-based layout.
- From **`wrapperProps`** we remove raw `style`; use `propStyle` instead so we can protect layout-critical properties.

---

## API

### `TImageWrapperProps`

```
type TImageWrapper = 
	| keyof JSX.IntrinsicElements //"div", "a", "section", etc...
	| React.ComponentType<unknown>

type TWrapperProps = {
	propStyle?: CSSProperties;  //adding optional inline style
	[key: string]: unknown; //The remaining properties can be also optional.
}

type TImageProps = {
	src: TImageSource;
	alt: string;
	width: number; // Required width for container, aspect ratio will be calculated
	height?: number; // Optional height — required if src is a string (not StaticImageData)
	objectFit?: React.CSSProperties['objectFit'];
	breakPoints?: TImageSizes; // Responsive sizes
	[key: string]: unknown; // Allow passing any other native <img> or <Image> props if needed
};

type TImageWrapperProps = {
wrapper: TImageWrapper; //Any element or component that can accept a `style` prop and children
wrapperProps?: TWrapperProps;
imageProps: TImageProps; // Final shape of image data (used in CMS, UI configs, etc.)

// Keys from imageMap (auto-generated from /imagesStatic and located at @lib/genereated/imageMap.ts)
type TLocalImageKeys = keyof typeof imageMap;

// Accept either a string path (e.g. CMS or /public) or a local key
type TImageSource = string | TLocalImageKeys;

/** Optional props for the wrapper element */

wrapperProps?: {
/** Inline styles to merge safely; critical keys are protected */
propStyle?: React.CSSProperties;
/** Any valid DOM attributes for the wrapper (className, id, role, aria-*, data-*, etc.) */
[key: string]: unknown;
};

/** Props forwarded to Next.js `<Image>` with safety rules */
imageProps: {
/**
* Either a string URL/path (public asset, CDN, CMS) or a key/`StaticImageData` from `imageMap`.
* For remote URLs, make sure the host is allowed in Next.js config.
*/
src: string | StaticImageData;

/** Accessible alternative text */
alt: string;

/** Wrapper width (number interpreted as px; string supports CSS lengths like '100%') */
width: number | string;

/** Optional wrapper height; used to compute aspect ratio when `src` is a URL string */
height?: number | string;

/** How the image content should fit the box */
objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

/** Breakpoints for generating the `sizes` attribute */
breakPoints?: TImageSizes;

/** Valid breakpoint keys **/
export type TBreakPoints =
	| "min_1921"
	| "max_1920"
	| "min_1441"
	| "max_1440"
	| "min_1281"
	| "max_1280"
	| "min_1025"
	| "max_1024"
	| "min_861"
	| "max_860"
	| "min_769"
	| "max_768"
	| "min_641"
	| "max_640"
	| "min_577"
	| "max_576"
	| "min_481"
	| "max_480"
	| "min_376"
	| "max_375"
	| "min_321"
	| "max_320";

// Sizes can be numeric (default: px), or string with unit
type TImageSizeValue = number | `${number}${'px' | 'vw' | '%'}`;

// Mapping breakpoints → sizes
type TImageSizes = Record<TBreakPoints, TImageSizeValue>;

/** Any other safe HTML/Next image attributes (see below). */
[key: string]: unknown;
};
};
```

Safe attributes you can pass in wrapperProps:

- ``className, id, role, tabIndex etc...``

- ARIA: any aria-*

- Data attributes: any data-*

- Event handlers: onClick, onMouseEnter, onMouseLeave, onKeyDown, etc.

#### Do not pass raw "style": use propStyle instead so critical layout keys remain protected.

In imageProps (forwarded to `<Image>` after cleaning):

``` 
priority, loading, quality, placeholder, blurDataURL, fetchPriority

decoding, draggable, referrerPolicy, crossOrigin

unoptimized, onLoadingComplete

className, id, role, any aria-*, any data-*
```

#### Stripped automatically from imageProps: 
```fill, sizes, style (managed internally).```

### BASIC USAGE with <div> as wrapper:
```
import ImageWrapper from '@/components/ImageWrapper';

export function Hero() {
return (
<ImageWrapper
  wrapper="div"
  wrapperProps={{
    className: 'relative block',
    propStyle: { borderRadius: 12 }, // merged safely; critical keys are protected
    'aria-label': 'Decorative hero image'
}}
  imageProps={{
    src: 'generated-landscapes_hero.webp', // resolves from imageMap
    alt: 'Mountains at sunrise',
    width: '100%',
    // height: 420, // as src is StaticImageData, no need for height (aspectRatio will be calculated)
    objectFit: 'cover',
  breakPoints: {
	  "min_1921": "740px",
	  "max_1024": "32em",
	  "max_640": "100%"
},
// plus any other safe props
  priority: true,
  fetchPriority: 'high',
}}
/>
);
}
```

### With Link as wrapper:

```
import Link from 'next/link';
import ImageWrapper from '@/components/ImageWrapper';

export function TeaserCard() {
return (
<ImageWrapper
	wrapper={Link}
	wrapperProps={{
		href: '/gallery/42',
		className: 'group block focus:outline-none focus:ring',
		propStyle: { display: 'block', borderRadius: 8 },
		'aria-label': 'Open gallery item 42'
	}}
	imageProps={{
		src: 'https://images.example.com/covers/42.jpg', // remote URL
		alt: 'Abstract cover',
		width: 480,
		height: 320, //is required here
		objectFit: 'cover',
		breakPoints: {
			"min_1921": "740px",
			"max_1024": "32em",
			"max_640": "100%"
		},
		loading: 'lazy',
		quality: 75,
	}}
/>
);
}
```
### With a custom wrapper component:

```
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
	<div {...rest}>
		{children}
	</div>
);

<ImageWrapper
	wrapper={Card}
	wrapperProps={{
		className: 'shadow rounded-xl overflow-hidden',
		propStyle: { border: '1px solid var(--border)' },
	}}
	imageProps={{
		src: '/banners/sale.jpg', //from /public
		alt: 'Sale banner',
		width: '100%',
		height: 300,  //is required here, as `src` is not StaticImageData
		objectFit: 'cover',
	}}
/>
```

## Behavior & constraints

- Critical wrapper styles are protected: `position`, `width`, `aspectRatio` cannot be overridden via propStyle. 
This ensures the absolutely positioned `<Image fill />` sits correctly and the container establishes intrinsic space 
to prevent CLS.

- Sizes is generated from your breakPoints to match layout intent. If you omit breakPoints, sizes is undefined and 
Next.js will emit a limited srcset optimized for fixed-size images.

- Remote images: If imageProps.src is a remote URL, make sure the domain (and pattern/path, if needed) 
is allowed in next.config.js via images.remotePatterns (or images.domains on older Next.js). 
Otherwise, Next will throw an error.

- When src is a plain string: provide both width and height so the wrapper can compute aspectRatio. 
If you can’t know the intrinsic size, you may still pass a CSS height; 
however, providing height (or using StaticImageData) yields better visual stability.

- Inline styles on `<Image>` are stripped to avoid breaking the fill layout. Use objectFit for fit behavior.

## Developer notes (why these constraints?)

- `<Image fill />` absolutely positions the image inside a relatively positioned container. 
If a parent width/height (or aspect ratio) is not known, the page can shift when the image loads. 
ImageWrapper guarantees a stable geometry by always setting position: relative, enforcing a width, 
and deriving an aspectRatio.

- Allowing arbitrary inline style on the wrapper or Image could override those guarantees. 
propStyle gives you flexibility while guarding the keys that keep the layout stable.

- Generating the sizes attribute from breakPoints lets the browser pick the smallest file that fits, which is critical for performance.

### FAQ

- Can I pass `style` to `wrapperProps`? 

	Use `propStyle` instead. The raw style is dropped to prevent overriding `position`, `width`, `aspectRatio`.

- Why are `fill`, `sizes`, and `style` removed from imageProps? 

  Because `ImageWrapper` controls them to match its geometry and responsive strategy. 
  You still control how the image fits (`objectFit`) and everything else (`quality`, `priority`, `placeholders`, etc.).

- How do I use a remote URL? 

  Add the `domain/pattern` to `images.remotePatterns` in `next.config.js`. 
  Then pass the full URL to `imageProps.src` and provide `width` and `height` 
  (or rely on `fill` with a known wrapper geometry).

