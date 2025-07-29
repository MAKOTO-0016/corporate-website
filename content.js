// Google Meet Beauty Filter Content Script
(function() {
  'use strict';

  // Filter settings
  let currentBrightness = 1.2;
  let currentSaturation = 1.1;
  let currentContrast = 1.05;
  let currentWhitening = 1.0;
  let beautyModeEnabled = true;
  
  // UI elements
  let filterContainer = null;
  let iconButton = null;
  let brightnessSlider = null;
  let saturationSlider = null;
  let contrastSlider = null;
  let whiteningSlider = null;
  let beautyToggle = null;
  let isUIVisible = true;

  // Debounce function for performance optimization
  let saveTimeout = null;
  function debouncedSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveSettings, 300);
  }

  // Settings storage functions
  function saveSettings() {
    const settings = {
      brightness: currentBrightness,
      saturation: currentSaturation,
      contrast: currentContrast,
      whitening: currentWhitening,
      beautyMode: beautyModeEnabled,
      uiVisible: isUIVisible
    };
    chrome.storage.local.set({ beautyFilterSettings: settings });
  }

  function loadSettings() {
    chrome.storage.local.get(['beautyFilterSettings'], (result) => {
      if (result.beautyFilterSettings) {
        const settings = result.beautyFilterSettings;
        currentBrightness = settings.brightness || 1.2;
        currentSaturation = settings.saturation || 1.1;
        currentContrast = settings.contrast || 1.05;
        currentWhitening = settings.whitening || 1.0;
        beautyModeEnabled = settings.beautyMode !== undefined ? settings.beautyMode : true;
        isUIVisible = settings.uiVisible !== undefined ? settings.uiVisible : true;
        
        // Update UI if it exists
        setTimeout(() => {
          updateUIFromSettings();
          updateUIVisibility();
          applyFiltersToAllVideos();
        }, 100);
      } else {
        // Apply default settings immediately
        setTimeout(() => {
          updateUIFromSettings();
          updateUIVisibility();
          applyFiltersToAllVideos();
        }, 100);
      }
    });
  }

  function updateUIFromSettings() {
    if (brightnessSlider) {
      brightnessSlider.value = currentBrightness;
      brightnessSlider.parentNode.querySelector('.filter-value').textContent = `${Math.round(currentBrightness * 100)}%`;
    }
    if (saturationSlider) {
      saturationSlider.value = currentSaturation;
      saturationSlider.parentNode.querySelector('.filter-value').textContent = `${Math.round(currentSaturation * 100)}%`;
    }
    if (contrastSlider) {
      contrastSlider.value = currentContrast;
      contrastSlider.parentNode.querySelector('.filter-value').textContent = `${Math.round(currentContrast * 100)}%`;
    }
    if (whiteningSlider) {
      whiteningSlider.value = currentWhitening;
      whiteningSlider.parentNode.querySelector('.filter-value').textContent = `${Math.round(currentWhitening * 100)}%`;
    }
    if (beautyToggle) {
      beautyToggle.checked = beautyModeEnabled;
    }
  }

  // Toggle UI visibility
  function toggleUIVisibility() {
    isUIVisible = !isUIVisible;
    updateUIVisibility();
    saveSettings();
  }

  // Update UI visibility based on current state
  function updateUIVisibility() {
    if (filterContainer) {
      if (isUIVisible) {
        filterContainer.classList.remove('hidden');
      } else {
        filterContainer.classList.add('hidden');
      }
    }
    
    if (iconButton) {
      if (isUIVisible) {
        iconButton.classList.add('panel-visible');
      } else {
        iconButton.classList.remove('panel-visible');
      }
    }
  }

  // Create floating icon button
  function createIconButton() {
    if (iconButton) return;
    
    iconButton = document.createElement('div');
    iconButton.className = 'beauty-filter-icon';
    iconButton.innerHTML = '✨';
    iconButton.title = '美肌フィルター設定';
    iconButton.addEventListener('click', toggleUIVisibility);
    
    document.body.appendChild(iconButton);
  }

  // Create and inject the beauty filter control UI
  function createBeautyFilterControl() {
    if (filterContainer) return; // Already created

    filterContainer = document.createElement('div');
    filterContainer.className = 'beauty-filter-container';
    
    // Beauty mode toggle
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'beauty-toggle';
    
    beautyToggle = document.createElement('input');
    beautyToggle.type = 'checkbox';
    beautyToggle.id = 'beauty-mode-toggle';
    beautyToggle.checked = beautyModeEnabled;
    beautyToggle.addEventListener('change', handleBeautyToggle);
    
    const toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'beauty-mode-toggle';
    toggleLabel.textContent = '美肌モード';
    
    toggleDiv.appendChild(beautyToggle);
    toggleDiv.appendChild(toggleLabel);
    filterContainer.appendChild(toggleDiv);
    
    // Brightness control
    const brightnessControl = createSliderControl(
      '明るさ', currentBrightness, 0.5, 2.0, 0.01, 
      handleBrightnessChange, (val) => `${Math.round(val * 100)}%`
    );
    brightnessSlider = brightnessControl.slider;
    filterContainer.appendChild(brightnessControl.container);
    
    // Saturation control (for healthy skin tone)
    const saturationControl = createSliderControl(
      '肌色補正', currentSaturation, 0.8, 1.5, 0.01,
      handleSaturationChange, (val) => `${Math.round(val * 100)}%`
    );
    saturationSlider = saturationControl.slider;
    filterContainer.appendChild(saturationControl.container);
    
    // Contrast control (for skin smoothing effect)
    const contrastControl = createSliderControl(
      'コントラスト', currentContrast, 0.8, 1.3, 0.01,
      handleContrastChange, (val) => `${Math.round(val * 100)}%`
    );
    contrastSlider = contrastControl.slider;
    filterContainer.appendChild(contrastControl.container);
    
    // Whitening control (for whiter skin appearance)
    const whiteningControl = createSliderControl(
      'ホワイトニング', currentWhitening, 0.8, 1.4, 0.01,
      handleWhiteningChange, (val) => `${Math.round(val * 100)}%`
    );
    whiteningSlider = whiteningControl.slider;
    filterContainer.appendChild(whiteningControl.container);
    
    document.body.appendChild(filterContainer);
  }
  
  // Helper function to create slider controls
  function createSliderControl(labelText, initialValue, min, max, step, changeHandler, valueFormatter) {
    const container = document.createElement('div');
    container.className = 'filter-control';
    
    const label = document.createElement('label');
    label.className = 'filter-label';
    label.textContent = labelText;
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'filter-slider';
    slider.min = min.toString();
    slider.max = max.toString();
    slider.step = step.toString();
    slider.value = initialValue.toString();
    
    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'filter-value';
    valueDisplay.textContent = valueFormatter(initialValue);
    
    slider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      valueDisplay.textContent = valueFormatter(value);
      changeHandler(e);
    });
    
    container.appendChild(label);
    container.appendChild(slider);
    container.appendChild(valueDisplay);
    
    return { container, slider, valueDisplay };
  }

  // Handle beauty mode toggle
  function handleBeautyToggle(event) {
    beautyModeEnabled = event.target.checked;
    applyFiltersToAllVideos();
    saveSettings(); // Immediate save for toggle
  }

  // Handle brightness slider changes
  function handleBrightnessChange(event) {
    currentBrightness = parseFloat(event.target.value);
    applyFiltersToAllVideos();
    debouncedSave();
  }
  
  // Handle saturation slider changes
  function handleSaturationChange(event) {
    currentSaturation = parseFloat(event.target.value);
    applyFiltersToAllVideos();
    debouncedSave();
  }
  
  // Handle contrast slider changes
  function handleContrastChange(event) {
    currentContrast = parseFloat(event.target.value);
    applyFiltersToAllVideos();
    debouncedSave();
  }
  
  // Handle whitening slider changes
  function handleWhiteningChange(event) {
    currentWhitening = parseFloat(event.target.value);
    applyFiltersToAllVideos();
    debouncedSave();
  }

  // Apply beauty filters to a single video element
  function applyFiltersToVideo(video) {
    if (!video || !video.style) return;
    
    try {
      if (beautyModeEnabled) {
        // Combine multiple filters for beauty effect with whitening
        const filters = [
          `brightness(${currentBrightness.toFixed(2)})`,
          `saturate(${currentSaturation.toFixed(2)})`,
          `contrast(${currentContrast.toFixed(2)})`,
          `hue-rotate(${((currentWhitening - 1) * 15).toFixed(1)}deg)`,
          `sepia(${Math.max(0, (currentWhitening - 1) * 0.2).toFixed(2)})`
        ].join(' ');
        
        video.style.filter = filters;
        video.style.webkitFilter = filters;
        video.style.imageRendering = 'optimizeQuality';
        
        // Apply additional whitening effect
        const opacityValue = currentWhitening > 1.0 
          ? Math.min(1.0, 0.85 + (currentWhitening - 1.0) * 0.15).toFixed(2)
          : '1.0';
        video.style.opacity = opacityValue;
      } else {
        // Only apply brightness when beauty mode is off
        const brightnessFilter = `brightness(${currentBrightness.toFixed(2)})`;
        video.style.filter = brightnessFilter;
        video.style.webkitFilter = brightnessFilter;
        video.style.imageRendering = 'auto';
        video.style.opacity = '1.0';
      }
    } catch (error) {
      console.warn('Beauty filter application error:', error);
    }
  }

  // Apply beauty filters to all video elements
  function applyFiltersToAllVideos() {
    const videos = document.querySelectorAll('video');
    if (videos.length === 0) return;
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      videos.forEach(applyFiltersToVideo);
    });
  }

  // Observer callback for DOM mutations
  function handleMutations(mutations) {
    let shouldApplyBrightness = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node is a video element
            if (node.tagName === 'VIDEO') {
              shouldApplyBrightness = true;
            }
            // Check if the added node contains video elements
            else if (node.querySelectorAll) {
              const videos = node.querySelectorAll('video');
              if (videos.length > 0) {
                shouldApplyBrightness = true;
              }
            }
          }
        });
      }
    });
    
    if (shouldApplyBrightness) {
      // Small delay to ensure video elements are fully loaded
      setTimeout(applyFiltersToAllVideos, 100);
    }
  }

  // Initialize the extension
  function initialize() {
    // Create the floating icon button first
    createIconButton();
    
    // Create the beauty filter control UI
    createBeautyFilterControl();
    
    // Then load saved settings and update UI
    loadSettings();
    
    // Apply filters to existing videos
    applyFiltersToAllVideos();
    
    // Set up mutation observer to watch for new video elements
    const observer = new MutationObserver(handleMutations);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also check for videos periodically as a fallback
    setInterval(() => {
      applyFiltersToAllVideos();
    }, 2000);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Additional initialization after a short delay to catch late-loading elements
  setTimeout(initialize, 1000);

})();
