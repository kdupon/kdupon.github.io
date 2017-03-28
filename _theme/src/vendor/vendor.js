import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

imagesLoaded.makeJQueryPlugin($);

if ($('.card-masonry').length) {
  const masonry = new Masonry('.card-masonry', {
    columnWidth: '.card-col',
    itemSelector: '.card-col',
    percentPosition: true,
    resize: true,
  });

  setTimeout(() => {
    masonry.layout();
  }, 0);

  $('.card-masonry').imagesLoaded()
    .progress(() => { masonry.layout(); })
    .always(() => { masonry.layout(); });
}
