import { HomeExperience } from "@/components/HomeExperience";
import fs from "fs";
import path from "path";

export default function Home() {
  const brandShots: string[] = [
    "/brand-shots/my oh my 11 .MP4",
    "https://www.youtube.com/embed/3DCH-yMi9cw?mute=1&autoplay=1&loop=1&playlist=3DCH-yMi9cw",
    "/brand-shots/AQMlrM1MoSOy0t12znv-axqpM_jJsJjj2f_zAXhU4j93aVn1xmgUdbs4FkYiHXlB5ooTWdHuk7dGs28oznl9SQdA7_-5G7YYLQj3PGk.mp4",
    "/brand-shots/shvetah 2 .jpg.jpeg",
    "/brand-shots/shvetah 4 .MP4",
    "/brand-shots/shvetah 3 .jpg.jpeg",
    "/brand-shots/my oh my 16 .MP4",
    "https://www.youtube.com/embed/FvG_5IJfMpk?mute=1&autoplay=1&loop=1&playlist=FvG_5IJfMpk",
    "/brand-shots/wrap 2 .JPG.jpeg",
    "https://www.instagram.com/p/CVzh5IZLfTQ/embed",
    "/brand-shots/raj oil.MP4",
    "https://www.instagram.com/p/CYEDMr7oxV7/embed",
    "/brand-shots/IMG_9181.JPG.jpeg",
    "/brand-shots/my oh my 3 .mov",
    "https://www.youtube.com/embed/PMn2pWzVW1Y?mute=1&autoplay=1&loop=1&playlist=PMn2pWzVW1Y",
    "https://www.youtube.com/embed/AZ7O0iVgmbE?mute=1&autoplay=1&loop=1&playlist=AZ7O0iVgmbE",
    "https://www.youtube.com/embed/5CK741osQjU?mute=1&autoplay=1&loop=1&playlist=5CK741osQjU",
    "/brand-shots/eclipse 1 .MP4",
    "/brand-shots/bouche 1 .MP4",
    "/brand-shots/bouche 2 .jpg.jpeg",
    "https://www.instagram.com/reel/DBtgcEXs_xI/embed"
  ];

  return <HomeExperience brandShots={brandShots} />;
}
