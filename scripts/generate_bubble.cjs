const fs = require('fs');
const path = require('path');

// WAV Header Construction
function writeWav(samples, sampleRate = 44100) {
    const buffer = Buffer.alloc(44 + samples.length * 2);

    // RIFF chunk descriptor
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + samples.length * 2, 4);
    buffer.write('WAVE', 8);

    // fmt sub-chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size
    buffer.writeUInt16LE(1, 20); // AudioFormat (1=PCM)
    buffer.writeUInt16LE(1, 22); // NumChannels (Mono)
    buffer.writeUInt32LE(sampleRate, 24); // SampleRate
    buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
    buffer.writeUInt16LE(2, 32); // BlockAlign
    buffer.writeUInt16LE(16, 34); // BitsPerSample

    // data sub-chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(samples.length * 2, 40);

    // Write samples
    for (let i = 0; i < samples.length; i++) {
        const s = Math.max(-1, Math.min(1, samples[i]));
        buffer.writeInt16LE(s < 0 ? s * 0x8000 : s * 0x7FFF, 44 + i * 2);
    }

    return buffer;
}

// Synthesis: Water Droplet / Bubble Pop
// A rapid frequency sweep (chirp) with a damped envelope.
function generateBubble() {
    const sampleRate = 44100;
    const duration = 0.15; // seconds
    const totalSamples = sampleRate * duration;
    const samples = new Float32Array(totalSamples);

    for (let i = 0; i < totalSamples; i++) {
        const t = i / sampleRate;

        // Frequency Sweep: Start low (~400Hz), go high (~1200Hz) quickly -> Bubble "Bloop"
        // Or Start High go Low? Droplets usually go High->Low pitch bend resonance, but purely air bubbles go Low->High.
        // Let's try a resonant filter sweep simulation (Fake chirp).
        // f(t) = start + (end - start) * t / duration

        const fStart = 600;
        const fEnd = 1400;

        // Exponential sweep sounds more natural
        const freq = fStart * Math.pow(fEnd / fStart, t / duration);

        const phase = 2 * Math.PI * freq * t;

        // Envelope: Fast attack, exponential decay
        const attackTime = 0.01;
        let envelope = 0;
        if (t < attackTime) {
            envelope = t / attackTime;
        } else {
            envelope = Math.exp(-15 * (t - attackTime));
        }

        // Add some "wobble" (amplitude modulation) for water texture
        const wobble = 1 + 0.2 * Math.sin(2 * Math.PI * 40 * t);

        samples[i] = Math.sin(phase) * envelope * wobble * 0.8;
    }

    return samples;
}

const samples = generateBubble();
const wavBuffer = writeWav(samples);
const outputPath = path.join(__dirname, '../public/sounds/bubble.wav');

fs.writeFileSync(outputPath, wavBuffer);
console.log(`Generated bubble.wav at ${outputPath}`);
