# Adding videos to the film gate

Edit `src/content/reels.ts`. Each item is one frame in the horizontal bay.

## YouTube

```ts
{
  id: "client-launch",
  title: "Launch film",
  client: "Northline",
  src: "https://www.youtube.com/watch?v=xxxxxxxxxxx",
  aspect: "wide",
}
```

Shorts: `https://www.youtube.com/shorts/xxxxxxxxxxx` with `aspect: "vertical"`.
Poster is pulled from YouTube unless you set `poster`.

## Instagram

```ts
{
  id: "ig-reel",
  title: "Social cut",
  client: "Harbor",
  src: "https://www.instagram.com/reel/SHORTCODE/",
  poster: "/reels/harbor.jpg",
  aspect: "vertical",
}
```

Instagram does not give us a reliable thumbnail without their API, so add a still as `poster`. The lightbox tries their embed and always offers “Open on Instagram” — embeds often fail if the post is private or if Instagram blocks the iframe.

## MP4 / WebM

1. Compress first (1080p, H.264, under ~15MB each if you can).
2. Put the file in `studio/public/reels/`.
3. Point `src` at the public path:

```ts
{
  id: "brand-film",
  title: "Brand film",
  client: "Kestrel",
  src: "/reels/kestrel-brand.mp4",
  poster: "/reels/kestrel.jpg",
  aspect: "wide",
}
```

Do not upload huge uncompressed files to GoDaddy. Prefer Bunny, Cloudflare R2, or YouTube for anything over ~20MB, then use the hosted URL.

## GoDaddy note

Static hosting is fine for a few compressed MP4s. A dozen 4K files will be slow and expensive. Host those on YouTube/Vimeo/Bunny and keep the bay as the interface.
