const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#preview-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const toast = document.querySelector('.toast');
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4200);
});

const albumPhotos = {
  pool: [
    ['photo-album-pool-curved', 'Completed curved pool landscape', 'Composite decking, paved coping and turf around a curved pool'],
    ['photo-album-pool-rectangular', 'Aerial view of a rectangular pool landscape', 'Light stone paving and complete finishing around a rectangular pool'],
    ['photo-album-pool-stone', 'Compact pool with stone finishes', 'Natural stone paving and feature stone cladding around a compact pool'],
    ['photo-pool-curved-aerial', 'Aerial view of a curved pool landscape', 'Composite decking, stone paving and turf around a curved pool'],
    ['photo-pool-rectangular', 'Rectangular pool with paved surrounds', 'Large-format pool paving, drainage and privacy fencing'],
  ],
  decking: [
    ['photo-album-deck-landscape', 'Timber deck constructed beside a retaining wall', 'Timber decking integrated with retaining and level changes'],
    ['photo-deck-covered', 'Covered deck beside a landscaped swimming pool', 'Covered entertaining deck overlooking the pool'],
    ['photo-deck-timber', 'Newly finished timber deck alongside a home', 'Timber decking built to extend the living space'],
    ['photo-deck-poolside', 'Composite deck beside a landscaped pool area', 'Poolside decking with glass fencing and outdoor entertaining space'],
    ['photo-deck-night', 'Finished deck with integrated outdoor lighting', 'Timber decking and lighting designed for evening entertaining'],
  ],
  retaining: [
    ['photo-album-retaining-house', 'Tiered retaining walls around a coastal home', 'Block retaining, planting and garden levels working together'],
    ['photo-retaining-garden', 'Block retaining wall with lawn and planting', 'Structured garden levels with turf and planting'],
    ['photo-retaining-steps', 'Curved retaining wall with paved garden steps', 'Curved wall, level changes and practical access'],
    ['photo-retaining-planted', 'Planted retaining wall beside a finished lawn', 'Block retaining construction with turf and tropical planting'],
    ['photo-retaining-boundary', 'Long block retaining wall along a residential boundary', 'A practical retaining solution creating usable, level ground'],
  ],
  landscaping: [
    ['photo-album-paving-courtyard', 'Natural stone paved courtyard', 'Stone paving and clean garden edging beside a brick home'],
    ['photo-album-garden-modern', 'Modern raised garden beds and lawn', 'Rendered garden beds, pebbles, turf and architectural planting'],
    ['photo-album-garden-path', 'Curved lawn edge and planted pathway', 'Soft landscaping and garden edging beside an entertaining area'],
    ['photo-paving-patio', 'Natural stone paved patio and garden edging', 'Stone paving, steel edging and low-maintenance planting'],
    ['photo-landscape-planter', 'Circular steel planter within a gravel landscape', 'Custom garden feature, gravel finishing and feature planting'],
  ],
};

document.querySelectorAll('.album').forEach((album) => {
  const photos = albumPhotos[album.dataset.album];
  const image = album.querySelector('.album-image');
  const caption = album.querySelector('.album-caption');
  const count = album.querySelector('.album-count');
  let current = 0;
  let touchStart = 0;

  const showPhoto = (nextIndex) => {
    current = (nextIndex + photos.length) % photos.length;
    const [sourceId, alt, description] = photos[current];
    image.classList.add('changing');
    window.setTimeout(() => {
      image.src = document.querySelector(`#${sourceId}`).src;
      image.alt = alt;
      caption.textContent = description;
      count.textContent = `${current + 1} / ${photos.length}`;
      image.classList.remove('changing');
    }, 90);
  };

  album.querySelector('.previous').addEventListener('click', () => showPhoto(current - 1));
  album.querySelector('.next').addEventListener('click', () => showPhoto(current + 1));
  album.querySelector('.album-frame').addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  album.querySelector('.album-frame').addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) showPhoto(current + (distance < 0 ? 1 : -1));
  }, { passive: true });
  showPhoto(0);
});
