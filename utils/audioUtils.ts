/**
 * Decodes base64 string to ArrayBuffer using the native Fetch API.
 * This is significantly faster than using atob() and a JS loop.
 */
const base64ToArrayBuffer = async (base64: string): Promise<ArrayBuffer> => {
  // Use the browser's native base64 decoder via fetch data URL
  const response = await fetch(`data:audio/pcm;base64,${base64}`);
  return response.arrayBuffer();
};

/**
 * Helper to write string to DataView
 */
const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

/**
 * Adds a WAV header to raw PCM data.
 * This allows us to use the browser's native, multi-threaded decodeAudioData
 * instead of a slow JavaScript loop for float conversion.
 */
const addWavHeader = (pcmData: ArrayBuffer, sampleRate: number, numChannels: number, bitDepth: number): Uint8Array => {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const dataLen = pcmData.byteLength;

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // file length
  view.setUint32(4, 36 + dataLen, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 = PCM)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, numChannels * (bitDepth / 8), true);
  // bits per sample
  view.setUint16(34, bitDepth, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, dataLen, true);

  // Combine header and data
  const wavFile = new Uint8Array(44 + dataLen);
  wavFile.set(new Uint8Array(header), 0);
  wavFile.set(new Uint8Array(pcmData), 44);

  return wavFile;
};

/**
 * Efficiently decodes Gemini's raw PCM audio (Base64) into an AudioBuffer.
 * Uses native browser APIs to avoid main-thread blocking JS loops.
 */
export const decodeGeminiAudio = async (
  base64: string,
  ctx: AudioContext
): Promise<AudioBuffer> => {
  // 1. Base64 -> ArrayBuffer (Native Fetch)
  const pcmBuffer = await base64ToArrayBuffer(base64);

  // 2. Add WAV Header (Gemini is 24kHz, 1ch, 16bit PCM)
  const wavBytes = addWavHeader(pcmBuffer, 24000, 1, 16);

  // 3. Native Decode (C++ threaded implementation)
  // This handles the Int16 -> Float32 conversion much faster than JS
  return await ctx.decodeAudioData(wavBytes.buffer);
};

export interface AudioController {
  stop: () => void;
}

/**
 * Plays an AudioBuffer with ASMR effects (Ear-to-Ear panning + Proximity EQ)
 */
export const playASMRBuffer = (
  ctx: AudioContext,
  buffer: AudioBuffer,
  onEnded?: () => void
): AudioController => {
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // 1. Proximity EQ: Create warmth and airiness
  // Warmth (Low-mids)
  const eqWarmth = ctx.createBiquadFilter();
  eqWarmth.type = 'peaking';
  eqWarmth.frequency.value = 200; // 200Hz creates that "close to chest/ear" feeling
  eqWarmth.Q.value = 0.5;
  eqWarmth.gain.value = 3; // +3dB

  // Air (High-shelf)
  const eqAir = ctx.createBiquadFilter();
  eqAir.type = 'highshelf';
  eqAir.frequency.value = 9000; // 9kHz+ for breath details
  eqAir.gain.value = 5; // +5dB to emphasize the whisper texture

  // 2. Ear-to-Ear Panning (3D Movement)
  const panner = ctx.createStereoPanner();

  // LFO (Low Frequency Oscillator) to drive the panning automatically
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();

  lfo.type = 'sine';
  lfo.frequency.value = 0.12; // 0.12Hz = Very slow, hypnotic drift (approx 8.3s per cycle)

  lfoGain.gain.value = 0.9; // Pan depth: 0.9 means it goes almost hard left to hard right

  // 3. Connect the Audio Graph
  // Source -> EQ Warmth -> EQ Air -> Panner -> Destination
  source.connect(eqWarmth);
  eqWarmth.connect(eqAir);
  eqAir.connect(panner);
  panner.connect(ctx.destination);

  // LFO -> LFO Gain -> Panner.pan
  lfo.connect(lfoGain);
  lfoGain.connect(panner.pan);

  // Start playback
  lfo.start();
  source.start();

  if (onEnded) {
    source.addEventListener('ended', onEnded);
  }

  // Return a controller to stop everything cleanly
  return {
    stop: () => {
      try {
        source.stop();
        lfo.stop();
        // Disconnect to help garbage collection
        source.disconnect();
        lfo.disconnect();
        panner.disconnect();
        eqWarmth.disconnect();
        eqAir.disconnect();
      } catch (e) {
        // Ignore errors if already stopped
      }
    }
  };
};

/**
 * Loads an audio file from a URL.
 */
export const loadAudio = async (url: string, ctx: AudioContext): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await ctx.decodeAudioData(arrayBuffer);
};

/**
 * Generates a simple impulse response for convolution reverb.
 * Creates a decaying noise burst to simulate a room/hall.
 */
const createImpulseResponse = (ctx: AudioContext, duration: number, decay: number, reverse: boolean): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const impulse = ctx.createBuffer(2, length, sampleRate);
  const left = impulse.getChannelData(0);
  const right = impulse.getChannelData(1);

  for (let i = 0; i < length; i++) {
    const n = reverse ? length - i : i;
    let noise = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    left[i] = noise;
    right[i] = noise;
  }
  return impulse;
};

// Singleton reverb buffer to avoid re-generating every click
let sharedReverbBuffer: AudioBuffer | null = null;

/**
 * Plays the "Premium" Bubble Sound from a buffer with Reverb.
 */
export const playInteractionSound = (ctx: AudioContext, buffer: AudioBuffer | null) => {
  if (!buffer) return;

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Create Reverb (Convolver)
  const convolver = ctx.createConvolver();

  if (!sharedReverbBuffer) {
    // Generate a "Large Hall" style reverb (2.5s tail, factor 2.0 decay)
    sharedReverbBuffer = createImpulseResponse(ctx, 2.5, 2.0, false);
  }
  convolver.buffer = sharedReverbBuffer;

  // Mix: Dry (Original) + Wet (Reverb)
  const dryGain = ctx.createGain();
  const wetGain = ctx.createGain();
  const masterGain = ctx.createGain();

  dryGain.gain.value = 0.8; // Strong direct sound
  wetGain.gain.value = 0.3; // Subtle reverb tail (User asked for "controlled" reverb)

  // Master volume control (User asked for "understated/elegant")
  masterGain.gain.value = 0.6;

  // Randomize Pitch slightly for organic feel
  // +/- 100 cents (semitone)
  const detune = (Math.random() - 0.5) * 200;
  source.detune.value = detune;

  // Routing
  source.connect(dryGain);
  source.connect(convolver);
  convolver.connect(wetGain);

  dryGain.connect(masterGain);
  wetGain.connect(masterGain);

  masterGain.connect(ctx.destination);

  source.start();
};