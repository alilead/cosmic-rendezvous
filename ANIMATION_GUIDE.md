# Alien Animation Implementation Guide

## Overview
The alien character performs a dynamic animation sequence:
1. **Backflip** - Performs a backflip once (plays once)
2. **Landing** - Smooth transition
3. **Waving** - Continuous friendly greeting (loops forever)

## Animation Sequence Flow
```
Start → Backflip (once) → Land → Waving (loop) → Continue waving...
```

## File Locations

### Animation Files (FBX)
- Waving: `public/Waving.fbx`
- Backflip: `public/Backflip.fbx`
- Original: `public/alen.fbx` (kept for reference)

### Component Files
- Main Scene: `src/components/AlienIntroScene.tsx`
- Intro Component: `src/components/AlienIntro.tsx`
- Demo Component: `src/components/AlienAnimationDemo.tsx`

## Usage

### 1. Default Sequence (Backflip → Wave)

```tsx
import { AlienIntroScene } from "@/components/AlienIntroScene";

// Plays backflip once, then loops waving animation
<AlienIntroScene ready={true} animationType="sequence" />

// Or simply (sequence is the default)
<AlienIntroScene ready={true} />
```

### 2. Individual Animations

```tsx
// Only waving (loops continuously)
<AlienIntroScene ready={true} animationType="waving" />

// Only backflip (loops continuously)
<AlienIntroScene ready={true} animationType="backflip" />
```

### 3. Dynamic Animation Control

```tsx
import { useState } from "react";
import { AlienIntroScene } from "@/components/AlienIntroScene";

function MyComponent() {
  const [animation, setAnimation] = useState<"sequence" | "waving" | "backflip">("sequence");

  return (
    <>
      <AlienIntroScene ready={true} animationType={animation} />
      <button onClick={() => setAnimation("sequence")}>
        Play Sequence
      </button>
    </>
  );
}
```

### 4. Demo Component

A complete demo component is available at `src/components/AlienAnimationDemo.tsx`:

```tsx
import AlienAnimationDemo from "@/components/AlienAnimationDemo";

// Use in your app to test all animation modes
<AlienAnimationDemo />
```

## Current Implementation

### AlienIntro Component
The intro screen now automatically plays the sequence:
1. Alien performs a backflip (once)
2. Lands smoothly
3. Starts waving continuously
4. User can click "Enter" anytime during the sequence

### How It Works

1. **Loading**: Both FBX files are preloaded using Three.js FBXLoader
2. **Sequence Mode**: 
   - Starts with backflip animation
   - Sets loop mode to `LoopOnce` for backflip
   - Listens for "finished" event from AnimationMixer
   - Automatically switches to waving animation when backflip completes
   - Waving animation loops infinitely
3. **Animation Mixer**: Three.js AnimationMixer handles animation playback and transitions
4. **State Management**: React state tracks which animation is currently playing

## Customization Options

### Change Animation Speed
In `AlienIntroScene.tsx`, modify the mixer update:

```tsx
useFrame((_, delta) => {
  // Normal speed
  mixerRef.current?.update(delta);
  
  // Double speed
  mixerRef.current?.update(delta * 2);
  
  // Half speed
  mixerRef.current?.update(delta * 0.5);
});
```

### Change Position/Scale
Modify the group properties:

```tsx
<group 
  ref={groupRef} 
  position={[0, -0.5, 0]}  // [x, y, z]
  scale={0.8}               // uniform scale
  rotation={[0, Math.PI, 0]} // [x, y, z] rotation
>
```

### Play Animation Once (No Loop)

```tsx
action.setLoop(THREE.LoopOnce, 1);
action.clampWhenFinished = true;
```

## Animation Triggers

You can trigger animations based on:

1. **User Actions**: Click, hover, scroll
2. **Game Events**: Score milestones, achievements
3. **Time-based**: Intervals, delays
4. **State Changes**: Page navigation, form submission

### Example: Score-based Animation

```tsx
useEffect(() => {
  if (score > 1000) {
    setAnimationType("backflip");
  } else {
    setAnimationType("waving");
  }
}, [score]);
```

## Performance Notes

- Both FBX files are loaded simultaneously for instant switching
- Animations use Three.js AnimationMixer for efficient playback
- Proper cleanup prevents memory leaks
- Suspense boundary handles loading states

## Troubleshooting

### Animation Not Playing
- Check browser console for FBX loading errors
- Verify files exist in `public/` folder
- Ensure animations are embedded in FBX files

### Performance Issues
- Reduce polygon count in 3D model
- Lower animation frame rate
- Use simpler lighting setup

### Animation Switching Lag
- Both animations are preloaded, so switching should be instant
- Check for console errors
- Verify mixer cleanup is working

## Next Steps

Consider adding:
- More animations (jumping, dancing, etc.)
- Animation blending/transitions
- Interactive controls (pause, speed control)
- Animation events/callbacks
- Mobile-optimized versions
