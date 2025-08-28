import Grid from './components/Grid';

export default function Home() {
  return (
    <>
      <div className="relative w-full aspect-video mb-4">
        <iframe
          src="https://www.youtube.com/embed/OId2DxZl9yk?si=PwIqbd54MINGyMHr"
          title="YouTube video player"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute top-0 left-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <Grid />
    </>
  );
}
