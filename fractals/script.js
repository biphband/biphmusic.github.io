let params = {
    lineWeight: 1.5,
    numLines: 200,
    opacity: 0.1,
    saturation: 100,
    shape: 'square',
    pattern: 'circular',
    speed: 1,
    rotation: 90,
    backgroundColor: '#071520',
    starField: false,
    starSpeed: 0.2,
    stars: [],
    spacing: 3, // New parameter
    autoProgress: false, // New parameter
    targetValues: {}, // For auto-progress
    currentValues: {} // For auto-progress
  };

  let currentValues = {
        lineWeight: 1.5,
        numLines: 200,
        spacing: 3,
        opacity: 0.1,
        saturation: 100,
        rotation: 90,
        speed: 1,
        starSpeed: 0.2,
        backgroundColor: '#071520'
    };

    let targetValues = {...currentValues};
        const transitionSpeed = 0.02; // Adjust this to control transition speed


  function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('myContainer');
    angleMode(DEGREES);
    rectMode(CENTER);
    colorMode(HSB, 360, 170, 50);
    
    // Initialize stars
    for (let i = 0; i < 200; i++) {
      params.stars.push({
        x: random(-width/4, width/4), // Reduced spread
        y: random(-height/4, height/4), // Reduced spread
        z: random(width)
      });
    }
  }


  function drawStar(x, y, radius1, radius2, npoints) {
    let angle = 360 / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  function drawBeam(x, y, radius1, radius2, npoints) {
    let angle = 900 / npoints;
    let halfAngle = angle / 0.5;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  function drawMandala(x, y, radius1, radius2, npoints) {
    let angle = 120 / npoints;
    let halfAngle = angle / 0.5;
    beginShape();
    for (let a = 0; a < 360; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  function drawFlower(x, y, size) {
    for (let i = 0; i < 10; i++) {
      ellipse(x + cos(i * 36) * size/4, y + sin(i * 36) * size/4, size/2);
    }
  }

  function drawFibonacci(x, y, size) {
    beginShape();
    for (let i = 0; i < 360; i += 10) {
      let r = map(i, 0, 360, 0, size/2);
      let sx = x + cos(i) * r;
      let sy = y + sin(i) * r;
      vertex(sx, sy);
    }
    endShape();
  }

  function drawHeart(x, y, size) {
    beginShape();
    let increment = 5; // Increased increment for fewer points
    for (let a = 0; a < TWO_PI; a += increment) {
        let r = size * (56 * pow(sin(a), 1)) / 16;
        let sx = r * cos(a) * 2.1;  // Scaling factors applied directly
        let sy = -r * sin(a) * 2.9 - size / 4;

        vertex(x + sx, y + sy);
    }
    endShape(CLOSE);
}
  
function drawInfinity(x, y, size) {
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
        let r = size * (1 + 0.3 * cos(2 * a));  // Modulating the radius
        let sx = r * cos(a);
        let sy = r * sin(a);

        // Offset the points to create the infinity shape
        if (cos(a) > 0) {
            sy += size / 4;  // Raising the upper part
        } else {
            sy -= size / 4;  // Lowering the lower part
        }

        vertex(x + sx, y + sy);
    }
    endShape(CLOSE);
}

  function updateStars() {
    for (let star of params.stars) {
      star.z = star.z - params.starSpeed * 10;
      if (star.z < 1) {
        star.z = width;
        star.x = random(-width/2, width/2);
        star.y = random(-height/2, height/2);
      }
    }
  }

  function drawStars() {
    push();
    for (let star of params.stars) {
      let sx = map(star.x / star.z, 0, 1, 0, width) - width/2;
      let sy = map(star.y / star.z, 0, 1, 0, height) - height/2;
      let r = map(star.z, 0, width, 4, 0);
      fill(255);
      noStroke();
      ellipse(sx, sy, r, r);
    }
    pop();
  }

  function draw() {
    if (params.autoProgress) updateAutoProgress();
    
    background(color(params.backgroundColor));
    translate(width / 2, height / 2);
    
    if (params.starField) {
      updateStars();
      drawStars();
    }
    
    noFill();
    
    let maxLines = 200;
    let actualLines = min(params.numLines, maxLines);
    
    for (var i = 0; i < actualLines; i++) {
      push();
      
      let hue = (frameCount * params.speed + i) % 360;
      stroke(hue, params.saturation, 100, params.opacity);
      strokeWeight(params.lineWeight);
      
      if (params.pattern === 'circular') {
        rotate(sin(frameCount * params.speed + i) * params.rotation);
      } else if (params.pattern === 'spiral') {
        rotate(frameCount * params.speed + i * 2);
      } else if (params.pattern === 'wave') {
        rotate(sin(frameCount * params.speed + i * 2) * params.rotation);
      } else if (params.pattern === 'zigzag') {
        rotate(abs(sin(frameCount * params.speed + i * 3)) * params.rotation);
    } else if (params.pattern === 'vortex') {
        let oscillation = sin(frameCount * params.speed * 0.001 + i); 
        let circularMovement = cos(frameCount * params.speed * 0.5); 
        let damping = exp(-frameCount * 0.0001); 
        rotate((oscillation * 4 + circularMovement) * params.rotation * damping); 
      } else if (params.pattern === 'orbital') {
        rotate(cos(frameCount * params.speed) * sin(i) * params.rotation);
      } else if (params.pattern === 'pulse') {
        let scaleAmount = 1 + sin(frameCount * params.speed) * 0.2;
        scale(scaleAmount, scaleAmount);
        rotate(i * params.rotation);
    } else if (params.pattern === 'chaos') {
        rotate(noise(frameCount * params.speed * 0.0005, i * 100) * params.rotation * 5); 
    }
      
      let size = 600 - i * params.spacing;
      switch(params.shape) {
        case 'square':
          rect(0, 0, size, size, 200 - i);
          break;
        case 'rectangle':
          rect(0, 0, size * 1.5, size, 200 - i);
          break;
        case 'ellipse':
          ellipse(0, 0, size * 1.5, size);
          break;
        case 'triangle':
          triangle(-size/2, size/2, 0, -size/2, size/2, size/2);
          break;
          case 'beam':
            drawBeam(0, 0, size/3, size/1.5, 5);
            break;
            case 'fibonacci':
                drawFibonacci(0, 0, size);
                break;
                case 'dove':
                    drawHeart(0, 0, size);
                    break;
                  case 'tails':
                    drawInfinity(0, 0, size);
                    drawInfinity(60, 0, size/1.5);
                    drawInfinity(30, 0, size);
                    break;
        case 'star':
          drawStar(0, 0, size/3, size/1.5, 5);
          break;
        case 'flower':
          drawFlower(0, 0, size);
          break;
          case 'mandala':
            drawMandala(0, 0, size/3, size/1.5, 5);
            break;

      }
      
      pop();
    }
}

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }


document.addEventListener('DOMContentLoaded', () => {
  // Initialize audio upload first
  setupAudioUpload();
  
  // Menu and sidebar controls
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'r') {
        randomizeParams();
      }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'c') {
            document.documentElement.classList.toggle('crt-effect');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelector('.sidebar').classList.remove('active');
          helpOverlay.style.display = 'none';
        }
    });


    document.getElementById('spacing').addEventListener('input', (e) => {
      params.spacing = parseFloat(e.target.value);
    });

    document.getElementById('autoProgress').addEventListener('change', (e) => {
      params.autoProgress = e.target.checked;
      if (params.autoProgress) {
        params.targetValues = {};
        params.currentValues = {};
    }
});

    // Event listeners for controls
    document.getElementById('lineWeight').addEventListener('input', (e) => {
      params.lineWeight = parseFloat(e.target.value);
    });

    document.getElementById('numLines').addEventListener('input', (e) => {
      params.numLines = parseInt(e.target.value);
    });

    document.getElementById('opacity').addEventListener('input', (e) => {
      params.opacity = parseFloat(e.target.value);
    });

    document.getElementById('saturation').addEventListener('input', (e) => {
      params.saturation = parseFloat(e.target.value);
    });

    document.getElementById('shape').addEventListener('change', (e) => {
      params.shape = e.target.value;
    });

    document.getElementById('pattern').addEventListener('change', (e) => {
      params.pattern = e.target.value;
    });

    document.getElementById('speed').addEventListener('input', (e) => {
      params.speed = parseFloat(e.target.value);
    });

    document.getElementById('rotation').addEventListener('input', (e) => {
      params.rotation = parseFloat(e.target.value);
    });

    document.getElementById('backgroundColor').addEventListener('input', (e) => {
      params.backgroundColor = e.target.value;
    });

    document.getElementById('starField').addEventListener('change', (e) => {
      params.starField = e.target.checked;
    });

    document.getElementById('starSpeed').addEventListener('input', (e) => {
      params.starSpeed = parseFloat(e.target.value);
    });

    
    const helpOverlay = document.createElement('div');
    helpOverlay.className = 'help-overlay'; // Add class instead of inline styles
    
    const helpContent = document.createElement('div');
    helpContent.className = 'help-content'; // Add class instead of inline styles
    
    helpContent.innerHTML = `
        <h2>Keyboard Controls</h2>
        <ul>
            <li><strong>M</strong><span> - </span>Toggle menu</li>
            <li><strong>Spacebar</strong><span> - </span>Toggle auto-play</li>
            <li><strong>S</strong><span> - </span>Toggle stars</li>
            <li><strong>C</strong><span> - </span>Toggle CRT effect</li>
            <li><strong>← →</strong><span> - </span>Adjust rotation</li>
            <li><strong>↑ ↓</strong><span> - </span>Adjust speed</li>
            <li><strong>- +</strong><span> - </span>Adjust background brightness</li>
            <li><strong>1-0</strong><span> - </span>Switch shapes:
                <ul>
                    <li>1: Square</li>
                    <li>2: Rectangle</li>
                    <li>3: Ellipse</li>
                    <li>4: Triangle</li>
                    <li>5: Beam</li>
                    <li>6: Fibonacci</li>
                    <li>7: Dove</li>
                    <li>8: Tails</li>
                    <li>9: Star</li>
                    <li>0: Flower</li>
                </ul>
            </li>
            <li><strong>[ ]</strong><span> - </span>Switch patterns</li>
            <li><strong>?</strong><span> - </span>Show/hide this help</li>
            <li><strong>R</strong><span> - </span>Randomize all settings</li>
        </ul>
        <p>Click anywhere to close</p>
    `;
    
    // Append the help content to the overlay and then to the body
    helpOverlay.appendChild(helpContent);
    document.body.appendChild(helpOverlay);

// Close help overlay when clicking anywhere
helpOverlay.addEventListener('click', () => {
helpOverlay.style.display = 'none';
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
// Prevent default behavior for some keys
if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
e.preventDefault();
}

const shapes = [
    'square',
    'rectangle',
    'ellipse',
    'triangle',
    'beam',
    'fibonacci',
    'dove',
    'tails',
    'star',
    'flower',
    'mandala'
];
const patterns = [
    'circular',
    'spiral',
    'wave',
    'zigzag',
    'vortex',
    'orbital',
    'pulse',
    'chaos'
];

switch(e.key.toLowerCase()) {
case 'm':
  document.querySelector('.sidebar').classList.toggle('active');
  break;
case ' ':
  document.getElementById('autoProgress').click();
  break;
case 's':
  document.getElementById('starField').click();
  break;
case 'arrowleft':
  params.rotation = Math.max(0, params.rotation - 5);
  document.getElementById('rotation').value = params.rotation;
  break;
case 'arrowright':
  params.rotation = Math.min(360, params.rotation + 5);
  document.getElementById('rotation').value = params.rotation;
  break;
case 'arrowup':
  params.speed = Math.min(2, params.speed + 0.1);
  document.getElementById('speed').value = params.speed;
  break;
case 'arrowdown':
  params.speed = Math.max(0.5, params.speed - 0.1);
  document.getElementById('speed').value = params.speed;
  break;
case '-':
  // Darken background
  adjustBackgroundBrightness(-10);
  break;
case '=':
  // Brighten background
  adjustBackgroundBrightness(10);
  break;
case '[':
  {
    const currentIndex = patterns.indexOf(params.pattern);
    const newIndex = (currentIndex - 1 + patterns.length) % patterns.length;
    document.getElementById('pattern').value = patterns[newIndex];
    params.pattern = patterns[newIndex];
  }
  break;
case ']':
  {
    const currentIndex = patterns.indexOf(params.pattern);
    const newIndex = (currentIndex + 1) % patterns.length;
    document.getElementById('pattern').value = patterns[newIndex];
    params.pattern = patterns[newIndex];
  }
  break;
case '?':
  if (e.shiftKey) {
    helpOverlay.style.display = (helpOverlay.style.display === 'block') ? 'none' : 'block';
  }
  break;
default:
// Number keys 1-9 for shapes, including 0 for the last shape
const num = parseInt(e.key);
if (num >= 0 && num <= 9) {
  let index;
  if (num === 0) {
    index = shapes.indexOf('flower');  // Explicitly map 0 to 'flower'
  } else {
    index = num - 1;
  }
  if (index < shapes.length) {
    document.getElementById('shape').value = shapes[index];
    params.shape = shapes[index];
  }
}
}
});

function adjustBackgroundBrightness(amount) {
const hex = params.backgroundColor.replace('#', '');
const r = parseInt(hex.substr(0, 2), 16);
const g = parseInt(hex.substr(2, 2), 16);
const b = parseInt(hex.substr(4, 2), 16);

const adjustColor = (c) => {
return Math.max(0, Math.min(255, c + amount));
};

const newColor = '#' + 
adjustColor(r).toString(16).padStart(2, '0') +
adjustColor(g).toString(16).padStart(2, '0') +
adjustColor(b).toString(16).padStart(2, '0');

params.backgroundColor = newColor;
document.getElementById('backgroundColor').value = newColor;
}
    
            // Modified range inputs
    const rotationInput = document.getElementById('rotation');
    rotationInput.min = "45"; // Increased minimum rotation
    rotationInput.value = Math.max(45, rotationInput.value);

    const speedInput = document.getElementById('speed');
    speedInput.max = "1.3"; // Reduced maximum speed
    speedInput.value = Math.min(1.5, speedInput.value);

  });

  function updateAutoProgress() {
if (!params.autoProgress) return;

const controls = {
    lineWeight: { min: 0.5, max: 3 },
    opacity: { min: 0.05, max: 0.3 },
    saturation: { min: 30, max: 120 },
    rotation: { min: 45, max: 180 }, // reduced max rotation
    speed: { min: 0.2, max: 0.8 }, // reduced speed range
    spacing: { min: 2, max: 6 },
    starSpeed: { min: 0.05, max: 0.2 }
  };

// Initialize params objects if they don't exist
if (!params.targetValues) params.targetValues = {};
if (!params.currentValues) params.currentValues = {};

// Initialize values when auto-progress is first enabled
for (let control in controls) {
if (params.targetValues[control] === undefined) {
  params.targetValues[control] = params[control];
  params.currentValues[control] = params[control];
}
}

// Parse current background color on first run
if (!params.targetValues.backgroundColor || !params.currentValues.backgroundColor) {
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 7, g: 21, b: 32 }; // default color if parsing fails
};

const currentColor = hexToRgb(params.backgroundColor);
params.currentValues.backgroundColor = currentColor;
params.targetValues.backgroundColor = currentColor;
}

// Check if we're close to target values to generate new targets
let needNewTargets = true;
for (let control in controls) {
if (Math.abs(params.currentValues[control] - params.targetValues[control]) > 0.01) {
  needNewTargets = false;
  break;
}
}

// Color distance check
const colorDiff = Math.abs(params.currentValues.backgroundColor.r - params.targetValues.backgroundColor.r) +
               Math.abs(params.currentValues.backgroundColor.g - params.targetValues.backgroundColor.g) +
               Math.abs(params.currentValues.backgroundColor.b - params.targetValues.backgroundColor.b);

if (colorDiff > 3) {
needNewTargets = false;
}

// Set new target values when close to current targets
if (needNewTargets || frameCount % 80 === 0) {
for (let control in controls) {
  params.targetValues[control] = random(controls[control].min, controls[control].max);
}

// Generate new target colors near the current colors
const range = 30; // Maximum color change range
params.targetValues.backgroundColor = {
  r: constrain(params.currentValues.backgroundColor.r + random(-range, range), 0, 50),
  g: constrain(params.currentValues.backgroundColor.g + random(-range, range), 0, 50),
  b: constrain(params.currentValues.backgroundColor.b + random(-range, range), 0, 50)
};
}

// Slower transition speeds
const transitionSpeed = 0.0005; // reduced from 0.001
const colorTransitionSpeed = 0.001; // reduced from 0.005

for (let control in controls) {
params.currentValues[control] += (params.targetValues[control] - params.currentValues[control]) * transitionSpeed;
params[control] = params.currentValues[control];

const slider = document.getElementById(control);
if (slider) slider.value = params[control];
}

// Update background color with smooth transition
params.currentValues.backgroundColor.r += (params.targetValues.backgroundColor.r - params.currentValues.backgroundColor.r) * colorTransitionSpeed;
params.currentValues.backgroundColor.g += (params.targetValues.backgroundColor.g - params.currentValues.backgroundColor.g) * colorTransitionSpeed;
params.currentValues.backgroundColor.b += (params.targetValues.backgroundColor.b - params.currentValues.backgroundColor.b) * colorTransitionSpeed;

// Convert current RGB values to hex and update params
const componentToHex = (c) => {
const hex = Math.round(c).toString(16);
return hex.length === 1 ? '0' + hex : hex;
};

const rgbToHex = (r, g, b) => {
return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

params.backgroundColor = rgbToHex(
params.currentValues.backgroundColor.r,
params.currentValues.backgroundColor.g,
params.currentValues.backgroundColor.b
);

// Update background color input
const bgColorInput = document.getElementById('backgroundColor');
if (bgColorInput) {
bgColorInput.value = params.backgroundColor;
}
}





function createAudioVisualizer() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  // Add smoothing
  analyser.smoothingTimeConstant = 0.8;  // Increased smoothing (0-1)
  
  return {
      audioContext,
      analyser,
      dataArray,
      source: null,
      smoothedValues: new Map()  // Store smoothed values for each parameter
  };
}

let visualizer = null;
let animationId = null;
let parameterMappings = new Map();
let isPlaying = false;


function setupAudioUpload() {
  const uploadContainer = document.createElement('div');
  uploadContainer.innerHTML = `
      <div class="audio-control-panel">
          <div class="upload-section">
              <input type="file" id="audioUpload" accept="audio/*" />
              <div id="fileName"></div>
          </div>
          <div class="player-section">
              <audio id="audioPlayer" controls style="width: 100%;"></audio>
              <label class="loop-control">
                  <input type="checkbox" id="loopControl">
                  Loop playback
              </label>
          </div>
          <div class="parameter-mappings">
              <h3><br>Audio Reactive Parameters</h3>
              <div class="mapping-controls">
                  ${createMappingControls()}
              </div>
          </div>
      </div>
  `;
  
  document.querySelector('.sidebar').appendChild(uploadContainer);
  
  const audioPlayer = document.getElementById('audioPlayer');
  const audioUpload = document.getElementById('audioUpload');
  const fileNameDisplay = document.getElementById('fileName');
  const loopControl = document.getElementById('loopControl');
  
  function resetAudioSystem() {
      // Stop current playback
      if (isPlaying) {
          audioPlayer.pause();
      }
      
      // Clean up existing audio context and visualizer
      if (visualizer) {
          visualizer.source?.disconnect();
          visualizer.audioContext.close();
          visualizer = null;
      }
      
      // Reset audio player and controls
      audioPlayer.src = '';
      audioUpload.value = '';
      fileNameDisplay.textContent = '';
      
      // Reset animation frame if any
      if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
      }
      
      // Reset parameter mappings and smoothed values
      parameterMappings.clear();
      if (visualizer?.smoothedValues) {
          visualizer.smoothedValues.clear();
      }
  }
  
  audioUpload.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      // Display the file name
      fileNameDisplay.textContent = file.name;
      audioUpload.style.display = 'none';
      
      audioPlayer.src = URL.createObjectURL(file);
      
      // Initialize visualizer after file is loaded
      audioPlayer.addEventListener('loadedmetadata', () => {
          if (!visualizer) {
              initializeVisualizer();
          }
      }, { once: true });
  });
  
  loopControl.addEventListener('change', (e) => {
      audioPlayer.loop = e.target.checked;
  });
  
  setupMappingListeners();
  
  // Player event listeners
  audioPlayer.addEventListener('play', () => {
      isPlaying = true;
      if (!visualizer) {
          initializeVisualizer();
      }
      startVisualization();
  });
  
  audioPlayer.addEventListener('pause', () => {
      isPlaying = false;
      stopVisualization();
  });
  
  audioPlayer.addEventListener('seeking', () => {
      if (isPlaying) {
          stopVisualization();
      }
  });
  
  audioPlayer.addEventListener('seeked', () => {
      if (isPlaying) {
          startVisualization();
      }
  });
}

function createMappingControls() {
  const parameters = [
      'lineWeight',
      'numLines',
      'opacity',
      'saturation',
      'speed',
      'rotation',
      'starSpeed',
      'spacing'
  ];
  
  return parameters.map(param => `
      <div class="mapping-control">
          <label>
              <input type="checkbox" data-param="${param}">
              ${param.charAt(0).toUpperCase() + param.slice(1)}
          </label>
      </div>
  `).join('');
}

function setupMappingListeners() {
  // Store original values before audio reactivity is enabled
  const originalValues = new Map();
  
  document.querySelectorAll('.mapping-control input[type="checkbox"]').forEach(checkbox => {
      const param = checkbox.dataset.param;
      
      checkbox.addEventListener('change', (e) => {
          if (e.target.checked) {
              // Store current value before enabling audio reactivity
              originalValues.set(param, params[param]);
              parameterMappings.set(param, true);
              visualizer.smoothedValues.set(param, params[param]);
              
          } else {
              // Start transition back to original value
              parameterMappings.delete(param);
              const targetValue = originalValues.get(param) || getDefaultValue(param);
              const startValue = visualizer.smoothedValues.get(param);
              
              let animationFrame;
              function transitionToOriginal() {
                  if (!parameterMappings.has(param)) { // Check if still unchecked
                      const currentValue = visualizer.smoothedValues.get(param);
                      if (Math.abs(currentValue - targetValue) > 0.01) {
                          const newValue = smoothValue(currentValue, targetValue, 0.1);
                          visualizer.smoothedValues.set(param, newValue);
                          params[param] = newValue;
                          animationFrame = requestAnimationFrame(transitionToOriginal);
                      } else {
                          params[param] = targetValue;
                          visualizer.smoothedValues.delete(param);
                          cancelAnimationFrame(animationFrame);
                      }
                  } else {
                      // Parameter was re-enabled during transition
                      cancelAnimationFrame(animationFrame);
                  }
              }
              
              transitionToOriginal();
          }
      });
  });
}

function getDefaultValue(param) {
  const defaults = {
      lineWeight: 1,
      numLines: 100,
      opacity: 0.5,
      saturation: 50,
      speed: 1,
      rotation: 180,
      starSpeed: 0.1,
      spacing: 5
  };
  return defaults[param] || 0;
}

function getParameterRange(param) {
  const ranges = {
      lineWeight: { min: 0.1, max: 10 },    // Increased range
      numLines: { min: 20, max: 300 },      // Increased range
      opacity: { min: 0.1, max: 1 },
      saturation: { min: 0, max: 200 },     // Increased range
      speed: { min: 0.1, max: 4 },          // Increased range
      rotation: { min: 0, max: 720 },       // Increased range
      starSpeed: { min: 0.01, max: 0.5 },   // Increased range
      spacing: { min: 0.5, max: 20 }        // Increased range
  };
  return ranges[param];
}

function smoothValue(currentValue, targetValue, smoothingFactor = 0.15) {
  return currentValue + (targetValue - currentValue) * smoothingFactor;
}

function initializeVisualizer() {
  visualizer = createAudioVisualizer();
  const audioPlayer = document.getElementById('audioPlayer');
  visualizer.source = visualizer.audioContext.createMediaElementSource(audioPlayer);
  visualizer.source.connect(visualizer.analyser);
  visualizer.analyser.connect(visualizer.audioContext.destination);
}

async function handleAudioUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const audioPlayer = document.getElementById('audioPlayer');
  
  // Reset audio context state
  if (visualizer?.audioContext.state === 'suspended') {
      await visualizer.audioContext.resume();
  }
  
  // Clean up old audio source
  if (visualizer) {
      visualizer.source?.disconnect();
      visualizer.audioContext.close();
      visualizer = null;
  }
  
  audioPlayer.src = URL.createObjectURL(file);
  
  // Wait for metadata and initialize
  await new Promise(resolve => {
      audioPlayer.addEventListener('loadedmetadata', resolve, { once: true });
  });
  
  initializeVisualizer();
  
  // Add click-to-play handler
  const playPromise = audioPlayer.play();
  if (playPromise !== undefined) {
      playPromise.catch(error => {
          // Auto-play prevented, add click handler
          document.addEventListener('click', async () => {
              try {
                  await audioPlayer.play();
              } catch (err) {
                  console.error('Play failed:', err);
              }
          }, { once: true });
      });
  }
}

function startVisualization() {
  if (animationId) {
      cancelAnimationFrame(animationId);
  }
  
  function updateParameters() {
      if (!visualizer) return;
      
      visualizer.analyser.getByteFrequencyData(visualizer.dataArray);
      
      const bassRange = Math.floor(visualizer.dataArray.length * 0.1);
      const bassAmplitude = Array.from(visualizer.dataArray)
          .slice(0, bassRange)
          .reduce((a, b) => a + b, 0) / bassRange;
      const normalizedAmplitude = Math.pow(bassAmplitude / 255, 1.5);
      
      parameterMappings.forEach((_, param) => {
          const range = getParameterRange(param);
          const targetValue = range.min + (normalizedAmplitude * (range.max - range.min));
          const currentValue = visualizer.smoothedValues.get(param) || getDefaultValue(param);
          const smoothedValue = smoothValue(currentValue, targetValue);
          visualizer.smoothedValues.set(param, smoothedValue);
          params[param] = smoothedValue;
      });
      
      animationId = requestAnimationFrame(updateParameters);
  }
  
  updateParameters();
}

function stopVisualization() {
  if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
  }
  
  // Ease parameters back to default values
  function easeToDefaults() {
      let needsUpdate = false;
      
      parameterMappings.forEach((_, param) => {
          const currentValue = visualizer.smoothedValues.get(param);
          const defaultValue = getDefaultValue(param);
          
          if (Math.abs(currentValue - defaultValue) > 0.01) {
              const easedValue = smoothValue(currentValue, defaultValue, 0.1);
              visualizer.smoothedValues.set(param, easedValue);
              params[param] = easedValue;
              needsUpdate = true;
          } else {
              visualizer.smoothedValues.set(param, defaultValue);
              params[param] = defaultValue;
          }
      });
      
      if (needsUpdate) {
          requestAnimationFrame(easeToDefaults);
      }
  }
  
  if (visualizer && !isPlaying) {
      easeToDefaults();
  }
}


function randomizeParams() {
  // Store current audio state
  const audioPlayer = document.getElementById('audioPlayer');
  const wasPlaying = !audioPlayer.paused;
  const currentTime = audioPlayer.currentTime;
  
  // Store current audio-reactive mappings
  const currentMappings = new Map(parameterMappings);
  const currentSmoothValues = new Map(visualizer?.smoothedValues || new Map());

  // Define random ranges for each parameter
  const randomLineWeight = Math.random() * 10; // 0 to 10
  const randomNumLines = Math.floor(Math.random() * 200) + 20; // 20 to 220
  const randomOpacity = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
  const randomSaturation = Math.random(); // 0 to 1
  const randomSpeed = Math.random() * 5; // 0 to 5
  const randomRotation = Math.random() * 360; // 0 to 360
  const randomStarSpeed = Math.random() * 5; // 0 to 5
  const randomSpacing = Math.random() * 50 + 10; // 10 to 60

  // Set random values to inputs first
  document.getElementById('lineWeight').value = randomLineWeight;
  document.getElementById('numLines').value = randomNumLines;
  document.getElementById('opacity').value = randomOpacity;
  document.getElementById('saturation').value = randomSaturation;
  document.getElementById('speed').value = randomSpeed;
  document.getElementById('rotation').value = randomRotation;
  document.getElementById('starSpeed').value = randomStarSpeed;
  document.getElementById('spacing').value = randomSpacing;
  
  const shapes = [
    'square',
    'rectangle',
    'ellipse',
    'triangle',
    'beam',
    'fibonacci',
    'dove',
    'tails',
    'star',
    'flower',
    'mandala'
  ];
  const patterns = [
    'circular',
    'spiral',
    'wave',
    'zigzag',
    'vortex',
    'orbital',
    'pulse',
    'chaos'
  ];
  
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
  
  document.getElementById('shape').value = randomShape;
  document.getElementById('pattern').value = randomPattern;
  
  // Random background color
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  document.getElementById('backgroundColor').value = randomColor;
  
  // Now update the params object
  params.lineWeight = randomLineWeight;
  params.numLines = randomNumLines;
  params.opacity = randomOpacity;
  params.saturation = randomSaturation;
  params.speed = randomSpeed;
  params.rotation = randomRotation;
  params.starSpeed = randomStarSpeed;
  params.spacing = randomSpacing;
  params.shape = randomShape;
  params.pattern = randomPattern;
  params.backgroundColor = randomColor;
  
  // Trigger all input events
  document.querySelectorAll('input, select').forEach(el => {
    const event = new Event('input', { bubbles: true });
    const changeEvent = new Event('change', { bubbles: true });
    
    // Trigger native event handlers
    el.dispatchEvent(event);
    el.dispatchEvent(changeEvent);
  });
  
  // Restore audio-reactive mappings
  parameterMappings = currentMappings;
  if (visualizer) {
    visualizer.smoothedValues = currentSmoothValues;
  }
  
  // Restore audio-reactive parameters
  parameterMappings.forEach((_, param) => {
    if (visualizer?.smoothedValues.has(param)) {
      params[param] = visualizer.smoothedValues.get(param);
    }
  });
  
  // Force visualization update
  if (typeof updateVisualization === 'function') {
    updateVisualization();
  }
  
  // Ensure audio continues if it was playing
  if (wasPlaying && audioPlayer.paused) {
    audioPlayer.currentTime = currentTime;
    audioPlayer.play().catch(console.error);
  }
}












function exportSettings() {
  const settings = {
      params: { ...params },
      parameterMappings: Array.from(parameterMappings.entries()),
      smoothedValues: visualizer ? Array.from(visualizer.smoothedValues.entries()) : []
  };
  
  const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'visualization-settings.json';
  a.click();
  
  URL.revokeObjectURL(url);
}

async function importSettings() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
          const text = await file.text();
          const settings = JSON.parse(text);
          
          // Restore params
          Object.assign(params, settings.params);
          
          // Restore parameter mappings
          parameterMappings = new Map(settings.parameterMappings);
          
          // Restore smoothed values if visualizer exists
          if (visualizer) {
              visualizer.smoothedValues = new Map(settings.smoothedValues);
          }
          
          // Update UI
          updateControlsFromParams();
          
          // Force visualization update
          if (typeof updateVisualization === 'function') {
              updateVisualization();
          }
      } catch (err) {
          console.error('Failed to import settings:', err);
      }
  };
  
  input.click();
}

// Add these buttons to your HTML
const exportImportHTML = `
  <div class="control-group">
      <button onclick="exportSettings()">Export Settings</button>
      <button onclick="importSettings()">Import Settings</button>
  </div>
`;

// Add this helper function
function updateControlsFromParams() {
  Object.entries(params).forEach(([key, value]) => {
      const element = document.getElementById(key);
      if (element) {
          element.value = value;
      }
  });
  
  // Update checkboxes for parameter mappings
  document.querySelectorAll('.mapping-control input[type="checkbox"]').forEach(checkbox => {
      const param = checkbox.dataset.param;
      checkbox.checked = parameterMappings.has(param);
  });
}