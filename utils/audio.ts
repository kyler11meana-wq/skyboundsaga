
export class AudioManager {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private spinInterval: number | null = null;
  
  // Revamped Adventure Theme Melody
  // C5, G4, E4, G4 | A4, G4, E4, D4 | C4, E4, G4, C5 | D5, C5, B4, C5
  private melody = [
      523.25, 392.00, 329.63, 392.00, 
      440.00, 392.00, 329.63, 293.66, 
      261.63, 329.63, 392.00, 523.25, 
      587.33, 523.25, 493.88, 523.25
  ]; 
  private noteIndex: number = 0;

  private init() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.musicGain = this.context.createGain();
      this.musicGain.connect(this.context.destination);
      this.setMute(this.isMuted);
    }
    if (this.context.state === 'suspended') {
      this.context.resume().catch(() => {});
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.context) {
        this.masterGain.gain.setValueAtTime(muted ? 0 : 0.3, this.context.currentTime);
    }
    if (this.musicGain && this.context) {
        this.musicGain.gain.setValueAtTime(muted ? 0 : 0.25, this.context.currentTime);
    }
  }

  public playJump() {
    this.init();
    if (!this.context || this.isMuted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }

  public playScore() {
    this.init();
    if (!this.context || this.isMuted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, this.context.currentTime);
    osc.frequency.linearRampToValueAtTime(1500, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.context.currentTime + 0.1);

    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }

  public playCrash() {
    this.init();
    if (!this.context || this.isMuted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.4);

    gain.gain.setValueAtTime(0.2, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.4);

    osc.start();
    osc.stop(this.context.currentTime + 0.4);
  }

  public playClick() {
    this.init();
    if (!this.context || this.isMuted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.context.currentTime);
    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

    osc.start();
    osc.stop(this.context.currentTime + 0.05);
  }
  
   public playVictory() {
    this.init();
    if (!this.context || this.isMuted) return;
    
    const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = this.context!.createOscillator();
        const gain = this.context!.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain!);
        
        osc.type = 'square';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    const now = this.context.currentTime;
    playNote(523.25, now, 0.1); // C5
    playNote(659.25, now + 0.1, 0.1); // E5
    playNote(783.99, now + 0.2, 0.1); // G5
    playNote(1046.50, now + 0.3, 0.4); // C6
  }

  public playTimelapse() {
      this.init();
      if (!this.context || this.isMuted) return;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.context.currentTime);
      osc.frequency.linearRampToValueAtTime(200, this.context.currentTime + 1.0); // Pitch down
      
      gain.gain.setValueAtTime(0.2, this.context.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 1.0);
      
      osc.start();
      osc.stop(this.context.currentTime + 1.0);
  }

  public playEchoCloak() {
      this.init();
      if (!this.context || this.isMuted) return;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      const lfo = this.context.createOscillator();
      const lfoGain = this.context.createGain();
      
      lfo.type = 'sine';
      lfo.frequency.value = 15; // Fast vibrato
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, this.context.currentTime);
      osc.frequency.linearRampToValueAtTime(300, this.context.currentTime + 0.5);
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      gain.gain.setValueAtTime(0.2, this.context.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 2.0);
      
      osc.start();
      lfo.start();
      osc.stop(this.context.currentTime + 2.0);
      lfo.stop(this.context.currentTime + 2.0);
  }

  public playSunbeam() {
      this.init();
      if (!this.context || this.isMuted) return;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, this.context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2000, this.context.currentTime + 0.5);
      
      gain.gain.setValueAtTime(0.1, this.context.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.5);
      
      osc.start();
      osc.stop(this.context.currentTime + 0.5);
  }

  public playHeal() {
      this.init();
      if (!this.context || this.isMuted) return;
      
      const playChime = (freq: number, time: number) => {
          const osc = this.context!.createOscillator();
          const gain = this.context!.createGain();
          osc.connect(gain);
          gain.connect(this.masterGain!);
          
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
          
          osc.start(time);
          osc.stop(time + 0.5);
      };
      
      const now = this.context.currentTime;
      playChime(523.25, now); // C5
      playChime(659.25, now + 0.1); // E5
      playChime(783.99, now + 0.2); // G5
      playChime(1046.50, now + 0.3); // C6
  }

  public playAutoPilot() {
      this.init();
      if (!this.context || this.isMuted) return;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, this.context.currentTime);
      osc.frequency.linearRampToValueAtTime(800, this.context.currentTime + 0.2);
      osc.frequency.setValueAtTime(800, this.context.currentTime + 0.2);
      osc.frequency.linearRampToValueAtTime(200, this.context.currentTime + 0.4);
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      gain.gain.setValueAtTime(0.1, this.context.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.4);
      
      osc.start();
      osc.stop(this.context.currentTime + 0.4);
  }

  public startSpinSound() {
    this.init();
    if (this.spinInterval || this.isMuted) return;
    
    // Play a ticking sound loop
    this.spinInterval = window.setInterval(() => {
        if (!this.context || this.isMuted) return;
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        osc.connect(gain);
        gain.connect(this.masterGain!);
        
        // High pitched tick
        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, this.context.currentTime);
        
        gain.gain.setValueAtTime(0.03, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.03);
        
        osc.start();
        osc.stop(this.context.currentTime + 0.03);
    }, 80); // Fast interval
  }

  public stopSpinSound() {
      if (this.spinInterval) {
          clearInterval(this.spinInterval);
          this.spinInterval = null;
      }
  }

  public startMenuMusic() {
      this.init();
      if (this.isMusicPlaying || !this.context) return;
      this.isMusicPlaying = true;
      this.noteIndex = 0;

      if (!this.musicGain) {
          this.musicGain = this.context.createGain();
          this.musicGain.connect(this.context.destination);
          this.musicGain.gain.value = 0.25; 
      }

      // Slightly slower, grander tempo
      const noteDuration = 0.3; 
      let nextNoteTime = this.context.currentTime;

      const scheduler = () => {
          if (!this.isMusicPlaying || !this.context) return;
          
          while (nextNoteTime < this.context.currentTime + 0.1) {
              if (!this.isMuted) {
                this.playMusicNote(this.melody[this.noteIndex % this.melody.length], nextNoteTime, noteDuration);
              }
              nextNoteTime += noteDuration;
              this.noteIndex++;
          }
          this.musicInterval = window.setTimeout(scheduler, 25);
      };
      scheduler();
  }

  public stopMenuMusic() {
      this.isMusicPlaying = false;
      if (this.musicInterval) {
          clearTimeout(this.musicInterval);
          this.musicInterval = null;
      }
  }

  private playMusicNote(freq: number, time: number, duration: number) {
      if (!this.context || !this.musicGain) return;
      
      // Main voice
      const osc = this.context.createOscillator();
      const noteGain = this.context.createGain();
      
      osc.type = 'triangle'; // Softer, flute-like
      osc.frequency.value = freq;
      
      osc.connect(noteGain);
      noteGain.connect(this.musicGain);
      
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.1, time + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      
      osc.start(time);
      osc.stop(time + duration);

      // Harmony voice (Perfect 5th lower)
      const osc2 = this.context.createOscillator();
      const noteGain2 = this.context.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = freq * 0.666; // approx 5th down
      
      osc2.connect(noteGain2);
      noteGain2.connect(this.musicGain);
      
      noteGain2.gain.setValueAtTime(0, time);
      noteGain2.gain.linearRampToValueAtTime(0.05, time + 0.05);
      noteGain2.gain.exponentialRampToValueAtTime(0.001, time + duration);
      
      osc2.start(time);
      osc2.stop(time + duration);
  }
}

export const audioManager = new AudioManager();
