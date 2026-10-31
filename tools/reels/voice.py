"""Voiceover, music bed and timeline for one advert.

    PYTHONPATH=tools/reels/.pylib python3 tools/reels/voice.py stage46

Speaks each line of adverts.json with a Piper voice (voices/), lays the
lines out with breathing room, builds a simple music bed in code (no
samples), mixes them, and writes out/<key>/audio.wav + timeline.json for
render-ad.mjs. Every visual timing comes from how long the voice takes.

Your own audio wins over the generated audio. Any format ffmpeg reads
(mp3, m4a, wav, ogg...) in tools/reels/audio/<key>/:
  line-1.mp3, line-2.mp3 ...  your voiceover, one file per line of the
                              script, in order (missing ones are generated)
  music.mp3                   your music bed, mixed under the voice
"""
import json
import subprocess
import sys
import wave
from pathlib import Path

import imageio_ffmpeg

import numpy as np
from piper import PiperVoice, SynthesisConfig

HERE = Path(__file__).parent
SR = 22050
LEAD_IN = 0.45   # silence before the first line
GAP = 0.32       # pause between lines
END_HOLD = 2.6   # end card after the last line

key = sys.argv[1]
spec = json.loads((HERE / "adverts.json").read_text())[key]
out = HERE / "out" / key
out.mkdir(parents=True, exist_ok=True)

voice = PiperVoice.load(str(HERE / "voices" / f"{spec['voice']}.onnx"))
cfg = SynthesisConfig(length_scale=spec.get("pace", 1.0))


OWN = HERE / "audio" / key


def own(stem):
    """Your own recording for this slot, decoded to mono at SR, or None."""
    found = sorted(OWN.glob(f"{stem}.*")) if OWN.exists() else []
    if not found:
        return None
    raw = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-i", str(found[0]), "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    print(f"  using your {found[0].name}")
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768


def trim(pcm):
    loud = np.where(np.abs(pcm) > 0.01)[0]
    return pcm[max(0, loud[0] - 300): loud[-1] + 600] if len(loud) else pcm


def speak(text):
    path = out / "tmp.wav"
    with wave.open(str(path), "wb") as wf:
        voice.synthesize_wav(text, wf, syn_config=cfg)
    with wave.open(str(path), "rb") as wf:
        rate = wf.getframerate()
        pcm = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    path.unlink()
    if rate != SR:  # resample to the bed's rate
        pcm = np.interp(np.linspace(0, len(pcm), int(len(pcm) * SR / rate), endpoint=False), np.arange(len(pcm)), pcm)
    return trim(pcm)  # drop the synthesiser's own leading/trailing silence


clips, t, lines = [], LEAD_IN, []
for i, line in enumerate(spec["lines"], 1):
    mine = own(f"line-{i}")
    pcm = trim(mine) if mine is not None else speak(line["say"])
    dur = len(pcm) / SR
    clips.append((t, pcm))
    lines.append({"t0": round(t, 3), "t1": round(t + dur, 3)})
    t += dur + GAP
end_t = lines[-1]["t1"] - 0.2  # end card lands under the final words
total = lines[-1]["t1"] + END_HOLD

n = int(total * SR)
vo = np.zeros(n, np.float32)
for start, pcm in clips:
    i = int(start * SR)
    vo[i:i + len(pcm)] += pcm[: n - i]


# ---- music bed, synthesised ----
def env(length, attack, decay):
    x = np.arange(length) / SR
    return np.minimum(1, x / max(attack, 1e-4)) * np.exp(-x / decay)


def kick():
    L = int(0.35 * SR)
    x = np.arange(L) / SR
    f = 50 + 90 * np.exp(-x * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(L, 0.002, 0.12)


def noise_hit(length, decay, hp=True):
    L = int(length * SR)
    s = np.random.default_rng(7).standard_normal(L).astype(np.float32)
    if hp:
        s = np.diff(s, prepend=0)
    return s * env(L, 0.001, decay)


def tone(freq, length, decay, harm=(1, 0.5, 0.25)):
    L = int(length * SR)
    x = np.arange(L) / SR
    w = sum(a * np.sin(2 * np.pi * freq * (k + 1) * x) for k, a in enumerate(harm))
    return w * env(L, 0.01, decay)


bed = np.zeros(n, np.float32)
beat = 60 / spec["bpm"]


def place(sample, at, gain):
    i = int(at * SR)
    if i >= n:
        return
    seg = sample[: n - i] * gain
    bed[i:i + len(seg)] += seg


style = spec["music"]
k, h, s = kick(), noise_hit(0.05, 0.015), noise_hit(0.18, 0.06)
roots = {"drums": [55, 55, 49, 52], "boom": [41.2, 41.2, 46.2, 43.7], "pad": [130.8, 110, 146.8, 123.5]}[style]
b = 0
while b * beat < total:
    at = b * beat
    bar, pos = divmod(b, 4)
    root = roots[bar % 4]
    if style == "drums":
        if pos in (0, 2) or (pos == 3 and bar % 2):
            place(k, at, 0.9)
        if pos in (1, 3):
            place(s, at, 0.35)
        place(h, at, 0.25)
        place(h, at + beat / 2, 0.18)
        if pos == 0:
            place(tone(root, beat * 1.8, 0.5, (1, 0.3)), at, 0.35)
    elif style == "boom":
        if pos == 0 or pos == 2.5:
            place(k, at, 0.85)
        if pos == 2:
            place(k, at + beat / 2, 0.6)
        if pos in (1, 3):
            place(noise_hit(0.08, 0.02, hp=True), at, 0.3)
        place(h, at + beat / 2, 0.12)
        if pos == 0:
            place(tone(root, beat * 3.5, 1.2, (1, 0.2)), at, 0.4)
    else:  # pad: soft chords, no drums
        if pos == 0:
            for mult in (1, 1.26, 1.5):
                place(tone(root * mult, beat * 4.2, 2.2, (1, 0.15)), at, 0.12)
        place(tone(root * 4, beat * 0.9, 0.35, (1,)), at + beat / 2, 0.025)
    b += 1

# your own music replaces the generated bed (looped if it is shorter than the ad)
music = own("music")
if music is not None:
    bed = np.resize(music, n).astype(np.float32)

# fade the bed in and out, and duck it under the voice
fade = np.ones(n, np.float32)
fi, fo = int(0.3 * SR), int(1.6 * SR)
fade[:fi] = np.linspace(0, 1, fi)
fade[-fo:] = np.linspace(1, 0, fo)
level = np.convolve(np.abs(vo), np.ones(int(0.12 * SR)) / int(0.12 * SR), mode="same")
duck = 1 - 0.55 * np.clip(level / 0.05, 0, 1)
bed = bed / (np.abs(bed).max() + 1e-9) * 0.32 * fade * duck

mix = vo / (np.abs(vo).max() + 1e-9) * 0.9 + bed
mix = np.tanh(mix * 1.1) * 0.95
with wave.open(str(out / "audio.wav"), "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes((mix * 32767).astype(np.int16).tobytes())

(out / "timeline.json").write_text(json.dumps({"key": key, "total": round(total, 3), "end": round(end_t, 3), "lines": lines, "spec": spec}, indent=1))
print(f"{key}: {total:.1f}s, lines " + ", ".join(f"{l['t1'] - l['t0']:.1f}s" for l in lines))
