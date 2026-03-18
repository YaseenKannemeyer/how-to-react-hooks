// app/page.tsx

import HeroHeader from "@/components/HeroHeader";
import HookGrid from "@/components/HookGrid";

export default function HomePage() {
  return (
    <>
      <HeroHeader authorName="Mogamat Yaseen Kannemeyer" />
      <HookGrid />
    </>
  );
}
