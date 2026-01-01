import Grid from './components/Grid';

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="relative w-full aspect-video">
          <iframe
            src="https://www.youtube.com/embed/9Y66_htOQ3g?si=HJA18r6qmNdXsVsz"
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="relative w-full aspect-video">
          <iframe
            src="https://www.youtube.com/embed/OId2DxZl9yk?si=yoJBNJp1sFkjNmIt"
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
      <Grid />
    </>
  );
}
