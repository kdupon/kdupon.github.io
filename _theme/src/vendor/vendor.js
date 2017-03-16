import Masonry from 'masonry-layout';

if ($('.card-masonry').length) {
  var masonry = new Masonry('.card-masonry', {
    columnWidth: '.card-col',
    itemSelector: '.card-col',
    percentPosition: true,
    resize: true,
  });

  setTimeout(() => {
    masonry.layout();
  }, 0);
}
