const fallbackSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <rect width="100%" height="100%" fill="#f3f4f6" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-size="18">
      Image unavailable
    </text>
  </svg>
`);

const fallbackImageSrc = `data:image/svg+xml;charset=UTF-8,${fallbackSvg}`;

function applyImageFallback(imageElement) {
  if (imageElement.dataset.fallbackApplied === 'true') {
    return;
  }

  imageElement.dataset.fallbackApplied = 'true';
  imageElement.src = fallbackImageSrc;

  if (!imageElement.alt) {
    imageElement.alt = 'Image unavailable';
  }
}

function attachFallbackListener(imageElement) {
  if (imageElement.dataset.fallbackBound === 'true') {
    return;
  }

  imageElement.dataset.fallbackBound = 'true';
  imageElement.addEventListener('error', () => {
    applyImageFallback(imageElement);
  });

  if (imageElement.complete && imageElement.naturalWidth === 0) {
    applyImageFallback(imageElement);
  }
}

export function enableImageFallback() {
  document.querySelectorAll('img').forEach((imageElement) => {
    attachFallbackListener(imageElement);
  });

  document.addEventListener('error', (event) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    attachFallbackListener(event.target);
    applyImageFallback(event.target);
  }, true);
}
